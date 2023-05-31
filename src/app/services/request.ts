import { ErrorResponse, Dictionary, ResponseEducation, ResponseExperience } from '@/types/infojobs/response'

import { Education, Experience, PersonalData } from '@/types/responseIA'

const infoJobsToken = process.env.INFOJOBS_TOKEN ?? ''
const INFOJOBS_API = 'https://api.infojobs.net/api/'
const CURRICULUM_ID = 'd1e4835e-bf61-4d26-8785-5ac4833ec415'

export async function putCVText () {
  const response = await fetch('https://api.infojobs.net/api/7/offer?category=informatica-telecomunicaciones', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${infoJobsToken}`
    }
  })
  const json = await response.json()

  return json
}

export async function putPersonalData (personalData: PersonalData) {
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
