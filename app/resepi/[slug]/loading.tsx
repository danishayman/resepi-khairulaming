export default function RecipeLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse">
      {/* Back Button Skeleton */}
      <div className="mb-6">
        <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>

      {/* Recipe Header Skeleton */}
      <div className="mb-8">
        {/* Title */}
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
        
        {/* Description */}
        <div className="space-y-2 mb-6">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
        </div>

        {/* Meta Tags */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        </div>

        {/* Time and Servings Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mx-auto"></div>
            </div>
          ))}
        </div>

        {/* Share Section Skeleton */}
        <div className="mb-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-56"></div>
            </div>
            <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Recipe Details Skeleton */}
        <div className="space-y-8">
          {/* Ingredients Skeleton */}
          <div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-4"></div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="space-y-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex items-start">
                    <div className="w-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div className="flex-1 h-5 bg-gray-200 dark:bg-gray-700 rounded" style={{ width: `${60 + Math.random() * 30}%` }}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Instructions Skeleton */}
          <div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-4"></div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-start">
                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full mr-4 flex-shrink-0"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" style={{ width: `${70 + Math.random() * 20}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Nutrition Info Skeleton */}
          <div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-56 mb-4"></div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-12 mx-auto mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-16 mx-auto"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Video and Meta Skeleton */}
        <div className="space-y-6">
          {/* Video Skeleton */}
          <div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4"></div>
            <div className="relative w-full" style={{ paddingTop: '177.78%' }}>
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <svg 
                  className="w-16 h-16 text-gray-300 dark:text-gray-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Tags Skeleton */}
          <div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-4"></div>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className="h-7 bg-gray-200 dark:bg-gray-700 rounded-full" 
                  style={{ width: `${60 + Math.random() * 40}px` }}
                ></div>
              ))}
            </div>
          </div>

          {/* Source Link Skeleton */}
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-40"></div>
        </div>
      </div>
    </div>
  )
}

