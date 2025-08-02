"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Package, Heart, Settings, MapPin, Phone, Mail, Edit, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/AuthContext"
import { useToast } from "@/hooks/use-toast"
import Header from "@/components/Header"
import Link from "next/link"

export default function ProfilePage() {
  const { user, updateUser } = useAuth()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  })

  const handleSave = () => {
    updateUser(formData)
    setIsEditing(false)
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    })
  }

  const orders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "Delivered",
      total: 4500,
      items: 1,
    },
    {
      id: "ORD-002",
      date: "2024-01-10",
      status: "Processing",
      total: 9000,
      items: 2,
    },
    {
      id: "ORD-003",
      date: "2024-01-05",
      status: "Shipped",
      total: 4500,
      items: 1,
    },
  ]

  const wishlistItems = [
    {
      id: 1,
      name: "Premium Black Embroidered Lawn Suit",
      price: 4500,
      image: "/images/product1.jpg",
    },
    {
      id: 2,
      name: "Black Embroidered Lawn Collection",
      price: 4500,
      image: "/images/product2.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
            <p className="text-white/70">Manage your account and preferences</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Profile Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="glass rounded-xl p-6"
              >
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-lg">{user?.name || "Guest User"}</h3>
                  <p className="text-white/70 text-sm">{user?.email || "guest@example.com"}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-3 text-white/80">
                    <MapPin size={16} />
                    <span className="text-sm">{user?.address || "No address added"}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white/80">
                    <Phone size={16} />
                    <span className="text-sm">{user?.phone || "No phone added"}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white/80">
                    <Mail size={16} />
                    <span className="text-sm">{user?.email || "No email"}</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
                <Tabs defaultValue="profile" className="w-full">
                  <TabsList className="glass border border-white/10 mb-6">
                    <TabsTrigger value="profile" className="data-[state=active]:bg-white/10">
                      <User size={16} className="mr-2" />
                      Profile
                    </TabsTrigger>
                    <TabsTrigger value="orders" className="data-[state=active]:bg-white/10">
                      <Package size={16} className="mr-2" />
                      Orders
                    </TabsTrigger>
                    <TabsTrigger value="wishlist" className="data-[state=active]:bg-white/10">
                      <Heart size={16} className="mr-2" />
                      Wishlist
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="data-[state=active]:bg-white/10">
                      <Settings size={16} className="mr-2" />
                      Settings
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="profile">
                    <Card className="glass border-white/10">
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <CardTitle className="text-white">Personal Information</CardTitle>
                          <CardDescription className="text-white/70">
                            Update your personal details and contact information
                          </CardDescription>
                        </div>
                        <Button
                          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                          variant="outline"
                          className="glass border-white/30 text-white hover:bg-white/10"
                        >
                          {isEditing ? <Save size={16} /> : <Edit size={16} />}
                          <span className="ml-2">{isEditing ? "Save" : "Edit"}</span>
                        </Button>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name" className="text-white">
                              Full Name
                            </Label>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              disabled={!isEditing}
                              className="glass border-white/30 text-white"
                            />
                          </div>
                          <div>
                            <Label htmlFor="email" className="text-white">
                              Email
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              disabled={!isEditing}
                              className="glass border-white/30 text-white"
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone" className="text-white">
                              Phone
                            </Label>
                            <Input
                              id="phone"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              disabled={!isEditing}
                              className="glass border-white/30 text-white"
                            />
                          </div>
                          <div>
                            <Label htmlFor="address" className="text-white">
                              Address
                            </Label>
                            <Input
                              id="address"
                              value={formData.address}
                              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                              disabled={!isEditing}
                              className="glass border-white/30 text-white"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="orders">
                    <Card className="glass border-white/10">
                      <CardHeader>
                        <CardTitle className="text-white">Order History</CardTitle>
                        <CardDescription className="text-white/70">
                          Track your recent orders and purchases
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {orders.map((order) => (
                            <div
                              key={order.id}
                              className="flex items-center justify-between p-4 glass rounded-lg border border-white/10"
                            >
                              <div>
                                <h4 className="text-white font-semibold">{order.id}</h4>
                                <p className="text-white/70 text-sm">{order.date}</p>
                                <p className="text-white/70 text-sm">{order.items} item(s)</p>
                              </div>
                              <div className="text-right">
                                <Badge
                                  variant={
                                    order.status === "Delivered"
                                      ? "default"
                                      : order.status === "Processing"
                                        ? "secondary"
                                        : "outline"
                                  }
                                  className="mb-2"
                                >
                                  {order.status}
                                </Badge>
                                <p className="text-white font-semibold">Rs. {order.total.toLocaleString()}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="wishlist">
                    <Card className="glass border-white/10">
                      <CardHeader>
                        <CardTitle className="text-white">My Wishlist</CardTitle>
                        <CardDescription className="text-white/70">Items you've saved for later</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {wishlistItems.map((item) => (
                            <div key={item.id} className="glass rounded-lg p-4 border border-white/10">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-full h-32 object-cover rounded-lg mb-3"
                              />
                              <h4 className="text-white font-semibold mb-2">{item.name}</h4>
                              <p className="text-white font-bold">Rs. {item.price.toLocaleString()}</p>
                              <Button className="w-full mt-3 primary-button">Add to Cart</Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="settings">
                    <Card className="glass border-white/10">
                      <CardHeader>
                        <CardTitle className="text-white">Account Settings</CardTitle>
                        <CardDescription className="text-white/70">
                          Manage your account preferences and privacy
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 glass rounded-lg border border-white/10">
                            <div>
                              <h4 className="text-white font-semibold">Email Notifications</h4>
                              <p className="text-white/70 text-sm">Receive updates about your orders</p>
                            </div>
                            <Button variant="outline" className="glass border-white/30 text-white bg-transparent">
                              Enable
                            </Button>
                          </div>
                          <div className="flex items-center justify-between p-4 glass rounded-lg border border-white/10">
                            <div>
                              <h4 className="text-white font-semibold">SMS Notifications</h4>
                              <p className="text-white/70 text-sm">Get SMS updates for order status</p>
                            </div>
                            <Button variant="outline" className="glass border-white/30 text-white bg-transparent">
                              Enable
                            </Button>
                          </div>
                          <div className="flex items-center justify-between p-4 glass rounded-lg border border-white/10">
                            <div>
                              <h4 className="text-white font-semibold">Privacy Policy</h4>
                              <p className="text-white/70 text-sm">Read our privacy policy and terms</p>
                            </div>
                            <Link href="/privacy-policy">
                              <Button variant="outline" className="glass border-white/30 text-white bg-transparent">
                                View
                              </Button>
                            </Link>
                          </div>
                          <div className="flex items-center justify-between p-4 glass rounded-lg border border-white/10">
                            <div>
                              <h4 className="text-white font-semibold">Delete Account</h4>
                              <p className="text-white/70 text-sm">Permanently delete your account</p>
                            </div>
                            <Button variant="destructive">Delete</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
