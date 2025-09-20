import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
  padding?: 'none' | 'small' | 'medium' | 'large';
  background?: 'white' | 'gray' | 'primary';
  showBorder?: boolean;
  actions?: React.ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  description,
  className = '',
  align = 'left',
  padding = 'medium',
  background = 'white',
  showBorder = false,
  actions,
}: PageHeaderProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  const paddingClasses = {
    none: 'py-0',
    small: 'py-8',
    medium: 'py-12',
    large: 'py-16',
  };

  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    primary: 'bg-primary-600 text-white',
  };

  const textColor = background === 'primary' ? 'text-white' : 'text-gray-900';
  const subtitleColor = background === 'primary' ? 'text-primary-100' : 'text-primary-600';
  const descriptionColor = background === 'primary' ? 'text-primary-100' : 'text-gray-500';

  return (
    <div 
      className={cn(
        'w-full',
        backgroundClasses[background],
        paddingClasses[padding],
        showBorder && 'border-b border-gray-200',
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn('max-w-3xl', alignClasses[align])}>
          {subtitle && (
            <h2 className={cn(
              'text-sm font-semibold uppercase tracking-wide',
              subtitleColor
            )}>
              {subtitle}
            </h2>
          )}
          <h1 className={cn(
            'mt-1 text-3xl font-extrabold sm:text-4xl lg:text-5xl',
            textColor
          )}>
            {title}
          </h1>
          {description && (
            <p className={cn(
              'mt-3 max-w-2xl text-lg',
              descriptionColor
            )}>
              {description}
            </p>
          )}
          {actions && (
            <div className="mt-6 flex flex-wrap gap-3">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
