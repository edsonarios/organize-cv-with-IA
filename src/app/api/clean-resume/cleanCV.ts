import { isError } from '@/app/utils/utils'
import { deleteEducation, deleteExperience, getEducations, getExperiences } from '../../services/request'

export async function cleanCV () {
  const responseExperience = await getExperiences()
  console.log(responseExperience)
  if (!isError(responseExperience)) {
    // @ts-expect-error
    const experiences = responseExperience.experience
    console.log(experiences)
    console.log(experiences.length)
    if (experiences.length > 0) {
      console.log(experiences)
      // @ts-expect-error
      await Promise.all(experiences.map(async (experience) => await deleteExperience(experience.id)))
    }
  }
  const responseEducation = await getEducations()
  console.log(responseEducation)
  if (!isError(responseEducation)) {
    // @ts-expect-error
    const educations = responseEducation.education
    console.log(educations)
    console.log(educations.length)
    if (educations.length > 0) {
      console.log(educations)
      // @ts-expect-error
      await Promise.all(educations.map(async (education) => await deleteEducation(education.id)))
    }
  }
  return responseEducation
}
