import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'
import { titleToSlug } from '@/lib/utils'

interface RecipeSitemapData {
  title: string
  created_at: string | null
  updated_at: string | null
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.resepika.my'
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ]

  try {
    // Fetch all recipes from Supabase
    const { data: recipes, error } = await supabase
      .from('recipes')
      .select('title, created_at, updated_at')
      .order('created_at', { ascending: false })
      .returns<RecipeSitemapData[]>()

    if (error) {
      console.error('Error fetching recipes for sitemap:', error)
      return staticPages
    }

    // Generate recipe pages
    const recipePages: MetadataRoute.Sitemap = recipes?.map((recipe) => ({
      url: `${baseUrl}/resepi/${titleToSlug(recipe.title)}`,
      lastModified: new Date(recipe.updated_at || recipe.created_at || new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })) || []

    return [...staticPages, ...recipePages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return staticPages
  }
}
