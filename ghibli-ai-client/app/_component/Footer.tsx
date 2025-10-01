"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Footer = () => {

  const path = usePathname()

  return (
    <div className='px-6'>
      {path !== "/create" &&
        <div className="w-full h-60 bg-orange-50 rounded-xl border border-gray-100 shadow-xl flex flex-col items-center justify-center gap-5">
          <div className="text-xl font-bold">Create Your Magic Ghibli Art Today</div>
          <div className="font-light text-gray-500 w-[45%] text-center">Join thousands of artists and studio ghibli fans who are creating stunning Miyazaki-inspired artwork with out Ghibli AI generator</div>
          <Link href={"/create"} className="w-48 py-0.5 h-11 border border-amber-800 flex justify-center items-center rounded-lg text-white bg-amber-900 cursor-pointer">Try Ghibli AI For Free</Link>
        </div>
      }
      <div className="bg-gray-200 w-full h-0.25 mb-6 mt-24"></div>
      <div className="mb-2">@ {new Date().getFullYear()} Ghibli AI. All rights reserved</div>
    </div>
  )
}

export default Footer