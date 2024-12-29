import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import logoWhite from "./../assets/logo.png"
import { Bell, BriefcaseBusiness, CircleCheckBig, FilePlus2, Files, FolderUp, GraduationCap, House, ListTodo, LogOut, User, Users, UsersRound } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';

const OnboardingLayout = () => {
  const {user} = useUser();
  let applied = parseInt(user?.unsafeMetadata?.applied || "0", 10);
  const incrementedApplied = applied + 1;
  const applicationid  = user.unsafeMetadata.applicationid;
let navLinks = []
  if (applicationid){
navLinks = [
      { path: `/start-enrollment/${applicationid}`, icon: <User strokeWidth={1} color="#bc9c22"/>, label: "Personal Information" },
      // { path: "/admin-edit-profile", icon: <UserPen strokeWidth={1} />, label: "Edit Profile" },
      { path: `/term-selection-form/${applicationid}`, icon: <ListTodo strokeWidth={1} color="#bc9c22" />, label: "Term Selection" },
      { path: `/education-form/${applicationid}`, icon: <GraduationCap strokeWidth={1} color="#bc9c22" />, label: "Education" },
      { path: `/experience-form/${applicationid}`, icon: <BriefcaseBusiness strokeWidth={1} color="#bc9c22" />, label: "Experience" },
      { path: `/personal-statement-form/${applicationid}`, icon: <Bell strokeWidth={1} color="#bc9c22" />, label: "Personal Statement" },
      { path: `/testimonial-form/${applicationid}`, icon: <FolderUp strokeWidth={1} color="#bc9c22" />, label: "Testimonial" },
      { path: `/references-form/${applicationid}`, icon: <UsersRound strokeWidth={1} color="#bc9c22" />, label: "References" },
      { path: `/confirmation-form/${applicationid}`, icon: <CircleCheckBig strokeWidth={1} color="#bc9c22" />, label: "Confirmation" },
    ];
  }else{
     navLinks = [
      { path: "/start-enrollment", icon: <User strokeWidth={1} color="#bc9c22"/>, label: "Personal Information" },]
  }
    
      const navLinkClass = (isActive) =>
        `flex items-center poppins-medium py-[16px] px-[25px] rounded-full gap-[10px] cursor-pointer ${
          isActive ? 'bg-white text-white justify-center flex' : 'bg-transparent text-black'
        }`;
        navLinks = navLinks.slice(0, incrementedApplied);
        
  return (
    <>
    <div className='flex w-full h-screen'>
<div className='w-1/5 bg-[#fff8e0] flex flex-col items-center'>
<img src={logoWhite} className='h-14 m-4' />
<div className='flex flex-col justify-between h-full p-[30px] w-full '>
        <div className='flex flex-col w-full'>
      {navLinks.map(({ path, icon, label }) => (
        <NavLink key={path} to={path} className={({ isActive }) => navLinkClass(isActive)}>
          {icon}
          <p className="ml-2 text-[#bc9c22] font-normal text-base">{label}</p>
        </NavLink>
      ))}
      </div>
      <button onClick={() => signOut({ redirectUrl: '/' })}><div className="items-center flex justify-center poppins-medium py-[16px] px-[25px] rounded-full gap-[10px] text-white  bg-[#bc9c22]">
      <LogOut strokeWidth={1} /> <p>Log Out</p>
      </div></button>
      
    
      </div>
</div>
<div className='flex flex-col md:w-4/5 sm:w-full sm:pr-0 md:pr-[60px] pb-[60px] min-h-screen bg-[#fff8e0] overflow-y-auto'>
<Outlet />
</div>
    </div>
    
    </>
  )
}

export default OnboardingLayout