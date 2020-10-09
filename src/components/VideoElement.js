import React from 'react'
import { getFilenameExtention } from '../lib/utils'

export const VideoElement = ({
  url,
  poster,
  filename = '.mp4',
  className,
  fit: objectFit = 'cover',
}) => {
  return (
    <video
      className={className}
      loop
      muted
      autoPlay
      playsInline
      src={url}
      poster={poster}
      type={`video/${getFilenameExtention(filename)}`}
      style={{
        objectFit,
      }}
    />
  )
}
