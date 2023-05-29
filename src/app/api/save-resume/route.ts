import { NextResponse } from 'next/server'
import { cleanResponse } from './cleanResponse'
import { makeRequests } from './makeRequests'

export async function POST (request: Request) {
  const data = await request.json()
  console.log(data)
  const json = await cleanResponse(data)
  console.log(json)

  const response = await makeRequests(json)
  console.log(response)

  return NextResponse.json(response)
}
