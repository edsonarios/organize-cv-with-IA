import { isError } from '@/app/utils/utils'
import { deleteEducation, deleteExperience, getEducations, getExperiences } from '../../services/request'

export async function cleanCV () {
  const responseExperience = await getExperiences()
  if (!isError(responseExperience)) {
    // @ts-expect-error
    const experiences = responseExperience.experience
    if (experiences.length > 0) {
      // @ts-expect-error
      await Promise.all(experiences.map(async (experience) => await deleteExperience(experience.id)))
    }
  }
  const responseEducation = await getEducations()
  if (!isError(responseEducation)) {
    // @ts-expect-error
    const educations = responseEducation.education
    if (educations.length > 0) {
      // @ts-expect-error
      await Promise.all(educations.map(async (education) => await deleteEducation(education.id)))
    }
  }
  return responseEducation
}
