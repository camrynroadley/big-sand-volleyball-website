import { RegistrationSchema } from "@/components/programSections/helpers/registrationSchema";

export interface Session {
  id: number;
  date: string;
  time: string;
  isFull: boolean;
  cap: number;
}

export interface Program {
  slug: string;
  title: string;
  description: string;
  location: string;
  target: string;
  cap: number;
  level: string;
  cost: string;
  payment_instructions: string;
  sessions: Session[];
  image_name: string;
}

export interface Coach {
  name: string;
  description: string;
}

export interface FormInput {
 id: keyof RegistrationSchema;
  label: string;
  error?: string;
  type?:
    | "text"
    | "email"
    | "tel"
    | "textarea"
    | "select"
    | "checkbox-group"
    | "checkbox";
  options?: string[];
  required?: boolean;
}

export interface SignUpFormData {
  program_slug: string;
  child_first_name: string;
  child_last_name: string;
  parent_1_first_name: string;
  parent_1_last_name: string;
  parent_1_email: string;
  parent_1_phone: string;
  parent_2_first_name?: string;
  parent_2_last_name?: string;
  parent_2_email?: string;
  parent_2_phone?: string;
  grade: string;
  school?: string;
  sessions: string[];
  shirt_size?: string;
  agree_to_privacy: boolean;
  agree_to_photos: boolean;
}

export interface EmailFormData {
  email: string;
  nickname?: string; // honeypot field
}
