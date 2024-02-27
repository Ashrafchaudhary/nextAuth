"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as yup from "yup";

export default function RegisterPage() {
    const router = useRouter();

    const validationSchema = yup.object({
        name: yup.string().required("Name is required"),
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
        name: "",
        email: "",
        password: "",
    };

    const onSubmitHandler = async (e, { resetForm }) => {
        try {
            const response = await axios.post("/api/register", e);
            const data = response.data;
            toast.success(data.msg);
            resetForm();
            router.push("/login");
        } catch (error) {
            toast.error(error?.response?.data?.error);
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
                        <label htmlFor="name">Name</label>
                        <Field
                            type="text"
                            id="name"
                            name="name"
                            className="w-full py-2 px-4 ring-2 ring-indigo-400 outline-none border-none"
                            placeholder="Enter Your Name"
                        />
                        <ErrorMessage
                            name="name"
                            component={"p"}
                            className="text-red-500"
                        />
                    </div>
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
                            className="w-full bg-green-500 rounded text-white py-3 font-bold"
                        >
                            Register
                        </button>
                    </div>
                    <div className="mb-3">
                        <p className="text-center">
                            Already Have An Account ?{" "}
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
