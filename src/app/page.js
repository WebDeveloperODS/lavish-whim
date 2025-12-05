import FeaturedProducts from "./ui/home/featured-products";
import SlideShow from "./ui/home/slide-show";
import BlackVideo from "./ui/home/black-video";
import CategoriesList from './ui/home/categories-list'
// import WelcomePopUp from './ui/home/welcome-pop-up'

export const metadata = {
  title: "Lavish Whim - Premium Pakistani Fashion & Accessories | Online Shopping",
  description: "Discover premium Pakistani fashion at Lavish Whim. Shop exquisite handbags, shoulder bags, crossbody bags, tote bags, and more. Quality craftsmanship meets contemporary style. Your trusted online destination for premium accessories.",
  keywords: [
    "Lavish Whim",
    "Pakistani fashion",
    "premium handbags",
    "women's bags",
    "Pakistani accessories",
    "online shopping Pakistan",
    "handmade bags",
    "bridal bags",
    "canvas bags",
    "tote bags",
    "shoulder bags",
    "crossbody bags",
    "crochet bags",
    "quality fashion",
    "Pakistani brand"
  ],
  authors: [{ name: "Lavish Whim" }],
  creator: "Lavish Whim",
  publisher: "Lavish Whim",
  openGraph: {
    title: "Lavish Whim - Premium Pakistani Fashion & Accessories",
    description: "Shop premium Pakistani fashion accessories including handbags, shoulder bags, and more. Quality craftsmanship meets contemporary style.",
    url: "https://lavishwhim.com",
    siteName: "Lavish Whim",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Lavish Whim - Premium Pakistani Fashion",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lavish Whim - Premium Pakistani Fashion & Accessories",
    description: "Shop premium Pakistani fashion accessories. Quality craftsmanship meets contemporary style.",
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
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      {/* <WelcomePopUp /> */}
      <SlideShow />
      <FeaturedProducts />
      <BlackVideo />
      <CategoriesList />
    </>
  );
}