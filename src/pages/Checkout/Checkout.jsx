import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { cartContext } from "../../context/Cart.context";
import { userContext } from "../../context/user.context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Checkout() {
  const { cartInfo , setCartInfo} = useContext(cartContext)
  const { token } = useContext(userContext)
  const [orderType, setOrderType] = useState(null)
  const navigate = useNavigate()

  async function createCashOrder(values) {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.data._id}`,
      method: 'POST',
      headers: {
        token
      },
      data: {
        values
      }
    }

    const { data } = await axios.request(options)
    setCartInfo([])
    toast.success('order made successfully')
    setTimeout(()=>{
      navigate('/allorders')
    },1000)

  }
  async function createOnlineOrder(values) {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.data._id}?url=http://localhost:5173`,
      method: 'POST',
      headers: {
        token
      },
      data: {
        values
      }
    }

    const { data } = await axios.request(options)
    toast.success('order made successfully')
    window.location.href = data.session.url
    console.log(data);

  }

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    onSubmit: (values) => {

      if (orderType == 'cash') {
        createCashOrder(values)
      } else {
        createOnlineOrder(values)
      }


    },
  });

  return (
    <>
      <h2 className="text-2xl font-bold mb-5">Shipping Adress</h2>

      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          className="form-control w-full"
          placeholder="city"
          name="shippingAddress.city"
          value={formik.values.shippingAddress.city}
          onChange={formik.handleChange}
        />
        <input
          type="tel"
          className="form-control w-full my-3"
          placeholder="phone"
          name="shippingAddress.phone"
          value={formik.values.shippingAddress.phone}
          onChange={formik.handleChange}

        />
        <textarea
          type="text"
          className="form-control w-full"
          placeholder="details"
          name="shippingAddress.details"
          value={formik.values.shippingAddress.details}
          onChange={formik.handleChange}

        ></textarea>
        <button onClick={() => { setOrderType('cash') }} type="submit" className="btn-primary bg-blue-600 me-2 mt-3">
          Cash Order
        </button>
        <button onClick={() => { setOrderType('online') }} type="submit" className="btn-primary">
          online order
        </button>
      </form>
    </>
  );
}
