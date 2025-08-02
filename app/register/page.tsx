"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Mail, Lock, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/AuthContext"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Header from "@/components/Header"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { register } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const success = await register({ name, email, password })

    setIsLoading(false)
    if (success) {
      toast({
        title: "Registration Successful!",
        description: "Welcome to Glamour Pakistan. Your account has been created.",
      })
      router.push("/profile")
    } else {
      setError("An error occurred. Please try again.")
    }
  }

  return (
    <div className="min-h-screen product-bg">
      <Header />
      <div className="pt-24 pb-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="glass rounded-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white">Create Your Account</h1>
              <p className="text-white/70">Join us to discover premium fashion</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white/80">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 glass text-white border-white/20"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/80">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 glass text-white border-white/20"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/80">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Minimum 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 glass text-white border-white/20"
                    required
                  />
                </div>
              </div>

              {error && <p className="text-red-400 text-sm text-center">{error}</p>}

              <Button type="submit" disabled={isLoading} className="w-full primary-button">
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Create Account
                  </>
                )}
              </Button>
            </form>

            <div className="text-center mt-6">
              <p className="text-white/70">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-pink-400 hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
                    }
