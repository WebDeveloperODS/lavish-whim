import CraftsmanshipWithConfidence from "app/ui/about/craftsmanship";
import FAQs from "app/ui/about/frequently-asked-questions";
import OurVision from "app/ui/about/our-vision";
import AboutIntro from "app/ui/about/section-1";
import ShopWithConfidence from "app/ui/about/shop-with-confidence";

export const metadata = {
  title: "About Lavish Whim - The Home of Quality Pakistani Fashion | Our Story & Vision",
  description: "Learn about Lavish Whim, a proud Pakistani brand dedicated to premium accessories and contemporary fashion. Discover our vision, craftsmanship, quality assurance, and commitment to showcasing exceptional Pakistani artistry. Shop with confidence.",
  keywords: [
    "About Lavish Whim",
    "Pakistani fashion brand",
    "quality Pakistani fashion",
    "Pakistani accessories",
    "Pakistani craftsmanship",
    "online fashion store Pakistan",
    "premium Pakistani brands",
    "Pakistani fashion quality",
    "Lavish Whim story",
    "Pakistani artisans",
    "quality assurance",
    "Pakistani fashion vision"
  ],
  authors: [{ name: "Lavish Whim" }],
  creator: "Lavish Whim",
  publisher: "Lavish Whim",
  openGraph: {
    title: "About Lavish Whim - The Home of Quality Pakistani Fashion",
    description: "Learn about Lavish Whim, a proud Pakistani brand dedicated to premium accessories and contemporary fashion. Discover our vision and craftsmanship.",
    url: "https://lavishwhim.com/about-lavish-whim",
    siteName: "Lavish Whim",
    images: [
      {
        url: "/images/about-us/1.jpg",
        width: 1200,
        height: 630,
        alt: "About Lavish Whim - The Home of Quality Pakistani Fashion",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Lavish Whim - The Home of Quality Pakistani Fashion",
    description: "Learn about Lavish Whim, a proud Pakistani brand dedicated to premium accessories and contemporary fashion.",
    images: ["/images/about-us/1.jpg"],
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
    canonical: "/about-lavish-whim",
  },
};

export default function Page(){
      return <div className="container">
            <AboutIntro />
            <OurVision />
            <CraftsmanshipWithConfidence />
            <ShopWithConfidence />
            <FAQs />
      </div>
}