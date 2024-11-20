import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
import ReactImageGallery from 'react-image-gallery'
import { cartContext } from '../../context/Cart.context'


export default function ProductDetails() {
    const [ProductDetails, setProductDetails] = useState(null)
    const { id } = useParams()
    const {addToCart} = useContext(cartContext)

    const images = ProductDetails?.images.map((imageUrl) => {
        return {
            original: imageUrl,
            thumbnail: imageUrl,
        }
    })

    async function getProductDetails() {
        const options = {
            url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
            method: 'GET'
        }
        const { data } = await axios.request(options)

        setProductDetails(data.data)

    }

    useEffect(() => {
        getProductDetails()
    }, [])


    return (
        <>
            {ProductDetails ? (
                <section className='grid grid-cols-12'>
                    <div className='col-span-3'>
                        <ReactImageGallery autoPlay={true} items={images} showNav={false} showFullscreenButton={false} showPlayButton={false} />
                    </div>
                    <div className='col-span-9 ps-7'>
                        <h2 className='text-2xl font-boldbold'>{ProductDetails.title}</h2>
                        <h3 className='text-primary font-boldbold'>{ProductDetails.category.name}</h3>
                        <p className='mt-3'>{ProductDetails.description}</p>
                        <div className='flex justify-between items-center my-4'>
                            <span>{ProductDetails.price} EGP</span>
                            <span>
                                <i className='fa-solid fa-star text-yellow-400'></i>
                                {ProductDetails.ratingsAverage}
                            </span>
                        </div>
                        <button onClick={ ()=>{ addToCart(ProductDetails._id) } } className='btn-primary w-full'>add to cart</button>
                    </div>
                </section>
            ) : <Loading />}
        </>
    )
}
