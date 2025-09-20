import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

const maxWidths = {
  xs: 'max-w-screen-xs',
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  full: 'max-w-full',
};

const paddings = {
  none: 'px-0',
  sm: 'px-4 sm:px-6',
  md: 'px-4 sm:px-6 lg:px-8',
  lg: 'px-6 sm:px-8 lg:px-12',
};

export function Container({
  as: Component = 'div',
  size = 'xl',
  padding = 'md',
  className = '',
  children,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        'w-full mx-auto',
        maxWidths[size],
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
