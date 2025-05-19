import { getApplicationById } from "@/api/apiApplication";
import {
  addNewOrder,
  getOrdersByApplicationId,
  deleteOrder,
} from "@/api/apiOrders";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import countries from "@/data/countries";
import OnboardingTopbar from "@/layout/onboardingTopBar";
import { useUser } from "@clerk/clerk-react";
import { CircleAlert } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useFetch from "@/hooks/use-fetch";
import { ClipLoader } from "react-spinners";
// import { AlertDialog } from "radix-ui";

const schema = z.object({
  first_name: z.string().min(3, { message: "First Name is required" }),
  last_name: z.string().min(3, { message: "Last name is required" }),
phone: z.string().min(9, { message: "Please Enter a Correct Phone Number" }),

  email: z.string().email({ message: "Invalid email address" }),

  country: z.enum(countries, {
    errorMap: () => ({ message: "Country of Residence must not be empty" }),
  }),

  address: z.string().min(3, { message: "Address is required" }),
  address2: z.string().optional(),
  town: z.string().min(3, { message: "Town / City is required" }),
  province: z.string().min(3, { message: "Province / State is required" }),
  pin: z.string().min(3, { message: "Postal Code is required" }),
});
const PaymentForm = () => {
  const [open, setOpen] = useState(false);

  const { applicationid } = useParams();
  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState([]);
  const [order, setOrder] = useState([]);

  const { user } = useUser();
  let appliedStatus = user.unsafeMetadata.applied;
  let stage8 = user.unsafeMetadata.stage8;
  let stage9 = user.unsafeMetadata.stage9;

  let applicationStatus = application.status;

  useEffect(() => {
    if (applicationStatus === "Approved") {
      navigate("/candidate-dashboard");
    } else if (appliedStatus === "Paid") {
      navigate("/candidate-dashboard");
    }
  }, [applicationStatus]);
 
  
  useEffect(() => {
    getOrdersByApplicationId(applicationid)
      .then((data) => setOrder(data))
      .catch(() => setError("Failed to fetch orders."))
      .finally(() => setLoading(false));
  }, [applicationid]);

  const navigate = useNavigate();

  useEffect(() => {
    getApplicationById(applicationid)
      .then((data) => setApplication(data))
      .catch(() => setError("Failed to fetch applications."))
      .finally(() => setLoading(false));
  }, [applicationid]);

  const {
    register,
    handleSubmit,
    control,
    setValue, // For setting fetched data
    reset, // To reset form fields
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: order,
  });
  
  const onError = (errors) => {
    console.log("Form errors:", errors);
  };

  const {
    loading: loadingCreateOrder,
    error: errorCreateOrder,
    data: dataCreateOrder,
    fn: fnCreateOrder,
  } = useFetch(addNewOrder);

  const onSubmit = (data) => {
    fnCreateOrder({
      ...data,

      application_id: applicationid,
    });
  };

  useEffect(() => {
    if (dataCreateOrder?.length > 0) {
      const existingMetadata = user.unsafeMetadata || {};
      if (appliedStatus < 4) {
        appliedStatus = 4;
      }
      user
        .update({
          unsafeMetadata: {
            ...existingMetadata,
            applied: appliedStatus,

          },
        })
        .then(() => {
          setOpen(true);
console.log("set open is set to true")
        })
        .catch((err) => {
          console.error("Error updating unsafeMetadata:", err);
        });

      // Update Clerk unsafeMetadata with new candidate ID
    }
  }, [loadingCreateOrder]);
  return (
    <>
     
      <OnboardingTopbar />
      <div className="w-full lg:rounded-[60px] lg:p-[60px] sm:p-[20px] sm:mt-0 md:mt-[20px] flex-col bg-white h-fit">
        {application.status === "Submitted" ? (
          <>
            <div className="flex flex-col items-center justify-center">
              <div className="poppins-bold sm:text-[20px] sm:text-center lg:text-left lg:mb-5 sm:mb-3 lg:text-[38px] sm:leading-tight lg:leading-none">
                Payment
              </div>
              <span className="text-2xl text-gray-500 font-normal text-center ">
                Your application has been successfully submitted and is under
                review.
                <br /> Once approved you'll get a mail from us, regardig the
                next steps.
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="poppins-bold sm:text-[20px] sm:text-center lg:text-left lg:mb-5 sm:mb-3 lg:text-[38px] sm:leading-tight lg:leading-none">
              Confirm Your Enrollment
            </div>
            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className="w-full min-h-full h-fit flex flex-col"
              // action="https://tallkizetxyhcvjujgzw.supabase.co/functions/v1/create-checkout-session"
              // method="POST"
            >
              <span className="text-2xl text-gray-500 font-semibold">
                You're one step away from beginning your training to become a
                Trauma Recovery Specialist.
              </span>

              <div className="border-t my-4"></div>
              <div className="">
                <div className="flex flex-col">
                  <span className="mb-2 text-gray-500 text-sm poppins-regular">
                    To move forward with your application to the 12-Month Trauma
                    Recovery Certificate Program, please complete the $150
                    processing fee below.
                    <br /> <br />
                    This non-refundable fee supports the review of your
                    application, coordination of your interview, and early
                    access to orientation materials that will help you prepare
                    for this transformative journey.
                  </span>
                  {/* <span className="mb-2 text-2xl poppins-bold">
                    {application.course_name}
                  </span> */}
                </div>
              </div>
              <div className="w-full flex">
                <div className="md:w-1/2 flex flex-col pr-6 pt-6 pb-6">
                  <div className="font-bold text-xl py-6">Billing Details</div>
                  <div className="grid grid-cols-2 gap-4 pt-4 ">
                    <div className="flex flex-col">
                      <span className="mb-2 text-[13px] poppins-regular">
                        First Name
                      </span>

                      <input
                        className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                        type="text"
                        placeholder="First Name"
                        required
                        {...register("first_name")}
                      />
                      {errors.first_name && (
                        <p className="text-red-400 text-sm px-4 py-2">
                          {errors.first_name.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-2 text-[13px] poppins-regular">
                        Last Name
                      </span>

                      <input
                        className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                        type="text"
                        placeholder="Last Name"
                        required
                        {...register("last_name")}
                      />
                      {errors.last_name && (
                        <p className="text-red-400 text-sm px-4 py-2">
                          {errors.last_name.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col pt-4">
                    <span className="mb-2 text-[13px] poppins-regular">
                      Country of Residence
                    </span>
                    <Controller
                      name="country"
                      control={control}
                      render={({ field }) => (
                        <div className="relative">
                          <select
                            onChange={(e) => field.onChange(e.target.value)}
                            className="focus:border-stone-400 text-[1rem] focus:outline-none border-[1px] text-neutral-400 focus:text-zinc-950 focus:border-[1px] h-14 border-opacity-20 rounded-full p-4 text-base w-full "
                          >
                            <option
                              value=""
                              disabled
                              className="text-neutral-400"
                            >
                              Select Country
                            </option>
                            {countries.map((country, index) => (
                              <option
                                key={index}
                                value={country}
                                className="text-zinc-950"
                              >
                                {country}
                              </option>
                            ))}
                          </select>
                          {errors.country && (
                            <p className="text-red-400 text-sm px-4 py-2">
                              {errors.country.message}
                            </p>
                          )}
                        </div>
                      )}
                    />
                  </div>{" "}
                  <div className="flex flex-col pt-4">
                    <span className="mb-2 text-[13px] poppins-regular">
                      Address
                    </span>

                    <input
                      className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                      type="text"
                      placeholder="Street Address"
                      required
                      {...register("address")}
                    />
                    {errors.address && (
                      <p className="text-red-400 text-sm px-4 py-2">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col pt-4">
                    <span className="mb-2 text-[13px] poppins-regular">
                      Address 2
                    </span>

                    <input
                      className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                      type="text"
                      placeholder="Apartment Suite Unit Etc."
                      required
                      {...register("address2")}
                    />
                    {errors.address2 && (
                      <p className="text-red-400 text-sm px-4 py-2">
                        {errors.address2.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col pt-4">
                    <span className="mb-2 text-[13px] poppins-regular">
                      Town
                    </span>

                    <input
                      className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                      type="text"
                      placeholder="Town /City"
                      required
                      {...register("town")}
                    />
                    {errors.town && (
                      <p className="text-red-400 text-sm px-4 py-2">
                        {errors.town.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col pt-4">
                    <span className="mb-2 text-[13px] poppins-regular">
                      Province/State
                    </span>

                    <input
                      className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                      type="text"
                      placeholder="Province State"
                      required
                      {...register("province")}
                    />
                    {errors.province && (
                      <p className="text-red-400 text-sm px-4 py-2">
                        {errors.province.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col pt-4">
                    <span className="mb-2 text-[13px] poppins-regular">
                      Postal Code
                    </span>

                    <input
                      className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                      type="text"
                      placeholder="PIN"
                      required
                      {...register("pin")}
                    />
                    {errors.pin && (
                      <p className="text-red-400 text-sm px-4 py-2">
                        {errors.pin.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col pt-4">
                    <span className="mb-2 text-[13px] poppins-regular">
                      Phone
                    </span>

                    <input
                      className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                      type="number"
                      placeholder="Phone"
                      required
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-sm px-4 py-2">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col pt-4">
                    <span className="mb-2 text-[13px] poppins-regular">
                      Email Address
                    </span>

                    <input
                      className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                      type="text"
                      placeholder="Email Address"
                      required
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm px-4 py-2">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="md:w-1/2 m-2 p-10 border border-neutral-200  flex flex-col h-fit">
                  <div className="font-bold text-xl py-6">Your Order</div>

                  <div className="flex justify-between border-b py-4">
                    <span className="w-fit font-semibold">Product</span>
                    <span className="w-fit font-semibold">Subtotal</span>
                  </div>
                  <div className="flex justify-between border-b py-4">
                    <span className="w-fit font-semibold">
                      Non-Refundable Processing Fee
                    </span>
                    <span className="w-fit font-semibold">$150</span>
                  </div>
                  <div className="flex justify-between  py-4">
                    <span className="w-fit font-semibold">Total</span>
                    <span className="w-fit font-semibold">$150</span>
                  </div>
                </div>
              </div>
              <div className="border-t mt-4 pt-8">
                <div className="flex flex-col items-center gap-2">
                  <Button
                    type="submit"
                    className="rounded-full w-full py-6  bg-black flex justify-center items-center"
                    disabled={ stage9 && stage9 !== ""}
                  >
                    {loadingCreateOrder ? (
                      <ClipLoader color="white" size={24} />
                    ) : (
                      "Proceed"
                    )}
                  </Button>

                  {stage8 !== "completed" && (
                    <p className="text-red-600 text-sm flex items-center gap-1">
                      <CircleAlert className="w-4 h-4" />
                      Please complete the confirmation stage of the application
                      to proceed further.
                    </p>
                  )}
                </div>
              </div>
            </form>
          </>
        )}
      </div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Proceed with Payment?</AlertDialogTitle>
            <AlertDialogDescription>
            Would you like to proceed with the payment?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>

          <form
            action="https://tallkizetxyhcvjujgzw.supabase.co/functions/v1/create-checkout-session"
            method="POST"
          >
            {/* Any required form data can go here */}
            <div className="flex justify-end gap-2">
            <AlertDialogCancel onClick={() => {setOpen(false);
              navigate("/");
            }}>Cancel</AlertDialogCancel>
              <AlertDialogAction type="submit"
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700" onClick={() => {

              // Put your confirm logic here
              
            }}>
Proceed To Pay
            </AlertDialogAction>
            </div>
          </form>
           
          
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PaymentForm;
