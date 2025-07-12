# Big Sand Volleyball Club Website

A modern, secure, and accessible website for **Big Sand Volleyball Club**, built with the **Next.js App Router**, React, Tailwind CSS, and TypeScript. The site enables users to browse \*\*programs \*\* and register via dynamic **forms.**

Hosted on **Vercel**, with **Supabase** as the backend database, and **Upstash Redis** for rate limiting. This project demonstrates end-to-end typing, security practices, and production-grade performance.

---

## 🏐 Live Site

[Big Sand Volleyball Winnipeg](https://bigsandvolleyballwinnipeg.com)

---

## 📕 Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Framer Motion, Aceternity UI
- **Forms**: react-hook-form + Zod for validation
- **Backend**: Supabase (PostgreSQL), server-side data fetching
- **Rate Limiting**: Upstash Redis (IP-based)
- **Security**: Google reCAPTCHA, Honeypot fields, Supabase service role key (server only)
- **Testing**: Jest, React Testing Library
- **Deployment**: Vercel (Preview + Production environments)
- **AI**: ChatGPT-assisted prototyping for faster iteration

---

## 📐 Architecture & Design Decisions

### Folder Structure Highlights

```ts
src/
  api/            // Server-side routes for Supabase, reCAPTCHA
  app/            // App Router structure (layouts, pages, routing)
  components/     // Reusable and page-specific UI components
  context/        // Shared React context (e.g. programs)
  lib/            // Redis client, utility functions
  types/          // Global app types
  utils/          // Supabase setup
```

### Key Principles

1. **App Router First**: Uses Next.js App Router with server actions and static generation
2. **Dynamic Form Rendering**: Form fields generated from a config object (`formContent`)
3. **Validation Shared Across Stack**: Zod schemas used client-side and server-side
4. **Accessibility-First**: ARIA labels, field error messages
5. **Animations**: Scroll and transition animations using Framer Motion
6. **Security by Design**: All public APIs are protected with reCAPTCHA, honeypot, and Redis-based rate limiting

---

## 📌 Functional Requirements

1. **Home Page** introduces the club and provides mailing list sign-up
2. **About Page** describes values and coaching philosophy, mailing list sign-up
3. **Dynamic Program Pages** for specific volleyball programs with:
   - Fully validated registration form, including:
     - Required field and format checks (Zod + react-hook-form)
     - Google reCAPTCHA (server-verified)
     - Honeypot anti-spam input
     - IP-based rate limiting (Upstash Redis)
     - Secure server-side Supabase insert using service role key
     - Success/error feedback with animations

---

## 📏 Non-Functional Requirements

1. **Security**:
   - All secrets stored server-side (service keys, reCAPTCHA)
   - CSP and strict HTTP headers
2. **Accessibility**: Field-level error messages, screen reader-friendly
3. **CI/CD**: Vercel previews for `main` and `dev` branches
4. **Responsiveness**: Mobile-first layout with flexible grid and adaptive text
5. **SEO**: Metadata and structured page hierarchy

## 🔐 Security Considerations

1. **Bot Protection**: Google reCAPTCHA + honeypot field
2. **Rate Limiting**: IP-based throttling via Upstash Redis
3. **Sensitive Data Handling**: reCAPTCHA secret and Supabase service key never exposed to client
4. **Form Integrity**: All form data re-validated with Zod on the server
5. **Secure Headers**: `Content-Security-Policy`, `Strict-Transport-Security`, `Referrer-Policy`
6. **HTTPS**: Enforced by Vercel and Supabase

---

## 🔴 Sign-Up Form Request Flow

1. User fills out and submits registration form
2. Client performs initial Zod validation
3. Google reCAPTCHA token is generated
4. API route:
   - Verifies token with Google
   - Re-validates input with Zod
   - Applies Redis-based rate limiting
   - Inserts into Supabase using a server-only key
5. User receives success or error response

---

## ⌨️ Testing Strategy

- Unit tests in `__tests__/`
  - Form validation
  - Component rendering (BlurText, Hero, etc.)
  - Animation logic with mocked `framer-motion`
- Rate limiter logic tested with mocked Redis client
- Jest coverage configured for `components/`, `lib/`, and `app/`
- *Note:* Due to evolving requirements, early development prioritized flexibility over **TDD**. Unit testing adopted iteratively as features stabilized.

---

## 🚀 Remaining Work / Future Improvements

- Email notifications via Resend on new sign-ups
- Google Sheets syncing (client is non-technical and would prefer to view via Google Sheets)
- Performance improvements through image optimization, lazy loading, code splitting
- End-to-end tests using Cypress
- Improved unit test coverage
- Smoother mobile animations and interactions
- Performance optimizations through lazy imports

---

## 📄 License

This project is proprietary and maintained by **Big Sand Volleyball Club**. Unauthorized use or reproduction is prohibited.

