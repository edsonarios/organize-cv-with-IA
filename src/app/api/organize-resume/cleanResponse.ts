import { Education, Experience, PersonalData, responseIA } from '@/types/responseIA'
import { getDictionary } from '../../services/request'
import { Dictionary } from '@/types/infojobs/response'

const DICTIONARY_COUNTRY = 'country'
const DICTIONARY_PROVINCE = 'province'
const OTRO = 'otro'
const OTRO_PAIS = 'otro-pais'

const LEVEL = 'professional-level'
const CATEGORY = 'category'
const SUBCATEGORY = 'subcategory'
const STUDY = 'study'
const STUDY_DETAIL = 'study-detail'

let levelPromise: Promise<Dictionary[]> | null = null
let categoryPromise: Promise<Dictionary[]> | null = null
let subcategoryPromise: Promise<Dictionary[]> | null = null
let educationPromise: Promise<Dictionary[]> | null = null
let courseCodePromise: Promise<Dictionary[]> | null = null

export const cleanResponse = async (data: responseIA) => {
  console.log(data)
  if (Object.keys(data.personalData).length > 0) {
    console.log(data.personalData)
    data.personalData = await cleanPersonalData(data.personalData)
    console.log(data.personalData)
  }
  if (Object.keys(data.experience).length > 0) {
    console.log(data.experience)
    data.experience = await Promise.all(data.experience.map(cleanExperience))
    console.log(data.experience)
  }
  if (Object.keys(data.education).length > 0) {
    console.log(data.education)
    data.education = await Promise.all(data.education.map(cleanEducation))
    console.log(data.education)
  }
  return data
}

const cleanPersonalData = async (personalData: PersonalData) => {
  // Validade countrys
  const countrys = await getDictionary(DICTIONARY_COUNTRY)
  personalData.country = personalData.country.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ñ/g, 'n').replace(/ü/g, 'u')
  const country = countrys.find((country) => country.key === personalData.country)
  if (country == null) {
    personalData.country = OTRO
  }

  // Validate province
  personalData.province = personalData.province.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ñ/g, 'n').replace(/ü/g, 'u')
  if (personalData.country !== OTRO) {
    if (personalData.country !== personalData.province) {
      const provinces = await getDictionary(DICTIONARY_PROVINCE)
      const provincesFromCountry = provinces.filter(province => province.parent === country?.id)
      const province = provincesFromCountry.find((province) => province.key === personalData.province)
      if (province == null) {
        personalData.province = OTRO_PAIS
      }
    }
  } else {
    personalData.province = OTRO_PAIS
  }

  // validate zipCode
  if (personalData.country === 'espana' && personalData.zipCode === '') {
    personalData.zipCode = '10000'
  }

  // Validate nationalities
  personalData.nationalities = personalData.nationalities.map(nationaliti => nationaliti.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ñ/g, 'n').replace(/ü/g, 'u'))
  const countryKeys = countrys.map(country => country.key)
  personalData.nationalities = personalData.nationalities.filter(nationality => countryKeys.includes(nationality))
  if (personalData.nationalities.length === 0) {
    personalData.nationalities = ['otro']
  }

  // Validar formato de birthDay
  const birthDayPattern = /^\d{4}-\d{2}-\d{2}$/
  if (!birthDayPattern.test(personalData.birthDay)) {
    personalData.birthDay = '1990-01-01'
  }
  return personalData
}

