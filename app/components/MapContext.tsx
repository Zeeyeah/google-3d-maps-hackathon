// MapContext.tsx
import React, { createContext, useContext, useState } from 'react'

interface MapContextProps {
  isSteady: boolean
  isLoading: boolean
  setIsSteady: (steady: boolean) => void
  setIsLoading: (loading: boolean) => void
}

const MapContext = createContext<MapContextProps | undefined>(undefined)

export const MapProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSteady, setIsSteady] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  return (
    <MapContext.Provider
      value={{ isSteady, setIsSteady, isLoading, setIsLoading }}
    >
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
