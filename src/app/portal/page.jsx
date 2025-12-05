'use client';

import SectionHead1 from "app/ui/components/main-heading";
import { signIn } from "next-auth/react";   // <- use next-auth/react on client
import { useState } from "react";

export default function Page() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault()
    await signIn('credentials', {
      redirect: true,
      callbackUrl: '/portal/dashboard',
      username,
      password
    });
  };

  return (
    <div className="container flex flex-col items-center py-10 gap-10">
      <SectionHead1 className={'font-bold uppercase tracking-wider underline underline-offset-4 decoration-3 decoration-red-700'}>Welcome To Lavish Whim Portal</SectionHead1>

      <form onSubmit={loginUser} className="flex flex-col gap-3 w-[30vw] p-6 border border-neutral-200 shadow-md rounded-md">
        <h2 className="text-xl font-bold text-center mb-4">Login</h2>
        <div className="flex flex-col gap-1">
          <label>Username</label>
          <input className='px-2 bg-gray-100 py-1 rounded-md border' value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div className="flex flex-col gap-1">
          <label>Password</label>
          <input className='px-2 bg-gray-100 py-1 rounded-md border' type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="mt-4 bg-black text-white py-2 px-5 rounded-sm">
          Login
        </button>
      </form>
    </div>
  );
}
