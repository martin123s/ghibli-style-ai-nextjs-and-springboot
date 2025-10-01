import axios from 'axios'
import { CloudUpload, Download, LoaderCircle, PlusCircle } from 'lucide-react'
import Image from 'next/image'
import React, {useCallback, useEffect, useState} from 'react'
import { useDropzone } from 'react-dropzone'



const PhotoToArt = () => {
  
  const [loading, setLoading] = useState(false)
  const [uploadImg, setUploadImg] = useState<File[]>([])
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const [generatedImg, setGeneratedImg] = useState<string | null>(null)
  const [prompt, setPrompt] = useState<string>('')
  const [errMsg, setErrMsg] = useState<string | null>(null)

  const isDisabled = loading || uploadImg.length === 0
  const handleGenerate = async () => {
    if (uploadImg.length === 0) return
    setLoading(true)

    const formData = new FormData()
    formData.append("image", uploadImg[0])
    formData.append("prompt", prompt)

    try {
      // const result = await axios.post('/api/image', formData, { responseType: 'blob' })
      // const blob = result.data

      const result = await fetch("/api/image", {
        method: 'POST',
        body: formData
      })
      const blob = await result.blob()
      
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

    // const url = URL.createObjectURL(generatedImg)
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
    setPreviewUrl(null)
    setUploadImg([])
  }

  useEffect(() => {
    if (uploadImg.length > 0) {
      const imgUrl = URL.createObjectURL(uploadImg[0])
      setPreviewUrl(imgUrl)

      return () => {
        URL.revokeObjectURL(imgUrl)
      }
    } else {
      setPreviewUrl(null)
    }
  }, [uploadImg])
  

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadImg(acceptedFiles)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': []},
    multiple: true,
  })


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
      <div className="w-full h-[70vh] border border-gray-200 rounded-xl shadow-xl p-5 space-y-5">
        <div>
          <>
            {uploadImg.length > 0 ?
              <div className="text-lg font-light text-pink-600 flex justify-center items-center mb-2">
                {uploadImg.length} file{uploadImg.length > 1 ? "s" : ""} selected.
                {uploadImg.length > 1 && (<> Only the First image will be used for generation.</>)}
              </div>:
              <div className="text-xl font-bold flex justify-center items-center mb-2">
                Photo to Ghibli Art
              </div> 
              }
          </>
          
          {previewUrl ?
            <div className='relative w-full h-72'>
              <Image src={previewUrl} alt="user upload image" fill className="object-cover rounded-lg"/>
            </div> :
            <div {...getRootProps()}
              className="w-full h-72 border border-dashed rounded-xl flex flex-col justify-center items-center cursor-pointer gap-4">
              <input {...getInputProps()} 
                className='w-full h-full hidden'
                type="file" accept="image/*" multiple
              />
              <CloudUpload size={50} className=' text-gray-400'/>
              {isDragActive ?
                <p className='text-lg font-light text-center text-pink-600'>Drop the image here ...</p> :
                <div className="flex flex-col justify-center items-center gap-3">
                  <p className='text-lg font-light'>Drag and drop your image here, Or</p>
                  <div className="w-36 h-10 bg-gray-300 rounded-xl flex items-center justify-center">
                    Browse files
                  </div>
                </div>
              }
            </div>
          }
        </div>
        <div className="mb-1 font-semibold pl-1">Additional Details</div>
        <div className="w-full h-16 border border-gray-200 rounded-xl">
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)}
            className='w-full h-16 border-none focus-visible:ring-0 focus:outline-none p-2 text-md' placeholder='Add any specific details or enhancements'></textarea>
        </div>
          
        <button onClick={handleGenerate} disabled={isDisabled} className="w-full h-11 text-lg font-light flex justify-center items-center rounded-xl bg-pink-700 text-white cursor-pointer shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed">
          {loading ? "Generating... " : "Transform to Ghibli Art"}
        </button>

      </div>
    </div>
  )
}

export default PhotoToArt