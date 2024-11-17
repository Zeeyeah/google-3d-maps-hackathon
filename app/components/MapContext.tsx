// MapContext.tsx
import React, { createContext, useContext, useState } from 'react'

interface MapContextProps {
  isSteady: boolean
  setIsSteady: (steady: boolean) => void
}

const MapContext = createContext<MapContextProps | undefined>(undefined)

export const MapProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSteady, setIsSteady] = useState(false)

  return (
    <MapContext.Provider value={{ isSteady, setIsSteady }}>
      {children}
    </MapContext.Provider>
  )
}

export const useMapContext = () => {
  const context = useContext(MapContext)
  if (!context) {
    throw new Error('useMapContext must be used within a MapProvider')
  }
  return context
}
