import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const truncate = (str: string, length: number) => {
  return str.length <= length ? str : str.slice(0, length) + '...'
}

export const slugify = (str: string) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const generateId = () => {
  return Math.random().toString(36).substr(2, 9)
}

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
