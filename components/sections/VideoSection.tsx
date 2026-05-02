'use client'

import { useState, useEffect, useRef } from 'react'

export default function VideoSection() {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { rootMargin: '200px' }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section style={{ backgroundColor: '#f4ece4', padding: '80px 0', width: '100%' }}>
      <div className="video-section-inner">
        <div
          ref={containerRef}
          style={{
            position:        'relative',
            paddingTop:      '56.25%',
            borderRadius:    '20px',
            overflow:        'hidden',
            backgroundColor: 'transparent',
            boxShadow:       '0 32px 80px rgba(147, 86, 56, 0.18), 0 8px 24px rgba(0,0,0,0.10)',
          }}
        >
          {isVisible && (
            <iframe
              src="https://player.vimeo.com/video/1172647016?dnt=1&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&background=1"
              loading="lazy"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              title="Studio Amage - promo"
            />
          )}
        </div>
      </div>
    </section>
  )
}
