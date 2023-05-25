export interface PersonalData {
  name: string
  surname1: string
  surname2: string
  country: string
  province: string
  cityName: string
  preferredContactPhone: string
  internationalPhone: string
  driverLicenses: string[]
  nationalities: string[]
  birthDay: string
}

export interface Experience {
  id: string
  company: string
  job: string
  description: string
  startingDate: string
  finishingDate: string
  onCourse: boolean
  category: string
  subcategories: string[]
  level: string
  visible: boolean
  expertise: Array<{ skill: string }>
}

export interface Education {
  id: string
  educationLevelCode: string
  courseCode: string
  courseName: string
  startingDate: string
  finishingDate: string
  stillEnrolled: boolean
  institutionName: string
}

export interface responseIA {
  personalData: PersonalData
  experience: Experience[]
  education: Education[]
}
