'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function VideoFacade() {
  const [isLoaded, setIsLoaded] = useState(false)

  const wrapperStyle: React.CSSProperties = {
    position:        'relative',
    paddingTop:      '56.25%',
    borderRadius:    '20px',
    overflow:        'hidden',
    backgroundColor: 'transparent',
    boxShadow:       '0 32px 80px rgba(147,86,56,0.18), 0 8px 24px rgba(0,0,0,0.10)',
    cursor:          isLoaded ? 'default' : 'pointer',
  }

  const innerStyle: React.CSSProperties = {
    position: 'absolute',
    top:      0,
    left:     0,
    width:    '100%',
    height:   '100%',
  }

  if (isLoaded) {
    return (
      <div style={wrapperStyle}>
        <iframe
          src="https://player.vimeo.com/video/1172647016?dnt=1&autoplay=1&badge=0&autopause=0&player_id=0&app_id=58479"
          title="Studio Amage - promo"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
          style={innerStyle}
        />
      </div>
    )
  }

  return (
    <div style={wrapperStyle} onClick={() => setIsLoaded(true)}>
      {/* Thumbnail */}
      <Image
        src="/images/video-thumbnail.webp"
        alt="Studio Amage - promo video"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 800px"
        style={{ objectFit: 'cover' }}
        priority={false}
      />

      {/* Play button */}
      <div
        style={{
          position:        'absolute',
          top:             '50%',
          left:            '50%',
          transform:       'translate(-50%, -50%)',
          width:           '80px',
          height:          '80px',
          borderRadius:    '50%',
          backgroundColor: 'rgba(147, 86, 56, 0.85)',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          transition:      'transform 0.2s ease, background-color 0.2s ease',
          boxShadow:       '0 4px 20px rgba(147,86,56,0.4)',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLDivElement
          el.style.transform       = 'translate(-50%, -50%) scale(1.1)'
          el.style.backgroundColor = 'rgba(147, 86, 56, 1)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLDivElement
          el.style.transform       = 'translate(-50%, -50%) scale(1)'
          el.style.backgroundColor = 'rgba(147, 86, 56, 0.85)'
        }}
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="white"
          style={{ marginLeft: '4px' }}
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  )
}
