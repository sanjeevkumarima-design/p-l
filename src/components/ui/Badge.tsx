import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        hot: 'border-transparent bg-red-600 text-white hover:bg-red-700',
        success: 'border-transparent bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
        warning: 'border-transparent bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300',
        info: 'border-transparent bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
        new: 'border-transparent bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
        primary: 'border-transparent bg-primary text-white hover:bg-primary/90',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
  children?: React.ReactNode;
}

function Badge({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: BadgeProps) {
  const Comp = asChild ? 'span' : 'div';
  
  return (
    <Comp 
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </Comp>
  );
}

export { Badge, badgeVariants };
