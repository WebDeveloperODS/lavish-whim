'use client'
import React, { useEffect, useState } from 'react'

const SignUpForm = () => {
      const [userdata, setUserdata] = useState({
      username: '',
      fullname: '',
      password: '',
      email: '',
      contactNumber: '',
      });

      const [verifyPassword, setVerifyPassword] = useState('');
      const [passwordError, setPasswordError] = useState(false);
      const [isSubmitting, setIsSubmitting] = useState(false); // optional: prevent double submit

      // Handle registration form submit
      const handleNewUserCreation = async (e) => {
      e.preventDefault();

      if (userdata.password !== verifyPassword) {
            setPasswordError(true);
            return;
      }

      setIsSubmitting(true);

      try {
            const response = await fetch('/api/database/user/new-user-creation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userdata), // Fixed: was sending undefined 'data'
            });

            if (!response.ok) throw new Error('Failed to create user');

            const result = await response.json();
            console.log('New User Created:', result);

            // Optional: Reset form on success
            setUserdata({
            username: '',
            fullname: '',
            password: '',
            email: '',
            contactNumber: '',
            });
            setVerifyPassword('');
            alert('Account created successfully!');
      } catch (error) {
            console.error('Error creating user:', error);
            alert('Failed to create account. Please try again.');
      } finally {
            setIsSubmitting(false);
      }
      };

      useEffect(() => {
            if (verifyPassword && userdata.password) {
                  setPasswordError(verifyPassword !== userdata.password);
            } else {
                  setPasswordError(false);
            }
      }, [verifyPassword, userdata.password]);
      return (
      <form onSubmit={handleNewUserCreation} className="w-full p-8 border border-neutral-200 shadow-md shadow-black/10 rounded-md grid grid-cols-2 gap-6 bg-white">
            <h2 className="col-span-2 text-2xl font-bold text-center mb-4">Create Account</h2>

            <div className="flex flex-col gap-1">
                  <label htmlFor="username_creation" className="font-bold">
                        Username <span className="text-xs font-normal text-gray-600">(Must be unique)</span>
                  </label>
                  <input required type="text" id="username_creation" value={userdata.username} onChange={(e) => setUserdata(prev => ({ ...prev, username: e.target.value }))} className="px-3 py-2 bg-neutral-100 rounded-md border focus:outline-none focus:border-black" placeholder="Enter username" />
            </div>

            <div className="flex flex-col gap-1">
                  <label htmlFor="fullname" className="font-bold">Full Name</label>
                  <input required type="text" id="fullname" value={userdata.fullname} onChange={(e) => setUserdata(prev => ({ ...prev, fullname: e.target.value }))} className="px-3 py-2 bg-neutral-100 rounded-md border focus:outline-none focus:border-black" placeholder="John Doe" />
            </div>

            <div className="flex flex-col gap-1">
            <label htmlFor="contactNumber" className="font-bold">Contact Number</label>
            <input required type="tel" id="contactNumber" value={userdata.contactNumber} onChange={(e) => setUserdata(prev => ({ ...prev, contactNumber: e.target.value }))} className="px-3 py-2 bg-neutral-100 rounded-md border focus:outline-none focus:border-black" placeholder="+1234567890" />
            </div>

            <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-bold">Email</label>
            <input required type="email" id="email" value={userdata.email} onChange={(e) => setUserdata(prev => ({ ...prev, email: e.target.value }))} className="px-3 py-2 bg-neutral-100 rounded-md border focus:outline-none focus:border-black" placeholder="you@example.com" />
            </div>

            <div className="flex flex-col gap-1">
            <label htmlFor="password_creation" className="font-bold">Password</label>
            <input required type="password" id="password_creation" value={userdata.password} onChange={(e) => setUserdata(prev => ({ ...prev, password: e.target.value }))} className="px-3 py-2 bg-neutral-100 rounded-md border focus:outline-none focus:border-black" placeholder="••••••••"/>
            </div>

            <div className="flex flex-col gap-1">
            <label htmlFor="re-password" className="font-bold">Confirm Password</label>
            <input required type="password" id="re-password" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} className="px-3 py-2 bg-neutral-100 rounded-md border focus:outline-none focus:border-black" placeholder="Retype password"/>
            {passwordError && (
                  <span className="text-sm text-red-600">Passwords do not match</span>
            )}
            </div>

            <button type="submit" disabled={isSubmitting || passwordError} className="col-span-2 mx-auto px-8 py-3 bg-black text-white font-semibold rounded-sm hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all" >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
      </form>
  )
}

export default SignUpForm