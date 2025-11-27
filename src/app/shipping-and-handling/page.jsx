import PoliciesDisplay from "app/ui/components/policies-display";

export default function Page(){
      const Policies = {
            title: 'Shipping & Handling - Fast Delivery Across Pakistan',
            welcomeMsg: <>At <b>Lavish Whim</b>, we prioritize getting your <b>Pakistani fashion</b> purchases to you quickly and reliably. Our goal is to provide <b>fast shipping across Pakistan</b> with clear, competitive rates.</>,
            "points": [
                  {
                        "heading": "Domestic Delivery (Pakistan)",
                        "childPoints": [
                        <><b>Free Shipping Offer:</b> Enjoy <b>Free Standard Shipping</b> on all online orders.</>,
                        <><b>Estimated Delivery Time:</b> We aim for dispatch and delivery within <b>{`3–5 working days`}</b> to most major cities in Pakistan. Please note that delivery times maybelonger for remote regions.<b>online shopping in Pakistan</b> with Lavish Whim.</>,
                        <><b>Reliable Courier Network:</b> We utilize trusted and established domestic courier partners, including <b>PostEx, TCS, Leopard, Trax, MoveX</b> etc ensuring <b>secure and reliable online delivery.</b></>,
                        <><b>Tracking Your Order:</b> Enhance your <b>online shopping experience</b> with realtime tracking. A unique tracking ID will be emailed to you immediately upon shipment.</>
                        ]
                  },
                  {
                        "heading": "International Shipping Options",
                        "childPoints": [
                              <>
                                    Lavish Whim is proud to deliver <b>Pakistani craftsmanship</b> globally. Costs are calculated based on weight and destination and are clearly displayed at checkout. Note that customers are responsible for all international customs duties and local import taxes.
                              </>
                        ]
                  },
                  {
                        "heading": "Important Notice",
                        "childPoints": [
                        <>Please be aware that we maintain a <b>No Open Delivery</b> policy for security and product integrity.</>
                        ]
                  }
            ]
      }

      return(
            <PoliciesDisplay policies={Policies}/>
      )
}