'use client';

import SectionHead1 from "app/ui/components/main-heading";
import { signIn } from "next-auth/react";   // <- use next-auth/react on client
import { useState } from "react";

export default function Page() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async () => {
    await signIn('credentials', {
      redirect: true,
      callbackUrl: '/portal/dashboard',
      username,
      password
    });
  };

  return (
    <div className="container flex flex-col items-center py-10 gap-10">
      <SectionHead1>Welcome To Lavish Whim Portal</SectionHead1>

      <div className="flex flex-col gap-3 w-[30vw] p-6 border border-neutral-200 shadow-md rounded-md">
        <h2 className="text-xl font-bold text-center mb-4">Login</h2>

        <label>Username</label>
        <input className='px-2 py-1 rounded-md' value={username} onChange={e => setUsername(e.target.value)} />

        <label>Password</label>
        <input className='px-2 py-1 rounded-md' type="password" value={password} onChange={e => setPassword(e.target.value)} />

        <button onClick={loginUser} className="mt-4 bg-black text-white py-2 px-5 rounded-sm">
          Login
        </button>
      </div>
    </div>
  );
}
