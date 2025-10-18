'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'
import GlassCard from '@/components/ui/GlassCard'
import FloatingActionButton from '@/components/ui/FloatingActionButton'
import ParticleBackground from '@/components/ui/ParticleBackground'
import GestureWrapper from '@/components/ui/GestureWrapper'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
}

const floatingVariants = {
  float: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
}

export default function LandingPage() {
  const router = useRouter()
  const [currentTime, setCurrentTime] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    }
    
    updateTime()
    const interval = setInterval(updateTime, 1000)
    
    // Simulate loading
    const timer = setTimeout(() => setIsLoaded(true), 500)
    
    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [])

  const handleGetStarted = () => {
    router.push('/search')
  }

  const handleSwipeLeft = () => {
    // Navigate to next section or page
    console.log('Swiped left')
  }

  const handleSwipeRight = () => {
    // Navigate to previous section
    console.log('Swiped right')
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your AI companion...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen particle-bg">
      <ParticleBackground particleCount={30} interactive={true} />
      
      <Header />
      
      <GestureWrapper
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
        className="min-h-screen"
      >
        <motion.div
          className="max-w-7xl mx-auto px-4 py-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Section */}
          <motion.section 
            className="text-center mb-16 relative"
            variants={itemVariants}
          >
            {/* Floating Elements */}
            <motion.div
              className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 blur-xl"
              variants={floatingVariants}
              animate="float"
            />
            <motion.div
              className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-20 blur-xl"
              variants={floatingVariants}
              animate="float"
              transition={{ delay: 1 }}
            />
            <motion.div
              className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 blur-xl"
              variants={floatingVariants}
              animate="float"
              transition={{ delay: 2 }}
            />

            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-6 gradient-text-animated"
              variants={itemVariants}
            >
              AI Companion
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Your intelligent companion for productivity, creativity, and connection. 
              Experience the future of AI-powered social interaction.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              variants={itemVariants}
            >
              <Button
                variant="gradient"
                size="xl"
                onClick={handleGetStarted}
                glow
                shimmer
                className="px-8 py-4 text-lg font-semibold"
              >
                Get Started
              </Button>
              
              <Button
                variant="glass"
                size="xl"
                className="px-8 py-4 text-lg font-semibold"
              >
                Learn More
              </Button>
            </motion.div>

            {/* Time Display */}
            <motion.div 
              className="glass-card p-4 inline-block"
              variants={itemVariants}
            >
              <p className="text-sm text-gray-500 mb-1">Current Time</p>
              <p className="text-2xl font-mono font-bold gradient-text">{currentTime}</p>
            </motion.div>
          </motion.section>

          {/* Features Grid */}
          <motion.section 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            variants={containerVariants}
          >
            {[
              {
                title: 'Smart Search',
                description: 'Find exactly what you need with AI-powered search that understands context and intent.',
                icon: '🔍',
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                title: 'Social Connection',
                description: 'Connect with like-minded individuals and build meaningful relationships in our community.',
                icon: '👥',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                title: 'AI Assistant',
                description: 'Get personalized help and insights from your AI companion that learns from your preferences.',
                icon: '🤖',
                gradient: 'from-green-500 to-emerald-500'
              },
              {
                title: 'Real-time Chat',
                description: 'Engage in natural conversations with AI and human users through our advanced chat system.',
                icon: '💬',
                gradient: 'from-orange-500 to-red-500'
              },
              {
                title: 'Content Discovery',
                description: 'Discover relevant content, articles, and resources tailored to your interests and needs.',
                icon: '📚',
                gradient: 'from-indigo-500 to-purple-500'
              },
              {
                title: 'Privacy First',
                description: 'Your data is protected with enterprise-grade security and privacy controls.',
                icon: '🔒',
                gradient: 'from-gray-500 to-slate-500'
              }
            ].map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <GlassCard
                  variant="elevated"
                  hover
                  tilt
                  className="h-full group cursor-pointer"
                >
                  <div className="text-center">
                    <motion.div
                      className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-2xl`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-3 gradient-text">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.section>

          {/* CTA Section */}
          <motion.section 
            className="text-center py-16"
            variants={itemVariants}
          >
            <GlassCard variant="floating" className="max-w-4xl mx-auto">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold mb-6 gradient-text"
                variants={itemVariants}
              >
                Ready to Transform Your Digital Experience?
              </motion.h2>
              
              <motion.p 
                className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
                variants={itemVariants}
              >
                Join thousands of users who are already experiencing the future of AI-powered social interaction.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                variants={itemVariants}
              >
                <Button
                  variant="gradient"
                  size="lg"
                  onClick={handleGetStarted}
                  glow
                  className="px-8 py-4"
                >
                  Start Your Journey
                </Button>
                
                <Button
                  variant="neon"
                  size="lg"
                  className="px-8 py-4"
                >
                  View Demo
                </Button>
              </motion.div>
            </GlassCard>
          </motion.section>
        </motion.div>
      </GestureWrapper>

      {/* Floating Action Button */}
      <FloatingActionButton
        position="bottom-right"
        variant="gradient"
        size="lg"
        onClick={handleGetStarted}
        tooltip="Quick Start"
      >
        +
      </FloatingActionButton>
    </div>
  )
}