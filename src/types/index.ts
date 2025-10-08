export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  bio?: string
  followers: number
  following: number
  createdAt: Date
}

export interface ContentData {
  title: string
  metrics: {
    readTime: string
    books: string
    timeSaved: string
  }
  content: string
  related: Array<{
    title: string
    author: string
  }>
}

export interface Suggestion {
  id: string
  text: string
  category?: string
}

export interface NavigationItem {
  name: string
  href: string
  description: string
  icon?: string
}

export interface AuthUser {
  id: string
  name: string
  email: string
  image?: string
  provider: 'google' | 'apple' | 'email'
}

export interface AppConfig {
  name: string
  description: string
  version: string
  author: string
}
