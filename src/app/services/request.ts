import { ErrorResponse, Dictionary, ResponseEducation, ResponseExperience, Curriculum } from '@/types/infojobs/response'

import { Education, Experience, PersonalData } from '@/types/responseIA'
import { getSession } from 'next-auth/react'

const INFOJOBS_API = 'https://api.infojobs.net/api/'
const CLIENT_ID = process.env.CLIENT_ID ?? ''
const CLIENT_SECRET = process.env.CLIENT_SECRET ?? ''
let infoJobsToken = `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}, `
let TOKEN_INFOJOBS = ''
let CURRICULUM_ID = ''

async function getToken () {
  console.log(TOKEN_INFOJOBS)
  if (TOKEN_INFOJOBS === '') {
    console.log('paso')
    const session = await getSession()
    if (session?.accessToken === undefined) {
      TOKEN_INFOJOBS = process.env.INFOJOBS_TOKEN ?? ''
      // throw new Error('No access token')
    }
    TOKEN_INFOJOBS = session?.accessToken as string
    infoJobsToken += `Bearer ${TOKEN_INFOJOBS}`
  }
}

async function getIdCurriculum () {
  if (CURRICULUM_ID === '') {
    const Curriculum = await getCurriculum() as Curriculum[]
    if (Curriculum[0] !== null) {
      CURRICULUM_ID = Curriculum[0].code
    }
  }
}

export async function getCurriculum () {
  await getToken()
  const response = await fetch('https://api.infojobs.net/api/2/curriculum', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${infoJobsToken}`
    }
  })
  console.log(response)
  const json = await response.json()
  console.log(json)
  return json
}

export async function putCVText (cv: string) {
  await getIdCurriculum()
  const body = { cvtext: cv }
  const response = await fetch(`https://api.infojobs.net/api/1/curriculum/${CURRICULUM_ID}/cvtext`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${infoJobsToken}`
    },
    body: JSON.stringify(body)
  })
  const json = await response.json()
  return json
}

export async function putPersonalData (personalData: PersonalData) {
  await getIdCurriculum()
  const response = await fetch(`${INFOJOBS_API}3/curriculum/${CURRICULUM_ID}/personaldata`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      Authorization: `${infoJobsToken}`
    },
    body: JSON.stringify(personalData)
  })

  const data = await response.json()
  return data
}

export async function putExperience (experience: Experience) {
  await getIdCurriculum()
  const response = await fetch(`${INFOJOBS_API}4/curriculum/${CURRICULUM_ID}/experience`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      Authorization: `${infoJobsToken}`
    },
    body: JSON.stringify(experience)
  })

  const data = await response.json()
  return data
}

export async function putEducation (education: Education) {
  await getIdCurriculum()
  const response = await fetch(`${INFOJOBS_API}2/curriculum/${CURRICULUM_ID}/education`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      Authorization: `${infoJobsToken}`
    },
    body: JSON.stringify(education)
  })

  const data = await response.json()
  return data
}

export async function getDictionary (dictionaryId: string): Promise<Dictionary[]> {
  await getToken()
  const response = await fetch(`${INFOJOBS_API}1/dictionary/${dictionaryId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      Authorization: `${infoJobsToken}`
    }
  })

  const data = await response.json()
  return data
}

export async function getExperiences (): Promise<ResponseExperience[] | ErrorResponse> {
  await getIdCurriculum()
  const response = await fetch(`${INFOJOBS_API}2/curriculum/${CURRICULUM_ID}/experience?timestamp=${new Date().getTime()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      Authorization: `${infoJobsToken}`
    }
  })

  const data = await response.json()
  return data
}

export async function deleteExperience (experienceId: string) {
  await getIdCurriculum()
  const response = await fetch(`${INFOJOBS_API}1/curriculum/${CURRICULUM_ID}/experience/${experienceId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      Authorization: `${infoJobsToken}`
    }
  })
  return response.status
}

export async function getEducations (): Promise<ResponseEducation[]> {
  await getIdCurriculum()
  const response = await fetch(`${INFOJOBS_API}1/curriculum/${CURRICULUM_ID}/education?timestamp=${new Date().getTime()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      Authorization: `${infoJobsToken}`
    }
  })

  const data = await response.json()
  return data
}

export async function deleteEducation (educationId: string) {
  await getIdCurriculum()
  const response = await fetch(`${INFOJOBS_API}1/curriculum/${CURRICULUM_ID}/education/${educationId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      Authorization: `${infoJobsToken}`
    }
  })
  return response.status
}
