"use client"

import { motion } from "framer-motion"
import { X, Ruler } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SizeChartProps {
  sizeChart: {
    type: string
    measurements: Array<{
      size: string
      [key: string]: string
    }>
  }
  isOpen: boolean
  onClose: () => void
}

export default function SizeChart({ sizeChart, isOpen, onClose }: SizeChartProps) {
  if (!isOpen) return null

  const measurementKeys = Object.keys(sizeChart.measurements[0]).filter((key) => key !== "size")

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="glass rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <div className="flex items-center space-x-3">
            <Ruler className="text-pink-400" size={24} />
            <div>
              <h2 className="text-white font-semibold text-xl">Size Chart</h2>
              <p className="text-white/60">All measurements in inches</p>
            </div>
          </div>

          <Button
            onClick={onClose}
            variant="outline"
            size="icon"
            className="glass border-white/30 text-white hover:bg-white/10 bg-transparent"
          >
            <X size={20} />
          </Button>
        </div>

        {/* Size Chart Table */}
        <div className="p-6 overflow-auto">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left text-white font-medium py-3 px-2">Size</th>
                  {measurementKeys.map((key) => (
                    <th key={key} className="text-left text-white font-medium py-3 px-2 capitalize">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sizeChart.measurements.map((measurement, index) => (
                  <tr key={index} className="border-b border-white/10 hover:bg-white/5">
                    <td className="text-white font-medium py-3 px-2">{measurement.size}</td>
                    {measurementKeys.map((key) => (
                      <td key={key} className="text-white/80 py-3 px-2">
                        {measurement[key]}"
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Size Guide Tips */}
          <div className="mt-6 space-y-4">
            <h3 className="text-white font-medium">How to Measure</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-white/80">
              {sizeChart.type === "dress" && (
                <>
                  <div>
                    <strong className="text-white">Bust:</strong> Measure around the fullest part of your chest
                  </div>
                  <div>
                    <strong className="text-white">Waist:</strong> Measure around your natural waistline
                  </div>
                  <div>
                    <strong className="text-white">Hips:</strong> Measure around the fullest part of your hips
                  </div>
                  <div>
                    <strong className="text-white">Length:</strong> Measure from shoulder to desired hem length
                  </div>
                </>
              )}
              {sizeChart.type === "accessory" && (
                <>
                  <div>
                    <strong className="text-white">Width:</strong> Bag width at widest point
                  </div>
                  <div>
                    <strong className="text-white">Height:</strong> Bag height excluding handles
                  </div>
                  <div>
                    <strong className="text-white">Depth:</strong> Bag depth when fully expanded
                  </div>
                  <div>
                    <strong className="text-white">Strap:</strong> Adjustable strap length range
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Size Recommendations */}
          <div className="mt-6 p-4 glass rounded-lg">
            <h4 className="text-white font-medium mb-2">Size Recommendations</h4>
            <ul className="text-sm text-white/80 space-y-1">
              <li>• If you're between sizes, we recommend sizing up</li>
              <li>• Consider the fit you prefer (loose vs fitted)</li>
              <li>• Check the material composition for stretch</li>
              <li>• Contact us if you need help choosing the right size</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
