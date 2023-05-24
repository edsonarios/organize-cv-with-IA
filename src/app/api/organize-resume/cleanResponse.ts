// import { Response } from '@/types/infojobs/response'
import { Education, Experience, PersonalData, responseIA } from '@/types/responseIA'
import { getDictionary } from './request'
const DICTIONARY_COUNTRY = 'country'
const DICTIONARY_PROVINCE = 'province'
const OTRO = 'otro'
const OTRO_PAIS = 'otro-pais'

export const cleanResponse = async (data: responseIA) => {
  console.log(data)
  if (Object.keys(data.personalData).length > 0) {
    console.log(data.personalData)
    data.personalData = await cleanPersonalData(data.personalData)
    console.log(data.personalData)
  }
  if (Object.keys(data.experience).length > 0) {
    console.log(data.experience)
    data.experience = data.experience.map(cleanExperience)
    console.log(data.experience)
  }
  if (Object.keys(data.education).length > 0) {
    console.log(data.education)
    data.education = data.education.map(cleanEducation)
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

const cleanExperience = (experience: Experience) => {
  return experience
}

const cleanEducation = (education: Education) => {
  return education
}
