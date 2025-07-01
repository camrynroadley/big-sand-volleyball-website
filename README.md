# Big Sand Volleyball Club Website

A modern, responsive website for Big Sand Volleyball Club, built with the **Next.js App Router**, React, Tailwind CSS, and TypeScript. The site promotes volleyball programs, captures form-based registrations, and follows accessibility and performance best practices. This project is hosted on **Vercel** and backed by **Supabase** for secure form submissions.

## 🌐 Live Site

Coming soon – to be hosted on [Vercel](https://vercel.com).

---

## 🧩 Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Framer Motion, Aceternity UI
- **Forms & Validation**: react-hook-form, Zod
- **Email & Backend**: Supabase, Resend (planned)
- **Testing**: Jest, React Testing Library
- **Deployment**: Vercel
- **Rate Limiting**: Upstash Redis (planned)
- **AI**: ChatGPT for POC components, pair programming for improved developer velocity

---

## 📐 Architecture & Design Decisions

### Folder Structure (key folders in `src/`)
\`\`\`
src/
  app/            # Next.js App Router pages
  components/     # Reusable UI components
  context/        # React context (e.g., for dark mode or form state)
  lib/            # Utilities like Supabase and Redis clients
  types/          # Global TypeScript types
  utils/          # Helper functions
\`\`\`

### Key Design Principles
- **App Router**: Modern routing pattern with co-located layouts and loading states
- **Atomic Components**: Reusable UI components with Tailwind + MUI when appropriate
- **Form as Config**: Signup forms are generated dynamically via config objects (`signUpFormContent`)
- **Typed End-to-End**: Zod + TypeScript for runtime + compile-time validation
- **A11y First**: ARIA labels, keyboard navigation, and accessible form design
- **Animation**: Framer Motion and GSAP provide smooth entrance effects and scroll animations

---

## ✅ Functional Requirements

- Users can view and register for volleyball programs
- Responsive layout across mobile, tablet, and desktop
- Form submission includes:
  - Field validation
  - Google reCAPTCHA
  - Submission to Supabase DB
  - Email confirmation via Resend
- Admin can view submitted data (planned)
- Rate-limiting with Redis (planned)

---

## 📏 Non-Functional Requirements

- ⚡ **Performance**: Optimized images, lazy loading, code splitting via App Router
- 🔐 **Security**: Uses service role key server-side only; reCAPTCHA protects submissions
- 🧪 **Test Coverage**: Jest unit tests for components and form logic
- 📱 **Responsive Design**: Fully mobile-friendly layout with accessible touch targets
- 🌍 **Deployment Ready**: Auto-deploys via Vercel preview branches (`main`, `dev`)

---

## 🧪 Testing Strategy

- `__tests__/` contains unit tests for form logic, components, and animation behavior
- Mocks for `framer-motion`, `react-google-recaptcha`, and IntersectionObserver
- Coverage tracked via `jest --coverage`
Note: Test-Driven Development (TDD) was not used in this project. Early stages involved frequent requirement changes and rapid prototyping (POCs), so testing was approached iteratively rather than upfront. As features stabilized, unit tests were added for core logic and components. Future improvements include expanding test coverage and adopting integration/E2E testing.
---

## 🛠️ Future Improvements

- Admin dashboard with Supabase Row Level Security (RLS)
- Rate-limiting using Upstash Redis
- Enhanced mobile animations
- Integration tests with Cypress
- Analytics and SEO improvements
- Email list opt-in for promotions

---

## 📄 License

This project is proprietary to Big Sand Volleyball Club.
