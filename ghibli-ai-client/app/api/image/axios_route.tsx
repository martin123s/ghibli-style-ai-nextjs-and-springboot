import axios from "axios";
import FormData from "form-data";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export async function POST(req: NextRequest) {

  const formData = await req.formData()
  const image = formData.get("image") as File
  const prompt = formData.get("prompt") as string

  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const fd = new FormData()
  fd.append("image", buffer, { filename: image.name }); // 👈 must include filename
  fd.append("prompt", prompt);

  const BASE_URL = process.env.API_URL_IMAGE || ''

  try {
    const result = await axios.post(BASE_URL, fd,{
      headers: fd.getHeaders(), // {'Content-Type': 'application/json'},
      responseType:'arraybuffer',
    })

    return new NextResponse(result.data, {
      status: 200,
      headers: { 'Content-Type': 'image/png'},
    })

  } catch (error:any) {
    return NextResponse.json({ error: error.message || 'API Error' }, { status: 500 })
  }
}