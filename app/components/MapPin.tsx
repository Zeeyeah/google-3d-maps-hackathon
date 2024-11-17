import React from 'react'

interface MapPinProps {
  color: string
  borderColor: string
}

const MapPin: React.FC<MapPinProps> = ({ color, borderColor }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="marker-pin">
        <circle id="inner" cx="16" cy="16.0001" r="7.52941" fill={color} />
        <circle
          id="outer"
          cx="16"
          cy="16"
          r="16"
          fill={borderColor}
          fill-opacity="0.3"
        />
        <circle
          id="outer_2"
          cx="16"
          cy="16"
          r="13.1765"
          fill={borderColor}
          fill-opacity="0.3"
        />
        <circle
          id="outer_3"
          cx="16"
          cy="15.9999"
          r="10.3529"
          fill={borderColor}
          fill-opacity="0.3"
        />
      </g>
    </svg>
  )
}

export default MapPin
