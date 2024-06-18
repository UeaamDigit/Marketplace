import React from 'react'
import h4 from '../images/h5.avif';

export default function About() {
  return (
    <div className='py-20 px-4 max-w-6xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4 text-slate-800'>About Wiam Estate</h1>
      <div
        style={{
          background: `url(${h4}) center `,
        }}
        className='h-[400px]'
      ></div>
  <br />
      <h3 className='mb-4'>Wiam Estate is a leading real estate agency that specializes in helping clients buy, sell, and rent properties in the most desirable neighborhoods. Our team of experienced agents is dedicated to providing exceptional service and making the buying and selling process as smooth as possible.</h3>
      <h3 className='mb-4 text-slate-700'>
        Our mission is to help our clients achieve their real estate goals by providing expert advice, personalized service, and a deep understanding of the local market. Whether you are looking to buy, sell, or rent a property, we are here to help you every step of the way.
      </h3>
    </div>
  )
}
