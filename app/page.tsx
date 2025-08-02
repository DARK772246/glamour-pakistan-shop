"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Categories from "@/components/Categories"
import FeaturedProducts from "@/components/FeaturedProducts"
import TrendingCarousel from "@/components/TrendingCarousel"
import Newsletter from "@/components/Newsletter"
import Footer from "@/components/Footer"
import SplashScreen from "@/components/SplashScreen"

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    // Check if user has seen splash screen before
    const hasSeenSplash = localStorage.getItem("hasSeenSplash")
    if (hasSeenSplash) {
      setShowSplash(false)
    }
  }, [])

  const handleSplashComplete = () => {
    localStorage.setItem("hasSeenSplash", "true")
    setShowSplash(false)
  }

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Header />
      <main>
        <Hero />
        <Categories />
        <FeaturedProducts />
        <TrendingCarousel />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
