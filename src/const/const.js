import Prismic from 'prismic-javascript'

export const ENDPOINT = 'https://edoardoguido.cdn.prismic.io/api/v2'
export const PRISMIC = Prismic
export const CLIENT = Prismic.client(ENDPOINT)

export const DEFAULT_LANGUAGE = 'en-gb'

export const TRANSITION_DURATION = 0.5
export const TRANSITION_EASE_IN = [0.25, 0, 0, 0.85]
export const TRANSITION_EASE_OUT = [0.75, 0, 0, 0.25]

export const TRANSITION_PROPS = {
  enter: { duration: TRANSITION_DURATION, ease: TRANSITION_EASE_IN },
  exit: { duration: TRANSITION_DURATION, ease: TRANSITION_EASE_OUT },
}

export const LOCALE_OPTIONS = {
  month: 'short',
  year: 'numeric',
}
