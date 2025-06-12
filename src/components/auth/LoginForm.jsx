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
