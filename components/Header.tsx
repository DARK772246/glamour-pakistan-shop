"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, ShoppingBag, User, Menu, X, Heart, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useCart } from "@/contexts/CartContext"
import { useAuth } from "@/contexts/AuthContext"
import SearchModal from "./SearchModal"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { itemCount } = useCart()
  const { user, logout } = useAuth()

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-40 glass backdrop-blur-xl border-b border-white/10"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold text-lg md:text-xl">Glamour Pakistan</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href} className="text-white/80 hover:text-white transition-colors">
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Search */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="text-white hover:bg-white/10"
              >
                <Search size={18} className="md:w-5 md:h-5" />
              </Button>

              {/* Cart */}
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 relative">
                  <ShoppingBag size={18} className="md:w-5 md:h-5" />
                  {itemCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[18px] h-4 md:min-w-[20px] md:h-5 flex items-center justify-center rounded-full">
                      {itemCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* User Menu - Desktop Only */}
              <div className="relative group hidden md:block">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <User size={20} />
                </Button>
                <div className="absolute right-0 top-full mt-2 w-48 glass rounded-lg border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-2">
                    {user ? (
                      <>
                        <div className="px-3 py-2 text-white/80 text-sm border-b border-white/10">
                          Welcome, {user.name}
                        </div>
                        <Link
                          href="/profile"
                          className="flex items-center space-x-2 px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
                        >
                          <User size={16} />
                          <span>Profile</span>
                        </Link>
                        <Link
                          href="/wishlist"
                          className="flex items-center space-x-2 px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
                        >
                          <Heart size={16} />
                          <span>Wishlist</span>
                        </Link>
                        <Link
                          href="/profile"
                          className="flex items-center space-x-2 px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
                        >
                          <Settings size={16} />
                          <span>Settings</span>
                        </Link>
                        <button
                          onClick={logout}
                          className="w-full text-left px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          className="block px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
                        >
                          Login
                        </Link>
                        <Link
                          href="/register"
                          className="block px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
                        >
                          Register
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-white hover:bg-white/10"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/10 py-4"
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white/80 hover:text-white transition-colors px-2 py-1"
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Mobile User Menu */}
                <div className="border-t border-white/10 pt-4 px-2">
                  {user ? (
                    <>
                      <div className="text-white/80 text-sm mb-3">Welcome, {user.name}</div>
                      <div className="space-y-2">
                        <Link
                          href="/profile"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors py-2"
                        >
                          <User size={16} />
                          <span>Profile</span>
                        </Link>
                        <Link
                          href="/wishlist"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors py-2"
                        >
                          <Heart size={16} />
                          <span>Wishlist</span>
                        </Link>
                        <button
                          onClick={() => {
                            logout()
                            setIsMenuOpen(false)
                          }}
                          className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors py-2"
                        >
                          <span>Logout</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        href="/login"
                        onClick={() => setIsMenuOpen(false)}
                        className="block text-white/80 hover:text-white transition-colors py-2"
                      >
                        Login
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setIsMenuOpen(false)}
                        className="block text-white/80 hover:text-white transition-colors py-2"
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.nav>
          )}
        </div>
      </motion.header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
