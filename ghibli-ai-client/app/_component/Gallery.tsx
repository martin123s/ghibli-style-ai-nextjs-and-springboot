import { Book, Sparkles, Wand2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { features } from './Features'

const images = ["/marnie002.jpg", "/marnie004.jpg", "/marnie028.jpg", "/marnie048.jpg"]
const photoToGhibli = [{
    title: "Magical Transformation",
    content: "Instantly convert portraits, landscapes, or snapshots into Ghibli-inspired artwork with soft brush strokes and cinematic charm.",
    icon: <Wand2 className="w-6 h-6 text-pink-600" />,
  },
  {
    title: "Whimsical Details",
    content: "Add imaginative elements like glowing skies, floating lanterns, or gentle motion that capture the dreamlike Ghibli aesthetic.",
    icon: <Sparkles className="w-6 h-6 text-yellow-500" />,
  },
  {
    title: "Personal Storytelling",
    content: "Each artwork feels like a scene from a Ghibli film, letting you reimagine your own memories as part of a fantastical narrative.",
    icon: <Book className="w-6 h-6 text-green-600" />,
  },]

const Gallery = () => {
  return (
    <div className='px-6 mb-20 mt-32'>
      <div className="text-3xl font-semibold flex items-center justify-center mb-8">Magical Ghibli AI Transformation Gallery</div>

      {/* show images list */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-10">
        {images.map((img, index) => (
          <div key={index} className="relative w-full h-72">
            <Image src={img} alt={"ghibli art image"} fill className="object-cover rounded-lg hover:scale-105 transform transition-transform duration-150"/>
          </div>
        ))}
      </div>

      {/* show image and features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {features.slice(0, 2).map((feature, idx) => (
          <div key={idx} className="border border-gray-200 rounded-lg shadow-lg px-5 py-8 flex flex-col gap-3">
            <div className="font-bold text-lg">{feature.title}</div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative w-full h-60">
                <Image src="/marnie002.jpg" alt={"ghibli art image"} fill className="object-cover rounded-lg"/>
              </div>
              <div className="relative w-full h-60">
                <Image src="/marnie048.jpg" alt={"ghibli art image"} fill className="object-cover rounded-lg"/>
              </div>
            </div>
            <div className="text-gray-500 mt-2">{feature.content}</div>
          </div>
        ))}
      </div>

      {/* more detail features */}
      <div className="flex flex-row justify-start gap-5 mt-12">
        <div className="w-full bg-gray-50 p-4 rounded-xl">
          <div className="font-bold text-lg my-3">Photo to Ghibli Art</div>
          <div className="text-gray-500">
            Photo to Ghibli Art transforms your everyday photos into enchanting illustrations inspired by Studio Ghibli’s signature style. With soft pastel colors, dreamy lighting, and whimsical details, it brings the warmth and nostalgia of Ghibli movies into your personal moments.
          </div>

          <div className="flex flex-col mt-8 space-y-5">
            {photoToGhibli.map((value, key) => (
              <div key={key} className="flex flex-row gap-3">
                <div className="p-2 border border-gray-200 rounded-full w-10 h-10">{value.icon}</div>
                <div className="flex flex-col">
                  <span className="text-normal font-semibold">{value.title}</span>
                  <span className="text-gray-500 font-light">{ value.content}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative h-[70vh] w-full">
          <Image src="/marnie004.jpg" alt={"ghibli art image"} fill className="object-cover rounded-lg"/>
        </div>
      </div>

      {/* picture come from */}
      <div className="text-sm font-light text-gray-500 mt-2">
        Note: ALL the images listed above come from:
        <a href="https://www.ghibli.jp/works/marnie/" className="">https://www.ghibli.jp/works/marnie/</a>
      </div>
      
    </div>
  )
}

export default Gallery