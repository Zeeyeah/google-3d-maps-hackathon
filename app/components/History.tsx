import React, { useEffect } from 'react'
import { animateCamera } from './HelperFunctions'
import Styles from '@/app/styles/History.module.css'
import { gsap } from 'gsap'

const History = () => {
  const rightRef = React.useRef<HTMLDivElement>(null)
  const handleScroll = () => {
    const section = document.querySelector('#climbing-mt-fuji-section')
    if (section) {
      const rect = section.getBoundingClientRect()

      // Trigger animation when the top of the section reaches the top of the viewport
      const isTopInView = rect.top <= 0

      if (isTopInView) {
        animateCamera(
          [35.46625659321447, 139.25344910175647, 578.8324787865173],
          90.69985765798098,
          -115.48025056524483,
          50387.72423308343,
          10
        )
      }
      gsap.to(rightRef.current, {
        // backgroundPositionX: isTopInView ? '0%' : '50%',
        scaleY: isTopInView ? 0 : 1,
        ease: 'power4.inOut',
        duration: 1,
      })
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll) // Cleanup on unmount
    }
  }, [])

  return (
    <div className={Styles.historySection} id="climbing-mt-fuji-section">
      <div className={Styles.right}>
        <div className={Styles.rightOverlay} ref={rightRef}></div>
      </div>
      <div className={Styles.left}></div>
    </div>
  )
}

export default History
