import React, { useEffect } from 'react'
import { useMapContext } from '../MapContext'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { animateCamera } from '../HelperFunctions'
import Styles from '@/app/styles/Trails.module.css'

const FujinomiyaTrail = () => {
  const { isSteady } = useMapContext()

  useEffect(() => {
    if (isSteady) {
      const gmpMap = document.querySelector('gmp-map-3d')

      if (!gmpMap) return
      ScrollTrigger.create({
        trigger: '#fujinomiya',
        start: 'top center',
        end: 'bottom 20%',
        onEnter: () => animateIn(),
        onEnterBack: () => animateInInstant(),
      })
    }
  }, [isSteady])
  const animateIn = () => {
    animateCamera(
      [35.321966646176165, 138.73392133066048, 2426.846624266959],
      99.26498214629814,
      18.35798798304783,
      0,
      2000
    )
  }
  const animateInInstant = () => {
    animateCamera(
      [35.321966646176165, 138.73392133066048, 2426.846624266959],
      99.26498214629814,
      18.35798798304783,
      0,
      0
    )
  }

  return (
    <div id="fujinomiya" className={Styles.fujinomiya}>
      FujinomiyaTrail
    </div>
  )
}

export default FujinomiyaTrail
