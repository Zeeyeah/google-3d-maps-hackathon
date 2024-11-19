'use client'
import styles from './page.module.css'
import Map from './components/Map'
import { ReactLenis } from 'lenis/react'
import HeroSection from './components/HeroSection'
import OverviewSection from './components/OverviewSection'
import History from './components/History'
import { MapProvider } from './components/MapContext'
import InitialLoadScreen from './components/InitialLoadScreen'
import Trails from './components/Trails'
import ViewPoints from './components/ViewPoints'
import Footer from './components/Footer'

export default function Home() {
  return (
    <MapProvider>
      <ReactLenis root>
        <main className={styles.main}>
          <Map />
          <div id="main-container" className={styles.container}>
            <InitialLoadScreen />
            <HeroSection />
            <OverviewSection />
            <Trails />
            {/* <History /> */}
            <ViewPoints />
            <Footer />
          </div>
        </main>
      </ReactLenis>
    </MapProvider>
  )
}
