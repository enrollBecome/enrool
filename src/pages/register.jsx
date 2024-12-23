import { SignIn } from '@clerk/clerk-react'
import React from 'react'

const Register = () => {
  return (
    <>
    <div className='w-full min-h-screen p-32 flex items-center bg-slate-300'>
    <SignIn/>
    </div>
    </>
  )
}

export default Register