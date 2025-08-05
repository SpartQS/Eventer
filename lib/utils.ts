import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Функция для получения инициалов из имени пользователя
 * @param name - полное имя пользователя
 * @returns строку с инициалами (например, "ИП" для "Иван Петров")
 */
export function getInitials(name: string): string {
  if (!name) return "U"

  const parts = name.trim().split(' ')
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return name[0].toUpperCase()
}

/**
 * Функция для получения CSS классов аватара с единообразным стилем
 * @param size - размер аватара (xs, sm, md, lg)
 * @param rounded - скругление углов (true для sidebar, false для header)
 * @returns строку с CSS классами
 */
export function getAvatarClasses(size: 'xs' | 'sm' | 'md' | 'lg' = 'sm', rounded: boolean = false): string {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }

  const roundedClass = rounded ? 'rounded-lg' : 'rounded-full'

  return cn(
    sizeClasses[size],
    'font-medium',
    'bg-gray-600',
    'text-white',
    roundedClass
  )
}
