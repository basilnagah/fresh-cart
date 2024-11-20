import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../../context/user.context'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import Loading from '../../components/Loading/Loading'
import { useQuery } from '@tanstack/react-query'

export default function Orders() {
    const { token } = useContext(userContext)
    const { id } = jwtDecode(token)

    async function getUserOrders() {
        const options = {
            url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
            method: 'GET'
        }

        return await axios.request(options)
    }

    const { data, isLoading } = useQuery({
        queryKey: ['orders'],
        queryFn: getUserOrders
    })


    if (isLoading) {
        return <Loading />
    }


    

    return (
        <>
            {data.data.map((order) => (
                    <div className='my-3 border border-gray-300 rounded-md border-solid p-4'>
                        <div className='flex justify-between items-center'>
                            <div>
                                <h2 className='text-gray-400'>Order ID</h2>
                                <h3 className='font-semibold'>#{order.id}</h3>
                            </div>
                            <div>
                                {order.isDelivered ? (
                                    <span className='btn-primary inline-block bg-primary me-2 text-sm'>
                                        Delivered
                                    </span>
                                ) : (
                                    <span className='btn-primary inline-block bg-blue-600 me-2 text-sm'>
                                        under delivery
                                    </span>
                                )}
                                {order.isPaid ? (
                                    <span className='btn-primary inline-block bg-primary-600 text-sm'>
                                        Paid
                                    </span>
                                ) : (
                                    <span className='btn-primary inline-block bg-red-600 text-sm'>
                                        not paid
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className='grid grid-cols-12 gap-3'>
                            {order.cartItems.map((product) => (
                                <div className='mt-2 rounded-sm p-2 border border-gray-300 border-solid  col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-3 2xl:col-span-2'>
                                    <img src={product.product.imageCover} className='w-full h-40 object-cover' alt="" />
                                    <div>
                                        <h3 className='font-semibold my-2'>{product.product.title}</h3>
                                        <span>{product.price} EGP</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))

            }
        </>
    )
}
