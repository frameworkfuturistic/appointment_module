import React from 'react'

const Subtitle = ({subtitle}) => {
  return (
    <div className="text-center mt-4 mb-4">
    <h2 className="text-slate-800 text-xl sm:text-xl md:text-xl font-sans font-semibold">
      {subtitle}
    </h2>
  </div>
  )
}

export default Subtitle
