"use client"

import { motion } from "framer-motion"
import { Shield, Lock, Eye, UserCheck, FileText, Mail } from "lucide-react"
import Header from "@/components/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Information We Collect",
      content: [
        "Personal information you provide when creating an account (name, email, phone number)",
        "Billing and shipping addresses for order processing",
        "Payment information (processed securely through our payment partners)",
        "Order history and purchase preferences",
        "Communication preferences and marketing consent",
      ],
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "How We Use Your Information",
      content: [
        "Process and fulfill your orders",
        "Provide customer support and respond to inquiries",
        "Send order confirmations and shipping updates",
        "Improve our products and services",
        "Send promotional emails (with your consent)",
        "Prevent fraud and ensure account security",
      ],
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Information Sharing",
      content: [
        "We do not sell, trade, or rent your personal information to third parties",
        "We may share information with trusted service providers who help us operate our business",
        "Information may be disclosed if required by law or to protect our rights",
        "Anonymous, aggregated data may be used for analytics and business insights",
      ],
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Data Security",
      content: [
        "We use industry-standard encryption to protect your data",
        "Secure payment processing through certified payment gateways",
        "Regular security audits and updates to our systems",
        "Limited access to personal information on a need-to-know basis",
        "Secure data storage with backup and recovery procedures",
      ],
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "Your Rights",
      content: [
        "Access and review your personal information",
        "Update or correct your account information",
        "Delete your account and associated data",
        "Opt-out of marketing communications",
        "Request a copy of your data",
        "File a complaint with relevant authorities",
      ],
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Contact Us",
      content: [
        "If you have questions about this privacy policy, please contact us:",
        "Email: privacy@glamourpakistan.com",
        "Phone: +92 300 1234567",
        "Address: Lahore, Punjab, Pakistan",
        "We will respond to your inquiry within 48 hours",
      ],
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
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="glass rounded-full p-4">
                <Shield className="w-12 h-12 text-purple-400" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal
              information.
            </p>
            <p className="text-white/60 text-sm mt-4">Last updated: January 2024</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass rounded-xl p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Our Commitment to Your Privacy</h2>
              <p className="text-white/80 leading-relaxed">
                At Glamour Pakistan, we are committed to protecting your privacy and ensuring the security of your
                personal information. This Privacy Policy outlines our practices regarding the collection, use, and
                disclosure of your information when you use our e-commerce platform. By using our services, you agree to
                the collection and use of information in accordance with this policy.
              </p>
            </motion.div>

            <div className="grid gap-6">
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="glass border-white/10">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-3 text-white">
                        <div className="text-purple-400">{section.icon}</div>
                        <span>{section.title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {section.content.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-white/80 flex items-start space-x-3">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="glass rounded-xl p-8 mt-8 text-center"
            >
              <h3 className="text-xl font-bold text-white mb-4">Changes to This Policy</h3>
              <p className="text-white/80 leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy
                Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted
                on this page.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
