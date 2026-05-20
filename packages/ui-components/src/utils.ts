import { Timestamp } from 'firebase/firestore'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Convert Firestore Timestamps to ISO strings for client serialization
 * Single source of truth for timestamp handling
 */
export function serializeTimestamps(data: any): any {
  if (!data) return data

  return {
    ...data,
    createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : data.createdAt,
    updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate().toISOString() : data.updatedAt,
    messages: Array.isArray(data.messages)
      ? data.messages.map((msg: any) => ({
          ...msg,
          timestamp: msg.timestamp instanceof Timestamp ? msg.timestamp.toDate().toISOString() : msg.timestamp,
        }))
      : [],
  }
}
