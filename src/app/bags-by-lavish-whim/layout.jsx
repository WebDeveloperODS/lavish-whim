export const metadata = {
  title: "Bags Collection - Lavish Whim | Premium Handbags, Shoulder Bags & More",
  description: "Explore our premium bags collection at Lavish Whim. Shop handbags, shoulder bags, crossbody bags, tote bags, canvas bags, bridal bags, and handmade crochet bags. Quality Pakistani fashion accessories with contemporary style.",
  keywords: [
    "bags collection",
    "women's handbags",
    "shoulder bags",
    "crossbody bags",
    "tote bags",
    "canvas bags",
    "bridal bags",
    "handmade crochet bags",
    "Pakistani bags",
    "premium handbags",
    "designer bags",
    "fashion bags",
    "Lavish Whim bags",
    "online bags shopping"
  ],
  authors: [{ name: "Lavish Whim" }],
  creator: "Lavish Whim",
  publisher: "Lavish Whim",
  openGraph: {
    title: "Bags Collection - Lavish Whim | Premium Handbags & Accessories",
    description: "Shop premium bags collection including handbags, shoulder bags, crossbody bags, tote bags, and more. Quality Pakistani fashion with contemporary style.",
    url: "https://lavishwhim.com/bags-by-lavish-whim",
    siteName: "Lavish Whim",
    images: [
      {
        url: "/images/products/bags/menu-bag-drop.jpg",
        width: 1200,
        height: 630,
        alt: "Lavish Whim Bags Collection - Premium Handbags & Accessories",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bags Collection - Lavish Whim | Premium Handbags & Accessories",
    description: "Shop premium bags collection. Quality Pakistani fashion with contemporary style.",
    images: ["/images/products/bags/menu-bag-drop.jpg"],
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
    canonical: "/bags-by-lavish-whim",
  },
};

export default function BagsLayout({ children }) {
  return children;
}

