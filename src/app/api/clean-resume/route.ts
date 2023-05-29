import { NextResponse } from 'next/server'
import { cleanCV } from './cleanCV'
import { isError } from '@/app/utils/utils'

export async function GET (request: Request) {
  try {
    const response = await cleanCV()
    console.log(response)
    // if (isError(response)) {
    //   // throw new Error('Error mio: ')
    //   return new Response('Error', { statusText: response.error_description, status: 500 })
    // }
    return NextResponse.json(response)
  } catch {
    return new Response('No se ha podido transformar el JSON', { status: 500 })
  }
}
