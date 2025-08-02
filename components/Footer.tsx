"use client"

import { motion } from "framer-motion"
import { ShoppingBag, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Footer() {
  const footerLinks = {
    shop: [
      { name: "New Arrivals", href: "/products?filter=new" },
      { name: "Lawn Collection", href: "/products?category=lawn" },
      { name: "Embroidered Suits", href: "/products?category=embroidered" },
      { name: "Formal Wear", href: "/products?category=formal" },
      { name: "Sale Items", href: "/products?filter=sale" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Story", href: "/story" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Blog", href: "/blog" },
    ],
    support: [
      { name: "Contact Us", href: "/contact" },
      { name: "Size Guide", href: "/size-guide" },
      { name: "Shipping Info", href: "/shipping" },
      { name: "Returns", href: "/returns" },
      { name: "FAQ", href: "/faq" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Refund Policy", href: "/refunds" },
    ],
  }

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com/glamourpakistan" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/glamourpakistan" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/glamourpakistan" },
    { name: "YouTube", icon: Youtube, href: "https://youtube.com/glamourpakistan" },
  ]

  return (
    <footer className="bg-slate-900/50 border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Link href="/" className="flex items-center space-x-2 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-white">Glamour Pakistan</span>
                </Link>

                <p className="text-white/70 mb-6 max-w-sm">
                  Discover the finest collection of Pakistani fashion with premium quality fabrics and authentic
                  craftsmanship. Your style, our passion.
                </p>

                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center text-white/70">
                    <Phone className="w-5 h-5 mr-3 text-purple-400" />
                    <span>+92-300-1234567</span>
                  </div>
                  <div className="flex items-center text-white/70">
                    <Mail className="w-5 h-5 mr-3 text-purple-400" />
                    <span>info@glamourpakistan.com</span>
                  </div>
                  <div className="flex items-center text-white/70">
                    <MapPin className="w-5 h-5 mr-3 text-purple-400" />
                    <span>Lahore, Pakistan</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Shop Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-white font-semibold text-lg mb-6">Shop</h3>
              <ul className="space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-purple-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-white font-semibold text-lg mb-6">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-purple-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-white font-semibold text-lg mb-6">Support</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-purple-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-white font-semibold text-lg mb-6">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-purple-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-4"
            >
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Button
                    key={social.name}
                    variant="ghost"
                    size="icon"
                    asChild
                    className="text-white/70 hover:text-purple-400 hover:bg-purple-500/10"
                  >
                    <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                      <Icon className="w-5 h-5" />
                    </a>
                  </Button>
                )
              })}
            </motion.div>

            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center text-white/70 text-sm"
            >
              <span>© 2024 Glamour Pakistan. Made with</span>
              <Heart className="w-4 h-4 mx-1 text-red-400 fill-current" />
              <span>in Pakistan</span>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}
