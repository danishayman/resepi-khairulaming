import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Recipe, IngredientsData, InstructionsData, IngredientItem, InstructionItem } from '@/lib/types'
import { slugToTitleSearch, formatTime } from '@/lib/utils'
import TikTokEmbed from '@/components/TikTokEmbed'

interface RecipePageProps {
  params: Promise<{ slug: string }>
}

async function getRecipe(slug: string): Promise<Recipe | null> {
  try {
    // Convert slug back to searchable title
    const titleSearch = slugToTitleSearch(slug)
    
    // Search for recipe with similar title - get multiple results first
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .ilike('title', `%${titleSearch}%`)
      .limit(10) // Get up to 10 potential matches
      .returns<Recipe[]>()

    if (error) {
      console.error('Error fetching recipe:', error)
      // Log more details about the error for debugging
      console.error('Search term:', titleSearch)
      console.error('Slug:', slug)
      return null
    }

    if (!data || data.length === 0) {
      return null
    }

    // If only one result, return it
    if (data.length === 1) {
      return data[0]
    }

    // Multiple results - find the best match
    console.log(`Found ${data.length} recipes matching "${titleSearch}":`, data.map(r => r.title))
    
    // First, try to find exact match (case insensitive)
    const exactMatch = data.find(recipe => 
      recipe.title.toLowerCase() === titleSearch.toLowerCase()
    )
    if (exactMatch) {
      console.log('Found exact match:', exactMatch.title)
      return exactMatch
    }

    // Second, try to find the shortest title that contains the search term
    // This helps avoid getting longer, more specific titles when looking for general ones
    const sortedByLength = data.sort((a, b) => a.title.length - b.title.length)
    console.log('Using shortest match:', sortedByLength[0].title)
    return sortedByLength[0]

  } catch (error) {
    console.error('Error in getRecipe:', error)
    return null
  }
}

function renderIngredients(ingredients: IngredientsData) {
  // Handle different ingredient structures
  if (Array.isArray(ingredients)) {
    // Simple array of strings or objects
    return (
      <ul className="space-y-2">
        {ingredients.map((ingredient, index) => (
          <li key={index} className="flex items-start">
            <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            <span className="text-gray-700">
              {typeof ingredient === 'string' 
                ? ingredient 
                : ingredient.name 
                  ? `${ingredient.name}${ingredient.quantity ? ` - ${ingredient.quantity}` : ''}`
                  : JSON.stringify(ingredient)}
            </span>
          </li>
        ))}
      </ul>
    )
  } else if (typeof ingredients === 'object' && ingredients !== null) {
    // Object with categories (like main_ingredients, spices_and_seasonings)
    return (
      <div className="space-y-6">
        {Object.entries(ingredients).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 capitalize">
              {category.replace(/_/g, ' ')}
            </h3>
            <ul className="space-y-2 ml-4">
              {Array.isArray(items) && items.map((ingredient: IngredientItem, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">
                    {typeof ingredient === 'string' 
                      ? ingredient 
                      : ingredient.name 
                        ? `${ingredient.name}${ingredient.quantity ? ` - ${ingredient.quantity}` : ''}`
                        : JSON.stringify(ingredient)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )
  } else {
    // Fallback for unexpected structure
    return (
      <div className="text-gray-600">
        <p>Bahan-bahan tidak dapat dipaparkan dalam format yang betul.</p>
        <pre className="mt-2 text-xs bg-gray-100 p-2 rounded">
          {JSON.stringify(ingredients, null, 2)}
        </pre>
      </div>
    )
  }
}

function renderInstructions(instructions: InstructionsData) {
  // Handle different instruction structures
  if (Array.isArray(instructions)) {
    // Simple array of strings or objects
    return (
      <ol className="space-y-4">
        {instructions.map((instruction, index) => (
          <li key={index} className="flex items-start">
            <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-medium mr-4 flex-shrink-0 mt-0.5">
              {index + 1}
            </span>
            <div className="text-gray-700 leading-relaxed">
              {typeof instruction === 'string' 
                ? instruction 
                : instruction.text || instruction.step || JSON.stringify(instruction)}
            </div>
          </li>
        ))}
      </ol>
    )
  } else if (typeof instructions === 'object' && instructions !== null) {
    // Check if it's a step-based object (step1, step2, etc.)
    const keys = Object.keys(instructions)
    const isStepBased = keys.some(key => key.startsWith('step'))
    
    if (isStepBased) {
      // Handle step-based instructions like {step1: "...", step2: "..."}
      const sortedSteps = keys
        .filter(key => key.startsWith('step'))
        .sort((a, b) => {
          const numA = parseInt(a.replace('step', ''))
          const numB = parseInt(b.replace('step', ''))
          return numA - numB
        })
      
      return (
        <ol className="space-y-4">
          {sortedSteps.map((stepKey, index) => (
            <li key={stepKey} className="flex items-start">
              <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-medium mr-4 flex-shrink-0 mt-0.5">
                {index + 1}
              </span>
              <div className="text-gray-700 leading-relaxed">
                {typeof instructions[stepKey] === 'string' 
                  ? instructions[stepKey] 
                  : JSON.stringify(instructions[stepKey])}
              </div>
            </li>
          ))}
        </ol>
      )
    } else {
      // Object with categories
      return (
        <div className="space-y-6">
          {Object.entries(instructions).map(([category, steps]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold text-gray-800 mb-3 capitalize">
                {category.replace(/_/g, ' ')}
              </h3>
              <ol className="space-y-4 ml-4">
                {Array.isArray(steps) && steps.map((instruction: InstructionItem, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-medium mr-4 flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <div className="text-gray-700 leading-relaxed">
                      {typeof instruction === 'string' 
                        ? instruction 
                        : instruction.text || instruction.step || JSON.stringify(instruction)}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      )
    }
  } else {
    // Fallback for unexpected structure
    return (
      <div className="text-gray-600">
        <p>Cara masakan tidak dapat dipaparkan dalam format yang betul.</p>
        <pre className="mt-2 text-xs bg-gray-100 p-2 rounded">
          {JSON.stringify(instructions, null, 2)}
        </pre>
      </div>
    )
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
              {renderInstructions(recipe.instructions)}
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
            <a
              href={recipe.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Tengok kat TikTok
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
