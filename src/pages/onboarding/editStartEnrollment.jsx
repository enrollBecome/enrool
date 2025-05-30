import OnboardingTopbar from "@/layout/onboardingTopBar";
import React, { useEffect, useState } from "react";
import countries from "@/data/countries";
import EducationLevel from "@/data/educationLevel";
import FirstLanguage from "@/data/firstLanguage";
import { Controller, useForm } from "react-hook-form";
import { useUser } from "@clerk/clerk-react";
import { z } from "zod";
import useFetch from "@/hooks/use-fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addNewApplication,
  getApplicationById,
  updateApplication,
} from "@/api/apiApplication";
import ImmigrationStatus from "@/data/immigrationStatus";
import ancestryOptions from "@/data/ancestryOptions";
import { Button } from "@/components/ui/button";
import { ClipLoader } from "react-spinners";
import GenderOptions from "@/data/genderOptions";
import { useNavigate, useParams } from "react-router-dom";
import { Info } from "lucide-react";
import CountryCode from "@/data/phoneCode";
const ancestryNames = ancestryOptions.map((option) => option.name);
const schema = z.object({
  first_name: z.string().min(3, { message: "First Name is required" }),
  last_name: z.string().min(3, { message: "Last name is required" }),
  phone: z.string().min(9, { message: "Please Enter a Correct Phone Number" }),
  country_code: z.enum(CountryCode, {
    errorMap: () => ({
      message: "Country Code must not be empty",
    }),
  }),

  dob: z.string().date(),
  middle_name: z.string().optional(),
  former_name: z.string().optional(),
  country: z.enum(countries, {
    errorMap: () => ({ message: "Country of Residence must not be empty" }),
  }),
  highest_level_education: z.enum(EducationLevel, {
    errorMap: () => ({
      message: "Highest Level of Education must not be empty",
    }),
  }),
  first_language: z.enum(FirstLanguage, {
    errorMap: () => ({ message: "First Language must not be empty" }),
  }),
  immigration_status: z.enum(ImmigrationStatus, {
    errorMap: () => ({ message: "Immigration Status must not be empty" }),
  }),
  ancestry: z.enum(ancestryNames, {
    errorMap: () => ({ message: "Ancestry must not be empty" }),
  }),
  gender: z.enum(GenderOptions, {
    errorMap: () => ({ message: "Gender must not be empty" }),
  }),
  address: z.string().min(3, { message: "Address is required" }),
  address2: z.string().optional(),
  town: z.string().min(3, { message: "Town / City is required" }),
  province: z.string().min(3, { message: "Province / State is required" }),
  pin: z.string().min(3, { message: "Postal Code is required" }),
});
const EditStartEnrollment = () => {
  const { applicationid } = useParams();
  const [loading, setLoading] = useState(true);

  const [application, setApplication] = useState([]);
  const { user } = useUser();
  const email = user?.emailAddresses?.[0]?.emailAddress || "No email found";
  // let appliedStatus = user.unsafeMetadata.applied;
  let applicationStatus = application?.status;

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
    defaultValues: application,
  });

  const onError = (errors) => {
    console.log("Form errors:", errors);
  };

  const {
    loading: loadingUpdateApplication,
    error: errorUpdateApplication,
    data: dataUpdateApplication,
    fn: fnUpdateApplication,
  } = useFetch(updateApplication);

  const onSubmit = (data) => {
    fnUpdateApplication({
      applicationData: data,
      application_id: applicationid,
    });
  };
  useEffect(() => {
    if (dataUpdateApplication?.length > 0)
      navigate(`/term-selection-form/${applicationid}`);
  }, [loadingUpdateApplication]);
  useEffect(() => {
    if (application) {
      reset(application); // Populate form with fetched job data
    }
  }, [application]);

  useEffect(() => {
    if (applicationStatus === "Approved") {
      navigate("/candidate-dashboard");
    } else if (applicationStatus === "Paid") {
      navigate("/candidate-dashboard");
    }
  }, [applicationStatus]);

  return (
    <>
      <OnboardingTopbar />
      <div className="w-full  lg:rounded-[60px] lg:p-[60px] sm:p-[20px] sm:mt-0 md:mt-[20px] flex-col bg-white h-fit ">
        <div className="poppins-bold sm:text-[20px] sm:text-center lg:text-left lg:mb-5 sm:mb-3 lg:text-[38px] sm:leading-tight lg:leading-none">
          Admissions Application.
        </div>
        <p className=" font-thin mb-4">
          Please enter your application details below:
        </p>

        <form onSubmit={handleSubmit(onSubmit, onError)}>
          {/* Name Information */}
          <div className="border-t py-8">
            <span className="text-2xl font-medium">Applicant Name</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  Last Name
                </span>

                <input
                  className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                  type="text"
                  defaultValue={application.last_name}
                  placeholder="Add Last Name"
                  required
                  {...register("last_name")}
                />
                {errors.last_name && (
                  <p className="text-red-400 text-sm px-4 py-2">
                    {errors.last_name.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  First Name
                </span>

                <input
                  className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                  type="text"
                  placeholder="Add First Name"
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
                  Middle Name
                </span>

                <input
                  className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                  type="text"
                  placeholder="Add Middle Name"
                  {...register("middle_name")}
                />
                {errors.last_name && (
                  <p className="text-red-400 text-sm px-4 py-2">
                    {errors.last_name.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  Former Last Name (if applicable)
                </span>

                <input
                  className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                  type="text"
                  placeholder="Add Former Name if any"
                  {...register("former_name")}
                />
                {errors.former_name && (
                  <p className="text-red-400 text-sm px-4 py-2">
                    {errors.former_name.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* Personal Details */}
          <div className="border-t py-8">
            <span className="text-2xl font-medium">
              Contact & Demographic Information
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">Gender</span>

                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <select
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        className={`focus:border-stone-400 text-[1rem] focus:outline-none border-[1px] text-neutral-400 focus:text-zinc-950 focus:border-[1px] h-14 border-opacity-20 rounded-full p-4 text-base w-full ${
                          errors.gender ? "border-red-400 border-2" : ""
                        }`}
                      >
                        <option value="" disabled className="text-neutral-400">
                          Select Gender
                        </option>
                        {GenderOptions.map((gender, index) => (
                          <option
                            key={index}
                            value={gender}
                            className="text-zinc-950"
                          >
                            {gender}
                          </option>
                        ))}
                      </select>
                      {errors.gender && (
                        <p className="text-red-400 text-sm px-4 py-2">
                          {errors.gender.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  Date of Birth
                </span>

                <input
                  className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                  type="date"
                  placeholder="Add Date"
                  required
                  {...register("dob")}
                />
                {errors.date && (
                  <p className="text-red-400 text-sm px-4 py-2">
                    {errors.date.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  Phone Number
                  {/* <span className="inline-flex items-center pl-3 gap-2 italic text-neutral-500"> <Info size={15} /> Use international format, e.g., +1 416 123 4567.</span> */}
                </span>
                <div className="w-full flex">
                  <div className="w-1/5 pr-4">
                    <Controller
                      name="country_code"
                      control={control}
                      render={({ field }) => (
                        <div className="relative">
                          <select
                            {...field}
                            value={field.value || ""}
                            onChange={(e) => field.onChange(e.target.value)}
                            className={`focus:border-stone-400 text-[1rem] focus:outline-none border-[1px] text-neutral-400 focus:text-zinc-950 focus:border-[1px] h-14 border-opacity-20 rounded-full p-4 text-base w-full ${
                              errors.country_code
                                ? "border-red-400 border-2"
                                : ""
                            }`}
                          >
                            <option
                              value=""
                              disabled
                              className="text-neutral-400"
                            >
                              Country Code
                            </option>
                            {CountryCode.map((country_code, index) => (
                              <option
                                key={index}
                                value={country_code}
                                className="text-zinc-950"
                              >
                                {country_code}
                              </option>
                            ))}
                          </select>
                          {errors.country_code && (
                            <p className="text-red-400 text-sm px-4 py-2">
                              {errors.country_code.message}
                            </p>
                          )}
                        </div>
                      )}
                    />
                  </div>
                  <div className="flex flex-col w-4/5">
                    <input
                      className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                      type="number"
                      placeholder="Add Phone No"
                      required
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-sm px-4 py-2">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="border-t py-8">
            <span className="text-2xl font-medium">Address</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex flex-col">
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
              </div>{" "}
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  Address 2
                </span>

                <input
                  className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                  type="text"
                  placeholder=" Apartment, Suit, Unit etc."
                  required
                  {...register("address2")}
                />
                {errors.address2 && (
                  <p className="text-red-400 text-sm px-4 py-2">
                    {errors.address2.message}
                  </p>
                )}
              </div>{" "}
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  Town / City
                </span>

                <input
                  className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                  type="text"
                  placeholder=" Town / City"
                  required
                  {...register("town")}
                />
                {errors.town && (
                  <p className="text-red-400 text-sm px-4 py-2">
                    {errors.town.message}
                  </p>
                )}
              </div>{" "}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                <div className="flex flex-col">
                  <span className="mb-2 text-[13px] poppins-regular">
                    Province/State
                  </span>

                  <input
                    className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                    type="text"
                    placeholder=" Province/State"
                    required
                    {...register("province")}
                  />
                  {errors.province && (
                    <p className="text-red-400 text-sm px-4 py-2">
                      {errors.province.message}
                    </p>
                  )}
                </div>{" "}
                <div className="flex flex-col">
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
                </div>{" "}
              </div>
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  Country of Residence
                </span>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <select
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        className={`focus:border-stone-400 text-[1rem] focus:outline-none border-[1px] text-neutral-400 focus:text-zinc-950 focus:border-[1px] h-14 border-opacity-20 rounded-full p-4 text-base w-full ${
                          errors.country ? "border-red-400 border-2" : ""
                        }`}
                      >
                        <option value="" disabled className="text-neutral-400">
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
            </div>{" "}
          </div>
          {/* Education & Language */}
          <div className="border-t py-8">
            <span className="text-2xl font-medium">Educational Background</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  What is Your Highest Level of Education?
                </span>
                <Controller
                  name="highest_level_education"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <select
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        className={`focus:border-stone-400 text-[1rem] focus:outline-none border-[1px] text-neutral-400 focus:text-zinc-950 focus:border-[1px] h-14 border-opacity-20 rounded-full p-4 text-base w-full ${
                          errors.highest_level_education
                            ? "border-red-400 border-2"
                            : ""
                        }`}
                      >
                        <option value="" disabled className="text-neutral-400">
                          Select Level of Education
                        </option>
                        {EducationLevel.map((edu, index) => (
                          <option
                            key={index}
                            value={edu}
                            className="text-zinc-950"
                          >
                            {edu}
                          </option>
                        ))}
                      </select>
                      {errors.highest_level_education && (
                        <p className="text-red-400 text-sm px-4 py-2">
                          {errors.highest_level_education.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  First Language
                </span>
                <Controller
                  name="first_language"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <select
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        className={`focus:border-stone-400 text-[1rem] focus:outline-none border-[1px] text-neutral-400 focus:text-zinc-950 focus:border-[1px] h-14 border-opacity-20 rounded-full p-4 text-base w-full ${
                          errors.first_language ? "border-red-400 border-2" : ""
                        }`}
                      >
                        <option value="" disabled className="text-neutral-400">
                          Select First Language
                        </option>
                        {FirstLanguage.map((edu, index) => (
                          <option
                            key={index}
                            value={edu}
                            className="text-zinc-950"
                          >
                            {edu}
                          </option>
                        ))}
                      </select>
                      {errors.first_language && (
                        <p className="text-red-400 text-sm px-4 py-2">
                          {errors.first_language.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
          {/* Immigration & Ancestry */}
          <div className="border-t py-8">
            <span className="text-2xl font-medium">
              Citizen & Immigration Status{" "}
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  Immigration Status
                </span>
                <Controller
                  name="immigration_status"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <select
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        className={`focus:border-stone-400 text-[1rem] focus:outline-none border-[1px] text-neutral-400 focus:text-zinc-950 focus:border-[1px] h-14 border-opacity-20 rounded-full p-4 text-base w-full ${
                          errors.immigration_status
                            ? "border-red-400 border-2"
                            : ""
                        }`}
                      >
                        <option value="" disabled className="text-neutral-400">
                          Select Citizenship Status
                        </option>
                        {ImmigrationStatus.map((edu, index) => (
                          <option
                            key={index}
                            value={edu}
                            className="text-zinc-950"
                          >
                            {edu}
                          </option>
                        ))}
                      </select>
                      {errors.immigration_status && (
                        <p className="text-red-400 text-sm px-4 py-2">
                          {errors.immigration_status.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  Heritage & Ancestry
                </span>
                <Controller
                  name="ancestry"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <select
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        className={`focus:border-stone-400 text-[1rem] focus:outline-none border-[1px] text-neutral-400 focus:text-zinc-950 focus:border-[1px] h-14 border-opacity-20 rounded-full p-4 text-base w-full ${
                          errors.ancestry ? "border-red-400 border-2" : ""
                        }`}
                      >
                        <option value="" disabled className="text-neutral-400">
                          Select your Heritage & Ancestry
                        </option>
                        {ancestryOptions.map((edu, index) => (
                          <option
                            key={index}
                            value={edu.name}
                            disabled={edu.isCategoryTrue}
                            className="text-zinc-950"
                          >
                            {edu.name}
                          </option>
                        ))}
                      </select>
                      {errors.ancestry && (
                        <p className="text-red-400 text-sm px-4 py-2">
                          {errors.ancestry.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
          {errorUpdateApplication?.message && (
            <p className="text-red-500">{errorUpdateApplication.message}</p>
          )}
          <Button
            type="submit"
            className="rounded-full px-10 py-6  bg-[#bc9c22] flex justify-center items-center"
          >
            {loadingUpdateApplication ? (
              <ClipLoader color="white" size={24} />
            ) : (
              "Save & Continue"
            )}
          </Button>
        </form>
      </div>
    </>
  );
};

export default EditStartEnrollment;
