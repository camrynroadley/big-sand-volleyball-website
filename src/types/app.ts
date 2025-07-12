import { SignUpFormData } from "@/components/programSections/helpers/registrationSchema";

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
  id: keyof SignUpFormData;
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

export interface EmailFormData {
  email: string;
  nickname?: string; // honeypot field
}
