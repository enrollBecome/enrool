import React, { useEffect } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import logoWhite from "./../assets/logo.png"
import { Bell, BriefcaseBusiness, CircleAlert, CircleCheck, CircleCheckBig, CircleDollarSign, FilePlus2, Files, FolderUp, GraduationCap, House, ListTodo, LogOut, User, Users, UsersRound, X } from 'lucide-react';
import { useClerk, useUser } from '@clerk/clerk-react';

const OnboardingLayout = () => {
  const { user } = useUser();
  const location = useLocation();
  const { signOut } = useClerk()
  let applied = parseInt(user?.unsafeMetadata?.applied || "0", 10);
  const incrementedApplied = applied + 1;
  const applicationid = user.unsafeMetadata.applicationid;
  let stage1 = user.unsafeMetadata.stage1;
  let stage2 = user.unsafeMetadata.stage2;
  let stage3 = user.unsafeMetadata.stage3;
  let stage4 = user.unsafeMetadata.stage4;
  let stage5 = user.unsafeMetadata.stage5;
  let stage6 = user.unsafeMetadata.stage6;
  let stage7 = user.unsafeMetadata.stage7;
  let stage8 = user.unsafeMetadata.stage8;
  let stage9 = user.unsafeMetadata.stage9;
  // Define navLinks conditionally without if-else
  const navLinks = [
    { path: `/start-enrollment${applicationid ? `/${applicationid}` : ''}`, icon: <User strokeWidth={1} color="#bc9c22" />, status:stage1 ,label: "Personal Information" },
    { path: `/term-selection-form${applicationid ? `/${applicationid}` : ''}`, icon: <ListTodo strokeWidth={1} color="#bc9c22" />,  status:stage2 ,label: "Term Selection" },
    { path: `/education-form${applicationid ? `/${applicationid}` : ''}`, icon: <GraduationCap strokeWidth={1} color="#bc9c22" />,  status:stage3 ,label: "Academic History" },
    { path: `/experience-form${applicationid ? `/${applicationid}` : ''}`, icon: <BriefcaseBusiness strokeWidth={1} color="#bc9c22" />, status:stage4 , label: "Experience" },
    { path: `/personal-statement-form${applicationid ? `/${applicationid}` : ''}`, icon: <Bell strokeWidth={1} color="#bc9c22" />,  status:stage5 ,label: "Personal Statement" },
    { path: `/testimonial-form${applicationid ? `/${applicationid}` : ''}`, icon: <FolderUp strokeWidth={1} color="#bc9c22" />,  status:stage6 ,label: "Testimonial" },
    { path: `/references-form${applicationid ? `/${applicationid}` : ''}`, icon: <UsersRound strokeWidth={1} color="#bc9c22" />,  status:stage7 ,label: "References" },
    { path: `/confirmation-form${applicationid ? `/${applicationid}` : ''}`, icon: <CircleCheckBig strokeWidth={1} color="#bc9c22" />,  status:stage8 ,label: "Confirmation" },
    { path: `/initial-payment${applicationid ? `/${applicationid}` : ''}`, icon: <CircleDollarSign strokeWidth={1} color="#bc9c22" />,    status:stage9 ,label: "Payment" },
  ];

  const navLinkClass = (isActive, isDisabled) =>
    `flex items-center poppins-medium py-[16px] px-[25px] rounded-full gap-[10px] cursor-pointer ${
      isActive && !isDisabled ? 'bg-white text-white justify-center flex' : 'bg-transparent text-black'
    } ${isDisabled ? 'text-gray-400 pointer-events-none' : ''}`;
    const handleMenuClose =() =>{
      const menu = document.getElementById("mobile-menu");
      if (menu) {
        menu.classList.add("sm:hidden"); // Add or remove the "hidden" class
      }
    }
    useEffect(() => {
      handleMenuClose();
    }, [location]);
  return (
    <>
      <div className='flex w-screen max-h-screen'>
        <div id="mobile-menu" className='z-10 sm:w-full sm:hidden md:block md:w-1/5 bg-[#fff8e0] flex flex-col items-center sm:fixed md:relative h-screen overflow-y-auto top-0 left-0'>

          {/* <img src={logoWhite} className='h-14 m-4' />
           */}
           <div className='text-[25px] poppins-bold items-center align-middle flex sm:justify-between md:justify-center w-full h-[80px] sm:p-[20px] md:p-0 '>
        <span className=' opacity-0 md:hidden'>
0
        </span>
        <img onClick={() => { window.location.href = "/"; }}  className='cursor-pointer sm:h-[50px] md:h-[60px] mt-3' src={logoWhite} height={80}/>
        
        
        <X strokeWidth={2} size={30}  className='md:hidden' onClick={handleMenuClose}/>
      </div>
          <div className='flex flex-col justify-between h-full p-[30px] w-full '>
            <div className='flex flex-col w-full'>
            {navLinks.map(({ path, icon, label, status }, index) => {
  const isCompleted = Boolean(status);

  return (
    <NavLink 
      key={path} 
      to={path} 
      className={({ isActive }) => navLinkClass(isActive, false)} // No disabling logic now
    >
      <div className="flex items-center justify-between w-full">
        <div className=' flex '>{icon}
        <p className="ml-2 text-[#bc9c22] font-normal text-base">{label}</p></div>
        <div className="ml-2">
          {isCompleted ? (
            <CircleCheck strokeWidth={1.5} color="green" size={18} />
          ) : (
            <CircleAlert strokeWidth={1.5} color="red" size={18} />
          )}
        </div>
      </div>
    </NavLink>
  );
})}
            </div>
            <button onClick={() => signOut({ redirectUrl: '/' })}>
              <div className="items-center flex justify-center poppins-medium py-[16px] px-[25px] rounded-full gap-[10px] text-white  bg-[#bc9c22]">
                <LogOut strokeWidth={1} /> <p>Log Out</p>
              </div>
            </button>
          </div>
        </div>
        <div className='z-0 flex flex-col sm:w-full md:w-4/5 sm:pr-0 md:pr-[60px] pb-[60px]  min-h-screen bg-[#fff8e0] overflow-y-auto'>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default OnboardingLayout;
