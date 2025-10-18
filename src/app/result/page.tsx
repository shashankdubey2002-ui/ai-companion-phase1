'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
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
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  }
}

export default function ResultPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [isLoading, setIsLoading] = useState(true)
  const [content, setContent] = useState<any>(null)

  useEffect(() => {
    // Simulate loading content
    const loadContent = async () => {
      setIsLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setContent({
        title: `Results for "${query}"`,
        description: `Here are the most relevant AI companions and content related to "${query}". Discover intelligent assistants, helpful resources, and engaging conversations tailored to your interests.`,
        results: [
          {
            id: 1,
            title: 'AI Productivity Assistant',
            description: 'An intelligent companion designed to help you manage tasks, set goals, and boost your productivity with personalized insights.',
            category: 'Productivity',
            rating: 4.8,
            users: '12.5k',
            tags: ['AI', 'Productivity', 'Task Management'],
            gradient: 'from-blue-500 to-cyan-500'
          },
          {
            id: 2,
            title: 'Creative Writing Partner',
            description: 'Collaborate with an AI that understands your creative vision and helps you craft compelling stories, articles, and content.',
            category: 'Creative',
            rating: 4.9,
            users: '8.2k',
            tags: ['Writing', 'Creative', 'AI Assistant'],
            gradient: 'from-purple-500 to-pink-500'
          },
          {
            id: 3,
            title: 'Learning Companion',
            description: 'Master new skills with personalized learning paths, interactive lessons, and adaptive content that matches your pace.',
            category: 'Education',
            rating: 4.7,
            users: '15.3k',
            tags: ['Learning', 'Education', 'Skills'],
            gradient: 'from-green-500 to-emerald-500'
          },
          {
            id: 4,
            title: 'Social Media Manager',
            description: 'Optimize your social presence with AI-powered content creation, scheduling, and engagement strategies.',
            category: 'Social',
            rating: 4.6,
            users: '6.8k',
            tags: ['Social Media', 'Marketing', 'Content'],
            gradient: 'from-orange-500 to-red-500'
          },
          {
            id: 5,
            title: 'Health & Wellness Coach',
            description: 'Get personalized health insights, fitness recommendations, and wellness tips from your AI health companion.',
            category: 'Health',
            rating: 4.9,
            users: '9.1k',
            tags: ['Health', 'Wellness', 'Fitness'],
            gradient: 'from-indigo-500 to-purple-500'
          },
          {
            id: 6,
            title: 'Business Strategy Advisor',
            description: 'Make informed business decisions with AI-powered market analysis, trend predictions, and strategic recommendations.',
            category: 'Business',
            rating: 4.8,
            users: '4.7k',
            tags: ['Business', 'Strategy', 'Analytics'],
            gradient: 'from-gray-500 to-slate-500'
          }
        ]
      })
      
      setIsLoading(false)
    }
    
    if (query) {
      loadContent()
    }
  }, [query])

  const handleBackToSearch = () => {
    router.push('/search')
  }

  const handleSwipeLeft = () => {
    // Navigate to next result
    console.log('Swiped left')
  }

  const handleSwipeRight = () => {
    // Navigate to previous result
    console.log('Swiped right')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen particle-bg">
        <ParticleBackground particleCount={15} interactive={false} />
        <Header />
        
        <div className="flex items-center justify-center min-h-[60vh]">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Finding the best results for you...</p>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen particle-bg">
      <ParticleBackground particleCount={20} interactive={true} />
      
      <Header />
      
      <GestureWrapper
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
        className="min-h-screen"
      >
        <motion.div
          className="max-w-6xl mx-auto px-4 py-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.section 
            className="mb-12"
            variants={itemVariants}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <Button
                onClick={handleBackToSearch}
                variant="ghost"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 w-fit"
              >
                ← Back to Search
              </Button>
              
              <div className="text-right">
                <p className="text-sm text-gray-500">Found {content?.results.length || 0} results</p>
              </div>
            </div>

            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4 gradient-text"
              variants={itemVariants}
            >
              {content?.title}
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl"
              variants={itemVariants}
            >
              {content?.description}
            </motion.p>
          </motion.section>

          {/* Results Grid */}
          <motion.section 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            variants={containerVariants}
          >
            {content?.results.map((result: any, index: number) => (
              <motion.div
                key={result.id}
                variants={cardVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <GlassCard
                  variant="elevated"
                  hover
                  tilt
                  className="h-full cursor-pointer group"
                >
                  <div className="p-6">
                    {/* Category Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${result.gradient} text-white`}>
                        {result.category}
                      </span>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <span>★</span>
                        <span className="text-sm font-medium">{result.rating}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-3 gradient-text group-hover:gradient-text-animated">
                      {result.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {result.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {result.tags.map((tag: string, tagIndex: number) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{result.users} users</span>
                      <Button
                        variant="glass"
                        size="sm"
                        className="px-4 py-2"
                      >
                        Try Now
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.section>

          {/* Load More */}
          <motion.section 
            className="text-center"
            variants={itemVariants}
          >
            <GlassCard variant="floating" className="p-8">
              <h2 className="text-2xl font-bold mb-4 gradient-text">
                Want to see more?
              </h2>
              
              <p className="text-gray-600 mb-6">
                Discover additional AI companions and content tailored to your interests
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="gradient"
                  size="lg"
                  onClick={() => router.push('/search')}
                  glow
                  className="px-8 py-4"
                >
                  Search Again
                </Button>
                
                <Button
                  variant="neon"
                  size="lg"
                  onClick={() => router.push('/')}
                  className="px-8 py-4"
                >
                  Back to Home
                </Button>
              </div>
            </GlassCard>
          </motion.section>
        </motion.div>
      </GestureWrapper>

      {/* Floating Action Button */}
      <FloatingActionButton
        position="bottom-right"
        variant="gradient"
        size="lg"
        onClick={() => router.push('/search')}
        tooltip="New Search"
      >
        🔍
      </FloatingActionButton>
    </div>
  )
}