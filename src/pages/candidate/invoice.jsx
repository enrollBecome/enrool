import { Button } from "@/components/ui/button";
import OnboardingTopbar from "@/layout/onboardingTopBar";
import React from "react";

const Invoice = () => {
  return (
    <>
      <OnboardingTopbar />
      <div className="w-full  lg:rounded-[60px] lg:p-[60px] mt-[20px] flex-col bg-white h-full min-h-fit  flex gap-6">
        <div className="bg-[#bc9c22] text-white mt-4 py-14 rounded-[30px]">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold">Invoices</h1>
            <h2 className="text-2xl mt-2 seasons">
              All the invoices to be paid..
            </h2>
          </div>
        </div>
        {/* Payment of Term 1 */}
        <div className="w-full rounded-[30px] bg-[#fff8d7] border border-[#bc9c22] p-8 flex items-center justify-between">
          <span className="poppins-bold text-2xl text-[#483d0d] ">
            Term 1 : Mindfull Fitness
          </span>
          <span className="seasons text-2xl">Tution Fees : $5500</span>
          <form
            action="https://tallkizetxyhcvjujgzw.supabase.co/functions/v1/checkout-ssentif-one"
            method="POST"
          >
            <Button
              className="w-full h-12 rounded-full bg-[#bc9c22] px-6"
              type="submit"
            >
              Complete Payment
            </Button>
          </form>
        </div>
        {/* Payment of Term 2 */}
        <div className="w-full rounded-[30px] bg-[#fff8d7] border border-[#bc9c22] p-8 flex items-center justify-between">
          <span className="poppins-bold text-2xl text-[#483d0d] ">
            Term 2 : Theory & Practices
          </span>
          <span className="seasons text-2xl">Tution Fees : $5500</span>
          <form
            action="http://tallkizetxyhcvjujgzw.supabase.co/functions/v1/checkout-secitcarp-two"
            method="POST"
          >
            <Button
              className="w-full h-12 rounded-full bg-[#bc9c22] px-6"
              type="submit"
            >
              Complete Payment
            </Button>
          </form>
        </div>

        {/* Payment of Term 3 */}
        <div className="w-full rounded-[30px] bg-[#fff8d7] border border-[#bc9c22] p-8 flex items-center justify-between">
          <span className="poppins-bold text-2xl text-[#483d0d] ">
            Term 3 : Practicuum
          </span>
          <span className="seasons text-2xl">Tution Fees : $5500 + Exam</span>
          <form
            action="https://tallkizetxyhcvjujgzw.supabase.co/functions/v1/checkout-muucitcarp-three"
            method="POST"
          >
            <Button
              className="w-full h-12 rounded-full bg-[#bc9c22] px-6"
              type="submit"
            >
              Complete Payment
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Invoice;
