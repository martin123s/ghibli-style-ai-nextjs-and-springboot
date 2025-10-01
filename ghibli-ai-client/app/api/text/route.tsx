import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {

  const { prompt, style } = await req.json()
  const payload = { prompt, style }

  const BASE_URL = process.env.API_URL_TEXT || ''

  try {
    const result = await axios.post(BASE_URL, payload, {
      headers: {'Content-Type': 'application/json'},
      responseType:'arraybuffer',
    })

    const buffer = result.data
    return new NextResponse(buffer, {
      status: 200,
      headers: { 'Content-Type': 'image/png'},
    })

  } catch (error:any) {
    return NextResponse.json({ error: error.message || 'API Error' }, { status: 500 })
  }
}