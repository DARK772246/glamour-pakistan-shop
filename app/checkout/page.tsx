"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Smartphone, Building, Truck, Lock, CreditCard, User, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCart } from "@/contexts/CartContext"
import { useAuth } from "@/contexts/AuthContext"
import Header from "@/components/Header"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const paymentMethods = [
  {
    id: "nayapay",
    name: "NayaPay",
    icon: Smartphone,
    description: "Pay with your NayaPay account",
  },
  {
    id: "card",
    name: "Credit / Debit Card",
    icon: CreditCard,
    description: "Pay with Visa, Mastercard (via NayaPay Gateway)",
  },
  {
    id: "bank",
    name: "Bank Transfer",
    icon: Building,
    description: "Transfer to our NayaPay account",
  },
  {
    id: "cod",
    name: "Cash on Delivery",
    icon: Truck,
    description: "Pay when you receive",
  },
]

export default function CheckoutPage() {
  const { state, total, clearCart } = useCart()
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const [selectedPayment, setSelectedPayment] = useState("nayapay")
  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: "",
    postalCode: "",
  })
  const [cardInfo, setCardInfo] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  })

  const shippingCost = total > 5000 ? 0 : 200
  const finalTotal = total + shippingCost

  const handleInputChange = (field: string, value: string) => {
    setShippingInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handleCardInputChange = (field: string, value: string) => {
    setCardInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handlePlaceOrder = async () => {
    if (!shippingInfo.fullName || !shippingInfo.phone || !shippingInfo.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required shipping fields.",
        variant: "destructive",
      })
      return
    }

    if (selectedPayment === "card") {
      if (!cardInfo.number || !cardInfo.name || !cardInfo.expiry || !cardInfo.cvv) {
        toast({
          title: "Missing Card Information",
          description: "Please fill in all credit card details.",
          variant: "destructive",
        })
        return;
      }
    }

    // Create order
    const orderId = `ORD-${Date.now()}`

    toast({
      title: "Order Placed Successfully!",
      description: `Your order ${orderId} has been confirmed. You can track it in your profile.`,
    })

    // Clear cart and redirect
    setTimeout(() => {
      clearCart()
      router.push(`/order-tracking/${orderId}`)
    }, 2000)
  }

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
            <h1 className="text-3xl font-bold text-white mb-2">Checkout</h1>
            <p className="text-white/70">Complete your order securely</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Checkout Form */}
            <div className="space-y-8">
              {/* Shipping Information */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="glass rounded-xl p-6"
              >
                <h2 className="text-white font-semibold text-xl mb-6">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName" className="text-white/80">Full Name *</Label>
                    <Input id="fullName" value={shippingInfo.fullName} onChange={(e) => handleInputChange("fullName", e.target.value)} className="glass text-white border-white/20 mt-1" placeholder="Enter your full name" required />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white/80">Email</Label>
                    <Input id="email" type="email" value={shippingInfo.email} onChange={(e) => handleInputChange("email", e.target.value)} className="glass text-white border-white/20 mt-1" placeholder="Enter your email" />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-white/80">Phone Number *</Label>
                    <Input id="phone" value={shippingInfo.phone} onChange={(e) => handleInputChange("phone", e.target.value)} className="glass text-white border-white/20 mt-1" placeholder="+92 300 1234567" required />
                  </div>
                  <div>
                    <Label htmlFor="city" className="text-white/80">City *</Label>
                    <Input id="city" value={shippingInfo.city} onChange={(e) => handleInputChange("city", e.target.value)} className="glass text-white border-white/20 mt-1" placeholder="Enter your city" required />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address" className="text-white/80">Complete Address *</Label>
                    <Input id="address" value={shippingInfo.address} onChange={(e) => handleInputChange("address", e.target.value)} className="glass text-white border-white/20 mt-1" placeholder="House #, Street, Area" required />
                  </div>
                  <div>
                    <Label htmlFor="postalCode" className="text-white/80">Postal Code</Label>
                    <Input id="postalCode" value={shippingInfo.postalCode} onChange={(e) => handleInputChange("postalCode", e.target.value)} className="glass text-white border-white/20 mt-1" placeholder="54000" />
                  </div>
                </div>
              </motion.div>

              {/* Payment Method */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass rounded-xl p-6"
              >
                <h2 className="text-white font-semibold text-xl mb-6">Payment Method</h2>
                <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment} className="space-y-4">
                  {paymentMethods.map((method) => (
                    <Label
                      key={method.id}
                      htmlFor={method.id}
                      className="flex items-center space-x-3 p-4 glass rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <RadioGroupItem value={method.id} id={method.id} />
                      <method.icon className="text-white/70" size={20} />
                      <div className="flex-1">
                        <span className="text-white font-medium">{method.name}</span>
                        <p className="text-white/60 text-sm">{method.description}</p>
                      </div>
                    </Label>
                  ))}
                </RadioGroup>

                {/* NayaPay / Bank Transfer Details */}
                {(selectedPayment === "nayapay" || selectedPayment === "bank") && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 p-4 glass-dark rounded-lg"
                  >
                    <h3 className="text-white font-medium mb-2">Online Payment Instructions</h3>
                    <p className="text-white/70 text-sm mb-2">Send payment to the following NayaPay account:</p>
                    <p className="text-white font-mono text-lg tracking-wider">salman.khan@naya</p>
                    <p className="text-white/60 text-sm mt-2">
                      After payment, share the transaction screenshot via WhatsApp: +92 327 5176283
                    </p>
                  </motion.div>
                )}

                {/* Credit Card Form */}
                {selectedPayment === "card" && (
                   <motion.div
                   initial={{ opacity: 0, height: 0 }}
                   animate={{ opacity: 1, height: "auto" }}
                   transition={{ duration: 0.3 }}
                   className="mt-6"
                 >
                   <Card className="glass-dark border-white/10">
                     <CardHeader>
                       <CardTitle className="text-white flex items-center gap-2">
                         <CreditCard size={20} />
                         Enter Card Details
                       </CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-4">
                       <div className="space-y-2">
                         <Label className="text-white/80" htmlFor="cardNumber">Card Number</Label>
                         <div className="relative">
                            <Input id="cardNumber" value={cardInfo.number} onChange={(e) => handleCardInputChange("number", e.target.value)} placeholder="•••• •••• •••• ••••" className="glass pl-10" />
                            <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
                         </div>
                       </div>
                       <div className="space-y-2">
                         <Label className="text-white/80" htmlFor="cardName">Cardholder Name</Label>
                         <div className="relative">
                            <Input id="cardName" value={cardInfo.name} onChange={(e) => handleCardInputChange("name", e.target.value)} placeholder="e.g. Salman Khan" className="glass pl-10" />
                            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
                        </div>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                           <Label className="text-white/80" htmlFor="cardExpiry">Expiry Date</Label>
                           <div className="relative">
                           <Input id="cardExpiry" value={cardInfo.expiry} onChange={(e) => handleCardInputChange("expiry", e.target.value)} placeholder="MM/YY" className="glass pl-10" />
                           <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
                           </div>
                         </div>
                         <div className="space-y-2">
                           <Label className="text-white/80" htmlFor="cardCvv">CVV</Label>
                           <div className="relative">
                           <Input id="cardCvv" value={cardInfo.cvv} onChange={(e) => handleCardInputChange("cvv", e.target.value)} placeholder="•••" className="glass pl-10" />
                           <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
                           </div>
                         </div>
                       </div>
                     </CardContent>
                   </Card>
                 </motion.div>
                )}
              </motion.div>
            </div>

            {/* Order Summary */}
            <div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="glass rounded-xl p-6 sticky top-24"
              >
                <h2 className="text-white font-semibold text-xl mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="text-white font-medium text-sm">{item.name}</h4>
                        <p className="text-white/60 text-sm">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-white font-medium">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-3 mb-6 border-t border-white/20 pt-4">
                  <div className="flex justify-between text-white/70">
                    <span>Subtotal</span>
                    <span>Rs. {total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? "Free" : `Rs. ${shippingCost}`}</span>
                  </div>
                  <div className="flex justify-between text-white font-bold text-lg border-t border-white/20 pt-3">
                    <span>Total</span>
                    <span>Rs. {finalTotal.toLocaleString()}</span>
                  </div>
                </div>
                <Button onClick={handlePlaceOrder} className="w-full primary-button mb-4">
                  <Lock size={16} className="mr-2" />
                  Place Order - Rs. {finalTotal.toLocaleString()}
                </Button>
                <p className="text-white/60 text-sm text-center">🔒 Your payment information is secure</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
     }
