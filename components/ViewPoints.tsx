import React, { useEffect, useRef, useState } from 'react'
import { useMapContext } from './MapContext'
import {
  animateCamera,
  animateCameraWithCursor,
  stopCameraAnimation,
} from './HelperFunctions'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Styles from '@/app/styles/ViewPoints.module.css'
import viewpointsData from '@/app/data/viewpointsdata.js'
import gsap from 'gsap'
import SplitType from 'split-type'

interface ViewPoint {
  name: string
  id: string
  cords: {
    center: {
      lat: number
      lng: number
      altitude: number
    }
    tilt: number
    heading: number
    range: number
  }
}
const ViewPoints = () => {
  const { isSteady, isLoading } = useMapContext()
  const [visible, setVisible] = useState<boolean>(false)
  const [selectedViewPoint, setSelectedViewPoint] =
    useState<string>('Minato City, Tokyo')

  useEffect(() => {
    if (isSteady) {
      ScrollTrigger.create({
        trigger: '#viewpoints',
        start: 'top 10%',
        end: 'bottom center',
        onEnter: () => {
          selectViewPoint(selectedViewPoint)
        },
        onEnterBack: () => selectViewPoint(selectedViewPoint),
        onLeaveBack: () => {},
        onLeave: () => setVisible(false),
      })
      ScrollTrigger.create({
        trigger: '#viewpoints',
        start: 'top top',
        end: 'bottom center',
        onEnter: () => {
          setVisible(true)
        },
        onLeaveBack: () => {
          setVisible(false)
        },
        onLeave: () => setVisible(false),
      })
    }
  }, [isSteady])

  useEffect(() => {
    gsap.to('#viewpoints', {
      duration: 1,
      ease: 'power2.inOut',
    })
  }, [isLoading])

  useEffect(() => {
    const selectedData = viewpointsData.find(
      (data: ViewPoint) => data.name === selectedViewPoint
    )

    if (selectedData) {
      const { tilt, heading } = selectedData.cords

      if (visible) {
        stopCameraAnimation(tilt, heading)
        animateCameraWithCursor(tilt, heading)
      } else {
        stopCameraAnimation(tilt, heading)
      }
    }
  }, [visible, selectedViewPoint])

  const selectViewPoint = (value: string = 'Minato City, Tokyo') => {
    const selectedData = viewpointsData.find(
      (data: ViewPoint) => data.name === value
    )

    if (selectedData) {
      const { lat, lng, altitude } = selectedData.cords.center
      const { tilt, heading, range } = selectedData.cords

      animateCamera([lat, lng, altitude], tilt, heading, range, 0)
    }
  }

  function SelectedViewPortTitle() {
    const boxRef = useRef<HTMLDivElement>(null)
    const timeline = useRef<gsap.core.Timeline>()

    useEffect(() => {
      // Create SplitType instances inside the effect to ensure proper DOM readiness
      const title = new SplitType('#viewpoint-title')
      const subtitle = new SplitType('#viewpoint-subtitle')

      // GSAP timeline
      timeline.current = gsap.timeline()
      timeline.current
        .fromTo(
          boxRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.5, ease: 'power1.inOut' } // Appear animation
        )
        .from(
          title.chars,
          {
            y: 100,
            opacity: 0,
            duration: 0.5,
            ease: 'power1.inOut',
            stagger: 0.05,
          }, // Animate title chars
          '-=0.3' // Overlap with the previous animation
        )
        .from(
          subtitle.chars,
          {
            y: 50,
            opacity: 0,
            duration: 0.5,
            ease: 'power1.inOut',
            stagger: 0.05,
          }, // Animate subtitle chars
          '-=0.2' // Overlap with title animation
        )

      // Cleanup: Reverse timeline and revert SplitType
      return () => {
        if (timeline.current) timeline.current.kill() // Kill the timeline
        title.revert() // Revert SplitType changes
        subtitle.revert()
      }
    }, [])

    return (
      <div ref={boxRef} className={Styles.selectedViewPoint}>
        <div className="gsap-text-container">
          <h1 id="viewpoint-title">{selectedViewPoint.split(',').shift()},</h1>
        </div>
        <div className="gsap-text-container">
          <h3 id="viewpoint-subtitle">{selectedViewPoint.split(',').pop()}</h3>
        </div>
      </div>
    )
  }

  const handleClick = (value: string) => {
    selectViewPoint(value)
    setSelectedViewPoint(value)
  }

  return (
    <div className={Styles.viewpoints} id="viewpoints">
      <div>
        <h6>Spots to Experience</h6>
        <h2> Mount Fuji’s Beauty</h2>
      </div>
      <div className={Styles.viewpointsContainer}>
        {viewpointsData.map((data: ViewPoint) => (
          <div
            key={data.id}
            className={`${Styles.viiewPointCard} ${
              data.name === selectedViewPoint ? Styles.selected : ''
            }`}
            onClick={() => {
              handleClick(data.name)
            }}
          >
            <svg
              width="16"
              height="22"
              viewBox="0 0 16 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 21C7.76667 21 7.56667 20.9333 7.4 20.8C7.23333 20.6667 7.10833 20.4917 7.025 20.275C6.70833 19.3417 6.30833 18.4667 5.825 17.65C5.35833 16.8333 4.7 15.875 3.85 14.775C3 13.675 2.30833 12.625 1.775 11.625C1.25833 10.625 1 9.41667 1 8C1 6.05 1.675 4.4 3.025 3.05C4.39167 1.68333 6.05 1 8 1C9.95 1 11.6 1.68333 12.95 3.05C14.3167 4.4 15 6.05 15 8C15 9.51667 14.7083 10.7833 14.125 11.8C13.5583 12.8 12.9 13.7917 12.15 14.775C11.25 15.975 10.5667 16.975 10.1 17.775C9.65 18.5583 9.275 19.3917 8.975 20.275C8.89167 20.5083 8.75833 20.6917 8.575 20.825C8.40833 20.9417 8.21667 21 8 21ZM8 10.5C8.7 10.5 9.29167 10.2583 9.775 9.775C10.2583 9.29167 10.5 8.7 10.5 8C10.5 7.3 10.2583 6.70833 9.775 6.225C9.29167 5.74167 8.7 5.5 8 5.5C7.3 5.5 6.70833 5.74167 6.225 6.225C5.74167 6.70833 5.5 7.3 5.5 8C5.5 8.7 5.74167 9.29167 6.225 9.775C6.70833 10.2583 7.3 10.5 8 10.5Z"
                stroke="#fff"
                strokeWidth="1"
              />
            </svg>

            <p>{data.name}</p>
          </div>
        ))}
      </div>
      {<SelectedViewPortTitle />}
    </div>
  )
}

export default ViewPoints
