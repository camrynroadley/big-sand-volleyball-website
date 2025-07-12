/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { registrationSchema } from "@/components/programSections/helpers/registrationSchema";
import { rateLimit } from "@/lib/rateLimiter";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  console.log('RegistrationRoute::Starting request...')
  const ip =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const limited = await rateLimit(ip, 5, 600_000); // 5 requests per 10 minutes

  if (limited) {
    console.log('RegistrationRoute::Rate Limiting::Too many requests')
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    console.log('RegistrationRoute::Starting ReCAPTCHA verification...')
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
      console.log('RegistrationRoute::ReCAPTCHA failed...')
      return NextResponse.json(
        { error: "ReCAPTCHA verification failed" },
        { status: 400 }
      );
    }

    console.log('RegistrationRoute::ReCAPTCHA successful...')

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

    const { error } = await supabase
      .from("big_sand_registrations")
      .insert([updatedData]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Signup successful!" });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Server error" },
      { status: 500 }
    );
  }
}
