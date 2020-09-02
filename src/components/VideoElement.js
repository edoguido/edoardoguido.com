import React, { useState /* , useRef, useEffect */ } from 'react'
import { filenameExtention } from '../lib/utils'

export const VideoElement = ({
  url,
  filename = '.mp4',
  fit: objectFit = 'cover',
}) => {
  const [loaded, setLoaded] = useState(false)

  // const ref = useRef()
  // useEffect(() => {
  //   let animationFrameID

  //   function getSection() {
  //     animationFrameID = window.requestAnimationFrame(getSection)

  //     const scrollTop = window.scrollY
  //     const scrollBottom = scrollTop + window.innerHeight
  //     const { offsetTop, offsetHeight } = ref.current.parentElement

  //     if (scrollTop < offsetTop + offsetHeight && scrollBottom > offsetTop) {
  //       ref.current.play()
  //     } else ref.current.pause()
  //   }

  //   getSection()

  //   return () => {
  //     window.cancelAnimationFrame(animationFrameID)
  //   }
  // }, [])

  return (
    <video
      // ref={ref}
      muted
      loop
      autoPlay
      src={url}
      type={`video/${filenameExtention(filename)}`}
      onLoadedData={() => setLoaded(true)}
      style={{
        objectFit,
        opacity: loaded ? 1 : 0,
        transform: `translateY(${loaded ? 0 : 3}%)`,
      }}
    />
  )
}
