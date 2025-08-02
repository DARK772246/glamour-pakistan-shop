"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, ThumbsUp, MessageCircle, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Review {
  id: string
  user: {
    name: string
    avatar?: string
    verified: boolean
  }
  rating: number
  title: string
  content: string
  date: string
  helpful: number
  images?: string[]
  size?: string
  color?: string
}

interface ReviewsSectionProps {
  productId: string
}

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: "1",
    user: {
      name: "Ayesha Khan",
      avatar: "/placeholder.svg?height=40&width=40&text=AK",
      verified: true,
    },
    rating: 5,
    title: "Absolutely stunning dress!",
    content:
      "This dress exceeded my expectations. The fabric quality is amazing and the fit is perfect. I wore it to a wedding and received so many compliments. Definitely worth the price!",
    date: "2024-01-15",
    helpful: 12,
    size: "M",
    color: "Black",
  },
  {
    id: "2",
    user: {
      name: "Fatima Ali",
      avatar: "/placeholder.svg?height=40&width=40&text=FA",
      verified: true,
    },
    rating: 4,
    title: "Great quality, runs slightly small",
    content:
      "Beautiful dress with excellent craftsmanship. However, it runs a bit small so I'd recommend ordering one size up. The color is exactly as shown in the pictures.",
    date: "2024-01-10",
    helpful: 8,
    size: "L",
    color: "Navy Blue",
  },
  {
    id: "3",
    user: {
      name: "Zara Ahmed",
      avatar: "/placeholder.svg?height=40&width=40&text=ZA",
      verified: false,
    },
    rating: 5,
    title: "Perfect for special occasions",
    content:
      "I bought this for my sister's engagement and it was perfect! The design is elegant and the material feels premium. Fast delivery too!",
    date: "2024-01-05",
    helpful: 15,
    size: "S",
    color: "Burgundy",
  },
]

export default function ReviewsSection({ productId }: ReviewsSectionProps) {
  const [reviews] = useState<Review[]>(mockReviews)
  const [sortBy, setSortBy] = useState("newest")
  const [filterRating, setFilterRating] = useState("all")
  const [showWriteReview, setShowWriteReview] = useState(false)
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: "",
    content: "",
  })

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((review) => review.rating === rating).length,
    percentage: (reviews.filter((review) => review.rating === rating).length / reviews.length) * 100,
  }))

  const filteredReviews = reviews
    .filter((review) => filterRating === "all" || review.rating.toString() === filterRating)
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "highest":
          return b.rating - a.rating
        case "lowest":
          return a.rating - b.rating
        case "helpful":
          return b.helpful - a.helpful
        default:
          return 0
      }
    })

  const handleSubmitReview = () => {
    // In a real app, this would submit to an API
    console.log("Submitting review:", newReview)
    setShowWriteReview(false)
    setNewReview({ rating: 0, title: "", content: "" })
  }

  return (
    <div className="space-y-6">
      {/* Reviews Summary */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-white font-semibold text-lg">Customer Reviews</h3>
          <div className="flex items-center space-x-4">
            <div className="text-4xl font-bold text-white">{averageRating.toFixed(1)}</div>
            <div>
              <div className="flex items-center space-x-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`${i < Math.floor(averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`}
                    size={20}
                  />
                ))}
              </div>
              <p className="text-white/60 text-sm">Based on {reviews.length} reviews</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {ratingDistribution.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center space-x-2">
              <span className="text-white/70 text-sm w-8">{rating}★</span>
              <div className="flex-1 bg-white/10 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-white/60 text-sm w-8">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40 glass border-white/30 text-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="glass border-white/30">
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="highest">Highest Rating</SelectItem>
              <SelectItem value="lowest">Lowest Rating</SelectItem>
              <SelectItem value="helpful">Most Helpful</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterRating} onValueChange={setFilterRating}>
            <SelectTrigger className="w-32 glass border-white/30 text-white">
              <Filter size={16} className="mr-2" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent className="glass border-white/30">
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="5">5 Stars</SelectItem>
              <SelectItem value="4">4 Stars</SelectItem>
              <SelectItem value="3">3 Stars</SelectItem>
              <SelectItem value="2">2 Stars</SelectItem>
              <SelectItem value="1">1 Star</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={() => setShowWriteReview(!showWriteReview)} className="neon-button">
          <MessageCircle size={16} className="mr-2" />
          Write Review
        </Button>
      </div>

      {/* Write Review Form */}
      {showWriteReview && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="glass rounded-xl p-6 space-y-4"
        >
          <h4 className="text-white font-semibold">Write a Review</h4>

          <div className="space-y-2">
            <Label className="text-white">Rating</Label>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <button key={i} onClick={() => setNewReview({ ...newReview, rating: i + 1 })} className="p-1">
                  <Star
                    className={`${
                      i < newReview.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
                    } hover:text-yellow-400 transition-colors`}
                    size={24}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Review Title</Label>
            <input
              type="text"
              value={newReview.title}
              onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
              className="w-full px-3 py-2 glass border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-pink-500"
              placeholder="Summarize your review"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Your Review</Label>
            <Textarea
              value={newReview.content}
              onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
              className="glass border-white/30 text-white placeholder-white/50 focus:border-pink-500"
              placeholder="Share your experience with this product"
              rows={4}
            />
          </div>

          <div className="flex space-x-3">
            <Button onClick={handleSubmitReview} className="neon-button">
              Submit Review
            </Button>
            <Button
              onClick={() => setShowWriteReview(false)}
              variant="outline"
              className="glass border-white/30 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
          </div>
        </motion.div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl p-6 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={review.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-pink-500 text-white">
                    {review.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium">{review.user.name}</span>
                    {review.user.verified && <Badge className="bg-green-500 text-white text-xs">Verified</Badge>}
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`}
                          size={14}
                        />
                      ))}
                    </div>
                    <span className="text-white/60 text-sm">{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {(review.size || review.color) && (
                <div className="flex space-x-2">
                  {review.size && (
                    <Badge variant="outline" className="border-white/30 text-white">
                      Size: {review.size}
                    </Badge>
                  )}
                  {review.color && (
                    <Badge variant="outline" className="border-white/30 text-white">
                      Color: {review.color}
                    </Badge>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h5 className="text-white font-medium">{review.title}</h5>
              <p className="text-white/80 leading-relaxed">{review.content}</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10">
                <ThumbsUp size={16} className="mr-2" />
                Helpful ({review.helpful})
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
