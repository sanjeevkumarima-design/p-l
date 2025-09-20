declare module '@/lib/utils' {
  import { ClassValue } from 'clsx';
  
  export function cn(...inputs: ClassValue[]): string;
  export function formatPrice(price: number, currency?: string): string;
  export function slugify(str: string): string;
  export function truncate(str: string, length: number): string;
  export function getInitials(name: string): string;
  export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void;
}
