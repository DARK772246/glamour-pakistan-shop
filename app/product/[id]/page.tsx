"use client"

import { Label } from "@/components/ui/label"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Eye,
  Ruler,
  Package,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/contexts/CartContext"
import { useToast } from "@/hooks/use-toast"
import Header from "@/components/Header"
import ProductViewer3D from "@/components/ProductViewer3D"
import ReviewsSection from "@/components/ReviewsSection"
import SizeChart from "@/components/SizeChart"
import RelatedProducts from "@/components/RelatedProducts"
import { useParams } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"

// Mock product data - in real app, this would come from API
const getProductById = (id: string) => {
  const products = {
    "1": {
      id: "1",
      name: "Elegant Evening Dress",
      price: 8500,
      originalPrice: 12000,
      rating: 4.8,
      reviewCount: 124,
      images: [
        "/placeholder.svg?height=600&width=500&text=Elegant+Evening+Dress+Front",
        "/placeholder.svg?height=600&width=500&text=Elegant+Evening+Dress+Back",
        "/placeholder.svg?height=600&width=500&text=Elegant+Evening+Dress+Side",
        "/placeholder.svg?height=600&width=500&text=Elegant+Evening+Dress+Detail",
      ],
      category: "Clothing",
      brand: "Glamour Collection",
      description:
        "Stunning evening dress perfect for special occasions. Made with premium fabric and elegant design that flatters every body type.",
      features: [
        "Premium quality fabric",
        "Elegant design",
        "Perfect for special occasions",
        "Available in multiple sizes",
        "Professional tailoring",
      ],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      colors: ["Black", "Navy Blue", "Burgundy", "Emerald Green"],
      inStock: true,
      stockCount: 15,
      sku: "GC-ED-001",
      material: "Premium Polyester Blend",
      careInstructions: "Dry clean only",
      model3D: "/assets/3d/dress.glb",
      sizeChart: {
        type: "dress",
        measurements: [
          { size: "XS", bust: "32", waist: "24", hips: "34", length: "58" },
          { size: "S", bust: "34", waist: "26", hips: "36", length: "59" },
          { size: "M", bust: "36", waist: "28", hips: "38", length: "60" },
          { size: "L", bust: "38", waist: "30", hips: "40", length: "61" },
          { size: "XL", bust: "40", waist: "32", hips: "42", length: "62" },
          { size: "XXL", bust: "42", waist: "34", hips: "44", length: "63" },
        ],
      },
    },
    "2": {
      id: "2",
      name: "Designer Handbag",
      price: 4500,
      originalPrice: 6000,
      rating: 4.6,
      reviewCount: 89,
      images: [
        "/placeholder.svg?height=600&width=500&text=Designer+Handbag+Front",
        "/placeholder.svg?height=600&width=500&text=Designer+Handbag+Side",
        "/placeholder.svg?height=600&width=500&text=Designer+Handbag+Interior",
        "/placeholder.svg?height=600&width=500&text=Designer+Handbag+Detail",
      ],
      category: "Accessories",
      brand: "Glamour Collection",
      description:
        "Luxurious designer handbag crafted with premium materials. Perfect for both casual and formal occasions.",
      features: [
        "Genuine leather construction",
        "Multiple compartments",
        "Adjustable strap",
        "Gold-tone hardware",
        "Dust bag included",
      ],
      sizes: ["One Size"],
      colors: ["Black", "Brown", "Beige", "Red"],
      inStock: true,
      stockCount: 8,
      sku: "GC-HB-002",
      material: "Genuine Leather",
      careInstructions: "Clean with leather conditioner",
      model3D: "/assets/3d/handbag.glb",
      sizeChart: {
        type: "accessory",
        measurements: [{ size: "One Size", width: "12", height: "8", depth: "4", strap: "24-48" }],
      },
    },
  }

  return products[id as keyof typeof products] || products["1"]
}

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string
  const product = getProductById(productId)

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showSizeChart, setShowSizeChart] = useState(false)
  const [show3DViewer, setShow3DViewer] = useState(false)

  const { addItem } = useCart()
  const { isAuthenticated } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleAddToCart = () => {
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

    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "Choose your preferred size before adding to cart.",
        variant: "destructive",
      })
      return
    }

    // Add multiple quantities if user selected more than 1
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        size: selectedSize,
        color: selectedColor,
        quantity: 1, // Add one item at a time
      })
    }

    toast({
      title: "Added to cart!",
      description: `${quantity} x ${product.name} has been added to your cart.`,
    })
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out this amazing ${product.name}`,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied!",
        description: "Product link has been copied to clipboard.",
      })
    }
  }

  return (
    <div className="min-h-screen">
      <Header />

      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <nav className="text-white/60 text-sm">
              <span>Home</span> / <span>Categories</span> / <span>{product.category}</span> /
              <span className="text-white"> {product.name}</span>
            </nav>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Product Images */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              {/* Main Image */}
              <div className="relative glass rounded-2xl overflow-hidden group">
                <img
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-96 lg:h-[500px] object-cover"
                />

                {/* Image Navigation */}
                <button
                  onClick={() => setSelectedImage((prev) => (prev > 0 ? prev - 1 : product.images.length - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 glass w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft className="text-white" size={20} />
                </button>

                <button
                  onClick={() => setSelectedImage((prev) => (prev < product.images.length - 1 ? prev + 1 : 0))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 glass w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="text-white" size={20} />
                </button>

                {/* 3D Viewer Button */}
                <Button
                  onClick={() => setShow3DViewer(true)}
                  className="absolute top-4 right-4 glass border-white/30 text-white hover:bg-white/10 bg-transparent"
                  size="sm"
                >
                  <Eye size={16} className="mr-2" />
                  3D View
                </Button>

                {/* Discount Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-red-500 text-white">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </Badge>
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? "border-pink-500 scale-105" : "border-white/20 hover:border-white/40"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Details */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Brand & Category */}
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="border-white/30 text-white">
                  {product.brand}
                </Badge>
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    variant="outline"
                    size="icon"
                    className="glass border-white/30 text-white hover:bg-white/10"
                  >
                    <Heart className={isWishlisted ? "fill-red-500 text-red-500" : ""} size={18} />
                  </Button>
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    size="icon"
                    className="glass border-white/30 text-white hover:bg-white/10 bg-transparent"
                  >
                    <Share2 size={18} />
                  </Button>
                </div>
              </div>

              {/* Product Name */}
              <h1 className="text-3xl lg:text-4xl font-bold text-white">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
                      }`}
                      size={18}
                    />
                  ))}
                  <span className="text-white/80 ml-2">{product.rating}</span>
                </div>
                <span className="text-white/60">({product.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-white">Rs. {product.price.toLocaleString()}</span>
                <span className="text-xl text-white/50 line-through">Rs. {product.originalPrice.toLocaleString()}</span>
                <Badge className="bg-green-500 text-white">
                  Save Rs. {(product.originalPrice - product.price).toLocaleString()}
                </Badge>
              </div>

              {/* Description */}
              <p className="text-white/80 leading-relaxed">{product.description}</p>

              {/* Size Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-white font-medium">Size</Label>
                  <Button
                    onClick={() => setShowSizeChart(true)}
                    variant="link"
                    className="text-pink-400 hover:text-pink-300 p-0 h-auto"
                  >
                    <Ruler size={16} className="mr-1" />
                    Size Chart
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      variant={selectedSize === size ? "default" : "outline"}
                      className={`${
                        selectedSize === size
                          ? "neon-button"
                          : "glass border-white/30 text-white hover:bg-white/10 bg-transparent"
                      }`}
                      size="sm"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="space-y-3">
                <Label className="text-white font-medium">Color</Label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <Button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      variant={selectedColor === color ? "default" : "outline"}
                      className={`${
                        selectedColor === color
                          ? "neon-button"
                          : "glass border-white/30 text-white hover:bg-white/10 bg-transparent"
                      }`}
                      size="sm"
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-3">
                <Label className="text-white font-medium">Quantity</Label>
                <div className="flex items-center space-x-3">
                  <Button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    variant="outline"
                    size="icon"
                    className="glass border-white/30 text-white hover:bg-white/10"
                  >
                    -
                  </Button>
                  <span className="text-white font-medium w-12 text-center">{quantity}</span>
                  <Button
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    variant="outline"
                    size="icon"
                    className="glass border-white/30 text-white hover:bg-white/10"
                  >
                    +
                  </Button>
                  <span className="text-white/60 text-sm ml-4">{product.stockCount} items left</span>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex space-x-4">
                <Button onClick={handleAddToCart} className="flex-1 neon-button" size="lg">
                  <ShoppingCart size={20} className="mr-2" />
                  Add to Cart - Rs. {(product.price * quantity).toLocaleString()}
                </Button>
              </div>

              {/* Product Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20">
                <div className="text-center">
                  <Truck className="mx-auto mb-2 text-green-400" size={24} />
                  <p className="text-white/80 text-sm">Free Shipping</p>
                  <p className="text-white/60 text-xs">Orders over Rs. 5000</p>
                </div>
                <div className="text-center">
                  <Shield className="mx-auto mb-2 text-blue-400" size={24} />
                  <p className="text-white/80 text-sm">Secure Payment</p>
                  <p className="text-white/60 text-xs">100% Protected</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="mx-auto mb-2 text-purple-400" size={24} />
                  <p className="text-white/80 text-sm">Easy Returns</p>
                  <p className="text-white/60 text-xs">7 days return</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Product Details Tabs */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass rounded-2xl p-6 mb-16"
          >
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-4 glass">
                <TabsTrigger value="description" className="text-white data-[state=active]:bg-white/20">
                  Description
                </TabsTrigger>
                <TabsTrigger value="specifications" className="text-white data-[state=active]:bg-white/20">
                  Specifications
                </TabsTrigger>
                <TabsTrigger value="reviews" className="text-white data-[state=active]:bg-white/20">
                  Reviews ({product.reviewCount})
                </TabsTrigger>
                <TabsTrigger value="shipping" className="text-white data-[state=active]:bg-white/20">
                  Shipping
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-white font-semibold text-lg">Product Description</h3>
                  <p className="text-white/80 leading-relaxed">{product.description}</p>

                  <h4 className="text-white font-medium">Key Features:</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-white/80 flex items-center">
                        <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="specifications" className="mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="text-white font-semibold text-lg">Product Details</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-white/70">SKU:</span>
                        <span className="text-white">{product.sku}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Brand:</span>
                        <span className="text-white">{product.brand}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Material:</span>
                        <span className="text-white">{product.material}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Care:</span>
                        <span className="text-white">{product.careInstructions}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-white font-semibold text-lg">Available Options</h3>
                    <div className="space-y-2">
                      <div>
                        <span className="text-white/70">Sizes:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {product.sizes.map((size) => (
                            <Badge key={size} variant="outline" className="border-white/30 text-white">
                              {size}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-white/70">Colors:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {product.colors.map((color) => (
                            <Badge key={color} variant="outline" className="border-white/30 text-white">
                              {color}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <ReviewsSection productId={product.id} />
              </TabsContent>

              <TabsContent value="shipping" className="mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-white font-semibold text-lg">Shipping Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Package className="text-green-400" size={20} />
                        <div>
                          <p className="text-white font-medium">Free Standard Shipping</p>
                          <p className="text-white/60 text-sm">On orders over Rs. 5,000</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Truck className="text-blue-400" size={20} />
                        <div>
                          <p className="text-white font-medium">Express Delivery</p>
                          <p className="text-white/60 text-sm">1-2 business days - Rs. 300</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-white font-semibold text-lg">Return Policy</h3>
                    <div className="space-y-2 text-white/80 text-sm">
                      <p>• 7-day return policy</p>
                      <p>• Items must be in original condition</p>
                      <p>• Free returns for defective items</p>
                      <p>• Return shipping costs apply for exchanges</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Related Products */}
          <RelatedProducts currentProductId={product.id} category={product.category} />
        </div>
      </div>

      {/* 3D Viewer Modal */}
      <AnimatePresence>
        {show3DViewer && (
          <ProductViewer3D product={product} isOpen={show3DViewer} onClose={() => setShow3DViewer(false)} />
        )}
      </AnimatePresence>

      {/* Size Chart Modal */}
      <AnimatePresence>
        {showSizeChart && (
          <SizeChart sizeChart={product.sizeChart} isOpen={showSizeChart} onClose={() => setShowSizeChart(false)} />
        )}
      </AnimatePresence>
    </div>
  )
      }
