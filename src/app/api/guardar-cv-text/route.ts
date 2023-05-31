import { NextResponse } from 'next/server'

const infoJobsToken = process.env.INFOJOBS_TOKEN ?? ''

export async function PUT (request: Request) {
  const { searchParams } = new URL(request.url)
  let cv = ''
  if (searchParams.has('cv')) {
    const cvParam = searchParams.get('cv')
    if (cvParam !== null) {
      cv = decodeURIComponent(cvParam)
    }
  }
  const body = { cvtext: cv }
  const response = await fetch('https://api.infojobs.net/api/1/curriculum/d1e4835e-bf61-4d26-8785-5ac4833ec415/cvtext', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${infoJobsToken}`
    },
    body: JSON.stringify(body)
  })
  const data = await response.json()
  if (data.error !== null) {
    const errorMessage = data.error_description
    return new Response('Error', { statusText: errorMessage })
  }
  return NextResponse.json(data)
}
