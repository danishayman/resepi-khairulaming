/**
 * Convert a title to a URL-friendly slug
 */
export function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/&/g, 'and') // Replace & with 'and' to preserve meaning
    .replace(/[^a-z0-9\s-]/g, '') // Remove other special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
}

/**
 * Convert a slug back to search for the original title
 */
export function slugToTitleSearch(slug: string): string {
  return slug
    .replace(/\band\b/g, '&') // Convert 'and' back to '&' for better database matching
    .replace(/-/g, ' ')
    .trim()
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
}

/**
 * Format time in minutes to readable format
 */
export function formatTime(minutes: number | null): string {
  if (!minutes) return 'N/A'
  
  if (minutes < 60) {
    return `${minutes} min`
  }
  
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  
  if (remainingMinutes === 0) {
    return `${hours}h`
  }
  
  return `${hours}h ${remainingMinutes}m`
}

/**
 * Shuffle an array using Fisher-Yates algorithm
 * This creates a new shuffled array without modifying the original
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array] // Create a copy to avoid mutating original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/**
 * Convert local thumbnail path to proper URL
 * Handles both local paths (thumbnails\thumb_xxx.jpg) and remote URLs
 */
export function getThumbnailUrl(thumbnailPath: string | null): string | null {
  if (!thumbnailPath) return null
  
  // If it's already a full URL (starts with http), return as is
  if (thumbnailPath.startsWith('http')) {
    return thumbnailPath
  }
  
  // If it's a local path, convert to proper URL
  // Handle both forward slashes and backslashes
  const cleanPath = thumbnailPath.replace(/\\/g, '/')
  
  // If it starts with thumbnails/, make it a relative path from public
  if (cleanPath.startsWith('thumbnails/')) {
    return `/${cleanPath}`
  }
  
  // If it doesn't start with thumbnails/, assume it's already in the format we need
  return `/${cleanPath}`
}

/**
 * Extract TikTok video ID from URL for embedding
 */
export function getTikTokEmbedUrl(sourceUrl: string): string | null {
  try {
    const url = new URL(sourceUrl)
    
    // Handle different TikTok URL formats
    if (url.hostname.includes('tiktok.com')) {
      const pathParts = url.pathname.split('/')
      const videoIndex = pathParts.findIndex(part => part === 'video')
      
      if (videoIndex !== -1 && pathParts[videoIndex + 1]) {
        const videoId = pathParts[videoIndex + 1]
        return `https://www.tiktok.com/embed/v2/${videoId}`
      }
      
      // Handle short URLs like vm.tiktok.com
      if (pathParts[1]) {
        return `https://www.tiktok.com/embed/v2/${pathParts[1]}`
      }
    }
    
    return null
  } catch (error) {
    console.error('Error parsing TikTok URL:', error)
    return null
  }
}
