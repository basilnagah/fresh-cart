import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "Yup";

export default function Register() {
  const phoneRegex =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  async function sendDataToRegsiter(values) {
    let id;
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values,
      };

      id = toast.loading("waiting...");
      const { data } = await axios.request(options);
      console.log(data);

      toast.dismiss(id);
      toast.success("user created succesfully");

      setTimeout(() => {
        if (data.message == "success") {
          navigate("/auth/login");
        }
      }, 2000);
    } catch (error) {
      toast.dismiss(id);
      toast.error(error.response.data.message);
      setErrorMsg(error.response.data.message);
    }
  }

  const validationSChema = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(3, "name at least 3 chars")
      .max(15, "name at most 15 chars"),
    email: Yup.string()
      .required("email is required")
      .email("email must be valid"),
    phone: Yup.string()
      .required("phone is required")
      .matches(phoneRegex, "phone must be valid"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^[A-Z][a-zA-Z0-9]{5,25}$/,
        "password must start with capital letter followed by atleast 5 chars"
      ),
    rePassword: Yup.string()
      .required("repassword is required")
      .oneOf([Yup.ref("password")], "password dont match"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema: validationSChema,
    onSubmit: sendDataToRegsiter,
  });

  return (
    <>
      <section onSubmit={formik.handleSubmit}>
        <h2 className="text-3xl text-primary font-semibold my-4">
          <i className="fa-regular fa-circle-user me-3"></i>
          <span>Register Now</span> 
        </h2>

        <form className="flex flex-col gap-5">
          {errorMsg ? (
            <div className="text-red-600 font-semibold my-2">{errorMsg}</div>
          ) : (
            ""
          )}
          <div>
            <input
              type="text"
              className="form-control w-full"
              placeholder="username"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.errors.name && formik.touched.name ? (
              <div className="text-red-600 font-semibold my-2">
                {formik.errors.name}
              </div>
            ) : (
              ""
            )}
          </div>
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
              type="tel"
              className="form-control w-full"
              placeholder="phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.errors.phone && formik.touched.phone ? (
              <div className="text-red-600 font-semibold my-2">
                {formik.errors.phone}
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            <input
              type="password"
              className="form-control w-full"
              placeholder="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.errors.password && formik.touched.password ? (
              <div className="text-red-600 font-semibold my-2">
                {formik.errors.password}
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            <input
              type="password"
              className="form-control w-full"
              placeholder="repassword"
              name="rePassword"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.errors.rePassword && formik.touched.rePassword ? (
              <div className="text-red-600 font-semibold my-2">
                {formik.errors.rePassword}
              </div>
            ) : (
              ""
            )}
          </div>

          <button type="submit" className="btn-primary w-fit">
            signup
          </button>
        </form>
      </section>
    </>
  );
}
