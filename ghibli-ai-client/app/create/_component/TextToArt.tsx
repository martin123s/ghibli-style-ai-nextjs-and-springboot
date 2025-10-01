import axios from 'axios'
import { ChevronDown, ChevronUp, LoaderCircle, Download, PlusCircle } from 'lucide-react'
import Image from 'next/image'
import React, {useState} from 'react'


const styles = ["anime", "analog-film", "cinematic", "comic-book", "digital-art"]


const TextToArt = () => {

  const [openDropDown, setOpenDropDown] = useState(false)
  const [style, setStyle] = useState<string>("anime")
  const [loading, setLoading] = useState(false)

  const [generatedImg, setGeneratedImg] = useState<string | null>(null)
  const [prompt, setPrompt] = useState<string>('')
  const [errMsg, setErrMsg] = useState<string | null>(null)

  const isDisabled = loading || !prompt.trim()

  // const handleGenerate = async () => {
  //   const payload = { prompt, style }
  //   const API_URL = "http://localhost:8080/api/v1/generate-from-text"
  //   const result = await axios.post(API_URL, payload, {
  //       headers: {'Content-Type': 'application/json'},responseType:'blob',})
  //   const url = URL.createObjectURL(result.data)
  //   setGeneratedImg(url)


  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setErrMsg("Please enter a description for your artwork")
      return
    }
    setLoading(true)
    setErrMsg(null)

    const payload = { prompt, style }
    try {
      const result = await axios.post('/api/text', payload, { responseType: 'blob' })
      const blob = result.data
      const url = URL.createObjectURL(blob)
      setGeneratedImg(url)
    } catch (error) {
      console.log("error generating from text", error)
      setErrMsg("error happening and check the backend")
    } finally {
      setLoading(false)
    }
  }


  const handleDownload = () => {
    if (!generatedImg) return
    const link = document.createElement('a')
    link.href = generatedImg  //url
    link.download = `ghibli-art-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(link.href);
  }

  const handleCreateOne = () => {
    setErrMsg(null)
    setGeneratedImg(null)
    setLoading(false)
    setPrompt('')
    setStyle("anime")
  }

  
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-7'>

      {/* left side showing new image */}
      <div className="relative w-full h-[70vh] border border-gray-200 rounded-xl shadow-xl p-5">
        {generatedImg ?
          <div className="space-y-5">
            <div className="relative w-full h-[55vh]">
              <Image src={generatedImg} alt="generated ghibli art image" fill className="object-cover rounded-xl" />
            </div>
            {/* download and create new one */}
            <div className="w-full h-11 flex justify-between gap-10">
              <div onClick={handleDownload}
                className="w-1/2 gap-3 flex items-center justify-center text-center border border-gray-200 rounded-lg bg-gray-300 cursor-pointer">
                <Download className='text-gray-600' size={20} /> Download
              </div>
              <div onClick={handleCreateOne}
                className="w-1/2 gap-3 flex items-center justify-center text-center border border-gray-200 rounded-lg bg-amber-800 text-white cursor-pointer">
                <PlusCircle className='text-white' size={20} /> Create Another one
              </div>
            </div>
          </div>:
          (loading ?
            <div className="flex flex-col justify-center items-center absolute inset-0 gap-5">
              <div className="text-lg">Loading...</div>
              <div className=" animate-spin"><LoaderCircle size={60} className='text-gray-500'/></div>
            </div> :
            <div className="text-lg font-light rounded-xl border border-gray-200 bg-gray-50 items-center flex justify-center h-full">
              Your generated Ghibli Art Image will appear here
            </div>
          )
        }
      </div>
      
      {/* right side entering */}
      <div className="w-full h-[70vh] border border-gray-200 rounded-xl shadow-xl p-5 space-y-7">
        <div className="text-xl font-bold flex justify-center items-center">
          <span className="text-pink-600 mr-2">Text</span> to Ghibli Art
        </div>

        {/* text entering zone */}
        <div className="mb-1 font-semibold pl-1">Your Description</div>
        <div className="w-full h-56 border border-gray-200 rounded-xl">
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)}
            id='prompt-text' className='w-full h-full border-none focus-visible:ring-0 focus:outline-none p-2 text-md' placeholder='Add your description about the Ghibli art image'></textarea>
        </div>
        

        <div className="mb-1 font-semibold pl-1">Ghibli Art Style</div>
        <div className="relative w-full">
          {/* main box */}
          <div onClick={() => setOpenDropDown(!openDropDown)}
            className="w-full h-10 border border-gray-200 rounded-lg flex items-center justify-between px-3 bg-white cursor-pointer">
            <span className="text-gray-700">{style}</span>
            {openDropDown ? <ChevronDown/> : <ChevronUp/>}
          </div>

          {/* dropdown list */}
          {openDropDown && (
            <ul className="absolute z-10 bottom-full mb-1 w-full border border-gray-200 rounded-lg bg-white shadow-lg">
              {styles.map((opt, idx) => (
                <li key={idx}
                  onClick={() => {   
                    setStyle(opt)
                    setOpenDropDown(false)
                  }}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  {opt}
                </li>
              ))}
            </ul>
          )}
        </div>
          
        <button disabled={isDisabled} onClick={handleGenerate}
          className="w-full h-11 text-lg font-light flex justify-center items-center rounded-xl bg-pink-700 text-white cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed">
          {loading ? "Generating... " : "Generate Ghibli Art Image"}
        </button>

      </div>
    </div>
  )
}

export default TextToArt