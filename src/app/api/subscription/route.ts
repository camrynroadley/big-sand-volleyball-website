/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import { rateLimit } from "@/lib/rateLimiter";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: Request) {
  console.log("SubscriptionRoute::Starting request...");
  const ip =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const limited = await rateLimit(ip, 5, 60_000); // 5 requests per 60 seconds

  if (limited) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const { email } = await request.json();
    if (!email) {
      console.log("SubscriptionRoute::No email provided...");
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    console.log("SubscriptionRoute::Adding email to supabase...");
    const { error } = await supabase
      .from("big_sand_mailing_list")
      .insert([{ email }]);

    if (error?.code === "23505") {
      console.log("SubscriptionRoute::Error adding email...");
      return NextResponse.json(
        { error: "This email is already subscribed." },
        { status: 400 }
      );
    }

    if (error) {
      console.log("SubscriptionRoute::Error adding email...");
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Send email after successful insert
    try {
      console.log("SubscriptionRoute::Sending notification email...");
      const { error: resendError } = await resend.emails.send({
        from: `Big Sand Volleyball <${process.env.RESEND_FROM_EMAIL!}>`,
        to: process.env.RESEND_EMAIL!,
        subject: "New Email Subscription",
        html: `
      <h2>New Email Submitted</h2>
    `,
      });

      if (resendError) {
        console.error("SubscriptionRoute::Resend Email Error:", resendError);
      }
    } catch (e: any) {
      console.error(
        "SubscriptionRoute::Failed to send notification email:",
        e.message
      );
    }
    return NextResponse.json({ message: "Subscribed!" });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Server error" },
      { status: 500 }
    );
  }
}
