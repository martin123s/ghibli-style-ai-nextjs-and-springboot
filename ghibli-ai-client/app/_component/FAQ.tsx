import React from 'react'

const faqs = [
  { title: "What is Ghibli-style art?", content: "Ghibli-style art refers to artwork inspired by the magical worlds of Studio Ghibli films. It captures the studio’s signature elements—dreamlike scenery, whimsical characters, and soft color palettes that evoke warmth and nostalgia." },
  { title: "How does Photo to Ghibli Art work?", content: "Our AI model takes your uploaded photo and applies a style transfer process that mimics the Ghibli aesthetic. This includes adding painterly brush textures, cinematic color tones, and the cozy atmosphere that Ghibli movies are famous for." },
  { title: "Do I need artistic skills to create Ghibli-inspired art?", content: "Not at all. The transformation process is automated. You simply upload a photo, and the AI does the rest. If you want more control, you can fine-tune settings like color tone, detail level, or mood, but no prior art experience is required." },
  { title: "Is the generated Ghibli art free to use?", content: "That depends on the tool or service you’re using. Many apps allow you to use your generated images for personal use, such as social media sharing, wallpapers, or gifts. For commercial use (like selling prints), always check the usage rights and licensing terms first." },
]

const FAQ = () => {
  return (
    <div className='px-6 mb-20 mt-32'>
      <div className="text-3xl font-bold flex items-center justify-center mb-8">Frequently Asked Questions about Ghibli AI</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {faqs.map((faq, idx) => (
          <div key={idx} className="flex flex-col gap-3 p-6 border border-gray-100 shadow-lg rounded-xl">
            <div className="font-bold text-xl">{faq.title}</div>
            <div className="font-light text-gray-500">{faq.content}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQