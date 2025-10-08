'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/ui/Header'
import { Card, CardContent } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { MOCK_CONTENT } from '@/lib/constants'
import { ContentData } from '@/types'

export default function ContentDisplay() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get('query') || 'The best productivity tips'
  const [content, setContent] = useState<ContentData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      // Mock data - in real app, this would fetch from API
      const mockContent = MOCK_CONTENT[query as keyof typeof MOCK_CONTENT] || MOCK_CONTENT["The best productivity tips"]
      setContent(mockContent)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [query])

  const handleBackToSearch = () => {
    router.push('/search')
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
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading content...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Content not found</h2>
            <Button onClick={handleBackToSearch} variant="primary">
              Back to Search
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto px-4 py-8"
      >
        {/* Back Button */}
        <motion.div variants={itemVariants} className="mb-6">
          <Button
            onClick={handleBackToSearch}
            variant="ghost"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            ← Back to Search
          </Button>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight"
        >
          {content.title}
        </motion.h1>

        {/* Metrics */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-4 mb-8"
        >
          <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
            {content.metrics.readTime}
          </span>
          <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
            {content.metrics.books}
          </span>
          <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
            {content.metrics.timeSaved}
          </span>
        </motion.div>

        {/* Content */}
        <motion.div
          variants={itemVariants}
          className="prose max-w-none mb-8"
        >
          <Card className="p-6 md:p-8">
            <CardContent className="p-0">
              <p className="text-gray-700 leading-relaxed text-lg md:text-xl">
                {content.content}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Related Resources */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Related Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.related.map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
              >
                <Card hover className="p-4 hover:shadow-md transition-all duration-200">
                  <CardContent className="p-0">
                    <h4 className="font-semibold text-gray-800 mb-2 text-lg">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      by {item.author}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-4 mt-8 pt-8 border-t border-gray-200"
        >
          <Button
            onClick={handleBackToSearch}
            variant="primary"
            className="flex-1 md:flex-none"
          >
            Search Again
          </Button>
          <Button
            variant="outline"
            className="flex-1 md:flex-none"
          >
            Save for Later
          </Button>
          <Button
            variant="outline"
            className="flex-1 md:flex-none"
          >
            Share
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
