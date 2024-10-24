'use client'
import styles from './page.module.css'
import Map from './components/Map'
import { useEffect, useState } from 'react'
import { animateCameraOnScroll } from './components/HelperFunctions'
import { ReactLenis, useLenis } from 'lenis/react'

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  useLenis(({}) => {
    // called every scroll
  })

  useEffect(() => {
    if (loaded) {
      animateCameraOnScroll(
        [35.476689948313, 138.87335429240682, 4524.490072416573],
        90.47729656891326,
        -127.65226309906524,
        0,
        'body'
      )
    }
  }, [loaded])
  return (
    <ReactLenis root>
      <main
        style={{
          height: '200vh',
        }}
        className={styles.main}
      >
        {!loaded && <div className={styles.loading}>Loading...</div>}
        <Map setLoaded={setLoaded} />
        <div className="hero">
          <div>
            <h1 className="title">
              Welcome to <a href="https://nextjs.org">Next.js!</a>
            </h1>
            <p className={styles.description}>
              Get started by editing{' '}
              <code className={styles.code}>app/page.tsx</code>
            </p>
            <div className={styles.grid}>
              <a
                href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                className={styles.card}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2>
                  Docs <span>-&gt;</span>
                </h2>
                <p>Find in-depth information about Next.js features and API.</p>
              </a>

              <a
                href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                className={styles.card}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2>
                  Learn <span>-&gt;</span>
                </h2>
                <p>
                  Learn about Next.js in an interactive course
                  with&nbsp;quizzes!
                </p>
              </a>

              <a
                href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                className={styles.card}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2>
                  Templates <span>-&gt;</span>
                </h2>
                <p>Explore the Next.js 13 powered templates.</p>
              </a>

              <a
                href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                className={styles.card}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2>
                  Deploy <span>-&gt;</span>
                </h2>
                <p>
                  Instantly deploy your Next.js site to a shareable URL with
                  Vercel.
                </p>
              </a>
            </div>
          </div>
        </div>
      </main>
    </ReactLenis>
  )
}
