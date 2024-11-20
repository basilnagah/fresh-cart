import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "Yup";
import { userContext } from "../../context/user.context";

export default function ResetPassword() {
    const navigate = useNavigate();

    async function resetUserPass(values) {
        let id;

        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
                method: "PUT",
                data: values,
            };

            id = toast.loading("waiting...");
            const { data } = await axios.request(options);

            toast.dismiss(id);
            toast.success("password changed");

            setTimeout(() => {
                if (data.token) {
                    navigate("/auth/login");
                }
            }, 1000);
        } catch (error) {
            toast.error("wronf credentials");
            toast.dismiss(id);

            console.log(error);
        }
    }

    const validationSChema = Yup.object({
        email: Yup.string()
            .required("code is required")
            .email("email must be valid"),
        newPassword: Yup.string()
            .required("password is required")
            .matches(
                /^[A-Z][a-zA-Z0-9]{5,25}$/,
                "password must start with capital letter followed by atleast 5 chars"
            ),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            newPassword: "",
        },
        validationSchema: validationSChema,
        onSubmit: resetUserPass,
    });

    return (
        <>
            <section onSubmit={formik.handleSubmit}>
                <h2 className="text-3xl text-primary font-semibold my-4">
                    <i className="fa-regular fa-circle-user me-3"></i>
                    <span>Reset Password</span>
                </h2>

                <form className="flex flex-col gap-5">

                    <div>
                        <input
                            type="email"
                            className="form-control w-full"
                            placeholder="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        {formik.errors.email && formik.touched.email ? (
                            <div className="text-red-600 font-semibold my-2">
                                {formik.errors.email}
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    <div>
                        <input
                            type="password"
                            className="form-control w-full"
                            placeholder="new Password"
                            name="newPassword"
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        {formik.errors.newPassword && formik.touched.newPassword ? (
                            <div className="text-red-600 font-semibold my-2">
                                {formik.errors.newPassword}
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    <button type="submit" className="btn-primary w-fit">
                        submit
                    </button>
                </form>
            </section>
        </>
    );
}
