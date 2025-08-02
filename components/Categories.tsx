"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { categories } from "@/data/products"
import Link from "next/link"

export default function Categories() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Shop by Category</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Explore our curated collection of premium Pakistani fashion
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group cursor-pointer"
            >
              <Link href="/products">
                <div className="glass rounded-2xl p-6 text-center border border-white/10 hover:border-purple-500/50 transition-all duration-300">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-white font-semibold mb-2 group-hover:text-purple-300 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-white/60 text-sm mb-4">{category.count} items</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 group-hover:translate-x-1 transition-all duration-300"
                  >
                    Explore
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </Button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
