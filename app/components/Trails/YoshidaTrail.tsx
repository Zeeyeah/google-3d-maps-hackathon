import React, { useEffect } from 'react'
import { useMapContext } from '../MapContext'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { animateCamera } from '../HelperFunctions'
import Styles from '@/app/styles/Trails.module.css'

const YoshidaTrail = () => {
  const { isSteady } = useMapContext()

  useEffect(() => {
    if (isSteady) {
      const gmpMap = document.querySelector('gmp-map-3d')

      if (!gmpMap) return
      ScrollTrigger.create({
        trigger: '#yoshida',
        start: 'top center',
        end: 'bottom center',
        onEnter: () => animateIn(),
        onEnterBack: () => animateIn(),
        onLeaveBack: () => animateOut(),
      })
    }
  }, [isSteady])
  const animateIn = () => {
    animateCamera(
      [35.380278765790976, 138.73253456234798, 2921.8199899518586],
      87.44491350603063,
      -148.81856804123015,
      3260.9109676396474,
      2000
    )
  }

  const animateOut = () => {
    animateCamera(
      [35.36601796700356, 138.7093136489788, 2724.821138908544],
      0,
      -168.71172606271776,
      10275.180125104962,
      2000
    )
  }

  return (
    <div id="yoshida" className={Styles.yoshida}>
      YoshidaTrail
    </div>
  )
}

export default YoshidaTrail
