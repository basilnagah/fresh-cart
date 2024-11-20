import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "Yup";
import { userContext } from "../../context/user.context";

export default function ForgetPassword() {
    const navigate = useNavigate();

    async function checkEmail(values) {
        let id;

        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
                method: "POST",
                data: values,
            };

            id = toast.loading("waiting...");
            const { data } = await axios.request(options);
            
            toast.dismiss(id);
            toast.success(data.message)

            setTimeout(() => {
                if (data.statusMsg == "success") {
                  navigate("/auth/verifyCode");
                }
              }, 1000);


        } catch (error) {
            console.log(error);
            
        }
    }

    const validationSChema = Yup.object({
        email: Yup.string()
            .required("email is required")
            .email("email must be valid"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: validationSChema,
        onSubmit: checkEmail,
    });

    return (
        <>
            <section onSubmit={formik.handleSubmit}>
                <h2 className="text-3xl text-primary font-semibold my-4">
                    <i className="fa-regular fa-circle-user me-3"></i>
                    <span>Forget Password</span>
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


                    <button type="submit" className="btn-primary w-fit">
                        submit
                    </button>
                </form>
            </section>
        </>
    );
}
