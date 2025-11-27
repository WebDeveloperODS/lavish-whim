import CraftsmanshipWithConfidence from "app/ui/about/craftsmanship";
import FAQs from "app/ui/about/frequently-asked-questions";
import OurVision from "app/ui/about/our-vision";
import AboutIntro from "app/ui/about/section-1";
import ShopWithConfidence from "app/ui/about/shop-with-confidence";

export default function Page(){
      return <div className="container">
            <AboutIntro />
            <OurVision />
            <CraftsmanshipWithConfidence />
            <ShopWithConfidence />
            <FAQs />
      </div>
}