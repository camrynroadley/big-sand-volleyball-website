import { EmailFormData } from "../../../types/app";

export const EmailSignUpHandler = async (data: EmailFormData) => {
    const res = await fetch('/api/subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    return result;
}
