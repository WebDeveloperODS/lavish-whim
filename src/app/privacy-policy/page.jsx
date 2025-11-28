import PoliciesDisplayTwo from "app/ui/components/policies-display-2";

export default function Page(){
      const Policies = {
            title: 'Privacy Policy - Secure Online Shopping at Lavish Whim',
            welcomeMsg: <>Your trust is essential. This Privacy Policy details how <b>Lavish Whim</b> protects the personal information collected during your <b>secure online shopping</b> experience on <b><u>lavishwhim.com</u></b>.</>,
            "points": [
                  {
                        "heading": "Data Collection Commitment",
                        "subDesc": <>Wecollect information strictly necessary to process your orders, facilitate <b>fast shipping Pakistan</b>, and improve our customer service. This includes:</>,
                        "childPoints": [
                        <>Contact details (Name, Email, Phone Number) Shipping/Billing Addresses</>,
                        <>Non-personal data (IP address, browser information) for optimizing our <b>online store</b>.</>
                        ]
                  },
                  {
                        "heading": "How Your Data is Used", "subDesc": "Your information is used to:",
                        "childPoints": [
                              <>
                                    Fulfill and manage your online orders.
                              </>,
                              <>
                                    Provide customer support and manage exchanges/returns.
                              </>,
                              <>
                                    Improve our product selection and <b>Pakistani fashion</b> offerings.
                              </>,
                              <>
                                    Send you promotional updates (you may easily opt-out at any time).
                              </>
                        ]
                  },{
                        "heading":"Data Security and Sharing",
                        "childPoints":[
                              <>
                              Lavish Whim guarantees a secure <b>online store environment</b>. Your data is protected using high-level security protocols. We affirm that your personal information is <b>never sold, rented, or shared</b> with external marketing companies.
                              </>
                        ]
                  },{
                        "heading":"Opt-Out and Rights",
                        "childPoints":[
                              <>
                              You have the right to request details of the personal information we hold or to optout of our marketing communications, ensuring you maintain control over your online shopping privacy.
                              </>
                        ]
                  }
            ]
      }

      return(
            <PoliciesDisplayTwo policies={Policies}/>
      )
}