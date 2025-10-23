import React from 'react'

const Header = () => {
  return (
    <section className='hidden md:block bg-gray-800 text-white'>
        <div className='container mx-auto px-6 py-2 flex justify-between items-center'>
            <p className='text-sm'>Get Free Delivery on orders over 5000 Rs</p>
            <p className='text-sm'>0313-3430196</p>
        </div>
    </section>
  )
}

export default Header