const cleanExperience = async (experience: Experience) => {
  if (levelPromise == null) {
    levelPromise = getDictionary(LEVEL)
  }
  const level = await levelPromise

  // Validate level
  const levelKeys = level.map(level => level.key)
  if (!levelKeys.includes(experience.level)) {
    experience.level = 'seleccionar'
  }

  if (categoryPromise == null) {
    categoryPromise = getDictionary(CATEGORY)
  }
  const category = await categoryPromise

  // Validate category
  const categoryKeys = category.map(category => category.key)
  if (!categoryKeys.includes(experience.category)) {
    experience.category = 'otros'
  }
  console.log(experience.subcategories.length)
  console.log(experience.subcategories.some(subcategory => subcategory.includes('-')))
  // Validate subcategory
  if (experience.subcategories.length > 0 && !experience.subcategories.some(subcategory => subcategory.includes('-'))) {
    if (subcategoryPromise == null) {
      subcategoryPromise = getDictionary(SUBCATEGORY)
    }
    const subcategory = await subcategoryPromise

    console.log(subcategory)
    const categoryValid = category.find((category) => category.key === experience.category)
    console.log(categoryValid)
    const subcategoryFromCategoryValid = subcategory.filter(subcategory => subcategory.parent === categoryValid?.id)
    console.log(subcategoryFromCategoryValid)
    const subcategoryKeys = subcategoryFromCategoryValid.map(subcategory => subcategory.key)
    console.log(subcategoryKeys)
    experience.subcategories = experience.subcategories.filter(subcategory => subcategoryKeys.includes(subcategory) && subcategory !== '-')
    if (experience.subcategories.length === 0) {
      experience.subcategories = ['-']
    }
  } else {
    experience.subcategories = ['-']
  }

  // Validate startingDate
  const datePattern = /^\d{4}-\d{2}-\d{2}$/
  if (!datePattern.test(experience.startingDate)) {
    experience.startingDate = '1990-01-01'
  }
  // Validate finishingDate
  if (!datePattern.test(experience.finishingDate)) {
    experience.finishingDate = '1990-01-01'
  }
  if (experience.onCourse) {
    experience.finishingDate = ''
  }

  return experience
}

const cleanEducation = async (education: Education) => {
  if (educationPromise == null) {
    educationPromise = getDictionary(STUDY)
  }
  const educationCode = await educationPromise

  // Validate educacionLevelCode
  const educationCodeKey = educationCode.map(education => education.key)
  if (!educationCodeKey.includes(education.educationLevelCode)) {
    education.educationLevelCode = 'bachillerato'
  }

  // Validate courseCode
  console.log(education.courseCode)
  const conditionToCoureCodeFromEducationLevelCode = ['postgrado', 'master', 'otros-titulos-certificaciones-y-carnes', 'otros-cursos-y-formacion-no-reglada']
  const condition = conditionToCoureCodeFromEducationLevelCode.includes(education.educationLevelCode)

  if (!condition) {
    if (courseCodePromise == null) {
      courseCodePromise = getDictionary(STUDY_DETAIL)
    }
    const courseCode = await courseCodePromise

    const educationLevelCodeValid = educationCode.find((educationCode) => educationCode.key === education.educationLevelCode)
    console.log(educationLevelCodeValid)

    const courseCodeValid = courseCode.filter(courseCode => courseCode.parent === educationLevelCodeValid?.id)

    console.log(courseCodeValid)
    const courseCodeKeys = courseCodeValid.map(courseCode => courseCode.key)

    console.log(education.courseCode)
    console.log(courseCodeKeys.includes(education.courseCode))
    if (!courseCodeKeys.includes(education.courseCode)) {
      education.educationLevelCode = 'otros-cursos-y-formacion-no-reglada'
      education.courseCode = ''
    }
  } else {
    education.courseCode = ''
  }
  console.log(education.courseCode)

  // Validate courseName
  console.log(education.courseName)
  if (condition && education.courseName === '' && education.institutionName !== '') {
    console.log(education.courseName)
    education.courseName = education.institutionName
  }
  if (condition && education.courseName === '' && education.institutionName === '') {
    console.log(education.courseName)
    education.courseName = education.educationLevelCode
  }
  console.log(education.courseName)
  // Validate startingDate
  const datePattern = /^\d{4}-\d{2}-\d{2}$/
  if (!datePattern.test(education.startingDate)) {
    education.startingDate = '1990-01-01'
  }
  // Validate finishingDate
  if (!datePattern.test(education.finishingDate)) {
    education.finishingDate = '1990-01-01'
  }
  if (education.educationLevelCode === 'otros-titulos-certificaciones-y-carnes') {
    education.finishingDate = (education.startingDate !== '') ? education.startingDate : education.finishingDate
    education.startingDate = ''
    education.stillEnrolled = false
  }
  if (education.stillEnrolled && education.educationLevelCode !== 'otros-titulos-certificaciones-y-carnes') {
    education.finishingDate = ''
  }
  return education
}
