export const metadata = {
  title: "Contact Us - Lavish Whim | Get in Touch | Customer Support",
  description: "Contact Lavish Whim for inquiries, support, or assistance. Reach us via phone (+92) 327 4952566, email lavishwhim@gmail.com, or connect with us on social media. We're here to help with your fashion and shopping needs.",
  keywords: [
    "contact Lavish Whim",
    "Lavish Whim customer support",
    "Lavish Whim phone number",
    "Lavish Whim email",
    "Pakistani fashion contact",
    "online shopping support",
    "fashion brand contact",
    "customer service",
    "Lavish Whim inquiries",
    "get in touch",
    "Lavish Whim social media"
  ],
  authors: [{ name: "Lavish Whim" }],
  creator: "Lavish Whim",
  publisher: "Lavish Whim",
  openGraph: {
    title: "Contact Us - Lavish Whim | Get in Touch",
    description: "Contact Lavish Whim for inquiries, support, or assistance. Reach us via phone, email, or social media. We're here to help.",
    url: "https://lavishwhim.com/contact-lavish-whim",
    siteName: "Lavish Whim",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Contact Lavish Whim - Get in Touch",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - Lavish Whim | Get in Touch",
    description: "Contact Lavish Whim for inquiries, support, or assistance. Reach us via phone, email, or social media.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/contact-lavish-whim",
  },
};

export default function ContactLayout({ children }) {
  return children;
}

