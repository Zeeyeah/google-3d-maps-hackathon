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
                {/* <div className={Styles.keyPoints}>
                  {trail['key-points'].map((point, index) => (
                    <p key={index}>{point}</p>
                  ))}
                </div>
                <div className={Styles.time}>
                  <h4>Estimated Time</h4>
                  <div>
                    <svg
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 1.5C18 0.947715 17.5523 0.5 17 0.5H8C7.44772 0.5 7 0.947715 7 1.5C7 2.05228 7.44772 2.5 8 2.5H16V10.5C16 11.0523 16.4477 11.5 17 11.5C17.5523 11.5 18 11.0523 18 10.5V1.5ZM1.70711 18.2071L17.7071 2.20711L16.2929 0.792893L0.292893 16.7929L1.70711 18.2071Z"
                        fill={trail.color}
                      />
                    </svg>
                    {trail['acent-time']}
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M-5.96046e-08 17C-1.07887e-07 17.5523 0.447715 18 1 18L10 18C10.5523 18 11 17.5523 11 17C11 16.4477 10.5523 16 10 16L2 16L2 8C2 7.44771 1.55229 7 1 7C0.447716 7 7.75483e-07 7.44771 7.272e-07 8L-5.96046e-08 17ZM16.2929 0.292893L0.292893 16.2929L1.70711 17.7071L17.7071 1.70711L16.2929 0.292893Z"
                        fill={trail.color}
                      />
                    </svg>
                    {trail['decent-time']}
                  </div>
                </div>
                <div className={Styles.difficulty}>{trail.difficulty}</div> */}
              </div>
            ))}
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
