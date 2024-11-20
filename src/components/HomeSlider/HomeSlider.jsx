import React from 'react'
import image1 from '../../assets/images/main-slider-1.jpeg'
import image2 from '../../assets/images/main-slider-2.jpeg'
import image3 from '../../assets/images/main-slider-3.jpeg'

export default function HomeSlider() {
    return (
        <>
            <div className="grid grid-cols-12 mb-6">
                <div className="col-span-8">
                    <swiper-container style={{ height:'100%' }} loop={true}>
                        <swiper-slide>
                            <img src={image3} className='w-full h-full object-cover' alt="" />
                        </swiper-slide>
                        <swiper-slide>
                            <img src={image2} className='w-full h-full object-cover' alt="" />
                        </swiper-slide>
                        <swiper-slide>
                            <img src={image1} className='w-full h-full object-cover' alt="" />
                        </swiper-slide>
                    </swiper-container>
                </div>
                <div className="col-span-4">
                    <div className='h-1/2'>
                        <img src={image2} className='w-full h-full object-cover' alt="" />
                    </div>
                    <div className='h-1/2'>
                        <img src={image1} className='w-full h-full object-cover' alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}
