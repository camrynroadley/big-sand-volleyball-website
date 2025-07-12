import { ContactContent } from "./contactContent";

export const metadata = {
  title: "Contact | Big Sand Volleyball Club",
  description: "Contact information for our club",
  openGraph: {
    title: "Contact | Big Sand Volleyball Club",
    description: "Contact information for our club",
    url: "https://bigsandvolleyball.com/contact",
    siteName: "Big Sand Volleyball Club",
    images: [
      {
        url: "/og_image.jpg",
        width: 400,
        height: 530,
        alt: "Big Sand Volleyball",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Big Sand Volleyball Club",
    description: "Contact information for our club",
    images: ["/og-image.jpg"],
  },
};

const ContactPage = () => {
  return (
    <>
      <main
        className="flex-grow flex items-center justify-center px-4 text-black tracking-tight"
        role="main"
        aria-label="Contact Page"
      >
       <ContactContent />
      </main>
    </>
  );
};

export default ContactPage;
