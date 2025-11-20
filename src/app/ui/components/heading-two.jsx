import React from 'react'

const SectionHead2 = ({children, className}) => {
  return (
      <h2 className={`text-lg lg:text-xl 2xl:text-2xl ${className}`}>
        {children}
      </h2>
  )
}

export default SectionHead2