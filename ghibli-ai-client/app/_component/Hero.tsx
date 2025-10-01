import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <div className='mt-32 flex flex-col justify-center items-center text-center'>
      <div className="text-5xl my-2">Transform Your Photo into</div>
      <div className="text-5xl">Ghibli Art with Ghibli AI</div>
      <p className="mt-5 text-lg font-light text-gray-500">Experice the magic of Studio Ghibli artistic style with our AI-powered Ghibli image generator tool</p>
      <Link href={"/create"} className="mt-14 w-36 py-0.5 h-12 text-xl border border-amber-800 flex justify-center items-center rounded-lg text-white bg-amber-900 cursor-pointer">Try Ghibli AI</Link>
    </div>
  )
}

export default Hero