import React, { useEffect } from 'react'
import { useMapContext } from './MapContext'
import Styles from '@/app/styles/Trails.module.css'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import trailData from '@/app/data/traildata.js'
import { Loader } from '@googlemaps/js-api-loader'
import MapPin from './MapPin'
import { renderToString } from 'react-dom/server'
import YoshidaTrail from './Trails/YoshidaTrail'
import SubashiTrail from './Trails/SubashiTrail'
import FujinomiyaTrail from './Trails/FujinomiyaTrail'
import GotembaTrail from './Trails/GotembaTrail'

type CustomStyles = React.CSSProperties & {
  '--card-accent': string
}

const Trails = () => {
  const { isSteady } = useMapContext()

  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    version: 'alpha',
  })

  useEffect(() => {
    if (isSteady) {
      const gmpMap = document.querySelector('gmp-map-3d')

      if (!gmpMap) return
      ScrollTrigger.create({
        trigger: '#trails',
        start: 'top center',
        onEnter: () => addPolylines(),
        onLeaveBack: () => removePolylines(),
        onLeave: () => removePolylines(),
        onEnterBack: () => addPolylines(),
      })
    }
  }, [isSteady])

  // useEffect(() => {
  //   if (isSteady) {
  //     if (selectedTrail === 'yoshida-trail') {
  //       animateCamera(
  //         [35.380278765790976, 138.73253456234798, 2921.8199899518586],
  //         87.44491350603063,
  //         -148.81856804123015,
  //         3260.9109676396474,
  //         2000
  //       )
  //     }

  //     if (selectedTrail === 'subashi-trail') {
  // animateCamera(
  //   [35.37591783190281, 138.76289296106333, 2289.501175267729],
  //   95.55945103462895,
  //   -77.28043602539024,
  //   2893.9988153683953,
  //   2000
  // )
  //     }
  //     if (selectedTrail === 'fujinomiya-trail') {
  //       animateCamera(
  //         [35.321966646176165, 138.73392133066048, 2426.846624266959],
  //         99.26498214629814,
  //         18.35798798304783,
  //         0,
  //         2000
  //       )
  //     }
  //   }
  // }, [isSteady, selectedTrail])

  const addPolylines = async () => {
    const gmpMap = document.querySelector('gmp-map-3d')
    const mapWrapper = document.querySelector('.map-wrapper') as HTMLElement

    if (!gmpMap) {
      console.error('Map element not found')
      return
    }

    try {
      // @ts-expect-error API in Beta
      const { Marker3DElement, Polyline3DElement } =
        // @ts-expect-error API in Beta
        await loader.importLibrary('maps3d')

      mapWrapper.style.background =
        'radial-gradient(40vw circle at 20% 50%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%)'

      trailData.forEach((trail) => {
        // Create main polyline
        const polyline = new Polyline3DElement({
          strokeColor: trail.color,
          strokeWidth: 1,
        })

        polyline.setAttribute('id', trail.id)

        const polylineGlow = new Polyline3DElement({
          strokeColor: trail['border-color'],
          strokeWidth: 5,
        })

        polylineGlow.setAttribute('id', `${trail.id}-glow`)
        polylineGlow.setAttribute('class', 'glow')

        customElements.whenDefined('gmp-polyline-3d').then(() => {
          const baseCoordinates = trail.cords.map(({ lat, lng, altitude }) => ({
            lat,
            lng,
            altitude,
          }))
          polyline.coordinates = baseCoordinates

          const glowCoordinates = baseCoordinates.map((point) => ({
            ...point,
            altitude: point.altitude + 10,
          }))
          polylineGlow.coordinates = glowCoordinates
        })

        trail.markers.forEach((marker) => {
          const markerElement = new Marker3DElement({
            label: marker.label,
            sizePreserved: true,
            position: {
              lat: marker.position.lat,
              lng: marker.position.lng,
            },
          })

          const svgString = renderToString(
            <MapPin color={trail.color} borderColor={trail['border-color']} />
          )
          const parser = new DOMParser()
          const pinSvg = parser.parseFromString(
            svgString,
            'image/svg+xml'
          ).documentElement
          const templateForSvg = document.createElement('template')
          templateForSvg.content.append(pinSvg)
          markerElement.append(templateForSvg)

          gmpMap.appendChild(markerElement)
        })

        gmpMap.appendChild(polyline)
        gmpMap.appendChild(polylineGlow)
      })
    } catch (error) {
      console.error('Error while adding polylines:', error)
    }
  }

  const handleMouseEnter = (id: string) => {
    document
      .querySelectorAll(`gmp-polyline-3d:not(#${id})`)
      .forEach((polyline) => {
        polyline.setAttribute('stroke-width', '0')
      })

    document.querySelectorAll('.glow').forEach((polyline) => {
      polyline.setAttribute('stroke-width', '0')
    })

    const polyline = document.querySelector(`.${id}`)
    const polylineGlow = document.getElementById(`${id}-glow`)
    console.log(polyline)
    if (polyline) polyline.setAttribute('stroke-width', '5')
    if (polylineGlow) polylineGlow.setAttribute('stroke-width', '10')
  }

  const handleMouseLeave = () => {
    document.querySelectorAll('gmp-polyline-3d').forEach((polyline) => {
      polyline.setAttribute('stroke-width', '1')
    })
    document.querySelectorAll('.glow').forEach((polyline) => {
      polyline.setAttribute('stroke-width', '5')
    })
  }

  const removePolylines = () => {
    const gmpMap = document.querySelector('gmp-map-3d')

    if (!gmpMap) return

    const polylines = document.querySelectorAll('gmp-polyline-3d')
    polylines.forEach((polyline) => {
      gmpMap.removeChild(polyline)
    })

    const markers = document.querySelectorAll('gmp-marker-3d')
    markers.forEach((marker) => {
      gmpMap.removeChild(marker)
    })
  }

  return (
    <div id="trails" className={Styles.trails}>
      <div></div>
      <div className={Styles.trailsContainer}>
        <div className={Styles.trailsInfo}>
          <div className="gsap-text-container">
            <h2 id="trails-title">Hiking Trails</h2>
          </div>
          <div className="gsap-text-container">
            <h6 id="trails-subtitle">Of Mount Fuji</h6>
          </div>
          <p>
            Mount Fuji has <i>four</i> main trails leading to its summit each
            offering a unique experience. These trails vary in difficulty,
            scenery, and starting points. Each trail showcases the beauty and
            challenge of Japan’s iconic mountain, catering to various skill
            levels and preferences.
          </p>
        </div>
        <div className={Styles.trailsSelector}>
          <div className={Styles.trailsSelectorContainer}>
            {trailData.map((trail) => (
              <div
                className={`${Styles.trailsSelectorCard}`}
                style={{ '--card-accent': trail.color } as CustomStyles}
                key={trail.id}
                onMouseEnter={() => handleMouseEnter(trail.id)}
                onMouseLeave={handleMouseLeave}
              >
                <h3>
                  {trail.name}
                  <svg
                    width="20"
                    height="12"
                    viewBox="0 0 20 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginLeft: '5px' }}
                  >
                    <path
                      d="M11.25 1.25H13.5C13.9925 1.25 14.4801 1.347 14.9351 1.53545C15.39 1.72391 15.8034 2.00013 16.1517 2.34835C16.4999 2.69657 16.7761 3.10997 16.9645 3.56494C17.153 4.01991 17.25 4.50754 17.25 5C17.25 5.49246 17.153 5.98009 16.9645 6.43506C16.7761 6.89003 16.4999 7.30343 16.1517 7.65165C15.8034 7.99987 15.39 8.27609 14.9351 8.46455C14.4801 8.653 13.9925 8.75 13.5 8.75H11.25M6.75 8.75H4.5C4.00754 8.75 3.51991 8.653 3.06494 8.46455C2.60997 8.27609 2.19657 7.99987 1.84835 7.65165C1.14509 6.94839 0.75 5.99456 0.75 5C0.75 4.00544 1.14509 3.05161 1.84835 2.34835C2.55161 1.64509 3.50544 1.25 4.5 1.25H6.75M6 5H12"
                      stroke="#1E1E1E"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                </h3>
              </div>
            ))}
          </div>
          <div className={Styles.trailsBefore}>
            <li>
              <h3>Before you go</h3>
              <p>
                Hiking Mount Fuji is an incredible experience, but preparation
                is key to ensuring a safe and enjoyable journey. Here&apos;s a
                brief guide on what to do and carry:
              </p>
            </li>
            <ul>
              <li>
                <h3>What to Carry for the Hike</h3>
                <p>
                  Dress in layers: a moisture-wicking base, warm middle layers,
                  and a waterproof jacket. Wear sturdy boots and bring gloves
                  and a hat. Essential items include water (2L), snacks, a
                  headlamp, trekking poles, and a small backpack.
                </p>
              </li>
              <li>
                <h3>Safety and Miscellaneous Essentials</h3>
                <p>
                  Pack a first aid kit with altitude sickness medication, rain
                  gear, and a trail map. Carry cash for huts and vending
                  machines, and consider bringing an oxygen canister and a
                  portable charger.
                </p>
              </li>
              <li>
                <h3></h3>
                <p></p>
              </li>
            </ul>
          </div>
        </div>
        <YoshidaTrail />
        <SubashiTrail />
        <GotembaTrail />
        <FujinomiyaTrail />
      </div>
    </div>
  )
}

export default Trails
