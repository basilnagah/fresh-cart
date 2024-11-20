import { createContext, useContext, useState } from "react";
import { userContext } from "./user.context";
import axios from "axios";
import toast from "react-hot-toast";

export const cartContext = createContext(null)

export default function CartProvider({ children }) {
    const [cartInfo, setCartInfo] = useState(null)


    let { token } = useContext(userContext)

    async function addToCart(id) {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart`,
                method: 'POST',
                headers: {
                    token,
                },
                data: {
                    productId: id
                }
            }

            const { data } = await axios.request(options)
            toast.success(data.message)
            // setCartInfo(data)
            getCartItems()
        } catch (error) {
            console.log(error);

        }


    }
    async function getCartItems() {
        if (token) {

            try {
                const options = {
                    url: 'https://ecommerce.routemisr.com/api/v1/cart',
                    method: "GET",
                    headers: {
                        token
                    }
                }
                const { data } = await axios.request(options)
                if (data.numOfCartItems == 0) {
                    setCartInfo([])
                } else {
                    setCartInfo(data)
                }

            } catch (error) {
                console.log(error);
                setCartInfo([])

            }
        }

    }
    async function deleteCartItem(id) {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                method: 'DELETE',
                headers: {
                    token
                }
            }

            const { data } = await axios.request(options)
            toast.success('product removed from cart')
            if (data.numOfCartItems == 0) {
                setCartInfo([])
            } else {

                setCartInfo(data)
            }
        } catch (error) {
            console.log(error);

        }

    }
    async function updateCartItem({ id, itemCount }) {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                method: 'PUT',
                headers: {
                    token
                },
                data: {
                    count: itemCount
                }
            }

            const { data } = await axios.request(options)
            setCartInfo(data)
            toast.success('cart updated successfully')
        } catch (error) {
            console.log(error);

        }

    }
    async function clearCart() {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart`,
                method: 'DELETE',
                headers: {
                    token
                },
            }

            const { data } = await axios.request(options)
            setCartInfo([])

            toast.success('cart deleted successfully')
        } catch (error) {
            console.log(error);

        }

    }

    return <cartContext.Provider value={{ addToCart, setCartInfo, cartInfo, getCartItems, deleteCartItem, updateCartItem, clearCart }}>{children}</cartContext.Provider>
}