'use client';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { EmailFormData } from '../../../types/app';

export const EmailForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EmailFormData>();
  const [status, setStatus] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const onSubmit = async (data: EmailFormData) => {
    setStatus('');
    setShowSuccess(false);

    const res = await fetch('/api/subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok) {
      setStatus('Thanks for signing up!');
      setShowSuccess(true);
      reset();
      setTimeout(() => setShowSuccess(false), 5000);
    } else {
      setStatus(result.error || 'Something went wrong.');
    }
  };

  return (
    <div className="relative z-50 mt-6 w-full max-w-md mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center rounded-full overflow-hidden border border-black bg-white/10 backdrop-blur"
      >
        <input
          type="email"
          placeholder="Your email address"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email',
            },
          })}
          className="flex-1 bg-transparent px-4 py-2 text-black text-xs placeholder-black focus:outline-none"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black text-white px-4 py-2 font-medium text-xs flex items-center justify-center gap-2 transition-all duration-300 ease-in-out hover:bg-red-200 hover:text-black min-w-[90px]"
        >
          {isSubmitting ? (
            <svg
              className="w-4 h-4 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          ) : (
            'Sign up'
          )}
        </button>
      </form>

      {/* Styled error popup */}
      {errors.email && (
        <div className="mt-4 mx-auto flex items-center gap-2 rounded-lg border border-red-500 bg-red-100 px-4 py-2 text-sm text-red-700 shadow-md w-fit">
          <XCircle className="w-4 h-4 text-red-600" />
          <span>{errors.email.message}</span>
        </div>
      )}

      {/* Success popup */}
      {showSuccess && (
        <div className="mt-4 mx-auto flex items-center gap-2 rounded-lg border border-green-500 bg-green-100 px-4 py-2 text-sm text-green-700 shadow-md w-fit">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span>{status}</span>
        </div>
      )}

      {/* Fallback message (non-form error) */}
      {!showSuccess && status && !errors.email && (
        <p className="mt-2 text-xs text-black text-center">{status}</p>
      )}
    </div>
  );
}
