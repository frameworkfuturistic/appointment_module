"use client"

import React, { useState, useContext, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Lock, Unlock, Eye, EyeOff, Shield, Activity } from "lucide-react"
import { AuthContext } from "../context/AuthContext"
import { useRouter } from "next/navigation"

interface FormData {
  username: string
  password: string
}

interface Errors {
  username?: string
  password?: string
  form?: string
}

export default function Component() {
  const [formData, setFormData] = useState<FormData>({ username: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [loading, setLoading] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const router = useRouter()
  const { login } = useContext(AuthContext)

  const validateForm = () => {
    const newErrors: Errors = {}
    if (!formData.username) newErrors.username = "Id is required"
    else if (!/^\d{8}$/.test(formData.username))
      newErrors.username = "Id must be in formatted"
    if (!formData.password) newErrors.password = "Password is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setLoading(true)
      try {
        await login(formData)
        setIsUnlocked(true)
        setTimeout(() => router.push("/dashboard"), 2000)
      } catch (error) {
        setErrors({ form: "Invalid id or password" })
        setIsUnlocked(false)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const elem = document.querySelector('.pulse')
      if (elem) {
        elem.classList.add('animate-pulse')
        setTimeout(() => elem.classList.remove('animate-pulse'), 1000)
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex justify-center items-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="p-8">
            <div className="text-center mb-8">
              <motion.div
                animate={{ rotate: isUnlocked ? 360 : 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block mb-4"
              >
                {isUnlocked ? (
                  <Unlock className="h-16 w-16 text-green-400" />
                ) : (
                  <Lock className="h-16 w-16 text-red-400" />
                )}
              </motion.div>
              <h2 className="text-3xl font-bold">Secure Access</h2>
              <p className="text-gray-400 text-sm mt-2">SHREE JAGANNATH HOSPITAL & RESEARCH CENTRE</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="username" className="text-gray-300">
                  ID
                </Label>
                <div className="mt-1 relative">
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md"
                    placeholder="Enter your admin id"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  <Shield className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                {errors.username && (
                  <p className="mt-2 text-sm text-red-400">{errors.username}</p>
                )}
              </div>
              <div>
                <Label htmlFor="password" className="text-gray-300">
                  PASSWORD
                </Label>
                <div className="mt-1 relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-400">{errors.password}</p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <Label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                    Remember me
                  </Label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-400 hover:text-blue-300">
                    Forgot your password?
                  </a>
                </div>
              </div>
              {errors.form && (
                <p className="mt-2 text-sm text-red-400 text-center">{errors.form}</p>
              )}
              <div>
                <Button
                  type="submit"
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? "Authenticating..." : "Secure Login"}
                </Button>
              </div>
            </form>
          </div>
          <div className="bg-gray-900 px-8 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-green-400 pulse" />
              <span className="text-sm text-gray-400">System Status: Online</span>
            </div>
            <span className="text-sm text-gray-400">v2.1.0</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}