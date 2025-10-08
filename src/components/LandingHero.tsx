'use client'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import { NAVIGATION_ITEMS } from '@/lib/constants'

export default function LandingHero() {
  const router = useRouter()

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center max-w-6xl mx-auto"
      >
        {/* Hero Title */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold gradient-text mb-6 leading-tight">
            Start Your Journey
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover, create, and interact with AI companions. Find your perfect match or create your own unique personality.
          </p>
        </motion.div>

        {/* Action Cards Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12"
        >
          {NAVIGATION_ITEMS.map((item, index) => (
            <motion.div
              key={item.name}
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
              className="group"
            >
              <Button
                onClick={() => handleNavigation(item.href)}
                variant="ghost"
                className="w-full h-32 md:h-36 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl border border-white/20 hover:border-primary-200 hover:bg-white/90 transition-all duration-300 group-hover:shadow-xl"
              >
                <div className="text-center">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">
                    {item.description}
                  </p>
                </div>
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div variants={itemVariants} className="text-center">
          <p className="text-gray-500 mb-4">
            Join thousands of users exploring AI companionship
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <span>✓ Mobile & Desktop</span>
            <span>✓ Real-time Chat</span>
            <span>✓ Voice Interaction</span>
            <span>✓ Privacy First</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
