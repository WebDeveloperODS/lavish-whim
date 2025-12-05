import SectionHead2 from "app/ui/components/heading-two";
import SignUpForm from "app/ui/components/portal/sign-up-form";

export default function Page(){
      return <div className="container flex flex-col gap-3">
            <SectionHead2 className={'font-bold tracking-wide underline underline-offset-3 decoration-2 decoration-red-700'}>To Add New Product</SectionHead2>
            <SignUpForm />
      </div>
}