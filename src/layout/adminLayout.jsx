import React, { useEffect } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import logoWhite from "./../assets/logo.png"
import { Bell, BriefcaseBusiness, Calendar, CircleCheckBig, FilePlus2, Files, FolderUp, GraduationCap, House, ListTodo, LogOut, Mail, MessageSquarePlus, Receipt, ReceiptText, User, Users, UsersRound, X } from 'lucide-react';
import { useClerk, useUser } from '@clerk/clerk-react';

const AdminLayout = () => {
  const { signOut } = useClerk()
  const location = useLocation();
let navLinks = []
  
navLinks = [
      { path: "/admin-dashboard", icon: <ListTodo strokeWidth={1} color="#bc9c22"/>, label: "Applications" },
      // { path: "/admin-mail", icon: <Mail strokeWidth={1} color="#bc9c22"/>, label: "Mail" },
      // { path: "/admin-edit-profile", icon: <UserPen strokeWidth={1} />, label: "Edit Profile" },
      
     
    ];
 
    
      const navLinkClass = (isActive) =>
        `flex items-center poppins-medium py-[16px] px-[25px] rounded-full gap-[10px] cursor-pointer ${
          isActive ? 'bg-white text-white justify-center flex' : 'bg-transparent text-black'
        }`;
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
    <div className='flex w-full h-screen'>
    <div id="mobile-menu" className='z-10 sm:w-full sm:hidden md:block md:w-1/5 bg-[#fff8e0] flex flex-col items-center sm:fixed md:relative h-screen overflow-y-auto top-0 left-0'>
<div className='text-[25px] poppins-bold items-center align-middle flex sm:justify-between md:justify-center w-full h-[80px] sm:p-[20px] md:p-0 '>
        <span className=' opacity-0 md:hidden'>
0
        </span>
        <img onClick={() => { window.location.href = "/"; }}  className='cursor-pointer sm:h-[50px] md:h-[60px] mt-3' src={logoWhite} height={80}/>
        
        
        <X strokeWidth={2} size={30}  className='md:hidden' onClick={handleMenuClose}/>
      </div>
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