import { getApplicationById, updateApplication } from '@/api/apiApplication';
import { Button } from '@/components/ui/button';
import useFetch from '@/hooks/use-fetch';
import OnboardingTopbar from '@/layout/onboardingTopBar'
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { z } from 'zod';

const schema = z.object({
    status: z.boolean({
        errorMap: () => ({ message: "Status must be true or false" })
    }),
});

const ConfirmationForm = () => {
    const { applicationid } = useParams();
    const [loading, setLoading] = useState(true);
    const [application, setApplication] = useState([]);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false); // State for checkbox

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
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: application,
    });

    const onError = (errors) => {
        console.log('Form errors:', errors);
    };

    const {
        loading: loadingUpdateApplication,
        error: errorUpdateApplication,
        data: dataUpdateApplication,
        fn: fnUpdateApplication
    } = useFetch(updateApplication);

    const onSubmit = (data) => {
        data.status="approve";
        fnUpdateApplication({
            applicationData: data,
            application_id: applicationid,
        });
    };

    useEffect(() => {
        if (dataUpdateApplication?.length > 0) navigate(`/term-selection-form/${applicationid}`);
    }, [loadingUpdateApplication]);

    useEffect(() => {
        if (application) {
            reset(application); // Populate form with fetched job data
        }
    }, [application]);

    return (
        <>
            <OnboardingTopbar />
            <div className="w-full lg:rounded-[60px] lg:p-[60px] mt-[20px] flex-col bg-white h-fit">
                <div className="poppins-bold sm:text-[20px] sm:text-center lg:text-left lg:mb-5 sm:mb-3 lg:text-[38px] sm:leading-tight lg:leading-none">
                    Application Confirmation
                </div>
                <p className="font-thin mb-4">
                    List the names and contact information of referees who are willing to complete a confidential assessment on your behalf.
                </p>

                <form onSubmit={handleSubmit(onSubmit, onError)}>
                    <div>
                        <input
                            type="checkbox"
                            id="checkbox1"
                            name="example"
                            value="checkedValue"
                            onChange={(e) => setIsCheckboxChecked(e.target.checked)} // Update checkbox state
                        />
                        <label htmlFor="checkbox1" className="ml-2">
                            I confirm the information provided is correct.
                        </label>
                    </div>

                    <div className="border-t py-8"></div>

                    {errorUpdateApplication?.message && (
                        <p className="text-red-500">{errorUpdateApplication.message}</p>
                    )}

                    <Button
                        type="submit"
                        className={`rounded-full px-10 py-6 mt-[40px] flex justify-center items-center ${
                            !isCheckboxChecked ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#002745]'
                        }`}
                        disabled={!isCheckboxChecked} // Disable button when checkbox is not checked
                    >
                        {loadingUpdateApplication ? (
                            <ClipLoader color="white" size={24} />
                        ) : (
                            "Submit"
                        )}
                    </Button>
                </form>
            </div>
        </>
    );
};

export default ConfirmationForm;
