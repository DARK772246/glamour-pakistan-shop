"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/CartContext"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import Header from "@/components/Header"

export default function CartPage() {
  const { state, updateQuantity, removeFromCart, clearCart } = useCart()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(id)
      toast({
        title: "Item Removed",
        description: "Item has been removed from your cart.",
      })
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  const handleRemoveItem = (id: string, name: string) => {
    removeFromCart(id)
    toast({
      title: "Item Removed",
      description: `${name} has been removed from your cart.`,
    })
  }

  const handleClearCart = () => {
    clearCart()
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart.",
    })
  }

  const handleCheckout = () => {
    setIsLoading(true)
    // Simulate checkout process
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Redirecting to Checkout",
        description: "Taking you to the secure checkout page...",
      })
    }, 1000)
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen product-bg">
        <Header />
        <div className="pt-24 pb-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="glass rounded-2xl p-12 max-w-md mx-auto">
                <ShoppingBag className="w-16 h-16 text-white/40 mx-auto mb-6" />
                <h1 className="text-2xl font-bold text-white mb-4">Your Cart is Empty</h1>
                <p className="text-white/70 mb-8">Looks like you haven't added any items to your cart yet.</p>
                <Link href="/products">
                  <Button className="primary-button">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    )
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
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Shopping Cart</h1>
                <p className="text-white/70">
                  {state.itemCount} {state.itemCount === 1 ? "item" : "items"} in your cart
                </p>
              </div>
              <div className="flex gap-3">
                <Link href="/products">
                  <Button
                    variant="outline"
                    className="glass border-white/30 text-white hover:bg-white/10 bg-transparent"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Continue Shopping
                  </Button>
                </Link>
                {state.items.length > 0 && (
                  <Button
                    onClick={handleClearCart}
                    variant="outline"
                    className="glass border-red-500/30 text-red-400 hover:bg-red-500/10 bg-transparent"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear Cart
                  </Button>
                )}
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {state.items.map((item, index) => (
                  <motion.div
                    key={`${item.id}-${item.size}-${item.color}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="glass rounded-xl p-4 md:p-6"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Product Image */}
                      <div className="w-full sm:w-24 md:w-32 h-32 flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">{item.name}</h3>
                            <div className="flex flex-wrap gap-4 text-sm text-white/70 mb-3">
                              {item.size && <span>Size: {item.size}</span>}
                              {item.color && <span>Color: {item.color}</span>}
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-white font-bold text-lg">Rs. {item.price.toLocaleString()}</span>
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <div className="flex items-center glass rounded-lg border border-white/20">
                              <Button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                variant="ghost"
                                size="icon"
                                className="w-8 h-8 text-white hover:bg-white/10 rounded-r-none"
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="px-3 py-2 text-white font-medium min-w-[3rem] text-center">
                                {item.quantity}
                              </span>
                              <Button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                variant="ghost"
                                size="icon"
                                className="w-8 h-8 text-white hover:bg-white/10 rounded-l-none"
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>

                            <Button
                              onClick={() => handleRemoveItem(item.id, item.name)}
                              variant="ghost"
                              size="icon"
                              className="w-8 h-8 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Subtotal */}
                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
                          <span className="text-white/70">Subtotal:</span>
                          <span className="text-white font-bold text-lg">
                            Rs. {(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass rounded-xl p-6 sticky top-24"
              >
                <h2 className="text-white font-bold text-xl mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-white/70">
                    <span>Subtotal ({state.itemCount} items)</span>
                    <span>Rs. {state.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Shipping</span>
                    <span>Rs. 200</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Tax</span>
                    <span>Rs. {Math.round(state.total * 0.1).toLocaleString()}</span>
                  </div>
                  <div className="border-t border-white/20 pt-4">
                    <div className="flex justify-between text-white font-bold text-lg">
                      <span>Total</span>
                      <span>Rs. {(state.total + 200 + Math.round(state.total * 0.1)).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link href="/checkout" className="block">
                    <Button
                      onClick={handleCheckout}
                      disabled={isLoading}
                      className="w-full primary-button text-lg py-3"
                    >
                      {isLoading ? "Processing..." : "Proceed to Checkout"}
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full glass border-white/30 text-white hover:bg-white/10 bg-transparent"
                  >
                    Save for Later
                  </Button>
                </div>

                {/* Security Badge */}
                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="flex items-center justify-center text-white/60 text-sm">
                    <span>🔒 Secure Checkout</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
