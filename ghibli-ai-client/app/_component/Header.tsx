"use client"

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const menu = [ { name: 'Home', path: '/' }, { name: 'Create', path: '/create' },
  { name: 'Features', path: '/features' }, { name: 'Gallery', path: '/gallery' }, { name: 'FAQ', path: '/faq' }]



const Header = () => {

  const path = usePathname()

  return (
    <div className='flex justify-between items-center pt-3 px-6 shadow-2xs pb-3 fixed top-0 left-0 w-full bg-white z-50'>

      {/* logo */}
      <div className="flex gap-2 items-center">
        <Image src={'/logo.svg'} alt='logo' width={20} height={20}  className='bg-black rounded-full p-0.5'/>
        <h2 className="font-bold text-2xl">Ghibli AI</h2>
      </div>

      {/* menu */}
      <div className="flex gap-10 items-center">
        {menu.map((item, idx) => (
          <Link key={idx} href={item.path}>
            <h2 className={`text-xl hover:scale-105 transition-all ${
              path === item.path && "font-bold text-amber-800"}`}>
             { item.name }
            </h2>
          </Link>
        )) }
      </div>

      <Link href={"/create"} className="text-lg w-24 h-10 border border-amber-800 bg-amber-900 py-0.5 rounded-lg text-white flex items-center justify-center">
        Create
      </Link>

    </div>
  )
}

export default Header