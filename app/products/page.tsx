"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Filter, Grid, List, Star, Heart, ShoppingCart, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/CartContext"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import Header from "@/components/Header"
import { mockProducts, categories } from "@/data/products"

export default function ProductsPage() {
  const { addItem } = useCart()
  const { toast } = useToast()
  const [wishlist, setWishlist] = useState<number[]>([])
  const [filteredProducts, setFilteredProducts] = useState(mockProducts)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [priceRange, setPriceRange] = useState("All")
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState("grid")
  const [isLoading, setIsLoading] = useState(true)

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
    toast({
      title: wishlist.includes(productId) ? "Removed from Wishlist" : "Added to Wishlist",
      description: wishlist.includes(productId) ? "Item removed from your wishlist." : "Item added to your wishlist.",
    })
  }

  const applyFilters = () => {
    setIsLoading(true)

    setTimeout(() => {
      let filtered = [...mockProducts]

      if (selectedCategory !== "All") {
        filtered = filtered.filter((product) => product.category === selectedCategory)
      }

      if (priceRange !== "All") {
        filtered = filtered.filter((product) => {
          switch (priceRange) {
            case "Under 5000":
              return product.price < 5000
            case "5000-10000":
              return product.price >= 5000 && product.price <= 10000
            case "10000-20000":
              return product.price >= 10000 && product.price <= 20000
            case "Above 20000":
              return product.price > 20000
            default:
              return true
          }
        })
      }

      // Sort products
      filtered.sort((a, b) => {
        switch (sortBy) {
          case "price-low":
            return a.price - b.price
          case "price-high":
            return b.price - a.price
          case "rating":
            return b.rating - a.rating
          case "newest":
            return b.id - a.id
          default:
            return 0
        }
      })

      setFilteredProducts(filtered)
      setIsLoading(false)
    }, 500)
  }

  useEffect(() => {
    applyFilters()
  }, [selectedCategory, priceRange, sortBy])

  useEffect(() => {
    // Initial loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
    })
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <div className="min-h-screen product-bg">
      <Header />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-white mb-2">All Products</h1>
            <p className="text-white/70">Discover our complete collection</p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-64">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="glass rounded-xl p-6 sticky top-24"
              >
                <div className="flex items-center space-x-2 mb-6">
                  <Filter className="text-white" size={20} />
                  <h2 className="text-white font-semibold text-lg">Filters</h2>
                </div>

                <div className="space-y-6">
                  {/* Category Filter */}
                  <div>
                    <h3 className="text-white font-medium mb-3">Category</h3>
                    <div className="space-y-2">
                      {["All", ...categories.map((c) => c.name)].map((category) => (
                        <label key={category} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="category"
                            value={category}
                            checked={selectedCategory === category}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="text-blue-600 focus-ring"
                          />
                          <span className="text-white/80 text-sm">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div>
                    <h3 className="text-white font-medium mb-3">Price Range</h3>
                    <div className="space-y-2">
                      {["All", "Under 5000", "5000-10000", "10000-20000", "Above 20000"].map((range) => (
                        <label key={range} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="priceRange"
                            value={range}
                            checked={priceRange === range}
                            onChange={(e) => setPriceRange(e.target.value)}
                            className="text-blue-600 focus-ring"
                          />
                          <span className="text-white/80 text-sm">{range}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <Button
                    onClick={() => {
                      setSelectedCategory("All")
                      setPriceRange("All")
                      setSortBy("newest")
                    }}
                    variant="outline"
                    className="w-full glass border-white/30 text-white hover:bg-white/10 focus-ring"
                  >
                    Clear Filters
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 glass rounded-xl p-4"
              >
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                  <span className="text-white/70 flex items-center gap-2">
                    {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                    {filteredProducts.length} products found
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="glass text-white text-sm rounded px-3 py-2 border border-white/20 focus-ring"
                  >
                    <option value="newest" className="bg-slate-800">
                      Newest
                    </option>
                    <option value="price-low" className="bg-slate-800">
                      Price: Low to High
                    </option>
                    <option value="price-high" className="bg-slate-800">
                      Price: High to Low
                    </option>
                    <option value="rating" className="bg-slate-800">
                      Highest Rated
                    </option>
                  </select>

                  {/* View Mode */}
                  <div className="flex space-x-1">
                    <Button
                      onClick={() => setViewMode("grid")}
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="icon"
                      className="glass border-white/30 text-white hover:bg-white/10 focus-ring"
                    >
                      <Grid size={16} />
                    </Button>
                    <Button
                      onClick={() => setViewMode("list")}
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="icon"
                      className="glass border-white/30 text-white hover:bg-white/10 focus-ring"
                    >
                      <List size={16} />
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Products */}
              {isLoading ? (
                <div
                  className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
                >
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="glass rounded-xl p-4">
                      <div className="image-placeholder w-full h-48 rounded-lg mb-4" />
                      <div className="image-placeholder h-4 w-3/4 rounded mb-2" />
                      <div className="image-placeholder h-3 w-1/2 rounded mb-2" />
                      <div className="image-placeholder h-4 w-1/3 rounded mb-4" />
                      <div className="image-placeholder h-10 w-full rounded" />
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className={`grid gap-6 ${
                    viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                  }`}
                >
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      whileHover={{ y: -5 }}
                      className="group"
                    >
                      <div
                        className={`glass rounded-xl overflow-hidden hover:bg-white/5 transition-all duration-300 card-hover ${
                          viewMode === "list" ? "flex" : ""
                        }`}
                      >
                        {/* Product Image */}
                        <div className={`relative overflow-hidden ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
                          <Link href={`/product/${product.id}`}>
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                                viewMode === "list" ? "w-full h-32" : "w-full h-48"
                              }`}
                              loading="lazy"
                            />
                          </Link>

                          {/* Badges */}
                          <div className="absolute top-3 left-3 flex flex-col gap-2">
                            {product.isNew && <Badge className="bg-blue-600 text-white text-xs">New</Badge>}
                            <Badge className="bg-red-500 text-white text-xs">
                              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                            </Badge>
                          </div>

                          {/* Wishlist Button */}
                          <Button
                            onClick={() => toggleWishlist(product.id)}
                            variant="ghost"
                            size="icon"
                            className="absolute top-3 right-3 w-8 h-8 glass opacity-0 group-hover:opacity-100 transition-opacity focus-ring"
                          >
                            <Heart
                              className={`${wishlist.includes(product.id) ? "text-red-500 fill-red-500" : "text-white"}`}
                              size={16}
                            />
                          </Button>
                        </div>

                        {/* Product Info */}
                        <div className="p-4 flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white/60 text-sm">{product.category}</span>
                            <div className="flex items-center space-x-1">
                              <Star className="text-yellow-400 fill-yellow-400" size={12} />
                              <span className="text-white/80 text-sm">{product.rating}</span>
                            </div>
                          </div>

                          <Link href={`/product/${product.id}`}>
                            <h3 className="text-white font-semibold mb-2 hover:text-blue-400 transition-colors">
                              {product.name}
                            </h3>
                          </Link>

                          <p className="text-white/70 text-sm mb-3 line-clamp-2">{product.description}</p>

                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <span className="text-white font-bold">Rs. {product.price.toLocaleString()}</span>
                              <span className="text-white/50 line-through text-sm">
                                Rs. {product.originalPrice.toLocaleString()}
                              </span>
                            </div>
                          </div>

                          <Button
                            onClick={() => handleAddToCart(product)}
                            className="w-full primary-button focus-ring"
                            size="sm"
                          >
                            <ShoppingCart size={16} className="mr-2" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {!isLoading && filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <div className="glass rounded-xl p-12">
                    <Filter className="mx-auto mb-4 text-white/40" size={48} />
                    <p className="text-white/60 mb-2">No products found matching your criteria.</p>
                    <p className="text-white/40 text-sm">Try adjusting your filters or search terms.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
