"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockProducts } from "@/data/products"

export default function TrendingCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const trendingProducts = mockProducts.slice(0, 4)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % trendingProducts.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [trendingProducts.length])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % trendingProducts.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + trendingProducts.length) % trendingProducts.length)
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Trending Now</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">Most popular items loved by our customers</p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5 }}
                className="glass border border-white/10"
              >
                <div className="grid lg:grid-cols-2 gap-8 p-8">
                  {/* Product Image */}
                  <div className="relative">
                    <img
                      src={trendingProducts[currentIndex].image || "/placeholder.svg"}
                      alt={trendingProducts[currentIndex].name}
                      className="w-full h-96 lg:h-full object-cover rounded-2xl"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        Trending #{currentIndex + 1}
                      </Badge>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-col justify-center">
                    <Badge variant="outline" className="text-purple-400 border-purple-400 w-fit mb-4">
                      {trendingProducts[currentIndex].category}
                    </Badge>

                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      {trendingProducts[currentIndex].name}
                    </h3>

                    <p className="text-white/70 text-lg mb-6">{trendingProducts[currentIndex].description}</p>

                    <div className="flex items-center mb-6">
                      <div className="flex items-center text-yellow-400 mr-4">
                        <Star className="w-5 h-5 fill-current" />
                        <span className="text-white ml-2 font-semibold">{trendingProducts[currentIndex].rating}</span>
                        <span className="text-white/60 ml-1">({trendingProducts[currentIndex].reviews} reviews)</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl font-bold text-white">
                          Rs. {trendingProducts[currentIndex].price.toLocaleString()}
                        </span>
                        {trendingProducts[currentIndex].originalPrice > trendingProducts[currentIndex].price && (
                          <span className="text-white/50 line-through text-xl">
                            Rs. {trendingProducts[currentIndex].originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex-1"
                      >
                        Add to Cart
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-white/30 text-white hover:bg-white/10 flex-1 bg-transparent"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {trendingProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-purple-500 to-pink-500"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
