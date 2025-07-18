/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import { zodResolver } from "@hookform/resolvers/zod";
import { formContent } from "./helpers/formContent";
import {
  extendedFormSchema,
  SignUpFormData,
} from "./helpers/registrationSchema";
import { Loader2, CheckCircle } from "lucide-react";
import { FormInput, Program } from "../../types/app";
import { BlurText } from "../ui/BlurText";
import { FadeInOnScroll } from "../ui/FadeInOnScroll";

interface FormProps {
  program: Program;
}

export const Form = ({ program }: FormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(extendedFormSchema),
    mode: "all",
    defaultValues: {
      recaptcha: "",
    },
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const onSubmit = async (data: SignUpFormData) => {
    console.log("ProgramSections::Form::onSubmit");
    // Honeypot trigger
    if (data.nickname) {
      console.log("ProgramSections::Form::Honey Pot Rejection");
      setStatus("Submission rejected.");
      return;
    }

    if (!data.sessions || data.sessions.length === 0) {
      console.log("ProgramSections::Form::Session Selection Missing");
      setStatus("Please select at least one session.");
      return;
    }

    setLoading(true);
    setStatus("");
    setShowSuccess(false);

    const formData = {
      ...data,
      program_slug: program.slug ?? "test",
    };

    try {
      console.log("ProgramSections::Form::Starting API request...");
      const res = await fetch("/api/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        console.log("ProgramSections::Form::Successful API response...");
        const SUCCESS_STATUS =
          "Thank you for signing up! Please check your email for a confirmation. We will reach out to you with additional information and payment instructions.";
        setStatus(SUCCESS_STATUS);
        setShowSuccess(true);
        reset();
        setTimeout(() => {
          setShowSuccess(false);
          setStatus("");
        }, 8000);
      } else {
        setStatus(result.error || "Something went wrong.");
      }
    } catch (err: any) {
      setStatus("Submission failed. Please try again.");
      console.error("ProgramSections::Form::Error during form submission");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#f5f5f5] py-16 px-4">
      <FadeInOnScroll>
        <p className="text-[#DF0000] text-sm font-semibold text-center">
          Ready to join?
        </p>
      </FadeInOnScroll>
      <div className="w-full max-w-xl mx-auto text-center">
        <BlurText
          text="Sign up now"
          delay={100}
          animateBy="words"
          direction="top"
          className="text-5xl font-semibold text-black mb-4 text-center justify-center"
        />
      </div>
      <FadeInOnScroll>
        <p className="text-sm text-center mb-8">
          <i>* indicates a required field</i>
        </p>
      </FadeInOnScroll>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 max-w-3xl mx-auto"
      >
        {/* Honeypot for security */}
        <input
          type="text"
          {...register("nickname")}
          className="hidden"
          autoComplete="off"
          tabIndex={-1}
          aria-hidden="true"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formContent.map((input: FormInput) => {
            const isTextarea = input.type === "textarea";
            const isSelect = input.type === "select";
            const isCheckboxGroup = input.type === "checkbox-group";
            const isCheckbox = input.type === "checkbox";
            const inputType = input.type || "text";

            return (
              <div
                key={input.id}
                className={
                  isTextarea || isCheckboxGroup || isCheckbox
                    ? "md:col-span-2"
                    : ""
                }
              >
                {!isCheckbox && (
                  <label
                    htmlFor={input.id}
                    className="block mb-1 font-medium text-sm"
                  >
                    {input.label}
                  </label>
                )}

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
                        htmlFor={input.id}
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
                ) : isCheckbox ? (
                  <div className="md:col-span-2 w-full">
                    <div className="flex items-center space-x-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          {...register(input.id)}
                          id={input.id}
                          className="accent-red-800"
                        />
                        <span>{input.label}</span>
                      </label>
                    </div>
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
          {program.sessions.length > 1 && (
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium text-sm">
                Sessions: *
              </label>
              <div className="flex flex-wrap gap-4">
                {program.sessions.map((session) => (
                  <label
                    key={session.id}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      value={
                        session.isFull
                          ? `waitlist-session-${session.id}`
                          : `session-${session.id}`
                      }
                      onChange={(e) => {
                        const value = e.target.value;
                        const checked = e.target.checked;
                        const current = watch("sessions") || [];
                        const updated = checked
                          ? [...current, value]
                          : current.filter((v: string) => v !== value);

                        setValue("sessions", updated, { shouldValidate: true });
                      }}
                      className="accent-red-800"
                    />
                    <span>
                      {session.isFull
                        ? `Waitlist Session ${session.id}`
                        : `Session ${session.id}`}
                    </span>
                  </label>
                ))}
              </div>
              {errors.sessions && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.sessions.message as string}
                </p>
              )}
            </div>
          )}
        </div>
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          onChange={(token) => setValue("recaptcha", token || "")}
          className="mt-6"
        />
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
        <div className="mt-6 max-w-3xl mx-auto flex items-center gap-2 bg-green-200 text-green-800 p-3 rounded">
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
