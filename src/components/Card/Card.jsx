import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { cartContext } from '../../context/Cart.context'

export default function Card({ productInfo }) {
    const {addToCart}=useContext(cartContext)
    const { _id , images, title, price, category, ratingsAverage } = productInfo

    return (
        <>
            <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2  shadow-lg rounded-md overflow-hidden">
                    <div className='relative'>
                        <img className='w-full' src={images[0]} alt="" />
                        <div className="opacity-0 hover:opacity-100 transation:opacity duration-300  flex items-center justify-center gap-2 layer absolute w-full h-full left-0 top-0 bg-black bg-opacity-15 ">
                            <div className="icon cursor-pointer hover:scale-110 transation-transform duration-300 hover:rotate-6 w-10 h-10 rounded-full bg-primary text-sm text-white flex justify-center items-center">
                                <i className='fa-solid fa-heart'></i>
                            </div>
                            <div onClick={()=>{ addToCart(_id) }} className="icon cursor-pointer hover:scale-110 transation-transform duration-300 hover:rotate-6 w-10 h-10 rounded-full bg-primary text-sm text-white flex justify-center items-center">
                                <i className='fa-solid fa-cart-shopping'></i>
                            </div>
                            <Link to={`/product/${_id}`} className="icon cursor-pointer hover:scale-110 transation-transform duration-300 hover:rotate-6 w-10 h-10 rounded-full bg-primary text-sm text-white flex justify-center items-center">
                                <i className='fa-solid fa-eye'></i>
                            </Link>
                        </div>
                    </div>

                    <div className='p-3'>
                        <h3 className='text-primary'>{category.name}</h3>
                        <h2 className='text-lg font-semibold line-clamp-2'>{title}</h2>
                        <div className='flex justify-between items-center mt-3'>
                            <span>{price} EGP</span>
                            <div className='flex gap-1 items-center'>
                                <i className='fa-solid fa-star text-yellow-500'></i>
                                <span>4.5</span>
                            </div>
                        </div>
                    </div>
              

            </div>
        </>
    )
}
