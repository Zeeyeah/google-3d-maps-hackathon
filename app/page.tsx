'use client'
import styles from './page.module.css'
import Map from './components/Map'
import { useEffect, useState } from 'react'
import { animateCameraOnScroll } from './components/HelperFunctions'
import { ReactLenis, useLenis } from 'lenis/react'

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  useLenis(({ scroll }) => {
    console.log(scroll)
  })

  useEffect(() => {
    if (loaded) {
      animateCameraOnScroll(
        [35.476689948313, 138.87335429240682, 4524.490072416573],
        90.47729656891326,
        -127.65226309906524,
        0,
        '.hero-section'
      )
    }
  }, [loaded])
  return (
    <ReactLenis root>
      <main className={styles.main}>
        {!loaded && <div className={styles.loading}>Loading...</div>}
        <Map setLoaded={setLoaded} />
        <div
          className="hero-section"
          style={{
            height: '1200px',
            width: '100%',
            background: 'linear-gradient(to bottom, #171717, #fff)',
            zIndex: 10,
          }}
        ></div>
        <div
          style={{
            height: '1200px',
            width: '100%',
            background: 'linear-gradient(to bottom, #171717, #fff)',
            zIndex: 10,
          }}
        ></div>
      </main>
    </ReactLenis>
  )
}
