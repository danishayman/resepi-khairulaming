import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Recipe } from '@/lib/types'
import { slugToTitleSearch, formatTime } from '@/lib/utils'
import TikTokEmbed from '@/components/TikTokEmbed'

interface RecipePageProps {
  params: Promise<{ slug: string }>
}

async function getRecipe(slug: string): Promise<Recipe | null> {
  try {
    // Convert slug back to searchable title
    const titleSearch = slugToTitleSearch(slug)
    
    // Search for recipe with similar title
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .ilike('title', `%${titleSearch}%`)
      .single()

    if (error) {
      console.error('Error fetching recipe:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in getRecipe:', error)
    return null
  }
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params
  const recipe = await getRecipe(slug)

  if (!recipe) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link 
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke senarai resepi
        </Link>
      </div>

      {/* Recipe Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {recipe.title}
        </h1>
        
        {recipe.description && (
          <p className="text-lg text-gray-600 mb-6">
            {recipe.description}
          </p>
        )}

        {/* Recipe Meta */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
          {recipe.difficulty_level && (
            <span className={`px-3 py-1 rounded-full font-medium ${
              recipe.difficulty_level.toLowerCase() === 'mudah' 
                ? 'bg-green-100 text-green-800'
                : recipe.difficulty_level.toLowerCase() === 'sederhana'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {recipe.difficulty_level}
            </span>
          )}
          
          {recipe.cuisine_type && (
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
              {recipe.cuisine_type}
            </span>
          )}
        </div>

        {/* Time and Servings */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {recipe.prep_time_minutes && (
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {formatTime(recipe.prep_time_minutes)}
              </div>
              <div className="text-sm text-gray-600">Masa Persediaan</div>
            </div>
          )}
          
          {recipe.cook_time_minutes && (
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {formatTime(recipe.cook_time_minutes)}
              </div>
              <div className="text-sm text-gray-600">Masa Masakan</div>
            </div>
          )}
          
          {recipe.total_time_minutes && (
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {formatTime(recipe.total_time_minutes)}
              </div>
              <div className="text-sm text-gray-600">Jumlah Masa</div>
            </div>
          )}
          
          {recipe.servings && (
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {recipe.servings}
              </div>
              <div className="text-sm text-gray-600">Hidangan</div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Recipe Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Thumbnail */}
          {recipe.thumbnail_url && (
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <Image
                src={recipe.thumbnail_url}
                alt={recipe.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Ingredients */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Bahan-bahan</h2>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              {renderIngredients(recipe.ingredients)}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cara Masakan</h2>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <ol className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-medium mr-4 flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <div className="text-gray-700 leading-relaxed">
                      {typeof instruction === 'string' 
                        ? instruction 
                        : (instruction as { text?: string; step?: string; [key: string]: unknown }).text || 
                          (instruction as { text?: string; step?: string; [key: string]: unknown }).step || 
                          JSON.stringify(instruction)}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Nutrition Info */}
          {recipe.nutrition_info && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Maklumat Pemakanan</h2>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(recipe.nutrition_info as Record<string, string | number>).map(([key, value]) => (
                    <div key={key} className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-semibold text-gray-900">{value}</div>
                      <div className="text-sm text-gray-600 capitalize">{key.replace('_', ' ')}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Video and Meta */}
        <div className="space-y-6">
          {/* TikTok Video */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Video Resepi</h3>
            <TikTokEmbed sourceUrl={recipe.source_url} title={recipe.title} />
          </div>

          {/* Tags */}
          {recipe.tags && recipe.tags.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tag</h3>
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Source Link */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sumber</h3>
            <a
              href={recipe.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Lihat di TikTok
            </a>
          </div>

          {/* Recipe Meta Info */}
          <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
            <h4 className="font-semibold text-gray-900 mb-2">Maklumat Resepi</h4>
            <div className="space-y-1">
              {recipe.language && (
                <div>Bahasa: {recipe.language.toUpperCase()}</div>
              )}
              {recipe.video_platform && (
                <div>Platform: {recipe.video_platform}</div>
              )}
              {recipe.created_at && (
                <div>Ditambah: {new Date(recipe.created_at).toLocaleDateString('ms-MY')}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
