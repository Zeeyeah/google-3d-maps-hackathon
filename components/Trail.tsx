import React, { useEffect } from 'react'
import { useMapContext } from './MapContext'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { animateCamera, stopCameraAnimation } from './HelperFunctions'
import Styles from '@/app/styles/Trails.module.css'
import TrailRatings from './TrailRatings'
interface Trail {
  id: string
  name: string
  placeID: string
  length: number
  'key-points': string[]
  'acent-time': string
  'decent-time': string
  difficulty: string
  description: string[]
  cords: number[]
  cameraCords: {
    center: [number, number, number]
    tilt: number
    heading: number
    range: number
  }
  color: string
  'border-color': string
  markers: {
    label: string
    position: {
      lat: number
      lng: number
      altitude: number
    }
  }[]
}
interface TrailProps {
  trail: Trail
}
const Trail = ({ trail }: TrailProps) => {
  const { isSteady } = useMapContext()

  useEffect(() => {
    if (isSteady) {
      const gmpMap = document.querySelector('gmp-map-3d')
      const center = trail.cameraCords.center
      const tilt = trail.cameraCords.tilt
      const heading = trail.cameraCords.heading
      const range = trail.cameraCords.range

      if (!gmpMap) return
      ScrollTrigger.create({
        trigger: `#${trail.id}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => animateIn(center, tilt, heading, range),
        onEnterBack: () =>
          trail.id === 'fujinomoya-trail'
            ? () => {
                animateInInstant(center, tilt, heading, range)
                stopCameraAnimation(tilt, heading)
              }
            : animateIn(center, tilt, heading, range),
        onLeaveBack: () => animateOut(),
      })
    }
  }, [isSteady])
  const animateIn = (
    center: number[],
    tilt: number,
    heading: number,
    range: number
  ) => {
    animateCamera([center[0], center[1], center[2]], tilt, heading, range, 1000)
  }
  const animateInInstant = (
    center: number[],
    tilt: number,
    heading: number,
    range: number
  ) => {
    animateCamera([center[0], center[1], center[2]], tilt, heading, range, 0)
  }

  const animateOut = () => {
    if (trail.id === 'yoshida-trail') {
      animateCamera(
        [35.36601796700356, 138.7093136489788, 2724.821138908544],
        0,
        -168.71172606271776,
        10275.180125104962,
        2000
      )
    }
  }

  return (
    <div
      id={trail.id}
      style={{ '--card-accent': trail.color } as React.CSSProperties}
      className={Styles.yoshida}
    >
      <h2>{trail.name}</h2>
      <div className={Styles.description}>
        {trail.description.map((des) => (
          <p className="mb-5" key={des}>
            {des} <br />
          </p>
        ))}
      </div>
      <div className={Styles.keypoints}>
        {trail['key-points'].map((point: string, index: number) => (
          <span key={index}>{point}</span>
        ))}
      </div>
      <div className={Styles.stats}>
        <div>
          <svg
            width="16"
            height="22"
            viewBox="0 0 16 22"
            fill={trail.color}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 21C7.76667 21 7.56667 20.9333 7.4 20.8C7.23333 20.6667 7.10833 20.4917 7.025 20.275C6.70833 19.3417 6.30833 18.4667 5.825 17.65C5.35833 16.8333 4.7 15.875 3.85 14.775C3 13.675 2.30833 12.625 1.775 11.625C1.25833 10.625 1 9.41667 1 8C1 6.05 1.675 4.4 3.025 3.05C4.39167 1.68333 6.05 1 8 1C9.95 1 11.6 1.68333 12.95 3.05C14.3167 4.4 15 6.05 15 8C15 9.51667 14.7083 10.7833 14.125 11.8C13.5583 12.8 12.9 13.7917 12.15 14.775C11.25 15.975 10.5667 16.975 10.1 17.775C9.65 18.5583 9.275 19.3917 8.975 20.275C8.89167 20.5083 8.75833 20.6917 8.575 20.825C8.40833 20.9417 8.21667 21 8 21ZM8 10.5C8.7 10.5 9.29167 10.2583 9.775 9.775C10.2583 9.29167 10.5 8.7 10.5 8C10.5 7.3 10.2583 6.70833 9.775 6.225C9.29167 5.74167 8.7 5.5 8 5.5C7.3 5.5 6.70833 5.74167 6.225 6.225C5.74167 6.70833 5.5 7.3 5.5 8C5.5 8.7 5.74167 9.29167 6.225 9.775C6.70833 10.2583 7.3 10.5 8 10.5Z" />
          </svg>
          <p>Distance</p>
          <h3>13.8 km</h3>
        </div>
        <div>
          <svg
            width="26"
            height="22"
            viewBox="0 0 26 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.543 7.74234V12.1616M12.543 16.5808H12.5541M10.6538 2.06364L1.29611 17.6856C1.10317 18.0197 1.00109 18.3985 1.00001 18.7843C0.998928 19.1702 1.09889 19.5495 1.28995 19.8847C1.48101 20.2199 1.75651 20.4992 2.08904 20.6949C2.42156 20.8906 2.79953 20.9958 3.18532 21H21.9007C22.2865 20.9958 22.6645 20.8906 22.997 20.6949C23.3295 20.4992 23.605 20.2199 23.7961 19.8847C23.9872 19.5495 24.0871 19.1702 24.086 18.7843C24.085 18.3985 23.9829 18.0197 23.7899 17.6856L14.4322 2.06364C14.2353 1.73895 13.958 1.4705 13.6271 1.28419C13.2961 1.09788 12.9228 1 12.543 1C12.1633 1 11.7899 1.09788 11.459 1.28419C11.1281 1.4705 10.8508 1.73895 10.6538 2.06364Z"
              stroke={trail.color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p>Difficulty</p>
          <h3>Medium</h3>
        </div>
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
          <p>Acent Time</p>
          <h3>2 hours</h3>
        </div>
        <div>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 17C-4.82823e-08 17.5523 0.447716 18 1 18L10 18C10.5523 18 11 17.5523 11 17C11 16.4477 10.5523 16 10 16L2 16L2 8C2 7.44771 1.55229 7 1 7C0.447717 7 8.35087e-07 7.44771 7.86805e-07 8L0 17ZM16.2929 0.292892L0.292893 16.2929L1.70711 17.7071L17.7071 1.70711L16.2929 0.292892Z"
              fill={trail.color}
            />
          </svg>

          <p>Decent Time</p>
          <h3>2 hours</h3>
        </div>
      </div>
      <TrailRatings placeId={trail.placeID as string} />
    </div>
  )
}

export default Trail
