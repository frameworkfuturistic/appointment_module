import React from 'react'
import { motion } from "framer-motion"

const Title = ({title}) => {
  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="text-center mb-16"
  >
    <h1 className="text-5xl font-bold text-gray-900 mb-4">{title}</h1>
   
  </motion.div>
  )
}

export default Title
