"use client"

import React, { useState } from 'react'
import PhotoToArt from './_component/PhotoToArt'
import TextToArt from './_component/TextToArt'


const page = () => {

  const [onText, setOnText] = useState("photo")

  return (
    <div className='mt-28 px-6 mb-36'>
      <div className="mb-10">
        <div className="flex justify-center items-center gap-8">
          <span onClick={() => setOnText("photo")}
            className={`text-lg font-semibold w-32 h-11 p-2 flex items-center justify-center cursor-pointer border-b-2 ${onText === "photo" ? "text-amber-900 border-b-amber-900" : "text-gray-500 border-transparent"}`}>Photo to Art</span>
          <span onClick={() => setOnText("text")}
            className={`text-lg font-semibold w-32 h-11 p-2 flex items-center justify-center border-b-2 cursor-pointer ${onText === "text" ? "text-amber-900 border-b-amber-900" : "text-gray-500 border-transparent"}`}>Text to Art</span>
        </div>
        <div className="w-full h-0.25 bg-gray-300"></div>
      </div>
      { onText === 'photo' ? <PhotoToArt/> : <TextToArt/>}
    </div>
  )
}

export default page