import PoliciesDisplay from "app/ui/components/policies-display";

export default function Page(){
      const Policies = {
            title: 'Terms & Conditions',
            welcomeMsg: 'Welcome to Lavish Whim. By purchasing our products or using our services, you agree to the following Terms & Conditions. Please review them carefully.',
            "points": [
                  {
                        "heading": "General",
                        "childPoints": [
                        "These Terms & Conditions apply to all purchases made through Lavish Whim’s official sales channels, including our website, social media pages, WhatsApp, and phone orders.",
                        "By placing an order, the customer acknowledges and accepts these Terms & Conditions.",
                        "Lavish Whim reserves the right to update or modify these Terms & Conditions at any time without prior notice."
                        ]
                  },
                  {
                        "heading": "Products",
                        "childPoints": [
                        "All handbags are offered subject to availability.",
                        "Actual product colors may vary slightly due to lighting, photography, or screen display differences.",
                        "Product descriptions are provided with care; however, minor variations may occur."
                        ]
                  },
                  {
                        "heading": "Pricing & Payments",
                        "childPoints": [
                        "All prices are listed in Pakistani Rupees (PKR).",
                        "Prices may change without notice due to market fluctuations.",
                        "Accepted payment methods include Cash on Delivery (COD), bank transfer, EasyPaisa, JazzCash, and others where applicable.",
                        "Advance payment may be required for high-value or customized orders."
                        ]
                  },
                  {
                        "heading": "Order Process",
                        "childPoints": [
                        "Customers are responsible for providing accurate details (name, contact number, and address).",
                        "Orders are confirmed via WhatsApp, phone, or email before dispatch.",
                        "Lavish Whim reserves the right to cancel orders submitted with incomplete or misleading information."
                        ]
                  },
                  {
                        "heading": "Shipping & Delivery",
                        "childPoints": [
                        "We deliver nationwide through reliable courier partners.",
                        "Estimated delivery time is 3–7 working days depending on the destination.",
                        "Delays caused by couriers, weather, strikes, or unforeseen circumstances are beyond our control.",
                        "Customers must ensure someone is available to receive the parcel at the provided address."
                        ]
                  },
                  {
                        "heading": "Delivery Charges",
                        "childPoints": [
                        "Standard delivery charges apply based on parcel size, weight, and location.",
                        "Delivery charges are non-refundable under all circumstances."
                        ]
                  },
                  {
                        "heading": "Returns & Exchange Policy",
                        "childPoints": [
                        "Customers should check their parcel at the time of delivery.",
                        "Exchange is offered only in cases of manufacturing defects or incorrect items delivered.",
                        "Exchange requests must be made within 48 hours of receiving the product.",
                        "Products must be unused, undamaged, and returned in original packaging.",
                        "Return shipping costs are the customer’s responsibility unless Lavish Whim made the error."
                        ]
                  },
                  {
                        "heading": "Cancellation Policy",
                        "childPoints": [
                        "Orders may be canceled before dispatch without charges.",
                        "Orders cannot be canceled once they have been dispatched."
                        ]
                  },
                  {
                        "heading": "Customized / Special Orders",
                        "childPoints": [
                        "Customized handbag orders require partial or full advance payment.",
                        "Customized or special orders are non-cancellable and non-refundable."
                        ]
                  },
                  {
                        "heading": "Product Care",
                        "childPoints": [
                        "Customers should follow the care instructions provided for proper maintenance.",
                        "Lavish Whim is not responsible for damage caused by misuse, neglect, or improper storage."
                        ]
                  },
                  {
                        "heading": "Warranty",
                        "childPoints": [
                        "No formal warranty is offered unless specified for a product.",
                        "Manufacturing defects identified immediately after delivery will be resolved through exchange."
                        ]
                  },
                  {
                        "heading": "Limitation of Liability",
                        "childPoints": [
                        "Lavish Whim is not responsible for courier delays, lost parcels, or mishandling (assistance in tracking will be provided).",
                        "We are not responsible for incorrect delivery details provided by the customer.",
                        "We are not liable for damage occurring after the product has been delivered."
                        ]
                  },
                  {
                        "heading": "Privacy Policy",
                        "childPoints": [
                        "Customer information is collected solely for processing and delivering orders.",
                        "Lavish Whim does not sell, share, or misuse customer data."
                        ]
                  },
                  {
                        "heading": "Fraudulent Orders",
                        "childPoints": [
                        "Fake or fraudulent orders will be reported to relevant authorities.",
                        "Lavish Whim reserves the right to block such customers from future purchases."
                        ]
                  },
                  {
                        "heading": "Promotions & Discounts",
                        "childPoints": [
                        "All promotions and discounts are valid for a limited time only.",
                        "Discounts cannot be combined unless explicitly stated.",
                        "Promotional or discounted items may not qualify for return or exchange."
                        ]
                  },
                  {
                        "heading": "Intellectual Property",
                        "childPoints": [
                        "All logos, images, content, and product designs belong to Lavish Whim.",
                        "Unauthorized use or reproduction of any content is strictly prohibited."
                        ]
                  },
                  {
                        "heading": "Customer Responsibilities",
                        "childPoints": [
                        "Customers must provide accurate delivery information.",
                        "Customers should inspect the product upon delivery.",
                        "By placing an order, customers agree to comply with these Terms & Conditions."
                        ]
                  },
                  {
                        "heading": "Force Majeure",
                        "childPoints": [
                        "Lavish Whim is not liable for delays or non-delivery caused by events beyond our control, such as natural disasters, strikes, or political unrest."
                        ]
                  },
                  {
                        "heading": "Governing Law",
                        "childPoints": [
                        "All transactions are governed by the laws of Pakistan.",
                        "Any disputes will fall under the jurisdiction of Pakistani courts."
                        ]
                  }
            ]
      }

      return(
            <PoliciesDisplay policies={Policies}/>
      )
}