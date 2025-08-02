"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { mockProducts } from "@/data/products"
import Link from "next/link"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState(mockProducts.slice(0, 4))

  const trendingSearches = ["Lawn suits", "Embroidered dresses", "Formal wear", "Black suits", "Summer collection"]

  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = mockProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setSearchResults(filtered.slice(0, 6))
    } else {
      setSearchResults(mockProducts.slice(0, 4))
    }
  }, [searchTerm])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="container mx-auto px-4 pt-20"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="glass rounded-2xl border border-white/10 max-w-4xl mx-auto">
            {/* Search Header */}
            <div className="flex items-center p-6 border-b border-white/10">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                <Input
                  type="text"
                  placeholder="Search for products, categories, or brands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 h-12 glass border-white/20 text-white placeholder:text-white/60 text-lg"
                  autoFocus
                />
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="ml-4 text-white hover:bg-white/10">
                <X className="w-6 h-6" />
              </Button>
            </div>

            {/* Search Content */}
            <div className="p-6">
              {searchTerm.trim() === "" ? (
                /* Trending Searches */
                <div>
                  <div className="flex items-center mb-4">
                    <TrendingUp className="w-5 h-5 text-purple-400 mr-2" />
                    <h3 className="text-white font-semibold">Trending Searches</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {trendingSearches.map((term) => (
                      <Badge
                        key={term}
                        variant="outline"
                        className="cursor-pointer border-white/20 text-white hover:bg-purple-500/20 hover:border-purple-500/50"
                        onClick={() => setSearchTerm(term)}
                      >
                        {term}
                      </Badge>
                    ))}
                  </div>

                  <h3 className="text-white font-semibold mb-4">Popular Products</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        onClick={onClose}
                        className="flex items-center space-x-4 p-4 glass rounded-lg border border-white/10 hover:border-purple-500/50 transition-all duration-200"
                      >
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="text-white font-medium mb-1">{product.name}</h4>
                          <p className="text-white/60 text-sm mb-2">{product.category}</p>
                          <p className="text-white font-semibold">Rs. {product.price.toLocaleString()}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                /* Search Results */
                <div>
                  <h3 className="text-white font-semibold mb-4">Search Results ({searchResults.length})</h3>
                  {searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          href={`/product/${product.id}`}
                          onClick={onClose}
                          className="flex items-center space-x-4 p-4 glass rounded-lg border border-white/10 hover:border-purple-500/50 transition-all duration-200"
                        >
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="text-white font-medium mb-1">{product.name}</h4>
                            <p className="text-white/60 text-sm mb-2">{product.category}</p>
                            <p className="text-white font-semibold">Rs. {product.price.toLocaleString()}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-white/60 mb-4">No products found for "{searchTerm}"</div>
                      <p className="text-white/40 text-sm">Try searching for something else</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
