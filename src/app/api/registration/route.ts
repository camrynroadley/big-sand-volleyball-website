import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    console.log('*** request: ', request)
    const data = await request.json();
    console.log('*** data: ', data)

    // Basic check to ensure data exists
    if (!data || typeof data !== "object" || Object.keys(data).length === 0) {
      return NextResponse.json({ error: "Form data is required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("big_sand_registrations")
      .insert([data]);

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
