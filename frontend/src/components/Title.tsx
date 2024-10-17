import React from 'react'

const Title = ({title}) => {
  return (
    <div className="text-center mt-2 mb-4">
    <h2 className="text-slate-800 text-xl sm:text-3xl md:text-4xl font-sans font-semibold">
      {title}
    </h2>
  </div>
  )
}

export default Title
