"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star, Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/CartContext"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"

interface Product {
  id: string
  name: string
  price: number
  originalPrice: number
  rating: number
  reviewCount: number
  image: string
  category: string
  brand: string
  inStock: boolean
}

interface RelatedProductsProps {
  currentProductId: string
  category: string
}

// Mock related products data
const mockProducts: Product[] = [
  {
    id: "3",
    name: "Silk Scarf Collection",
    price: 2500,
    originalPrice: 3500,
    rating: 4.7,
    reviewCount: 67,
    image: "/placeholder.svg?height=300&width=250&text=Silk+Scarf",
    category: "Accessories",
    brand: "Glamour Collection",
    inStock: true,
  },
  {
    id: "4",
    name: "Pearl Jewelry Set",
    price: 6500,
    originalPrice: 8500,
    rating: 4.9,
    reviewCount: 143,
    image: "/placeholder.svg?height=300&width=250&text=Pearl+Jewelry",
    category: "Jewelry",
    brand: "Glamour Collection",
    inStock: true,
  },
  {
    id: "5",
    name: "Designer Sunglasses",
    price: 3200,
    originalPrice: 4200,
    rating: 4.5,
    reviewCount: 89,
    image: "/placeholder.svg?height=300&width=250&text=Sunglasses",
    category: "Accessories",
    brand: "Glamour Collection",
    inStock: true,
  },
  {
    id: "6",
    name: "Luxury Watch",
    price: 15000,
    originalPrice: 18000,
    rating: 4.8,
    reviewCount: 234,
    image: "/placeholder.svg?height=300&width=250&text=Luxury+Watch",
    category: "Accessories",
    brand: "Glamour Collection",
    inStock: false,
  },
]

export default function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [wishlist, setWishlist] = useState<Set<string>>(new Set())
  const { addItem } = useCart()
  const { toast } = useToast()
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Filter products by category and exclude current product
    const filtered = mockProducts.filter((product) => product.id !== currentProductId).slice(0, 4) // Show max 4 related products

    setRelatedProducts(filtered)
  }, [currentProductId, category])

  const handleAddToCart = (product: Product) => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to add items to your cart.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    if (!product.inStock) {
      toast({
        title: "Out of Stock",
        description: "This product is currently out of stock.",
        variant: "destructive",
      })
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })

    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const toggleWishlist = (productId: string) => {
    const newWishlist = new Set(wishlist)
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId)
      toast({
        title: "Removed from wishlist",
        description: "Product removed from your wishlist.",
      })
    } else {
      newWishlist.add(productId)
      toast({
        title: "Added to wishlist",
        description: "Product added to your wishlist.",
      })
    }
    setWishlist(newWishlist)
  }

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">You Might Also Like</h2>
        <p className="text-white/60">Discover more products from our collection</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass rounded-2xl overflow-hidden group hover:scale-105 transition-all duration-300"
          >
            <div className="relative">
              <Link href={`/product/${product.id}`}>
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover cursor-pointer"
                />
              </Link>

              {/* Wishlist Button */}
              <Button
                onClick={() => toggleWishlist(product.id)}
                variant="outline"
                size="icon"
                className="absolute top-3 right-3 glass border-white/30 text-white hover:bg-white/10 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Heart className={wishlist.has(product.id) ? "fill-red-500 text-red-500" : ""} size={16} />
              </Button>

              {/* Discount Badge */}
              {product.originalPrice > product.price && (
                <div className="absolute top-3 left-3">
                  <Badge className="bg-red-500 text-white">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </Badge>
                </div>
              )}

              {/* Stock Status */}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge variant="destructive">Out of Stock</Badge>
                </div>
              )}
            </div>

            <div className="p-4 space-y-3">
              {/* Brand */}
              <Badge variant="outline" className="border-white/30 text-white text-xs">
                {product.brand}
              </Badge>

              {/* Product Name */}
              <Link href={`/product/${product.id}`}>
                <h3 className="text-white font-semibold hover:text-pink-400 transition-colors cursor-pointer line-clamp-2">
                  {product.name}
                </h3>
              </Link>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
                      }`}
                      size={14}
                    />
                  ))}
                </div>
                <span className="text-white/60 text-sm">({product.reviewCount})</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-2">
                <span className="text-white font-bold">Rs. {product.price.toLocaleString()}</span>
                {product.originalPrice > product.price && (
                  <span className="text-white/50 line-through text-sm">
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={() => handleAddToCart(product)}
                disabled={!product.inStock}
                className={`w-full ${product.inStock ? "neon-button" : "bg-gray-500 text-gray-300 cursor-not-allowed"}`}
                size="sm"
              >
                <ShoppingCart size={16} className="mr-2" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Products Link */}
      <div className="text-center">
        <Link href="/products">
          <Button variant="outline" className="glass border-white/30 text-white hover:bg-white/10 bg-transparent">
            View All Products
          </Button>
        </Link>
      </div>
    </motion.div>
  )
      }
