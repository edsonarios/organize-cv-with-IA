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

export function manageDate (date: string) {
  if (date === undefined || date === '') return ''
  const newDate = new Date(date)

  return newDate.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}
