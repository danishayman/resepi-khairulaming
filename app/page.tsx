'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Recipe } from '@/lib/types'
import { shuffleArray } from '@/lib/utils'
import SearchBar from '@/components/SearchBar'
import RecipeCard from '@/components/RecipeCard'
import Image from 'next/image'

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchRecipes()
  }, [])

  const fetchRecipes = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        // Remove the ordering since we'll shuffle on the client side
        
      if (error) {
        throw error
      }

      // Shuffle the recipes to randomize order on each page load/refresh
      const shuffledRecipes = shuffleArray(data || [])
      
      setRecipes(shuffledRecipes)
      setFilteredRecipes(shuffledRecipes)
    } catch (err) {
      console.error('Error fetching recipes:', err)
      setError('Error fetching resepi. Sila cuba lagi.')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    
    if (!query.trim()) {
      setFilteredRecipes(recipes)
      return
    }

    const searchQuery = query.toLowerCase()
    const filtered = recipes.filter(recipe => 
      recipe.title.toLowerCase().includes(searchQuery) ||
      recipe.description?.toLowerCase().includes(searchQuery) ||
      recipe.tags?.some(tag => tag.toLowerCase().includes(searchQuery)) ||
      recipe.cuisine_type?.toLowerCase().includes(searchQuery)
    )
    
    setFilteredRecipes(filtered)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading resepi...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="text-red-600 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Ralat</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchRecipes}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Cuba Lagi
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Banner Section */}
      <div className="w-full h-48 md:h-56 lg:h-64 relative overflow-hidden">
        <Image
          src="/banner.png"
          alt="Khairul Aming Banner"
          fill
          className="object-cover object-bottom"
          priority
        />
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Koleksi Resepi{' '}
              <a 
                href="https://www.tiktok.com/@khairulaming"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline transition-all duration-200"
              >
                @khairulaming
              </a>
            </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Hey what’s up guys!
          </p>
          
          <SearchBar onSearch={handleSearch} />
        </div>

      {/* Recipe Stats - Only show when user is searching */}
      {searchQuery.trim() && (
        <div className="text-center mb-8">
          <p className="text-gray-600">
            Showing {filteredRecipes.length} daripada {recipes.length} resepi
          </p>
        </div>
      )}

      {/* No Results */}
      {filteredRecipes.length === 0 && recipes.length > 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Tiada resepi dijumpai</h3>
          <p className="text-gray-600">Cuba cari dengan kata kunci yang berbeza</p>
        </div>
      )}

      {/* No Recipes at all */}
      {recipes.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada resepi</h3>
          <p className="text-gray-600">Resepi akan dipaparkan di sini setelah ditambah ke dalam pangkalan data</p>
        </div>
      )}

        {/* Recipe Grid */}
        {filteredRecipes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
