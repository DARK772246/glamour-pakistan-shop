"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Package,
  Users,
  ShoppingCart,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Menu,
  X,
  Home,
  Settings,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Mock data
const mockStats = {
  totalProducts: 156,
  totalOrders: 1247,
  totalCustomers: 892,
  totalRevenue: 2847650,
}

const mockOrders = [
  { id: "ORD-001", customer: "Ahmed Ali", total: 15500, status: "pending", date: "2024-01-15" },
  { id: "ORD-002", customer: "Fatima Khan", total: 8900, status: "delivered", date: "2024-01-14" },
  { id: "ORD-003", customer: "Hassan Sheikh", total: 22300, status: "processing", date: "2024-01-14" },
  { id: "ORD-004", customer: "Ayesha Malik", total: 12700, status: "shipped", date: "2024-01-13" },
  { id: "ORD-005", customer: "Omar Farooq", total: 18900, status: "pending", date: "2024-01-13" },
]

const mockCustomers = [
  { id: 1, name: "Ahmed Ali", email: "ahmed@example.com", orders: 5, spent: 45600, joined: "2023-12-01" },
  { id: 2, name: "Fatima Khan", email: "fatima@example.com", orders: 3, spent: 28900, joined: "2023-11-15" },
  { id: 3, name: "Hassan Sheikh", email: "hassan@example.com", orders: 8, spent: 67200, joined: "2023-10-20" },
  { id: 4, name: "Ayesha Malik", email: "ayesha@example.com", orders: 2, spent: 15400, joined: "2024-01-05" },
  { id: 5, name: "Omar Farooq", email: "omar@example.com", orders: 6, spent: 52300, joined: "2023-09-10" },
]

const mockProducts = [
  { id: 1, name: "Embroidered Lawn Suit", category: "Women's Clothing", price: 8500, stock: 25, status: "active" },
  { id: 2, name: "Silk Dupatta", category: "Accessories", price: 3200, stock: 40, status: "active" },
  { id: 3, name: "Cotton Kurta", category: "Men's Clothing", price: 4500, stock: 15, status: "active" },
  { id: 4, name: "Chiffon Saree", category: "Women's Clothing", price: 12000, stock: 8, status: "low_stock" },
  { id: 5, name: "Leather Khussas", category: "Footwear", price: 5500, stock: 0, status: "out_of_stock" },
]

