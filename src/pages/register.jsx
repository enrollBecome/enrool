import { SignIn } from "@clerk/clerk-react";
import React from "react";
import logo from "./../assets/logo.png";
import { Link } from "react-router-dom";
const Register = () => {
  return (
    <>
      <div className="flex items-center w-full min-h-screen bg-white">
        <div className="flex flex-col items-center justify-center h-screen sm:w-full md:w-1/2">
          <img className="w-24" src={logo} />
          <SignIn />

          <div className="flex gap-4 mt-4 ">

            <Link to="/how-to-apply" className="text-sm font-thin text-gray-400" >How to Apply  </Link>
            <Link to="/terms-condition" className="text-sm font-thin text-gray-400" >Terms & Condition</Link>
            <Link to="/privacy-policy" className="text-sm font-thin text-gray-400" >Privacy Policy</Link>
          </div>
        </div>
        <div className="hidden h-screen  sm: md:block">
          <img
            className="h-full"
            src="https://tallkizetxyhcvjujgzw.supabase.co/storage/v1/object/public/uploads//Inspire%20Healing,%20Lead%20with%20Vision.jpg"
          />
        </div>
      </div>
    </>
  );
};

export default Register;
