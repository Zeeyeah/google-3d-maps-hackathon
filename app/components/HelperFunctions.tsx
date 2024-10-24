import Styles from '@/app/styles/debugUI.module.css'
import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const easeInOutQuad = (t: number) => {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}

const animateCameraOnScroll = (
  targetCenter: [number, number, number],
  targetTilt: number,
  targetHeading: number,
  targetRange: number,
  scrollTriggerElement: string | HTMLElement
) => {
  const gmpMap = document.querySelector('gmp-map-3d')

  if (!gmpMap) return // Ensure the map element is available

  const startCenter = gmpMap.getAttribute('center')?.split(',').map(Number) // [lat, lng, altitude]
  const startTilt = Number(gmpMap.getAttribute('tilt'))
  const startHeading = Number(gmpMap.getAttribute('heading'))
  const startRange = Number(gmpMap.getAttribute('range'))

  // Create a GSAP animation linked to scroll progress
  ScrollTrigger.create({
    trigger: scrollTriggerElement, // Element or string that triggers the scroll animation
    start: 'top top', // Start when the top of the hero section hits the top of the viewport
    end: 'bottom top', // End when the bottom of the hero section hits the top of the viewport
    scrub: true, // Smoothly animate based on scroll progress
    onUpdate: (self) => {
      // Use easing for smoother progress
      const easedProgress = easeInOutQuad(self.progress)

      // Interpolate the center coordinates
      const currentCenter = startCenter?.map(
        (startCoord, index) =>
          startCoord + (targetCenter[index] - startCoord) * easedProgress
      )

      // Interpolate tilt, heading, and range using eased progress
      const currentTilt = startTilt + (targetTilt - startTilt) * easedProgress
      const currentHeading =
        startHeading + (targetHeading - startHeading) * easedProgress
      const currentRange =
        startRange + (targetRange - startRange) * easedProgress

      // Update the map attributes based on eased scroll progress
      if (currentCenter) gmpMap.setAttribute('center', currentCenter.join(','))
      gmpMap.setAttribute('tilt', `${currentTilt}`)
      gmpMap.setAttribute('heading', `${currentHeading}`)
      gmpMap.setAttribute('range', `${currentRange}`)
    },
  })
}

const animateCamera = (
  targetCenter: [number, number, number],
  targetTilt: number,
  targetHeading: number,
  targetRange: number,
  duration: number
) => {
  const gmpMap = document.querySelector('gmp-map-3d')

  if (!gmpMap) return // Ensure the map element is available

  const startCenter = gmpMap.getAttribute('center')?.split(',').map(Number) // [lat, lng, altitude]
  const startTilt = Number(gmpMap.getAttribute('tilt'))
  const startHeading = Number(gmpMap.getAttribute('heading'))
  const startRange = Number(gmpMap.getAttribute('range'))

  const startTime = performance.now()

  function updateCamera(currentTime: number) {
    const elapsedTime = currentTime - startTime
    const progress = Math.min(elapsedTime / duration, 1)

    // Interpolate center coordinates
    const currentCenter = startCenter?.map(
      (startCoord, index) =>
        startCoord + (targetCenter[index] - startCoord) * progress
    )

    // Interpolate tilt and heading and range
    const currentTilt = startTilt + (targetTilt - startTilt) * progress
    const currentHeading =
      startHeading + (targetHeading - startHeading) * progress

    const currentRange = startRange + (targetRange - startRange) * progress

    // Update the map attributes
    if (!currentCenter) return
    gmpMap?.setAttribute('center', currentCenter.join(','))
    gmpMap?.setAttribute('tilt', `${currentTilt}`)
    gmpMap?.setAttribute('heading', `${currentHeading}`)
    gmpMap?.setAttribute('range', `${currentRange}`)

    if (progress < 1) {
      requestAnimationFrame(updateCamera)
    }
  }

  requestAnimationFrame(updateCamera)
}

const copyCords = () => {
  let tempCords = ''
  const mapRef = document.querySelector('gmp-map-3d')

  if (!mapRef) return // Ensure the map element is available

  const tempLat = Number(mapRef.getAttribute('center')?.split(',')[0])
  const tempLng = Number(mapRef.getAttribute('center')?.split(',')[1])
  const tempAltitude = Number(mapRef.getAttribute('center')?.split(',')[2])
  const tempTilt = Number(mapRef.getAttribute('tilt'))
  const tempHeading = Number(mapRef.getAttribute('heading'))
  const tempRange = Number(mapRef.getAttribute('range'))
  tempCords = `[${tempLat},${tempLng},${tempAltitude}],${tempTilt},${tempHeading},${tempRange}`

  navigator.clipboard.writeText(tempCords)
}
const copyCordsAsObject = () => {
  let tempCords = ''
  const mapRef = document.querySelector('gmp-map-3d')

  if (!mapRef) return // Ensure the map element is available

  const tempLat = Number(mapRef.getAttribute('center')?.split(',')[0])
  const tempLng = Number(mapRef.getAttribute('center')?.split(',')[1])
  const tempAltitude = Number(mapRef.getAttribute('center')?.split(',')[2])
  const tempTilt = Number(mapRef.getAttribute('tilt'))
  const tempHeading = Number(mapRef.getAttribute('heading'))
  const tempRange = Number(mapRef.getAttribute('range'))
  tempCords = `{"center":{"lat":${tempLat},"lng":${tempLng},"altitude":${tempAltitude}},"tilt":${tempTilt},"heading":${tempHeading},"range":${tempRange}}`

  navigator.clipboard.writeText(tempCords)
}

