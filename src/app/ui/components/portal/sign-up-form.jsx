'use client'
import { Asterisk } from 'lucide-react'
import React, { useEffect, useState, useRef } from 'react'

const SignUpForm = () => {
      const [presentUsernames, setPresentUsernames] = useState(null)
      const [userdata, setUserdata] = useState({
      username: '',
      fullname: '',
      password: '',
      email: '',
      contactNumber: '',
      })
      const [verifyPassword, setVerifyPassword] = useState('')
      const [passwordError, setPasswordError] = useState(false)
      const [isSubmitting, setIsSubmitting] = useState(false)
      const [usernameError, setUsernameError] = useState(false)
      const usernameTimeoutRef = useRef(null)

      useEffect(() => {
      async function fetchUsernames() {
            const res = await fetch('/api/database/user/get-all-usernames', { method: 'GET' })
            const data = await res.json()
            setPresentUsernames(data)
      }
      fetchUsernames()
      }, [])

      useEffect(() => {
      if (verifyPassword && userdata.password) {
            setPasswordError(verifyPassword !== userdata.password)
      } else {
            setPasswordError(false)
      }
      }, [verifyPassword, userdata.password])

      const handleUsernameChange = (e) => {
            const value = e.target.value
            setUserdata(prev => ({ ...prev, username: value }))
            if (usernameTimeoutRef.current) clearTimeout(usernameTimeoutRef.current)
                  usernameTimeoutRef.current = setTimeout(() => {
                        const exists = presentUsernames?.some(u => u.username.toLowerCase() === value.toLowerCase())
                        setUsernameError(exists)
            }, 500)
      }

      const handleNewUserCreation = async (e) => {
      e.preventDefault()
      if (passwordError || usernameError) return
            setIsSubmitting(true)
            try {
                  const response = await fetch('/api/database/user/new-user-creation', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(userdata),
                  })
                  if (!response.ok) throw new Error('Failed to create user')
                  
                  if(response.ok){
                        setUserdata({ username: '', fullname: '', password: '', email: '', contactNumber: '' })
                        setVerifyPassword('')
                        alert('Account created successfully!')
                  } else {
                        alert('Failed to create account. Please try again.')
                  }
            } catch (error) {
                  console.error('Error creating user:', error)
                  alert('Failed to create account. Please try again.')
            } finally {
                  setIsSubmitting(false)
            }
      }

      return (
            <form onSubmit={handleNewUserCreation} className="w-full p-8 border border-neutral-200 shadow-md shadow-black/10 rounded-md grid grid-cols-2 gap-6 bg-white">
                  <h2 className="col-span-2 text-2xl font-bold text-center mb-4">Create Account</h2>

                  <div className="flex flex-col gap-1">
                        <label htmlFor="username_creation" className="font-bold flex items-center gap-1 relative w-fit">
                              Username <span className="text-xs font-normal text-gray-600">(Must be unique) <span className='text-red-700 font-bold uppercase'>{usernameError && <>Username already in use...</>}</span> </span> <Asterisk className='w-3 h-3 text-red-700 absolute top-0 -right-3' />
                        </label>
                        <input required type="text" id="username_creation" value={userdata.username} onChange={handleUsernameChange} className="px-3 py-2 bg-neutral-100 rounded-md border focus:outline-none focus:border-black" placeholder="Enter username" />
                  </div>

                  <div className="flex flex-col gap-1">
                        <label htmlFor="fullname" className="font-bold flex">Full Name <Asterisk className='w-3 h-3 text-red-700' /></label>
                        <input required type="text" id="fullname" value={userdata.fullname} onChange={(e) => setUserdata(prev => ({ ...prev, fullname: e.target.value }))} className="px-3 py-2 bg-neutral-100 rounded-md border focus:outline-none focus:border-black" placeholder="John Doe" />
                  </div>

                  <div className="flex flex-col gap-1">
                        <label htmlFor="contactNumber" className="font-bold flex">Contact Number <Asterisk className='w-3 h-3 text-red-700' /></label>
                        <input required type="tel" id="contactNumber" value={userdata.contactNumber} onChange={(e) => setUserdata(prev => ({ ...prev, contactNumber: e.target.value }))} className="px-3 py-2 bg-neutral-100 rounded-md border focus:outline-none focus:border-black" placeholder="+1234567890" />
                  </div>

                  <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-bold flex">Email <Asterisk className='w-3 h-3 text-red-700' /></label>
                        <input required type="email" id="email" value={userdata.email} onChange={(e) => setUserdata(prev => ({ ...prev, email: e.target.value }))} className="px-3 py-2 bg-neutral-100 rounded-md border focus:outline-none focus:border-black" placeholder="you@example.com" />
                  </div>

                  <div className="flex flex-col gap-1">
                        <label htmlFor="password_creation" className="font-bold flex">Password<Asterisk className='w-3 h-3 text-red-700' /></label>
                        <input required type="password" id="password_creation" value={userdata.password} onChange={(e) => setUserdata(prev => ({ ...prev, password: e.target.value }))} className="px-3 py-2 bg-neutral-100 rounded-md border focus:outline-none focus:border-black" placeholder="••••••••"/>
                  </div>

                  <div className="flex flex-col gap-1">
                        <label htmlFor="re-password" className="font-bold flex">Confirm Password<Asterisk className='w-3 h-3 text-red-700' /></label>
                        <input required type="password" id="re-password" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} className="px-3 py-2 bg-neutral-100 rounded-md border focus:outline-none focus:border-black" placeholder="Retype password"/>
                        {passwordError && <span className="text-sm text-red-600">Passwords do not match</span>}
                  </div>

                  <button type="submit" disabled={isSubmitting || passwordError || usernameError} className="col-span-2 mx-auto px-8 py-3 bg-black text-white font-semibold rounded-sm hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                        {isSubmitting ? 'Creating Account...' : 'Create Account'}
                  </button>
            </form>
      )
}

export default SignUpForm
