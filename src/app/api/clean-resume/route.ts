import { NextResponse } from 'next/server'
import { cleanCV } from './cleanCV'

export async function GET (request: Request) {
  try {
    const response = await cleanCV()
    console.log(response)

    return NextResponse.json(response)
  } catch {
    return new Response('No se ha podido transformar el JSON', { status: 500 })
  }
}
