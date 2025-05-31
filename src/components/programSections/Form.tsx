"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SignUpFormContent } from "./helpers/SignUpFormContent";
import { Loader2, CheckCircle } from "lucide-react"; // Optional: spinner & success icon
import { Program } from "../../../types/app";

type FormValues = Record<string, string>;

interface FormProps {
  program: Program;
}

export const Form = ({ program }: FormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    SignUpFormContent.push({
      id: "sessions",
      label: "Select sessions:",
      type: "checkbox-group",
      options: program.sessions.map((session, index) => {
        if (session.isFull) {
          return `Waitlist Session ${index}`;
        } else {
          return `Session ${index}`;
        }
      }),
      error: "Please select at least one session",
      required: true,
    });
  }, []);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setStatus("");
    setShowSuccess(false);

    const formData = { ...data, program_slug: "test" };

    try {
      const res = await fetch("/api/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        const SUCCESS_STATUS =
          "Thank you for signing up! Please check your email for a confirmation. We will reach out to you with additional information and payment instructions.";
        setStatus(SUCCESS_STATUS);
        setShowSuccess(true);
        reset();
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        setStatus(result.error || "Something went wrong.");
      }
    } catch (error) {
      setStatus("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#f5f5f5] py-16 px-4">
      <p className="text-[#DF0000] text-sm font-semibold text-center">
        Ready to join?
      </p>
      <h2 className="text-5xl font-semibold text-black mb-4 text-center">
        Sign up now
      </h2>
      <p className="text-sm text-center mb-8">
        <i>* indicates a required field</i>
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 max-w-3xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SignUpFormContent.map((input) => {
            const isTextarea = input.type === "textarea";
            const isSelect = input.type === "select";
            const isCheckboxGroup = input.type === "checkbox-group";
            const inputType = input.type || "text";

            return (
              <div
                key={input.id}
                className={isTextarea || isCheckboxGroup ? "md:col-span-2" : ""}
              >
                <label className="block mb-1 font-medium text-sm">
                  {input.label}
                </label>

                {isTextarea ? (
                  <textarea
                    {...register(input.id, { required: input.required })}
                    id={input.id}
                    className="w-full p-2 border border-black rounded bg-white"
                    rows={4}
                  />
                ) : isSelect ? (
                  <select
                    {...register(input.id, { required: input.required })}
                    id={input.id}
                    className="w-full p-2 border border-black rounded bg-white"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    {input.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : isCheckboxGroup ? (
                  <div className="flex flex-wrap gap-4">
                    {input.options?.map((option) => (
                      <label
                        key={option}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          value={option}
                          {...register(input.id, {
                            validate: () => {
                              if (input.required) {
                                const field = document.querySelectorAll(
                                  `input[name="${input.id}"]:checked`
                                );
                                return field.length > 0 || input.error;
                              }
                              return true;
                            },
                          })}
                          name={input.id}
                          className="accent-red-800"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <input
                    {...register(input.id, { required: input.required })}
                    id={input.id}
                    type={inputType}
                    className="w-full p-2 border border-black rounded bg-white"
                  />
                )}

                {errors[input.id] && (
                  <p className="text-red-600 text-sm mt-1">{input.error}</p>
                )}
              </div>
            );
          })}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-red-800 text-white px-6 py-2 rounded hover:bg-red-700 flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin h-4 w-4" /> Submitting...
            </>
          ) : (
            "Submit"
          )}
        </button>
      </form>

      {showSuccess && (
        <div className="mt-6 max-w-3xl mx-auto flex items-center gap-2 bg-green-100 text-green-800 p-3 rounded">
          <CheckCircle className="h-5 w-5" />
          <span>{status}</span>
        </div>
      )}

      {!showSuccess && status && (
        <div className="mt-6 max-w-3xl mx-auto text-red-600 text-sm text-center">
          {status}
        </div>
      )}
    </section>
  );
};
