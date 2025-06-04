import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { registrationSchema } from "@/components/programSections/helpers/registrationSchema";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registrationSchema.safeParse(body);

    if (!parsed.success) {
      const errors = parsed.error.flatten();
      console.log("*** error occurred");
      console.log("*** errors: ", errors);
      return NextResponse.json(
        { error: "Invalid input", details: errors },
        { status: 400 }
      );
    }
    const updatedData = {...parsed.data, program_slug: body.program_slug}

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
