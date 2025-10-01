
import { Leaf, Smile, Wand2 } from 'lucide-react'
import React from 'react'

export const features = [
  {
    title: "Dreamlike Style Transfer",
    content: "Transform your photos into enchanting Ghibli-inspired artwork with soft palettes, whimsical lines, and magical atmospheres that capture the spirit of Studio Ghibli worlds.",
    icon: <Wand2 size={20} />
  }, 
  {
    title: "Nature Spirit Generation",
    content: "Generate original Ghibli-style creatures and landscapes — from forest spirits to serene villages — blending natural beauty with fantasy in every scene.",
    icon: <Leaf size={20} />
  },
  {
    title: "Character Reimagination",
    content: "Upload a portrait and see yourself or your characters reimagined in the timeless, warm-hearted Ghibli style — expressive, kind, and full of wonder.",
    icon: <Smile size={20} />
  }
]

const Features = () => {
  return (
    <div className='px-6 mb-20 mt-32'>
      <div className="text-3xl font-semibold flex items-center justify-center mb-8">Ghibli AI Features</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {features.map((feature, idx) => (
          <div key={idx} className="flex flex-col justify-start rounded-2xl shadow-lg border border-gray-200 py-8 px-5">
            <div className="w-10 h-10 rounded-full p-1 bg-gray-200 flex justify-center items-center">
              { feature.icon }
            </div>
            <div className="text-lg font-semibold mt-4 mb-1">{ feature.title }</div>
            <div className="text-md font-light text-gray-600">
              { feature.content }
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default Features