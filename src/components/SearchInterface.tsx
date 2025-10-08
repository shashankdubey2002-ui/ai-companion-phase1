'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/ui/Header'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { SUGGESTIONS } from '@/lib/constants'
import { debounce } from '@/lib/utils'

export default function SearchInterface() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Debounced search function
  const debouncedSearch = debounce((searchQuery: string) => {
    if (searchQuery.length > 2) {
      const filtered = SUGGESTIONS.filter(s => 
        s.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }, 300)

  useEffect(() => {
    debouncedSearch(query)
  }, [query, debouncedSearch])

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    setShowSuggestions(false)
    setIsLoading(true)
    // Simulate loading delay
    setTimeout(() => {
      router.push(`/result?query=${encodeURIComponent(suggestion)}`)
    }, 500)
  }

  const handleSubmit = () => {
    if (query.trim()) {
      setIsLoading(true)
      setTimeout(() => {
        router.push(`/result?query=${encodeURIComponent(query)}`)
      }, 500)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
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

  const suggestionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2,
        ease: 'easeIn',
      },
    },
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 flex flex-col items-center justify-center px-4 py-8"
      >
        <motion.div
          variants={itemVariants}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 leading-tight">
            What would you like to know more about?
          </h2>

          {/* Initial Suggestions */}
          {!query && (
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
            >
              {SUGGESTIONS.slice(0, 2).map((suggestion, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card
                    onClick={() => handleSuggestionClick(suggestion)}
                    hover
                    className="p-4 cursor-pointer hover:shadow-md transition-all duration-200"
                  >
                    <p className="text-gray-700 text-left">{suggestion}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Search Input */}
          <motion.div variants={itemVariants} className="relative mb-6">
            <div className="relative">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask or request..."
                className="w-full text-lg p-4 pr-20 border-2 border-gray-200 focus:border-primary-500 rounded-xl"
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
              <Button
                onClick={handleSubmit}
                disabled={!query.trim() || isLoading}
                loading={isLoading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600"
              >
                {isLoading ? 'Searching...' : 'Ask'}
              </Button>
            </div>
          </motion.div>

          {/* Dynamic Suggestions */}
          <AnimatePresence>
            {showSuggestions && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2 mb-6"
              >
                {suggestions.map((suggestion, index) => (
                  <motion.div
                    key={suggestion}
                    variants={suggestionVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      onClick={() => handleSuggestionClick(suggestion)}
                      hover
                      className="p-3 cursor-pointer hover:bg-gray-50 transition-colors text-left"
                    >
                      <p className="text-gray-700">{suggestion}</p>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Help Text */}
          <motion.div variants={itemVariants} className="text-center">
            <p className="text-gray-500 text-sm">
              Type your question or choose from suggestions above
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
