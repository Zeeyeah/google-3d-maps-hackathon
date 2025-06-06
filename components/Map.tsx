import { Loader } from '@googlemaps/js-api-loader'
// import { DebugUi } from './HelperFunctions'

import React, { useEffect, useRef } from 'react'
import { useMapContext } from './MapContext'

const Map = () => {
  const mapRef = useRef() as React.MutableRefObject<HTMLElement>
  const { setIsSteady, setIsLoading } = useMapContext()

  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    version: 'beta',
  })

  useEffect(() => {
    const inti = async () => {
      //@ts-expect-error Beta API
      const { Map3DElement, SteadyChangeEvent } = (await loader.importLibrary(
        // @ts-expect-error Custom Element
        'maps3d'
      )) as google.maps.MapsLibrary

      const mainElement = document.body.querySelector('main')
      const existingMapElement = mainElement?.querySelector('.map-wrapper')

      if (!existingMapElement) {
        mapRef.current = new Map3DElement({
          center: {
            lat: 35.687072215111506,
            lng: 138.8104912750937,
            altitude: 1833.4669024567022,
          },
          tilt: 98.58085590884983,
          heading: -168.71172606271776,
          range: 0,
          mode: 'HYBRID',
        })

        const mapWrapper = document.createElement('div')
        mapWrapper.className = 'map-wrapper'

        mainElement?.appendChild(mapWrapper)
        mapWrapper.appendChild(mapRef.current)

        // @ts-expect-error Google Maps API Cutom Element
        mapRef.current.defaultLabelsDisabled = true
        // @ts-expect-error Google Maps API Cutom Element
        mapRef.current.defaultUIDisabled = true

        mapRef.current.addEventListener('gmp-steadychange', (event: Event) => {
          if (event instanceof SteadyChangeEvent) {
            // @ts-expect-error Custom Event
            if (event.isSteady) {
              console.log('The Map3DElement is now steady.')
              setIsSteady(true)
              setIsLoading(false)
            } else {
              setIsLoading(true)
            }
          }
        })
      }
    }

    inti()
  }, [])

  return <div>{/* <DebugUi /> */}</div>
}

export default Map
