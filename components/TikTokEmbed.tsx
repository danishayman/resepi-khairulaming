'use client'

import { getTikTokEmbedUrl } from '@/lib/utils'

interface TikTokEmbedProps {
  sourceUrl: string
  title: string
}

export default function TikTokEmbed({ sourceUrl, title }: TikTokEmbedProps) {
  const embedUrl = getTikTokEmbedUrl(sourceUrl)

  if (!embedUrl) {
    return (
      <div className="h-[600px] bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center p-4">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <p className="text-sm text-gray-600">Video tidak tersedia</p>
          <a 
            href={sourceUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm underline mt-2 inline-block"
          >
            Lihat di TikTok
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="h-[600px]">
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        frameBorder="0"
        allow="encrypted-media"
        allowFullScreen
        title={`TikTok video: ${title}`}
        className="rounded-lg"
      />
    </div>
  )
}
