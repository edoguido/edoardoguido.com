import { LOCALE_OPTIONS } from '../const/const'

export function getFilenameExtention(fileName) {
  return fileName.split('.')[1]
}

export function formatDate(date, langCode) {
  return new Date(date).toLocaleString(langCode, LOCALE_OPTIONS)
}
