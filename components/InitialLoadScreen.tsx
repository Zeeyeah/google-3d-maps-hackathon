import React, { useEffect, useRef, useState } from 'react'
import styles from '@/app/page.module.css'
import { useMapContext } from './MapContext'
import gsap from 'gsap'
import { useLenis } from 'lenis/react'
import Logo from './Logo'

const InitialLoadScreen = () => {
  const { isSteady } = useMapContext()
  const [loading, setLoading] = useState<boolean>(true)
  const loadingRef = useRef<HTMLDivElement>(null)
  const lenis = useLenis()

  useEffect(() => {
    const body = document.body
    body.style.overflow = 'hidden'
    body.style.height = '100vh'
    lenis?.stop()
    if (isSteady) {
      gsap.to(loadingRef.current, {
        scaleX: 0,
        ease: 'power4.inOut',
        transformOrigin: 'left',
        duration: 1,
        onComplete: () => {
          setLoading(false)
          lenis?.start()
          body.style.overflow = 'auto'
          body.style.height = 'auto'
        },
      })
    }
  }, [isSteady])

  if (loading)
    return (
      <div ref={loadingRef} className={styles.loading}>
        <Logo />
      </div>
    )
}

export default InitialLoadScreen
