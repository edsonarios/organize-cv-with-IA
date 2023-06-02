import { putCVText } from '@/app/services/request'
import { NextResponse } from 'next/server'

export async function PUT (request: Request) {
  const { searchParams } = new URL(request.url)
  let cv = ''
  if (searchParams.has('cv')) {
    const cvParam = searchParams.get('cv')
    if (cvParam !== null) {
      cv = decodeURIComponent(cvParam)
    }
  }
  const data = await putCVText(cv)
  console.log(data)
  return NextResponse.json(data)
}
