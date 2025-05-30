import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
// import { appendToSheet } from '@/lib/googleSheets'; // you write this

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("big_sand_mailing_list")
      .insert([{ email }]);

    if (error?.code === "23505") {
      // Unique violation
      return NextResponse.json(
        { error: "This email is already subscribed." },
        { status: 400 }
      );
    }

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // await appendToSheet(email); // your Google Sheets integration here

    const resend = new Resend("re_X2enEKKY_Dv7TwdvMtTR5UAjJnPYLopqZ");

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "bigsandvolleyballwinnipeg@gmail.com",
      subject: "Hello World",
      html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
    });

    return NextResponse.json({ message: "Subscribed!" });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Server error" },
      { status: 500 }
    );
  }
}
