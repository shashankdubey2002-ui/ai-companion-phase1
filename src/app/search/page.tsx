'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
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

const searchSuggestions = [
  'AI productivity tips',
  'Machine learning basics',
  'Social media trends',
  'Creative writing prompts',
  'Data analysis techniques',
  'Web development tutorials',
  'Design inspiration',
  'Business strategies'
]

export default function SearchPage() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    if (query.length > 0) {
      const filtered = searchSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      )
      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [query])

  const handleSearch = async (searchQuery: string = query) => {
    if (!searchQuery.trim()) return
    
    setIsSearching(true)
    
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Navigate to results page
    router.push(`/result?q=${encodeURIComponent(searchQuery)}`)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    setShowSuggestions(false)
    handleSearch(suggestion)
  }

  const handleSwipeUp = () => {
    // Show more suggestions or navigate
    console.log('Swiped up')
  }

  const handleSwipeDown = () => {
    // Hide suggestions
    setShowSuggestions(false)
  }

  return (
    <div className="min-h-screen particle-bg">
      <ParticleBackground particleCount={20} interactive={true} />
      
      <Header />
      
      <GestureWrapper
        onSwipeUp={handleSwipeUp}
        onSwipeDown={handleSwipeDown}
        className="min-h-screen"
      >
        <motion.div
          className="max-w-4xl mx-auto px-4 py-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Search Header */}
          <motion.section 
            className="text-center mb-12"
            variants={itemVariants}
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6 gradient-text-animated"
              variants={itemVariants}
            >
              Discover
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Search for AI companions, content, and conversations that match your interests
            </motion.p>
          </motion.section>

          {/* Search Interface */}
          <motion.section 
            className="mb-12"
            variants={itemVariants}
          >
            <GlassCard variant="elevated" className="p-8">
              <div className="space-y-6">
                <div className="relative">
                  <Input
                    variant="glass"
                    placeholder="What are you looking for?"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="text-lg"
                    icon={
                      <motion.span
                        animate={{ rotate: isSearching ? 360 : 0 }}
                        transition={{ duration: 1, repeat: isSearching ? Infinity : 0 }}
                      >
                        🔍
                      </motion.span>
                    }
                  />
                  
                  {/* Suggestions Dropdown */}
                  {showSuggestions && suggestions.length > 0 && (
                    <motion.div
                      className="absolute top-full left-0 right-0 mt-2 glass-card max-h-60 overflow-y-auto z-10"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {suggestions.map((suggestion, index) => (
                        <motion.button
                          key={index}
                          className="w-full text-left px-4 py-3 hover:bg-white/10 transition-colors duration-200 flex items-center gap-3"
                          onClick={() => handleSuggestionClick(suggestion)}
                          whileHover={{ x: 5 }}
                        >
                          <span className="text-blue-500">🔍</span>
                          <span className="text-gray-700">{suggestion}</span>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="gradient"
                    size="lg"
                    onClick={() => handleSearch()}
                    loading={isSearching}
                    glow
                    className="px-8 py-4"
                  >
                    {isSearching ? 'Searching...' : 'Search'}
                  </Button>
                  
                  <Button
                    variant="glass"
                    size="lg"
                    onClick={() => setQuery('')}
                    className="px-8 py-4"
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </GlassCard>
          </motion.section>

          {/* Popular Searches */}
          <motion.section 
            className="mb-12"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold mb-6 text-center gradient-text">
              Popular Searches
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {searchSuggestions.slice(0, 8).map((suggestion, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <GlassCard
                    variant="default"
                    hover
                    className="p-4 text-center cursor-pointer group"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <p className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                      {suggestion}
                    </p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Quick Actions */}
          <motion.section 
            className="text-center"
            variants={itemVariants}
          >
            <GlassCard variant="floating" className="p-8">
              <h2 className="text-2xl font-bold mb-4 gradient-text">
                Quick Actions
              </h2>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  variant="neon"
                  size="md"
                  onClick={() => router.push('/')}
                  className="px-6 py-3"
                >
                  ← Back to Home
                </Button>
                
                <Button
                  variant="glass"
                  size="md"
                  onClick={() => setQuery('AI productivity')}
                  className="px-6 py-3"
                >
                  AI Productivity
                </Button>
                
                <Button
                  variant="glass"
                  size="md"
                  onClick={() => setQuery('social trends')}
                  className="px-6 py-3"
                >
                  Social Trends
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
        onClick={() => handleSearch()}
        tooltip="Search"
      >
        🔍
      </FloatingActionButton>
    </div>
  )
}