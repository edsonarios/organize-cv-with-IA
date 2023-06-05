import { getCurriculum } from '@/app/services/request'
import { NextResponse } from 'next/server'

export async function GET (request: Request) {
  const response = await getCurriculum()
  console.log(response)
  return NextResponse.json(response)
}
