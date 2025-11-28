import PoliciesDisplayTwo from "app/ui/components/policies-display-2";

export default function Page(){
      const Policies = {
            title: 'Return Policy - Easy 14-Day Returns for Online Orders',
            welcomeMsg: <><b>Lavish Whim</b> is committed to customer satisfaction, offering an <b>easy 14-day return and exchange policy</b> for all online purchases within Pakistan. Shop with confidence knowing your happiness is our priority.</>,
            "points": [
                  {
                        "heading": "The 14-Day Gaurantee",
                        "childPoints": [
                        <>We provide a <b>14-day window</b> from the date of delivery to initiate a return or exchange request for your <b>online fashion</b> purchase.</>
                        ]
                  },
                  {
                        "heading": "Return Eligibility and Conditions",
                        "subDesc": <>To ensure a smooth process for your <b>online store return</b>, all items must meet these criteria:</>,
                        "childPoints": [
                              <>
                                    <b>Original Condition:</b> Must be unworn, unwashed, and unaltered.
                              </>,
                              <>
                                    <b>Tags and Packaging:</b> All original tags must be attached, and the product must be returned in its original Lavish Whim packaging.
                              </>,
                              <>
                                    <b>Proof of Purchase:</b> A copy of the original invoice must be included.
                              </>,
                        ]
                  },
                  {
                        "heading": "Quick Return Process",
                        "childPoints": [
                              <><b>Request:</b> Contact us with your Order Number to initiate the <b>easy return.</b></>,
                              <><b>Reverse Pickup:</b> We arrange a <b>free reverse pickup</b> for defective/incorrect items. For change-of-mind returns, the customer may bear the return shipping cost.</>,
                              <><b>Resolution:</b> Upon successful quality check, we will issue a <b>Store.</b></>,
                              <><b>Resolution:</b> Upon successful quality check, we will issue a <b>Store Credit / Voucher</b> (valid for 90 days) for the item’s value, or process an exchange for a different size/item, ensuring a hassle-free experience with your <b>Pakistani online order.</b></>,
                        ]
                  },
                  {
                        "heading": "Important Notes on Returns",
                        "childPoints": [
                              <><b>Final Sale Items:</b> Please note that <b>sale and discounted items are nonreturnable.</b></>,
                              <><b>Exchanges:</b> Exchanges are subject to the stock availability in our <b>online store.</b></>
                        ]
                  }
            ]
      }

      return(
            <PoliciesDisplayTwo policies={Policies}/>
      )
}