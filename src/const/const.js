import Prismic from 'prismic-javascript'

export const ENDPOINT = 'https://edoardoguido.cdn.prismic.io/api/v2'
export const PRISMIC = Prismic
export const CLIENT = Prismic.client(ENDPOINT)

export const DEFAULT_LANGUAGE = 'en-gb'

export const TRANSITION_DURATION = 0.5
export const TRANSITION_PROPS = {
  enter: { duration: TRANSITION_DURATION, ease: [0.25, 0, 0, 1] },
  exit: { duration: TRANSITION_DURATION, ease: [0.75, 0, 0, 0.25] },
}
export const ROUTE_SCROLLTOP_TIMEOUT = 900