const rotateCamera = () => {
  const gmap = document.querySelector('gmp-map-3d')

  if (!gmap) return // Ensure the map element is available

  const currentHeading = Number(gmap.getAttribute('heading'))
  const newHeading = (currentHeading + 90) % 30
  gmap.setAttribute('heading', `${newHeading}`)
}

// const toggleLabels = () => {
//   const gmap = document.querySelector('gmp-map-3d')

//   if (!gmap) return // Ensure the map element is available

//   gmap.setAttribute('labels', 'false')
// }

const DebugUi = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [cords, setCords] = useState<Attributes>({} as Attributes)
  const [map3DElement, setMap3DElement] = useState<HTMLElement>()
  const [controlsEnabled, setControlsEnabled] = useState(true)

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const element = document.querySelector('gmp-map-3d')
      if (element) {
        setMap3DElement(element as HTMLElement)
        observer.disconnect() // Stop observing once the element is found
      }
    })

    // Start observing changes in the DOM
    observer.observe(document.body, { childList: true, subtree: true })

    // Clean up the observer on component unmount
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const mapWrapper = document.querySelector('.map-wrapper')
    if (controlsEnabled) {
      mapWrapper?.classList.add('show-controls')
    } else {
      mapWrapper?.classList.remove('show-controls')
    }
  }, [controlsEnabled, map3DElement])

  interface Attributes {
    center: { lat: number; lng: number; altitude: number }
    tilt: number
    heading: number
    range: number
  }

  useEffect(() => {
    let animationFrameId: number
    const gmap = document.querySelector('gmp-map-3d')

    const updateCenterOnFrame = () => {
      if (gmap) {
        const tempattributes: Attributes = {} as Attributes

        const attributes = Array.from(gmap.attributes)
        for (const attribute of attributes) {
          if (attribute.name === 'center') {
            tempattributes[attribute.name] = {
              lat: parseFloat(attribute.value.split(',')[0]),
              lng: parseFloat(attribute.value.split(',')[1]),
              altitude: parseFloat(attribute.value.split(',')[2]),
            }
          } else {
            const attributeName: string = attribute.name
            // @ts-expect-error Doesnt applies to center
            tempattributes[attributeName as keyof Attributes] = parseFloat(
              attribute.value
            )
          }
        }
        setCords(tempattributes)
      }

      // Call this function again on the next frame
      animationFrameId = requestAnimationFrame(updateCenterOnFrame)
    }

    // Start the animation loop
    // setTimeout(() => {}, 10000)
    animationFrameId = requestAnimationFrame(updateCenterOnFrame)

    // Clean up when the component unmounts
    return () => cancelAnimationFrame(animationFrameId)
  }, [map3DElement])

  const updateAttributes = (value: string, key: string, subkey?: string) => {
    const gmap = document.querySelector('gmp-map-3d')

    if (!gmap) return // Ensure the map element is available

    const center = gmap.getAttribute('center')?.split(',').map(Number) // [lat, lng, altitude]

    if (!center || center.length !== 3) return // Ensure 'center' has three elements

    if (subkey !== undefined) {
      const subkeyIndex = Number(subkey)

      // Check if subkeyIndex is a valid number and within the range [0, 2]
      if (!isNaN(subkeyIndex) && subkeyIndex >= 0 && subkeyIndex <= 2) {
        center[subkeyIndex] = Number(value) // Update the corresponding index with the new value
        gmap.setAttribute('center', `${center[0]},${center[1]},${center[2]}`)
      }
    } else {
      gmap.setAttribute(key, value) // Update the attribute directly if no subkey is provided
    }
  }

  return (
    <div className={`${Styles.debugUI} ${collapsed ? Styles.collapsed : ''}`}>
      <h2 onClick={() => setCollapsed(!collapsed)}>Debug UI</h2>
      <button onClick={copyCords}>Copy cords</button>
      <button onClick={copyCordsAsObject}>Copy cords as Object</button>
      <button onClick={rotateCamera}>Rotate camera</button>
      <ul>
        {Object.entries(cords as Attributes).map(
          ([key, value]: [
            string,
            number | { lat: number; lng: number; altitude: number }
          ]) =>
            key === 'center' ? (
              <>
                {typeof value === 'object' && (
                  <>
                    <li>
                      Lat:
                      <input
                        type="text"
                        value={value.lat}
                        onChange={(e) =>
                          updateAttributes(e.target.value, 'center', '0')
                        }
                      />
                    </li>
                    <li>
                      Lng:
                      <input
                        type="text"
                        value={value.lng}
                        onChange={(e) =>
                          updateAttributes(e.target.value, 'center', '1')
                        }
                      />
                    </li>
                    <li>
                      Altitude:
                      <input
                        type="text"
                        value={value.altitude}
                        onChange={(e) =>
                          updateAttributes(e.target.value, 'center', '2')
                        }
                      />
                    </li>
                  </>
                )}
              </>
            ) : (
              key !== 'style' &&
              typeof value !== 'object' && (
                <li key={key}>
                  {key}:
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => updateAttributes(e.target.value, key)}
                  />
                </li>
              )
            )
        )}
        <li>
          <input
            type="checkbox"
            checked={controlsEnabled}
            onChange={() => setControlsEnabled(!controlsEnabled)}
          />{' '}
          <label>Enable controls </label>
        </li>
      </ul>
    </div>
  )
}

export {
  animateCameraOnScroll,
  animateCamera,
  copyCords,
  rotateCamera,
  DebugUi,
  copyCordsAsObject,
}
