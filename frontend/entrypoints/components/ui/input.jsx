import * as React from 'react';

import { cn } from '@shadcn/lib/utils';
import { cva } from 'class-variance-authority';

const orig_classes =
  'tw-flex  tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-transparent   tw-shadow-sm tw-transition-colors file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring disabled:tw-cursor-not-allowed disabled:tw-opacity-50';

const Variants = cva(orig_classes, {
  variants: {
    size: {
      default: 'tw-h-9 tw-px-3 tw-py-1 tw-text-sm',
      sm: 'tw-h-8   tw-px-3 tw-py-1 tw-text-xs',
      lg: 'tw-h-10  tw-px-3 tw-py-1 tw-text-z_lg',
      xl: 'tw-h-16  tw-px-3 tw-py-1 tw-text-z_2xl',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

const Input = React.forwardRef(({ className, size, type, ...props }, ref) => {
  return <input type={type} className={cn(Variants({ size, className }))} ref={ref} {...props} />;
});
Input.displayName = 'Input';

export { Input };
