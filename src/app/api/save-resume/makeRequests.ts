import { ResponseEducation, ResponseExperience, ResponsePersonalData, UIErrorResponse } from '@/types/infojobs/response'
import { responseIA } from '@/types/responseIA'
import { putPersonalData, putExperience, putEducation } from '../../services/request'
import { isError } from '@/app/utils/utils'

export async function makeRequests (data: responseIA) {
  let personalDataResult: ResponsePersonalData | null = null
  let experienceResult: ResponseExperience [] = []
  let educationResult: ResponseEducation [] = []
  const UIErrorResponse: UIErrorResponse[] = []

  try {
    if (Object.keys(data.personalData).length > 0) {
      personalDataResult = await putPersonalData(data.personalData)
      if ((personalDataResult != null) && isError(personalDataResult)) {
        UIErrorResponse.push({
          type: 'Datos personales',
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
            type: 'Experiencia',
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
            type: 'Educacion',
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
