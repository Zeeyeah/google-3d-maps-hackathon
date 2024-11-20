import React, { useEffect } from 'react'
import { useMapContext } from '../MapContext'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Styles from '@/app/styles/Trails.module.css'
import { animateCamera } from '../HelperFunctions'

const GotembaTrail = () => {
  const { isSteady } = useMapContext()

  useEffect(() => {
    if (isSteady) {
      const gmpMap = document.querySelector('gmp-map-3d')

      if (!gmpMap) return
      ScrollTrigger.create({
        trigger: '#gotemba',
        start: 'top center',
        end: 'bottom center',
        onEnter: () => animateIn(),
        onEnterBack: () => animateIn(),
      })
    }
  }, [isSteady])

  const animateIn = () => {
    animateCamera(
      [35.353331950115425, 138.77959052109878, 1821.872672295278],
      95.11205466880858,
      -43.61188402984363,
      3587.5908866798272,
      2000
    )
  }

  return (
    <div id="gotemba" className={Styles.gotemba}>
      GotembaTrail
    </div>
  )
}

export default GotembaTrail
