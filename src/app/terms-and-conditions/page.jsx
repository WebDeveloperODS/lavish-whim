import PoliciesDisplay from "app/ui/components/policies-display";

export default function Page(){
      const Policies = {
            title: 'Terms & Conditions',
            welcomeMsg: `Welcome to Lavish Whim, your premier destination for online fashion accessories and apparel in Pakistan. By using the lavishwhim.com website, you agree to these comprehensive Terms & Conditions, which govern your experience with our secure online store. Please read them carefully before placing an order.`,
            "points": [
                  {
                        "heading": "General Usage and Account Terms",
                        "childPoints": [
                        <><b>Acceptance:</b> By accessing or making a purchase on this website, you confirm your acceptance of these legally binding terms.</>,
                        <><b>Eligibility:</b> You must be over 18 or possess parental consent to conduct <b>online shopping in Pakistan</b> with Lavish Whim.</>,
                        <><b>Site Updates:</b> We reserve the right to update or change these terms at any time. We encourage regular review for the best <b>online shopping experience.</b></>
                        ]
                  },
                  {
                        "heading": "Ordering, Pricing, and Payment",
                        "childPoints": [
                        <><b>Order Confirmation:</b> All orders placed through Lavish Whim are subject to acceptance and product availability. An order is confirmed only upon receipt of our official confirmation email.</>,
                        <><b>Pricing:</b> All product prices are listed in <b>PKR</b> (Pakistani Rupees). We reserve the right to correct any pricing errors and will notify you promptly if this affects your purchase.</>,
                        <><b>Cancellation Policy:</b> For efficient service, orders can only be cancelled <b>within 24 hours</b> of placement, provided the item has not yet been processed for <b>fast shipping Pakistan.</b></>
                        ]
                  },
                  {
                        "heading": "Intellectual Property (IP) and Content",
                        "childPoints": [
                        <>The entire content of lavishwhim.com, including images, branding, and product descriptions related to <b>Pakistani fashion</b>, is the exclusive property of Lavish Whim and protected by intellectual property laws.</>
                        ]
                  },
                  {
                        "heading": "Liability and Governing Law",
                        "childPoints": [
                        <>Lavish Whim maintains high standards, but our liability for any product purchased is limited to the purchase price of that item. These Terms are governed by the laws of Pakistan, supporting your trust in our <b>local online store.</b></>
                        ]
                  }
            ]
      }

      return(
            <PoliciesDisplay policies={Policies}/>
      )
}