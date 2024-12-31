import { SignIn, SignUp } from '@clerk/clerk-react'
import React from 'react'

const Signup = () => {
  return (
    <>
    <div className='w-full min-h-screen flex items-center bg-white'>
    
    <div className='sm:w-full md:w-1/2 h-screen flex justify-center items-center'><SignUp/></div>
    <div className=' sm: hidden md:block h-screen'><img className='h-full' src="https://tallkizetxyhcvjujgzw.supabase.co/storage/v1/object/public/uploads/Image%20(2).png"/></div>
    
    </div>
    </>
  )
}

export default Signup