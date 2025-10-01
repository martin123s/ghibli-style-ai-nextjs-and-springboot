import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {

  const formData = await req.formData()
  const BASE_URL = process.env.API_URL_IMAGE || ''

  try {
    const result = await fetch(BASE_URL, {
      method: "POST",
      body: formData
    })

    const buffer = await result.arrayBuffer();
    return new NextResponse(buffer, {
      status: 200,
      headers: { 'Content-Type': 'image/png'},
    })

  } catch (error:any) {
    return NextResponse.json({ error: error.message || 'API Error' }, { status: 500 })
  }
}