import SectionHead1 from "app/ui/components/main-heading";

export default function Page(){
      return (
            <div className="container flex flex-col items-center py-10 gap-10">
                  <SectionHead1 className=''>Welcome To Lavish Whim Portal</SectionHead1>
                  <div className="flex flex-col gap-3 w-[30vw] p-6 border border-neutral-200 shadow-md shadow-black/10 rounded-md">
                        <div className="flex flex-col gap-1">
                              <label htmlFor="username" className="font-bold">Username</label>
                              <input type="text" name="username" id="username" className="px-2 py-1 bg-neutral-100 rounded-md border" placeholder="Username..."/>
                        </div>
                        <div className="flex flex-col gap-1">
                              <label htmlFor="password" className="font-bold">Password</label>
                              <input type="password" name="password" id="password" className="px-2 py-1 bg-neutral-100 rounded-md border" placeholder="Username..."/>
                        </div>
                        <button className="w-fit mt-2 mx-auto bg-black text-white py-2 px-5 rounded-sm hover:bg-white hover:text-black border border-black transition-all ease-in-out duration-300">Login</button>
                  </div>
            </div>
      )
}