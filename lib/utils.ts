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
