import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "Yup";
import { userContext } from "../../context/user.context";

export default function Login() {
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();
  const { token, setToken } = useContext(userContext)

  async function sendDataToLogin(values) {
    let id;
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values,
      };

      id = toast.loading("waiting...");
      const { data } = await axios.request(options);
      console.log(data);

      toast.dismiss(id);
      toast.success("user logged in successfully");

      setTimeout(() => {
        if (data.message == "success") {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          navigate("/");
        }
      }, 1000);
    } catch (error) {
      toast.dismiss(id);
      toast.error(error.response.data.message);
      setErrorMsg(error.response.data.message);
    }
  }

  const validationSChema = Yup.object({
    email: Yup.string()
      .required("email is required")
      .email("email must be valid"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^[A-Z][a-zA-Z0-9]{5,25}$/,
        "password must start with capital letter followed by atleast 5 chars"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSChema,
    onSubmit: sendDataToLogin,
  });

  return (
    <>
      <section onSubmit={formik.handleSubmit}>
        <h2 className="text-3xl text-primary font-semibold my-4">
          <i className="fa-regular fa-circle-user me-3"></i>
          <span>Login Now</span>
        </h2>

        <form className="flex flex-col gap-5">
          {errorMsg ? (
            <div className="text-red-600 font-semibold my-2">{errorMsg}</div>
          ) : (
            ""
          )}

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

          <div className="flex justify-between items-center">
            <button type="submit" className="btn-primary w-fit">
              login
            </button>
            <Link to={'/auth/forgetPassword'} className="text-blue-700 underline">forget password</Link>
          </div>
        </form>
      </section>
    </>
  );
}
