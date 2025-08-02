"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Package, Truck, MapPin, Clock, CheckCircle, Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/Header"
import { useParams } from "next/navigation"

const orderStatuses = [
  {
    status: "Order Confirmed",
    description: "Your order has been confirmed and is being prepared",
    icon: CheckCircle,
    completed: true,
    timestamp: "2024-01-15 10:30 AM",
  },
  {
    status: "Processing",
    description: "Your order is being packed and prepared for shipment",
    icon: Package,
    completed: true,
    timestamp: "2024-01-15 02:15 PM",
  },
  {
    status: "Shipped",
    description: "Your order has been shipped and is on the way",
    icon: Truck,
    completed: true,
    timestamp: "2024-01-16 09:00 AM",
    location: "Lahore Distribution Center",
  },
  {
    status: "Out for Delivery",
    description: "Your order is out for delivery and will arrive soon",
    icon: MapPin,
    completed: false,
    timestamp: "Expected: 2024-01-17 11:00 AM",
    location: "Local Delivery Hub - Lahore",
  },
  {
    status: "Delivered",
    description: "Your order has been delivered successfully",
    icon: CheckCircle,
    completed: false,
    timestamp: "Pending",
  },
]

export default function OrderTrackingPage() {
  const params = useParams()
  const orderId = params.id as string
  const [currentStep, setCurrentStep] = useState(2)

  // Mock order details
  const orderDetails = {
    id: orderId,
    items: [
      {
        name: "Elegant Evening Dress",
        quantity: 1,
        price: 8500,
        image: "/placeholder.svg?height=100&width=100&text=Dress",
      },
    ],
    total: 8500,
    shippingAddress: "House #123, Street 5, DHA Phase 2, Lahore",
    estimatedDelivery: "January 17, 2024",
    trackingNumber: "TRK123456789",
  }

  useEffect(() => {
    // Simulate real-time tracking updates
    const interval = setInterval(() => {
      if (currentStep < orderStatuses.length - 1) {
        setCurrentStep((prev) => prev + 1)
      }
    }, 10000) // Update every 10 seconds for demo

    return () => clearInterval(interval)
  }, [currentStep])

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-white mb-2">Track Your Order</h1>
            <p className="text-white/70">Order ID: {orderId}</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Tracking */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="glass rounded-xl p-6 mb-6"
              >
                <h2 className="text-white font-semibold text-xl mb-6">Order Status</h2>

                <div className="space-y-6">
                  {orderStatuses.map((step, index) => (
                    <motion.div
                      key={step.status}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start space-x-4"
                    >
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                          index <= currentStep ? "bg-blue-600" : "bg-white/20"
                        }`}
                      >
                        <step.icon className={`${index <= currentStep ? "text-white" : "text-white/40"}`} size={20} />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`font-semibold ${index <= currentStep ? "text-white" : "text-white/60"}`}>
                            {step.status}
                          </h3>
                          {index === currentStep && <Badge className="bg-blue-600 text-white">Current</Badge>}
                        </div>

                        <p className={`text-sm mb-2 ${index <= currentStep ? "text-white/80" : "text-white/40"}`}>
                          {step.description}
                        </p>

                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <Clock size={14} className="text-white/60" />
                            <span className="text-white/60">{step.timestamp}</span>
                          </div>
                          {step.location && (
                            <div className="flex items-center space-x-1">
                              <MapPin size={14} className="text-white/60" />
                              <span className="text-white/60">{step.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Live Location Map Placeholder */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass rounded-xl p-6"
              >
                <h2 className="text-white font-semibold text-xl mb-4">Live Location</h2>
                <div className="bg-white/10 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="mx-auto mb-4 text-white/60" size={48} />
                    <p className="text-white/70">Live tracking map will be displayed here</p>
                    <p className="text-white/60 text-sm mt-2">Current location: Lahore Distribution Center</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Order Details */}
            <div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="glass rounded-xl p-6 mb-6"
              >
                <h2 className="text-white font-semibold text-xl mb-6">Order Details</h2>

                <div className="space-y-4 mb-6">
                  {orderDetails.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{item.name}</h4>
                        <p className="text-white/60 text-sm">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-white font-semibold">Rs. {item.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/20 pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/70">Total Amount</span>
                    <span className="text-white font-bold">Rs. {orderDetails.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Tracking Number</span>
                    <span className="text-white font-mono text-sm">{orderDetails.trackingNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Estimated Delivery</span>
                    <span className="text-white">{orderDetails.estimatedDelivery}</span>
                  </div>
                </div>
              </motion.div>

              {/* Shipping Address */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="glass rounded-xl p-6 mb-6"
              >
                <h3 className="text-white font-semibold mb-3">Shipping Address</h3>
                <p className="text-white/80">{orderDetails.shippingAddress}</p>
              </motion.div>

              {/* Contact Support */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="glass rounded-xl p-6"
              >
                <h3 className="text-white font-semibold mb-4">Need Help?</h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full glass border-white/30 text-white hover:bg-white/10 bg-transparent"
                  >
                    <Phone size={16} className="mr-2" />
                    Call Support
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full glass border-white/30 text-white hover:bg-white/10 bg-transparent"
                  >
                    <MessageCircle size={16} className="mr-2" />
                    WhatsApp Chat
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