const AdminLogin = ({ onLogin, error }: { onLogin: (password: string) => void; error: string }) => {
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(password)
  }

  return (
    <div className="flex items-center justify-center min-h-screen product-bg">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="w-[350px] glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white text-center">Admin Panel</CardTitle>
            <CardDescription className="text-white/60 text-center">Please enter the password to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="glass border-white/30 text-white"
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
              <Button type="submit" className="w-full mt-6 primary-button">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default function AdminPanel() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)
  const [adminPassword, setAdminPassword] = useState("admin123")
  const [loginError, setLoginError] = useState("")
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const { toast } = useToast()
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleAdminLogin = (password: string) => {
    if (password === adminPassword) {
      setIsAdminAuthenticated(true)
      setLoginError("")
    } else {
      setLoginError("Incorrect password. Please try again.")
    }
  }

  const tabs = [
    { id: "dashboard", name: "Dashboard", icon: Home },
    { id: "products", name: "Products", icon: Package },
    { id: "orders", name: "Orders", icon: ShoppingCart },
    { id: "customers", name: "Customers", icon: Users },
    { id: "analytics", name: "Analytics", icon: BarChart3 },
    { id: "settings", name: "Settings", icon: Settings },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "processing":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "shipped":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "delivered":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "low_stock":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "out_of_stock":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    toast({
      title: "Order Updated",
      description: `Order ${orderId} status changed to ${newStatus}`,
    })
  }

  const handleAddProduct = () => {
    toast({
      title: "Product Added",
      description: "New product has been added successfully",
    })
  }

  const handleDeleteProduct = (productId: number) => {
    toast({
      title: "Product Deleted",
      description: `Product ${productId} has been removed`,
    })
  }

  const handleChangePassword = () => {
    if (currentPassword !== adminPassword) {
      toast({ title: "Error", description: "Current password is incorrect.", variant: "destructive" })
      return
    }
    if (!newPassword || newPassword !== confirmPassword) {
      toast({ title: "Error", description: "New passwords do not match.", variant: "destructive" })
      return
    }
    if (newPassword.length < 6) {
      toast({ title: "Error", description: "Password must be at least 6 characters.", variant: "destructive" })
      return
    }

    setAdminPassword(newPassword)
    toast({ title: "Success", description: "Admin password has been changed successfully." })
    // Clear fields
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card className="glass border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/80">Total Products</CardTitle>
            <Package className="h-4 w-4 text-white/60" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-white">{mockStats.totalProducts}</div>
            <p className="text-xs text-green-400">+12% from last month</p>
          </CardContent>
        </Card>
        <Card className="glass border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/80">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-white/60" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-white">{mockStats.totalOrders}</div>
            <p className="text-xs text-green-400">+8% from last month</p>
          </CardContent>
        </Card>
        <Card className="glass border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/80">Customers</CardTitle>
            <Users className="h-4 w-4 text-white/60" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-white">{mockStats.totalCustomers}</div>
            <p className="text-xs text-green-400">+15% from last month</p>
          </CardContent>
        </Card>
        <Card className="glass border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/80">Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-white/60" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold text-white">
              Rs. {mockStats.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-green-400">+22% from last month</p>
          </CardContent>
        </Card>
      </div>
      {/* Recent Orders */}
      <Card className="glass border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Recent Orders</CardTitle>
          <CardDescription className="text-white/60">Latest customer orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="text-white/80">Order ID</TableHead>
                  <TableHead className="text-white/80 hidden sm:table-cell">Customer</TableHead>
                  <TableHead className="text-white/80">Total</TableHead>
                  <TableHead className="text-white/80">Status</TableHead>
                  <TableHead className="text-white/80 hidden md:table-cell">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockOrders.slice(0, 5).map((order) => (
                  <TableRow key={order.id} className="border-white/10">
                    <TableCell className="text-white font-medium">{order.id}</TableCell>
                    <TableCell className="text-white/80 hidden sm:table-cell">{order.customer}</TableCell>
                    <TableCell className="text-white">Rs. {order.total.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(order.status)} border text-xs`}>{order.status}</Badge>
                    </TableCell>
                    <TableCell className="text-white/60 hidden md:table-cell">{order.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Products</h2>
          <p className="text-white/60">Manage your product inventory</p>
        </div>
        <Button onClick={handleAddProduct} className="primary-button">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>
      <Card className="glass border-white/10">
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="text-white/80">Product</TableHead>
                  <TableHead className="text-white/80 hidden sm:table-cell">Category</TableHead>
                  <TableHead className="text-white/80">Price</TableHead>
                  <TableHead className="text-white/80 hidden md:table-cell">Stock</TableHead>
                  <TableHead className="text-white/80">Status</TableHead>
                  <TableHead className="text-white/80">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockProducts.map((product) => (
                  <TableRow key={product.id} className="border-white/10">
                    <TableCell className="text-white font-medium">{product.name}</TableCell>
                    <TableCell className="text-white/80 hidden sm:table-cell">{product.category}</TableCell>
                    <TableCell className="text-white">Rs. {product.price.toLocaleString()}</TableCell>
                    <TableCell className="text-white/60 hidden md:table-cell">{product.stock}</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(product.status)} border text-xs`}>
                        {product.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="w-8 h-8 text-white/60 hover:text-white">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="w-8 h-8 text-white/60 hover:text-white">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="w-8 h-8 text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderOrders = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Orders</h2>
          <p className="text-white/60">Manage customer orders</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="glass border-white/30 text-white hover:bg-white/10 bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      <Card className="glass border-white/10">
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="text-white/80">Order ID</TableHead>
                  <TableHead className="text-white/80 hidden sm:table-cell">Customer</TableHead>
                  <TableHead className="text-white/80">Total</TableHead>
                  <TableHead className="text-white/80">Status</TableHead>
                  <TableHead className="text-white/80 hidden md:table-cell">Date</TableHead>
                  <TableHead className="text-white/80">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockOrders.map((order) => (
                  <TableRow key={order.id} className="border-white/10">
                    <TableCell className="text-white font-medium">{order.id}</TableCell>
                    <TableCell className="text-white/80 hidden sm:table-cell">{order.customer}</TableCell>
                    <TableCell className="text-white">Rs. {order.total.toLocaleString()}</TableCell>
                    <TableCell>
                      <Select value={order.status} onValueChange={(value) => updateOrderStatus(order.id, value)}>
                        <SelectTrigger className="w-32 glass border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="glass border-white/20">
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-white/60 hidden md:table-cell">{order.date}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="w-8 h-8 text-white/60 hover:text-white">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderCustomers = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Customers</h2>
          <p className="text-white/60">Manage customer accounts</p>
        </div>
      </div>
      <Card className="glass border-white/10">
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="text-white/80">Name</TableHead>
                  <TableHead className="text-white/80 hidden sm:table-cell">Email</TableHead>
                  <TableHead className="text-white/80 hidden md:table-cell">Orders</TableHead>
                  <TableHead className="text-white/80">Spent</TableHead>
                  <TableHead className="text-white/80 hidden lg:table-cell">Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCustomers.map((customer) => (
                  <TableRow key={customer.id} className="border-white/10">
                    <TableCell className="text-white font-medium">{customer.name}</TableCell>
                    <TableCell className="text-white/80 hidden sm:table-cell">{customer.email}</TableCell>
                    <TableCell className="text-white/60 hidden md:table-cell">{customer.orders}</TableCell>
                    <TableCell className="text-white">Rs. {customer.spent.toLocaleString()}</TableCell>
                    <TableCell className="text-white/60 hidden lg:table-cell">{customer.joined}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Analytics</h2>
        <p className="text-white/60">Business insights and reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <BarChart3 className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <p className="text-white/60">Sales chart will be displayed here</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockProducts.slice(0, 3).map((product, index) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{product.name}</p>
                    <p className="text-white/60 text-sm">{product.category}</p>
                  </div>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">#{index + 1}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderSettings = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Settings</h2>
        <p className="text-white/60">Configure your store settings</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Store Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="storeName" className="text-white/80 text-sm">Store Name</Label>
              <Input
                id="storeName"
                type="text"
                defaultValue="Glamour Pakistan"
                className="w-full mt-1 px-3 py-2 glass border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <Label htmlFor="storeDescription" className="text-white/80 text-sm">Store Description</Label>
              <textarea
                id="storeDescription"
                defaultValue="Premium Pakistani fashion and accessories"
                className="w-full mt-1 px-3 py-2 glass border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Payment Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white/80">JazzCash</span>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80">EasyPaisa</span>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80">Bank Transfer</span>
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pending</Badge>
            </div>
          </CardContent>
        </Card>
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Change Admin Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full mt-1 px-3 py-2 glass border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full mt-1 px-3 py-2 glass border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full mt-1 px-3 py-2 glass border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <Button onClick={handleChangePassword} className="primary-button">
              Save Password
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard()
      case "products":
        return renderProducts()
      case "orders":
        return renderOrders()
      case "customers":
        return renderCustomers()
      case "analytics":
        return renderAnalytics()
      case "settings":
        return renderSettings()
      default:
        return renderDashboard()
    }
  }

  if (!isAdminAuthenticated) {
    return <AdminLogin onLogin={handleAdminLogin} error={loginError} />
  }

  return (
    <div className="min-h-screen product-bg">
      {/* Header */}
      <div className="glass border-b border-white/10 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Package className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-bold text-lg md:text-xl">Admin Panel</span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button
                  variant="outline"
                  className="glass border-white/30 text-white hover:bg-white/10 hidden sm:flex bg-transparent"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Back to Store
                </Button>
              </Link>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-white hover:bg-white/10"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="glass rounded-xl p-4 sticky top-24">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                          : "text-white/70 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.name}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
              <div className="fixed left-0 top-0 h-full w-64 glass backdrop-blur-xl border-r border-white/10 p-4">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-white font-bold text-lg">Menu</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white hover:bg-white/10"
                  >
                    <X size={20} />
                  </Button>
                </div>
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id)
                          setIsMobileMenuOpen(false)
                        }}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                            : "text-white/70 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{tab.name}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
            }
