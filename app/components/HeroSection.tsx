import React, { useEffect } from 'react'
import Styles from '@/app/styles/HeroSection.module.css'
import { animateCameraOnScroll } from './HelperFunctions'
import { SplitText } from 'gsap-trial/SplitText'
import gsap from 'gsap'
import { useMapContext } from './MapContext'
import SplitType from 'split-type'
gsap.registerPlugin(SplitText)
const HeroSection = () => {
  const { isSteady } = useMapContext()

  useEffect(() => {
    const heroText = document.getElementById('mount-fuji-hero-text')
    const mapWrapper = document.querySelector('.map-wrapper')
    if (heroText) {
      const splitText = new SplitType('#mount-fuji-hero-text')

      gsap.from(splitText.chars, {
        duration: 1,
        opacity: 0,
        y: 100,
        stagger: 0.05,
        ease: 'power4.inOut',
      })
      gsap.from(mapWrapper, {
        duration: 2,
        scale: 1.2,

        ease: 'power4.inOut',
      })
    }
    if (isSteady) {
      animateCameraOnScroll(
        [35.687072215111506, 138.8104912750937, 4000.4669024567022],
        75.58085590884983,
        -168.71172606271776,
        0,
        '#hero-section',
        'out'
      )
      // animateCameraWithCursor()
    }
    console.log(isSteady)
  }, [isSteady])

  return (
    <div className={Styles.heroSection} id="hero-section">
      <div className={Styles.logoContainer}>
        {/* <Logo /> */}
        <div className="gsap-text-container">
          <h2 id="mount-fuji-hero-text">
            {' '}
            Exploring <i>Fujigoko</i>
          </h2>
        </div>
        <h3>hot springs, scenic lakes & mountains</h3>
      </div>
      <div className={Styles.scrollIcon}>{/* <CompassLogo /> */}</div>
    </div>
  )
}

export default HeroSection
