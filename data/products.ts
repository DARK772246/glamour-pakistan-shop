export interface Product {
  id: number
  name: string
  price: number
  originalPrice: number
  image: string
  category: string
  description: string
  rating: number
  reviews: number
  isNew: boolean
  colors: string[]
  sizes: string[]
  images: string[]
  brand?: string
  inStock?: boolean
  stockCount?: number
  isFeatured?: boolean
  features?: string[]
  specifications?: Record<string, string>
}

export const categories = [
  { name: "Lawn Suits", icon: "👗", count: 25 },
  { name: "Embroidered", icon: "✨", count: 18 },
  { name: "Casual Wear", icon: "👚", count: 32 },
  { name: "Formal Wear", icon: "💼", count: 15 },
  { name: "Accessories", icon: "💍", count: 28 },
  { name: "Shoes", icon: "👠", count: 22 },
]

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Premium Black Embroidered Lawn Suit",
    price: 4500,
    originalPrice: 6000,
    image: "/images/product1.jpg",
    category: "Lawn Suits",
    description:
      "Elegant black lawn suit with intricate embroidery work. Features beautiful neckline embroidery and matching dupatta with vibrant floral prints. Perfect for casual and semi-formal occasions.",
    rating: 4.8,
    reviews: 124,
    isNew: true,
    colors: ["Black", "Navy", "Maroon"],
    sizes: ["S", "M", "L", "XL"],
    images: ["/images/product1.jpg", "/images/product2.jpg"],
    brand: "Glamour Collection",
    inStock: true,
    stockCount: 15,
    isFeatured: true,
    features: [
      "Premium lawn fabric",
      "Hand embroidered details",
      "Comfortable fit",
      "Easy care fabric",
      "Matching dupatta included",
    ],
    specifications: {
      Fabric: "100% Cotton Lawn",
      Work: "Hand Embroidery",
      Occasion: "Formal/Party",
      Care: "Machine wash cold",
      Origin: "Pakistan",
    },
  },
  {
    id: 2,
    name: "Black Embroidered Lawn Collection",
    price: 4500,
    originalPrice: 5800,
    image: "/images/product2.jpg",
    category: "Embroidered",
    description:
      "Complete 3-piece lawn collection featuring exquisite embroidery on front, sleeves, and trouser. Comes with colorful printed dupatta. High-quality lawn fabric perfect for summer wear.",
    rating: 4.9,
    reviews: 89,
    isNew: true,
    colors: ["Black", "White", "Grey"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: ["/images/product2.jpg", "/images/product1.jpg"],
    brand: "Glamour Collection",
    inStock: true,
    stockCount: 12,
    isFeatured: true,
    features: [
      "Designer embroidery",
      "Soft lawn fabric",
      "Modern silhouette",
      "Breathable material",
      "Complete 3-piece set",
    ],
    specifications: {
      Fabric: "Premium Cotton Lawn",
      Work: "Machine + Hand Embroidery",
      Occasion: "Casual/Semi-formal",
      Care: "Gentle machine wash",
      Origin: "Pakistan",
    },
  },
  {
    id: 3,
    name: "Designer Embroidered Kurta Set",
    price: 4500,
    originalPrice: 5500,
    image: "/images/product1.jpg",
    category: "Casual Wear",
    description:
      "Stylish black kurta with palazzo pants featuring delicate embroidery patterns. Comfortable fit with premium quality fabric. Ideal for daily wear and casual outings.",
    rating: 4.7,
    reviews: 156,
    isNew: false,
    colors: ["Black", "Brown", "Dark Green"],
    sizes: ["S", "M", "L", "XL"],
    images: ["/images/product1.jpg"],
    brand: "Glamour Collection",
    inStock: true,
    stockCount: 8,
    isFeatured: false,
    features: ["Soft lawn fabric", "Subtle embroidery", "Comfortable fit", "Easy maintenance", "Everyday wear"],
    specifications: {
      Fabric: "Cotton Lawn",
      Work: "Light Embroidery",
      Occasion: "Casual/Daily",
      Care: "Machine washable",
      Origin: "Pakistan",
    },
  },
  {
    id: 4,
    name: "Elegant Black Lawn Ensemble",
    price: 4500,
    originalPrice: 6200,
    image: "/images/product2.jpg",
    category: "Formal Wear",
    description:
      "Sophisticated black lawn suit with premium embroidery work. Features coordinated trouser and dupatta with beautiful floral motifs. Perfect for formal events and gatherings.",
    rating: 4.6,
    reviews: 78,
    isNew: true,
    colors: ["Black", "Charcoal", "Deep Blue"],
    sizes: ["M", "L", "XL"],
    images: ["/images/product2.jpg"],
    brand: "Glamour Collection",
    inStock: true,
    stockCount: 6,
    isFeatured: true,
    features: [
      "Heavy embroidery work",
      "Premium quality fabric",
      "Elegant design",
      "Perfect for occasions",
      "Comfortable wear",
    ],
    specifications: {
      Fabric: "Luxury Cotton Blend",
      Work: "Heavy Hand Embroidery",
      Occasion: "Wedding/Formal",
      Care: "Dry clean recommended",
      Origin: "Pakistan",
    },
  },
  {
    id: 5,
    name: "Traditional Embroidered Outfit",
    price: 4500,
    originalPrice: 5900,
    image: "/images/product1.jpg",
    category: "Lawn Suits",
    description:
      "Classic black traditional outfit with authentic Pakistani embroidery. High-quality lawn fabric with comfortable fit. Includes matching accessories and vibrant dupatta.",
    rating: 4.8,
    reviews: 203,
    isNew: false,
    colors: ["Black", "Midnight Blue", "Forest Green"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: ["/images/product1.jpg", "/images/product2.jpg"],
    brand: "Glamour Collection",
    inStock: true,
    stockCount: 10,
    isFeatured: false,
    features: [
      "Traditional patterns",
      "Cultural motifs",
      "Authentic design",
      "Quality craftsmanship",
      "Heritage collection",
    ],
    specifications: {
      Fabric: "Traditional Cotton",
      Work: "Traditional Embroidery",
      Occasion: "Cultural/Festival",
      Care: "Hand wash preferred",
      Origin: "Pakistan",
    },
  },
  {
    id: 6,
    name: "Premium Lawn Collection",
    price: 4500,
    originalPrice: 5700,
    image: "/images/product2.jpg",
    category: "Embroidered",
    description:
      "Luxurious black lawn collection with detailed embroidery on all pieces. Features premium quality fabric and expert craftsmanship. Complete with matching dupatta and trouser.",
    rating: 4.9,
    reviews: 167,
    isNew: true,
    colors: ["Black", "Charcoal Grey", "Dark Purple"],
    sizes: ["S", "M", "L", "XL"],
    images: ["/images/product2.jpg"],
    brand: "Glamour Collection",
    inStock: true,
    stockCount: 14,
    isFeatured: true,
    features: ["Modern embroidery", "Contemporary design", "Trendy patterns", "Comfortable fabric", "Stylish cut"],
    specifications: {
      Fabric: "Modern Cotton Blend",
      Work: "Contemporary Embroidery",
      Occasion: "Modern/Trendy",
      Care: "Easy care",
      Origin: "Pakistan",
    },
  },
]

// Export products as both mockProducts and products for compatibility
export const products = mockProducts
