import Prismic from 'prismic-javascript'

export const ENDPOINT = 'https://edoardoguido.cdn.prismic.io/api/v2'
export const PRISMIC = Prismic
export const CLIENT = Prismic.client(ENDPOINT)

export const DEFAULT_LANGUAGE = 'en-gb'
