import axios from 'axios'
import Loading from '../Loading/Loading'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
export default function CategorySlider() {


    async function getAllCategoies(params) {
        const options = {
            url: 'https://ecommerce.routemisr.com/api/v1/categories',
            method: 'get'
        }
        return await axios.request(options)

    }

    let { data, isLoading } = useQuery({
        queryKey: 'categories',
        queryFn: getAllCategoies
    })

     
    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <section className='my-9'>
                <h2 className='font-semibold text-lg'>shop all categories</h2>
                <swiper-container loop={true} slides-per-view={6}>
                    {data.data.data.map((category) =>
                        <swiper-slide key={category._id}>
                            <Link to={`/category/${category._id}`}>
                                <img src={category.image} alt="" className='w-full h-72 object-cover' />
                                <h3>{category.name}</h3>
                            </Link>
                        </swiper-slide>
                    )}
                </swiper-container>
            </section>
        </>
    )
}
