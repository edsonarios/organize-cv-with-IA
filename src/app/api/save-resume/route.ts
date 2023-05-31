import { NextResponse } from 'next/server'
import { cleanResponse } from './cleanResponse'
import { makeRequests } from './makeRequests'

export async function POST (request: Request) {
  const data = await request.json()
  const json = await cleanResponse(data)

  const response = await makeRequests(json)

  return NextResponse.json(response)
}
