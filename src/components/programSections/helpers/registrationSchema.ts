import { z } from "zod";

export const registrationSchema = z.object({
  child_first_name: z.string().min(1, "Required"),
  child_last_name: z.string().min(1, "Required"),
  parent_1_first_name: z.string().min(1, "Required"),
  parent_1_last_name: z.string().min(1, "Required"),
  parent_1_phone: z.string().min(1, "Required"),
  parent_1_email: z.string().email("Invalid email"),

  parent_2_first_name: z.string().optional(),
  parent_2_last_name: z.string().optional(),
  parent_2_phone: z.string().optional(),
  parent_2_email: z
    .string()
    .optional()
    .refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "Invalid email",
    }),

  grade: z.string().min(1, "Required"),
  school: z.string().optional(),
  shirt_size: z.string().optional(),

  agree_to_privacy: z
    .boolean({
      required_error: "You must agree to the privacy policy to continue.",
    })
    .refine((val) => val === true, {
      message: "You must agree to the privacy policy to continue.",
    }),

  agree_to_photos: z.boolean().optional(),

  sessions: z.array(z.string()).min(1, "Please select at least one session."),
});

export type RegistrationSchema = z.infer<typeof registrationSchema>;
