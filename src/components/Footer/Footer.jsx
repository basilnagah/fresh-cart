import React from 'react'
import amazonPayLogo from '../../assets/images/amazon-pay.png'
import masterCardLogo from '../../assets/images/mastercard.webp'
import americanExpressLogo from '../../assets/images/American-Express-Color.png'
import paypalLogo from '../../assets/images/paypal-f.png'
import appleStoreLogo from '../../assets/images/get-apple-store.png'
import googlePlayLogo from '../../assets/images/get-google-play.png'

export default function Footer() {
  return (
    <>
      <footer className='py-4 bg-slate-200 absolute left-0 right-0 bottom-0'>
        <div className="container">
          <h2 className='text-2xl font-semibold'>Get the fresh cart app</h2>
          <p className='my-3'>We will send you a link, open iton your phoneto download the app</p>

          <div className='flex gap-4'>
           <input type="text" className='form-control flex-grow' placeholder='Email...' />
            <button className='btn-primary'>Share app link</button>
          </div>

          <div className='flex justify-between items-center mt-4'>
            <div className='flex gap-2  items-center'>
              <span>Payment Partners</span>
              <div className='flex gap-2 items-center'>
                <img src={amazonPayLogo}  className='w-16' />
                <img src={americanExpressLogo} className='w-16' />
                <img src={masterCardLogo} className='w-16' />
                <img src={paypalLogo} className='w-16' />
              </div>
            </div>
            <div className='flex gap-2  items-center'>
              <span>Get Delivers With Freshcarts</span>
              <div className='flex gap-2 items-center'>
                <img src={appleStoreLogo} className='w-16' />
                <img src={googlePlayLogo} className='w-16' />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
