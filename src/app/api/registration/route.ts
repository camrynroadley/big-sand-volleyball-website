/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { google } from "googleapis";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import { registrationSchema } from "@/components/programSections/helpers/registrationSchema";
import { rateLimit } from "@/lib/rateLimiter";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

export async function POST(request: Request) {
  console.log("RegistrationRoute::Starting request...");
  const ip =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const limited = await rateLimit(ip, 5, 600_000); // 5 requests per 10 minutes

  if (limited) {
    console.log("RegistrationRoute::Rate Limiting::Too many requests");
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    console.log("RegistrationRoute::Starting ReCAPTCHA verification...");
    const body = await request.json();
    const recaptcha = body?.recaptcha;

    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${process.env.RECAPTCHA_SERVER_KEY}&response=${recaptcha}`,
      }
    );

    const verification = await response.json();

    if (!verification.success) {
      console.log("RegistrationRoute::ReCAPTCHA failed...");
      return NextResponse.json(
        { error: "ReCAPTCHA verification failed" },
        { status: 400 }
      );
    }

    console.log("RegistrationRoute::ReCAPTCHA successful...");

    const parsed = registrationSchema.safeParse(body);

    if (!parsed.success) {
      const errors = parsed.error.flatten();
      return NextResponse.json(
        { error: "Invalid input", details: errors },
        { status: 400 }
      );
    }

    const updatedData = {
      ...parsed.data,
      program_slug: body.program_slug,
    };

    // Add data to supabase
    try {
      console.log("RegistrationRoute::Adding to Supabase...");
      const { error } = await supabase
        .from("big_sand_registrations")
        .insert([updatedData]);

      if (error) {
        console.error("Supabase insert error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    } catch (e: any) {
      console.error("Supabase insert failed:", e.message);
      return NextResponse.json(
        { error: "Failed to save registration." },
        { status: 500 }
      );
    }

    // Send email after successful insert
    try {
      console.log("RegistrationRoute::Sending notification email...");
      const { error: resendError } = await resend.emails.send({
        from: `Big Sand Volleyball <${process.env.RESEND_FROM_EMAIL!}>`,
        to: process.env.RESEND_EMAIL!,
        subject: "New Registration",
        html: `
      <h2>New Registration Submitted</h2>
    `,
      });

      if (resendError) {
        console.error("RegistrationRoute::Resend Email Error:", resendError);
      }
    } catch (e: any) {
      console.error("RegistrationRoute::Failed to send notification email:", e.message);
    }

    // Send data to Google Sheet
    try {
      console.log("RegistrationRoute::Adding to Google Sheets...");
      const sessionString = updatedData.sessions.join(", ");

      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: "Sheet1!A1",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [
            [
              new Date().toLocaleString(),
              updatedData.program_slug,
              `${updatedData.child_first_name} ${updatedData.child_last_name}`,
              `${updatedData.parent_1_first_name} ${updatedData.parent_1_last_name}`,
              updatedData.parent_1_email,
              updatedData.parent_1_phone,
              `${updatedData.parent_2_first_name} ${updatedData.parent_2_last_name}`,
              updatedData.parent_2_email,
              updatedData.parent_2_phone,
              updatedData.grade,
              updatedData.school,
              updatedData.shirt_size,
              sessionString,
            ],
          ],
        },
      });
    } catch (e: any) {
      console.error("RegistrationRoute::Failed to add registration to Google Sheets:", e.message);
    }
    return NextResponse.json({ message: "Signup successful!" });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Server error" },
      { status: 500 }
    );
  }
}
