"use client";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as yup from "yup";

export default function UpdatePasswordPage(params) {
    const router = useRouter();

    const validationSchema = yup.object({
        email: yup
            .string()
            .email("Email must be valid")
            .required("Email is required"),
        cpassword: yup
            .string()
            .oneOf([yup.ref("password"), null], "Password should match")
            .required("Password is required"),
        password: yup
            .string()
            .min(6, "Password must be greater than 6 character")
            .required("Password is required"),
    });

    const initialValue = {
        email: "",
        password: "",
        cpassword: "",
    };

    const onSubmitHandler = async (e, { resetForm }) => {
        try {
            const response = await axios.put("/api/update-password", {
                ...e,
                token: params.searchParams.token,
            });
            const data = await response.data;
            toast.success(data.msg);
            resetForm();
            router.push("/login");
        } catch (error) {
            toast.error(error?.response?.data?.error);
        }
    };

    if (!params.searchParams.token) {
        router.replace("/login");
        return <></>;
    }

    return (
        <div className="min-h-[82vh] w-full flex items-center justify-center">
            <Formik
                validationSchema={validationSchema}
                initialValues={initialValue}
                onSubmit={onSubmitHandler}
            >
                <Form className="w-1/2 mx-auto">
                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <Field
                            type="text"
                            id="email"
                            name="email"
                            className="w-full py-2 px-4 ring-2 ring-indigo-400 outline-none border-none"
                            placeholder="Enter Your Email"
                        />
                        <ErrorMessage
                            name="email"
                            component={"p"}
                            className="text-red-500"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">Password</label>
                        <Field
                            type="password"
                            id="password"
                            name="password"
                            className="w-full py-2 px-4 ring-2 ring-indigo-400 outline-none border-none"
                            placeholder="Enter Your Password"
                        />
                        <ErrorMessage
                            name="password"
                            component={"p"}
                            className="text-red-500"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword">Confirm Password</label>
                        <Field
                            type="password"
                            id="cpassword"
                            name="cpassword"
                            className="w-full py-2 px-4 ring-2 ring-indigo-400 outline-none border-none"
                            placeholder="Enter Your Password"
                        />
                        <ErrorMessage
                            name="cpassword"
                            component={"p"}
                            className="text-red-500"
                        />
                    </div>
                    <div className="mb-3">
                        <button
                            type="submit"
                            className="w-full bg-green-500 rounded text-white py-3 font-bold"
                        >
                            Forget
                        </button>
                    </div>
                    <div className="mb-3">
                        <p className="text-center">
                            Already Know ?{" "}
                            <Link
                                href="/login"
                                className="text-blue-500 underline"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}
