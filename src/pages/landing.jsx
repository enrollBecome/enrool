import React from 'react'

const LandingPage = () => {
  return (
    <>
    <img src="https://tallkizetxyhcvjujgzw.supabase.co/storage/v1/object/public/uploads/applicationpage.png" className='w-full'/>
    <div className='w-full flex justify-center flex-col items-center sm:py-8 md:pt-14 md:pb-5'>
        <span className='sm:text-4xl md:text-6xl sm:pt-4 md:pt-10 font-semibold seasons_regular'>Message from the Dean</span>
        <span className='py-5 text-lg poppins-regular'>Your Success is Our Success</span>
    </div>
    <div className='md:px-20 sm:p-4 flex sm:gap-4 md:gap-20 justify-center sm:flex-col sm:items-center md:flex-row'>
        <img src="https://tallkizetxyhcvjujgzw.supabase.co/storage/v1/object/public/uploads/deanimage.png" className='rounded-full md:w-[550px] md:h-[530px] sm:w-4/5' />
        <div className='sm:w-[95%] md:w-1/2 '>
        <h1 className='poppins-regular text-lg pb-6'>Dear Student,</h1>
        <p className='poppins-regular text-lg leading-normal text-justify pb-4'>
            It gives me immense pleasure to welcome you to our registration page for the {" "}
            <strong>12-month Trauma Recovery Certificate program</strong>. Here, you are taking the first significant stride towards both a transformative career and a higher level of education.
        </p>
        <p className='poppins-regular text-lg leading-normal text-justify pb-4'>
            Embarking on this journey signifies your commitment to making a meaningful difference in the lives of individuals recovering from trauma. At the <strong>Becoming Institute</strong>, we understand the importance of compassion, expertise, and dedication in the field of trauma recovery. 
            Our program is meticulously designed to equip you with the knowledge, skills, and tools necessary to become a proficient and empathetic professional in this vital area of service.
        </p>
        <p className='poppins-regular text-lg leading-normal text-justify pb-4'>
            As you navigate through the registration process, please know that our team is here to support you every step of the way. Should you have any questions or require assistance, do not hesitate to email our admissions staff at 
            <a href="mailto:hello@becominginstitute.ca" className='text-[#bc9c22] cursor-pointer'>{" "}hello@becominginstitute.ca{" "}</a>. We are dedicated to ensuring a smooth and seamless experience for all our prospective students.
        </p>
        <p className='poppins-regular text-lg leading-normal text-justify pb-10'>
            Thank you for choosing to apply to the Becoming Institute for your educational and professional aspirations. 
            We eagerly await the opportunity to welcome you into our community and to witness the incredible contributions you will make in the field of trauma recovery.
        </p>
        <div className="signature">
            <p className='poppins-regular text-lg leading-normal text-justify pb-4'>With warm regards,</p>
            <p className='text-2xl leading-10'><strong>Dr. Joan Samuels-Dennis, Ph.D</strong></p>
            <p className='text-lg leading-normal'>Dean, School of Psychotherapeutic Innovations</p>
            <p className='text-lg leading-normal'>Becoming Institute Inc</p>
            <p className='text-lg leading-normal'>Email: <a href="mailto:hello@becomingmethod.com">hello@becomingmethod.com</a></p>
        </div>
        <blockquote className='text-2xl pt-10 seasons_regular'>"The Pain Point is the Turning Point"</blockquote>
    </div>
            </div>    
    </>
  )
}

export default LandingPage