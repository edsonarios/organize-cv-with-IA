import { Dictionary, ResponseEducation, ResponseExperience, ResponsePersonalData, UIErrorResponse } from '@/types/infojobs/response'
import { Education, Experience, PersonalData, responseIA } from '@/types/responseIA'
import { isError } from '@/utils/utils'

const infoJobsToken = process.env.INFOJOBS_TOKEN ?? ''
const INFOJOBS_API = 'https://api.infojobs.net/api/'
const CURRICULUM_ID = 'd1e4835e-bf61-4d26-8785-5ac4833ec415'

export async function putPersonalData (personalData: PersonalData) {
  console.log(personalData)

  const response = await fetch(`${INFOJOBS_API}3/curriculum/${CURRICULUM_ID}/personaldata`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${infoJobsToken}`
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
      Authorization: `Basic ${infoJobsToken}`
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
      Authorization: `Basic ${infoJobsToken}`
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
      Authorization: `Basic ${infoJobsToken}`
    }
  })

  const data = await response.json()
  console.log(data)
  return data
}

export async function madeRequests (data: responseIA) {
  let personalDataResult: ResponsePersonalData | null = null
  let experienceResult: ResponseExperience [] = []
  let educationResult: ResponseEducation [] = []
  const UIErrorResponse: UIErrorResponse[] = []

  try {
    if (Object.keys(data.personalData).length > 0) {
      personalDataResult = await putPersonalData(data.personalData)
      if ((personalDataResult != null) && isError(personalDataResult)) {
        UIErrorResponse.push({
          type: 'personalData',
          errorCode: personalDataResult.error,
          error_description: personalDataResult.error_description,
          body: data.personalData
        })
        personalDataResult = null
      }
    }

    if (Object.keys(data.experience).length > 0) {
      const promises = data.experience.map(putExperience)
      experienceResult = await Promise.all(promises)
      experienceResult.forEach((res, i) => {
        if (isError(res)) {
          UIErrorResponse.push({
            type: 'experience',
            errorCode: res.error,
            error_description: res.error_description,
            body: data.experience[i]
          })
        }
      })
      experienceResult = experienceResult.filter(result => !isError(result))
    }

    if (Object.keys(data.education).length > 0) {
      const promises = data.education.map(putEducation)
      educationResult = await Promise.all(promises)
      educationResult.forEach((res, i) => {
        if (isError(res)) {
          UIErrorResponse.push({
            type: 'education',
            errorCode: res.error,
            error_description: res.error_description,
            body: data.education[i]
          })
        }
      })
      educationResult = educationResult.filter(result => !isError(result))
    }
  } catch (error) {
    console.log(error)
  }

  return {
    personalData: personalDataResult,
    experience: experienceResult,
    education: educationResult,
    UIErrorResponse
  }
}
