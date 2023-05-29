import { ErrorResponse } from '@/types/infojobs/response'

export function isError<T> (response: T | ErrorResponse): response is ErrorResponse {
  return (response as ErrorResponse).error !== undefined
}

export function toUpperCamelCase (str: string) {
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

export function manageDate (date: string) {
  if (date === undefined || date === '') return 'PRESENT'
  const newDate = new Date(date)

  return newDate.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}
