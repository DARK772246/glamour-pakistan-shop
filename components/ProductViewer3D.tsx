"use client"

import { motion } from "framer-motion"
import { X, RotateCcw, ZoomIn, Move3D } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, PerspectiveCamera } from "@react-three/drei"
import { Suspense, useState } from "react"

interface Product {
  id: number
  name: string
  model3D?: string
  images: string[]
}

interface ProductViewer3DProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

function ProductModel({ modelPath }: { modelPath: string }) {
  // In a real app, you'd load the actual 3D model
  // For demo purposes, we'll use a placeholder
  return (
    <mesh>
      <boxGeometry args={[2, 3, 0.5]} />
      <meshStandardMaterial color="#8338ec" />
    </mesh>
  )
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full"
      />
    </div>
  )
}

export default function ProductViewer3D({ product, isOpen, onClose }: ProductViewer3DProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [zoom, setZoom] = useState(1)

  if (!isOpen) return null

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
        className="glass rounded-2xl w-full max-w-4xl h-[80vh] relative overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <div>
            <h2 className="text-white font-semibold text-xl">{product.name}</h2>
            <p className="text-white/60">3D Product Viewer</p>
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

        {/* 3D Viewer */}
        <div className="relative flex-1 h-full">
          <Canvas className="w-full h-full">
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />

            <Suspense fallback={null}>
              <ProductModel modelPath={product.model3D || ""} />
              <Environment preset="studio" />
            </Suspense>

            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} minDistance={2} maxDistance={10} />
          </Canvas>

          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 glass flex items-center justify-center">
              <LoadingSpinner />
            </div>
          )}

          {/* Controls */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="glass rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="glass border-white/30 text-white hover:bg-white/10 bg-transparent"
                  >
                    <RotateCcw size={16} className="mr-2" />
                    Reset View
                  </Button>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-white/70 text-sm">Controls:</span>
                  <div className="flex items-center space-x-4 text-white/60 text-xs">
                    <div className="flex items-center space-x-1">
                      <Move3D size={14} />
                      <span>Drag to rotate</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ZoomIn size={14} />
                      <span>Scroll to zoom</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="absolute top-6 left-6">
            <div className="glass rounded-lg p-3">
              <p className="text-white/80 text-sm font-medium mb-2">How to use:</p>
              <ul className="text-white/60 text-xs space-y-1">
                <li>• Drag to rotate the product</li>
                <li>• Scroll to zoom in/out</li>
                <li>• Right-click and drag to pan</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
