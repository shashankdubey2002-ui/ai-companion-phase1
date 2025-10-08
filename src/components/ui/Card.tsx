import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined'
  padding?: 'sm' | 'md' | 'lg'
  hover?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  function Card({ className, variant = 'default', padding = 'md', hover = false, children, ...props }, ref) {
    return (
      <div
        className={cn(
          'rounded-xl transition-all duration-200',
          {
            // Variants
            'bg-white shadow-sm': variant === 'default',
            'bg-white shadow-lg': variant === 'elevated',
            'bg-white border border-gray-200': variant === 'outlined',
            
            // Padding
            'p-3': padding === 'sm',
            'p-4': padding === 'md',
            'p-6': padding === 'lg',
            
            // Hover effects
            'hover:shadow-md cursor-pointer': hover,
          },
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 pb-4', className)}
      {...props}
    />
  )
)
CardHeader.displayName = 'CardHeader'

const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
)
CardTitle.displayName = 'CardTitle'

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-gray-500', className)}
      {...props}
    />
  )
)
CardDescription.displayName = 'CardDescription'

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('pt-0', className)} {...props} />
  )
)
CardContent.displayName = 'CardContent'

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center pt-4', className)}
      {...props}
    />
  )
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
