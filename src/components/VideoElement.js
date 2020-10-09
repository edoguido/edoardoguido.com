import React, { useState } from 'react'
import { getFilenameExtention } from '../lib/utils'

export const VideoElement = ({
  url,
  poster,
  filename = '.mp4',
  plays = false,
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

  function onLoadHandler() {
    setLoaded(true)
  }

  return (
    <video
      // ref={ref}
      loop
      muted
      autoPlay={plays}
      playsInline={plays}
      src={url}
      poster={poster}
      type={`video/${getFilenameExtention(filename)}`}
      onLoadStartCapture={onLoadHandler}
      style={{
        objectFit,
        opacity: 1,
        transform: `translateY(0)`,
      }}
    />
  )
}
