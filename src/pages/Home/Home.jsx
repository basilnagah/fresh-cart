import React, { useEffect, useState } from 'react'
import Card from '../../components/Card/Card'
import axios from 'axios'
import Loading from '../../components/Loading/Loading'
import HomeSlider from '../../components/HomeSlider/HomeSlider'
import CategorySlider from '../../components/CategorySlider/CategorySlider'
import { useQuery } from '@tanstack/react-query'

export default function Home() {    

    async function getAllProducts() {
        const options = {
            url: 'https://ecommerce.routemisr.com/api/v1/products',
            method: 'GET'
        }

        return await axios.request(options)
    }



    let {data , isLoading , isFetching , isError} = useQuery({
        queryKey:['products'],
        queryFn:getAllProducts,
        refetchOnMount:true
    })


    if(isLoading){
        return <Loading/>
    }




    return (
        <>
            <HomeSlider/>
            <CategorySlider/>
                <div className='grid grid-cols-12 gap-4'>
                    { data.data.data.map( (product)=>
                        <Card productInfo={product} key={product._id}/>
                    ) }
                </div>                

        </>
    )
}
