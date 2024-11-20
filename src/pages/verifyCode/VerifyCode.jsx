import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "Yup";
import { userContext } from "../../context/user.context";

export default function VerifyCode() {
    const navigate = useNavigate();

    async function checkCode(values) {
        let id;

        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
                method: "POST",
                data: values,
            };

            id = toast.loading("waiting...");
            const { data } = await axios.request(options);
            
            toast.dismiss(id);
            toast.success('code verified')
            
            setTimeout(() => {
                if (data.status == "Success") {
                    navigate("/auth/resetPassword");
                }
            }, 1000);
            
            
        } catch (error) {
            toast.error('code rejected')
            toast.dismiss(id);

            console.log(error);
            
        }
    }

    const validationSChema = Yup.object({
        resetCode: Yup.string()
            .required("code is required")

    });

    const formik = useFormik({
        initialValues: {
            resetCode: "",
        },
        validationSchema: validationSChema,
        onSubmit: checkCode,
    });

    return (
        <>
            <section onSubmit={formik.handleSubmit}>
                <h2 className="text-3xl text-primary font-semibold my-4">
                    <i className="fa-regular fa-circle-user me-3"></i>
                    <span>Verify Code</span>
                </h2>

                <form className="flex flex-col gap-5">
   
                    <div>
                        <input
                            type="text"
                            className="form-control w-full"
                            placeholder="code"
                            name="resetCode"
                            value={formik.values.resetCode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        {formik.errors.resetCode && formik.touched.resetCode ? (
                            <div className="text-red-600 font-semibold my-2">
                                {formik.errors.resetCode}
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
