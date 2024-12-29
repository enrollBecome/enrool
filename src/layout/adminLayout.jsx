import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import logoWhite from "./../assets/logo.png"
import { Bell, BriefcaseBusiness, Calendar, CircleCheckBig, FilePlus2, Files, FolderUp, GraduationCap, House, ListTodo, LogOut, MessageSquarePlus, Receipt, ReceiptText, User, Users, UsersRound } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';

const AdminLayout = () => {


let navLinks = []
  
navLinks = [
      { path: "/admin-dashboard", icon: <ListTodo strokeWidth={1} color="#bc9c22"/>, label: "Applications" },
      // { path: "/admin-edit-profile", icon: <UserPen strokeWidth={1} />, label: "Edit Profile" },
      
     
    ];
 
    
      const navLinkClass = (isActive) =>
        `flex items-center poppins-medium py-[16px] px-[25px] rounded-full gap-[10px] cursor-pointer ${
          isActive ? 'bg-white text-white justify-center flex' : 'bg-transparent text-black'
        }`;
      
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

export default AdminLayout