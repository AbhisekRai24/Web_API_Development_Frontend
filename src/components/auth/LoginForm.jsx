import React from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLoginUser } from '../../hooks/useLoginUser';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
export default function LoginForm() {
    const { mutate, data, error, isPending } = useLoginUser();
    const navigate = useNavigate();
    useEffect(() => {
        if (data) {
            navigate('/');
        }
    }, [data, navigate]);

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("Please fill email"),
        password: Yup.string().min(8, "Password needs 8 characters").required("Please fill password")
    });



    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema,
        onSubmit: (values) => {
            mutate(values);
        }
    });
 return (
        <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100 focus:outline-none"
                />
                {formik.touched.email && formik.errors.email && (
                    <p className="text-red-600 text-sm mt-1">{formik.errors.email}</p>
                )}
            </div>

            <div>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100 focus:outline-none"
                />
                {formik.touched.password && formik.errors.password && (
                    <p className="text-red-600 text-sm mt-1">{formik.errors.password}</p>
                )}
            </div>

            <div>
                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-2 bg-red-700 text-white rounded hover:bg-red-800 transition"
                >
                    Login
                </button>

                <p className="text-sm mt-4 text-center">
                    Don&apos;t have an account?{' '}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Register
                    </Link>
                </p>

                {/* Show loading text below button */}
                {isPending && (
                    <p className="text-blue-600 text-sm mt-2">Logging in...</p>
                )}
            </div>

            {error && (
                <p className="text-red-600 text-sm mt-2">
                    {error.message || "Login failed"}
                </p>
            )}
        </form>
    );
}
