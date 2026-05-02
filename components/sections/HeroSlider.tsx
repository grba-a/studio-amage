'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

// ── Slide data ────────────────────────────────────────────────────────────────
const SLIDES = [
  { src: '/images/hero/hero-1.webp', pos: 'center 20%' },
  { src: '/images/hero/hero-2.webp', pos: 'center 20%' },
  { src: '/images/hero/hero-3.webp', pos: 'center 20%' },
  { src: '/images/hero/hero-4.webp', pos: 'center center' },
]

const INTERVAL_MS   = 5000
const FADE_DURATION = 1200

// ── Component ─────────────────────────────────────────────────────────────────
export default function HeroSlider() {
  const [current,     setCurrent]     = useState(0)
  const [paused,      setPaused]      = useState(false)
  const [loadedSlides, setLoadedSlides] = useState<Set<number>>(new Set([0]))
  const touchStartX                   = useRef<number>(0)

  // Preload remaining slides 1s after mount so they don't block initial page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadedSlides(new Set([0, 1, 2, 3]))
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setCurrent(p => (p + 1) % SLIDES.length), INTERVAL_MS)
    return () => clearInterval(id)
  }, [paused])

  const goPrev = useCallback(() => setCurrent(p => (p - 1 + SLIDES.length) % SLIDES.length), [])
  const goNext = useCallback(() => setCurrent(p => (p + 1) % SLIDES.length), [])

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd   = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? goNext() : goPrev()
  }

  return (
    <section
      aria-label="Hero galerija"
      style={{
        position: 'relative',
        height:   '100svh',
        width:    '100%',
        overflow: 'hidden',
        margin:    0,
        padding:   0,
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Slides ───────────────────────────────────────────────────────── */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          aria-hidden={i !== current}
          style={{
            position:         'absolute',
            inset:             0,
            backgroundImage:  loadedSlides.has(i) ? `url(${slide.src})` : '',
            backgroundSize:   'cover',
            backgroundPosition: slide.pos,
            opacity:          i === current ? 1 : 0,
            transition:       `opacity ${FADE_DURATION}ms ease`,
            zIndex:           i === current ? 1 : 0,
          }}
        />
      ))}

      {/* ── Dark overlay ─────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          inset:       0,
          background: 'rgba(0,0,0,0.15)',
          zIndex:      2,
        }}
      />

      {/* ── H1 (screen reader only) ───────────────────────────────────────── */}
      <h1 className="sr-only">
        Balayage &amp; frizerski tretmani u Splitu
      </h1>
    </section>
  )
}
