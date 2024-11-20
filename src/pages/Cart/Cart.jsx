import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { cartContext } from '../../context/Cart.context'
import Loading from '../../components/Loading/Loading'
import { userContext } from '../../context/user.context'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function Cart() {
    const { getCartItems, cartInfo, deleteCartItem, updateCartItem, clearCart } = useContext(cartContext)

    

    return (
        <>
            {cartInfo == null ? (
                <Loading />
            ) : (
                <section className='bg-slate-200 p-5'>
                    <h2 className='text-2xl font-semibold my-2'>
                        <span>Shop Cart</span>
                        <i className='fa-solid fa-cart-shopping'></i>
                    </h2>
                    <h3 className='text-primary text-lg font-semibold'>Total : {cartInfo.data?.totalCartPrice || 0} EGP</h3>

                    {cartInfo.length == [] ? (
                        <div className='h-full flex flex-col justify-center items-center gap-3 py-16'>
                            <h3 className='text-lg'>your cart is empty</h3>
                            <Link to={'/'} className='btn-primary text-sm'>add products to your cart</Link>
                        </div>
                    ) : (
                        <>
                            {cartInfo?.data.products.map((product) => {
                                return <div key={product.product._id} className='grid grid-cols-12 gap-5 my-5'>
                                    <div className='col-span-1'>
                                        <img className='w-full' src={product.product.imageCover} alt="" />
                                    </div>
                                    <div className='col-span-11 flex justify-between items-center'>
                                        <div>
                                            <h2 className='font-semibold text-lg'>{product.product.title}</h2>
                                            <h3 className='mb-2 text-primary'>Price : {product.price} EGP</h3>
                                            <button onClick={() => { deleteCartItem(product.product._id) }} className='btn-primary bg-red-600'>
                                                <i className='fa-solid fa-trash-can mr-2'></i>
                                                Remove
                                            </button>
                                        </div>
                                        <div className='flex gap-3 items-center'>
                                            <button onClick={() => { updateCartItem({ id: product.product._id, itemCount: product.count -= 1 }) }}>
                                                <i className='btn-primary fa-solid fa-minus'></i>
                                            </button>
                                            <span className='text-lg font-semibold'>{product.count}</span>
                                            <button onClick={() => { updateCartItem({ id: product.product._id, itemCount: product.count += 1 }) }}>
                                                <i className='btn-primary fa-solid fa-plus'></i>
                                            </button>

                                        </div>
                                    </div>
                                </div>

                            })}
                            <button onClick={clearCart} className='btn-primary bg-red-600 block ms-auto'>Clear Cart</button>
                        </>

                    )}
                </section>
            )}
            <Link to={'/checkout'} className='btn-primary w-fit block ms-auto mt-3'>go to checkout</Link>
        </>
    )
}
