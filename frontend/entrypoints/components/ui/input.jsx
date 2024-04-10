import * as React from 'react'

import { cn } from '@shadcn/lib/utils'
import { cva } from 'class-variance-authority'

const orig_classes =
  'flex  w-full rounded-md border border-input bg-transparent   shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'

const Variants = cva(orig_classes, {
  variants: {
    size: {
      default: 'h-9 px-3 py-1 text-sm',
      sm: 'h-8   px-3 py-1 text-xs',
      lg: 'h-10  px-3 py-1 text-z_lg',
      xl: 'h-16  px-3 py-1 text-xl rounded-none'
    }
  },
  defaultVariants: {
    size: 'default'
  }
})

const Input = React.forwardRef(({ className, size, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(Variants({ size, className }))}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = 'Input'

export { Input }
