export const APP_CONFIG = {
  name: 'AI Companion',
  description: 'Discover, create, and interact with AI companions',
  version: '1.0.0',
  author: 'AI Companion Team',
}

export const SUGGESTIONS = [
  "What should I avoid when creating a startup?",
  "Selected and saved readings",
  "Quickly increase performance",
  "The best productivity tips",
  "How to build better habits",
  "Leadership strategies for teams",
  "Mindfulness and meditation techniques",
  "Financial planning for beginners",
  "Creative writing inspiration",
  "Healthy lifestyle tips"
]

export const MOCK_CONTENT = {
  "The best productivity tips": {
    title: "The best productivity tips",
    metrics: {
      readTime: "3 min. to read",
      books: "12 books",
      timeSaved: "24 h. saved"
    },
    content: "Sometimes we think fast and sometimes we think slow. One of the book's main ideas is to showcase how the brain uses these two systems for thinking and decision-making processes. System 1 operates intuitively and automatically, while System 2 is more deliberate and effortful. Understanding these systems can help you make better decisions and improve your productivity. It is so easy to overestimate the importance of one defining moment and underestimate the value of making small improvements on a daily basis. Meanwhile, improving by 1 percent isn't particularly notable—sometimes it isn't even noticeable—but it can be far more meaningful, especially in the long run. The difference a tiny improvement can make over time is astounding.",
    related: [
      { title: "Thinking, Fast and Slow", author: "DANIEL KAHNEMAN" },
      { title: "Atomic Habits", author: "JAMES CLEAR" }
    ]
  },
  "What should I avoid when creating a startup?": {
    title: "What should I avoid when creating a startup?",
    metrics: {
      readTime: "5 min. to read",
      books: "8 books",
      timeSaved: "16 h. saved"
    },
    content: "Starting a business is exciting, but there are common pitfalls that can derail your entrepreneurial journey. One of the biggest mistakes is not validating your idea before building. Many entrepreneurs fall in love with their product without checking if there's actually a market for it. Another critical mistake is trying to do everything yourself instead of building a strong team. You should also avoid spending too much money too quickly, especially on things that don't directly contribute to customer acquisition or product development.",
    related: [
      { title: "The Lean Startup", author: "ERIC RIES" },
      { title: "Zero to One", author: "PETER THIEL" }
    ]
  }
}

export const NAVIGATION_ITEMS = [
  { name: 'Create Your Own', href: '/search', description: 'Build your AI companion' },
  { name: 'Find a Match', href: '/search', description: 'Discover AI companions' },
  { name: 'Imagine', href: '/search', description: 'Explore possibilities' },
  { name: 'Random Pick', href: '/search', description: 'Surprise me' }
]
