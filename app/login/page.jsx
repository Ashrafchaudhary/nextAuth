"use client";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import * as yup from "yup";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const validationSchema = yup.object({
        email: yup
            .string()
            .email("Email must be valid")
            .required("Email is required"),
        password: yup
            .string()
            .min(6, "Password must be greater than 6 character")
            .required("Password is required"),
    });

    const initialValue = {
        email: "",
        password: "",
    };

    const onSubmitHandler = async (e, { resetForm }) => {
        setLoading(true);
        try {
            const response = await axios.post("/api/login", e);
            const data = response.data;
            toast.success(data.msg);
            resetForm();
            router.push("/");
            setLoading(false);
        } catch (error) {
            toast.error(error?.response?.data?.error);
            setLoading(false);
        }
    };

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
                            type="text"
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
                        <button
                            type="submit"
                            className="w-full bg-green-500 disabled:bg-green-200 rounded text-white py-3 font-bold"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Login"}
                        </button>
                    </div>
                    <div className="mb-3">
                        <p className="text-center">
                            Don{"'"}t Have An Account ?{" "}
                            <Link
                                href="/register"
                                className="text-blue-500 underline"
                            >
                                Register
                            </Link>
                        </p>
                    </div>

                    <div className="mt-6">
                        <p className="text-center">
                            Forget{" "}
                            <Link
                                href="/forget-password"
                                className="text-blue-500 underline"
                            >
                                Password
                            </Link>
                        </p>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}
