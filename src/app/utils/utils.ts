import { ErrorResponse } from '@/types/infojobs/response'

export function isError<T> (response: T | ErrorResponse): response is ErrorResponse {
  return (response as ErrorResponse).error !== undefined
}

export function toUpperCamelCase (str: string) {
  if (str === undefined) return ''
  return str
    .toLowerCase()
    .split(/[\s-]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function verifyCity (cityName: string | undefined, cityCode: string | undefined) {
  if (cityName !== undefined) {
    return cityName
  }
  if (cityCode !== undefined) {
    return cityCode
  }
  return ''
}

export function verifyCourseName (courseCode: string | undefined, courseName: string | undefined) {
  if (courseCode !== undefined) {
    return courseCode
  }
  if (courseName !== undefined) {
    return courseName
  }
  return ''
}

export function manageDate (dateStart: string, dateEnd: string) {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  if (dateStart === undefined && dateEnd === undefined) return ''
  if ((dateStart !== '' || dateStart !== undefined) && (dateEnd === undefined || dateEnd === '')) {
    return `${new Date(dateStart).toLocaleDateString(undefined, options)} — PRESENT`
  }
  if ((dateStart === '' || dateStart === undefined) && (dateEnd !== undefined || dateEnd !== '')) {
    return `${new Date(dateEnd).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}`
  }
  // const newDate = new Date(dateStart)

  return `${new Date(dateStart).toLocaleDateString(undefined, options)} — ${new Date(dateEnd).toLocaleDateString(undefined, options)}`
}
