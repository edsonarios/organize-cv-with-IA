import { Education, Experience, PersonalData } from '../responseIA'

export interface Curriculum {
  id: number
  code: string
  name: string
  principal: boolean
  completed: boolean
  incompleteSteps: []
}

export interface Dictionary {
  id: number
  value: string
  order: number
  key: string
  parent?: number
}

export interface ErrorResponse {
  error: string
  error_description: string
  timestamp: string
}

export interface UIErrorResponse {
  type: string
  errorCode: string
  error_description: string
  body: Partial<PersonalData> | Partial<Experience> | Partial<Education>
}

export type ResponsePersonalData = {
  name: string
  surname1: string
  surname2: string
  nationalIdentityCardType: string
  nationalIdentityCard: string
  birthDay: string
  country: string
  province: string
  cityName?: string | undefined
  cityCode?: string | undefined
  zipCode?: string | undefined
  preferredContactPhone: string
  internationalPhone: string
  driverLicenses: string[]
  vehicleOwner: boolean
  freelance: boolean
  nationalities: string[]
  email: string
  segment: string
} | ErrorResponse

interface Expertise {
  skill: string
}

export type ResponseExperience = {
  id: string
  company: string
  job: string
  description: string
  startingDate: string
  finishingDate?: string | undefined
  onCourse: boolean
  category: string
  subcategories: string[]
  industry: string
  level: string
  staff: string
  salaryMin: string
  salaryMax: string
  hideSalary: boolean
  visible: boolean
  reportingTo: string
  expertise: Expertise[]
} | ErrorResponse

export type ResponseEducation = {
  id: number
  educationLevelCode: string
  courseCode?: string | undefined
  courseName?: string | undefined
  startingDate?: string
  finishingDate: string
  stillEnrolled: boolean
  institutionName: string
  hideEducation: boolean
} | ErrorResponse

export interface ResponseRequest {
  personalData: ResponsePersonalData
  experience: ResponseExperience[]
  education: ResponseEducation[]
  UIErrorResponse: UIErrorResponse[]
}
