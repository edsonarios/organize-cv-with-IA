import { ErrorResponse, Dictionary, ResponseEducation, ResponseExperience } from '@/types/infojobs/response'

import { Education, Experience, PersonalData } from '@/types/responseIA'

const infoJobsToken = process.env.INFOJOBS_TOKEN ?? ''
const INFOJOBS_API = 'https://api.infojobs.net/api/'
const CURRICULUM_ID = 'd1e4835e-bf61-4d26-8785-5ac4833ec415'

export async function putPersonalData (personalData: PersonalData) {
  console.log(personalData)

  const response = await fetch(`${INFOJOBS_API}3/curriculum/${CURRICULUM_ID}/personaldata`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      Authorization: `${infoJobsToken}`
    },
    body: JSON.stringify(personalData)
  })

  console.log(response)
  const data = await response.json()
  console.log(data)
  return data
}

export async function putExperience (experience: Experience) {
  console.log(experience)

  const response = await fetch(`${INFOJOBS_API}4/curriculum/${CURRICULUM_ID}/experience`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      Authorization: `${infoJobsToken}`
    },
    body: JSON.stringify(experience)
  })

  console.log(response)
  const data = await response.json()
  console.log(data)
  return data
}

export async function putEducation (education: Education) {
  console.log(education)

  const response = await fetch(`${INFOJOBS_API}2/curriculum/${CURRICULUM_ID}/education`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      Authorization: `${infoJobsToken}`
    },
    body: JSON.stringify(education)
  })

  console.log(response)
  const data = await response.json()
  console.log(data)
  return data
}

export async function getDictionary (dictionaryId: string): Promise<Dictionary[]> {
  console.log('getDictionary', dictionaryId)

  const response = await fetch(`${INFOJOBS_API}1/dictionary/${dictionaryId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      Authorization: `${infoJobsToken}`
    }
  })

  const data = await response.json()
  console.log(data)
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
  console.log(data)
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
  console.log(response)
  console.log(response.status)
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
  console.log(data)
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
  console.log(response)
  console.log(response.status)
  return response.status
}
