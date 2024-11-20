import React, { useEffect } from 'react'
import { useMapContext } from '../MapContext'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { animateCamera } from '../HelperFunctions'
import Styles from '@/app/styles/Trails.module.css'

const SubashiTrail = () => {
  const { isSteady } = useMapContext()

  useEffect(() => {
    if (isSteady) {
      const gmpMap = document.querySelector('gmp-map-3d')

      if (!gmpMap) return
      ScrollTrigger.create({
        trigger: '#subashi',
        start: 'top center',
        end: 'bottom center',
        onEnter: () => animateIn(),
        onEnterBack: () => animateIn(),
      })
    }
  }, [isSteady])

  const animateIn = () => {
    animateCamera(
      [35.37591783190281, 138.76289296106333, 2289.501175267729],
      95.55945103462895,
      -77.28043602539024,
      2893.9988153683953,
      2000
    )
  }

  return (
    <div id="subashi" className={Styles.subashi}>
      SubashiTrail
    </div>
  )
}

export default SubashiTrail
