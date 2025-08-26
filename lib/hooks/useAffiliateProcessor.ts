/**
 * React Hook for Affiliate Link Processing
 * 
 * This hook provides an easy way to integrate affiliate link processing
 * into React components.
 */

import { useMemo } from 'react'
import { RecipeProcessor, ProcessingOptions, ProcessingResult } from '../recipeProcessor'
import { Recipe, IngredientsData } from '../types'

/**
 * Hook to process recipe ingredients with affiliate links
 */
export function useAffiliateProcessor(
  ingredients: IngredientsData | null | undefined,
  options: ProcessingOptions = {}
) {
  const processor = useMemo(() => new RecipeProcessor(), [])
  
  const result = useMemo((): ProcessingResult | null => {
    if (!ingredients) return null
    
    return processor.processIngredients(ingredients, {
      preserveOriginalName: true,
      addLinkIndicator: false,
      customLinkAttributes: {
        target: '_blank',
        rel: 'noopener noreferrer',
        className: 'affiliate-link text-blue-600 hover:text-blue-800 underline'
      },
      ...options
    })
  }, [ingredients, options, processor])
  
  return result
}

/**
 * Hook to process a complete recipe with affiliate links
 */
export function useProcessedRecipe(
  recipe: Recipe | null | undefined,
  options: ProcessingOptions = {}
) {
  const processor = useMemo(() => new RecipeProcessor(), [])
  
  const processedRecipe = useMemo(() => {
    if (!recipe) return null
    
    return processor.processRecipe(recipe, {
      preserveOriginalName: true,
      addLinkIndicator: false,
      customLinkAttributes: {
        target: '_blank',
        rel: 'noopener noreferrer',
        className: 'affiliate-link text-blue-600 hover:text-blue-800 underline'
      },
      ...options
    })
  }, [recipe, options, processor])
  
  return processedRecipe
}

/**
 * Hook to process multiple recipes with affiliate links
 */
export function useProcessedRecipes(
  recipes: Recipe[] | null | undefined,
  options: ProcessingOptions = {}
) {
  const processor = useMemo(() => new RecipeProcessor(), [])
  
  const processedRecipes = useMemo(() => {
    if (!recipes) return null
    
    return processor.processRecipes(recipes, {
      preserveOriginalName: true,
      addLinkIndicator: false,
      customLinkAttributes: {
        target: '_blank',
        rel: 'noopener noreferrer',
        className: 'affiliate-link text-blue-600 hover:text-blue-800 underline'
      },
      ...options
    })
  }, [recipes, options, processor])
  
  return processedRecipes
}

/**
 * Hook to get affiliate processing statistics
 */
export function useAffiliateStats(processedRecipes: Recipe[] | null | undefined) {
  const processor = useMemo(() => new RecipeProcessor(), [])
  
  const stats = useMemo(() => {
    if (!processedRecipes) return null
    
    return processor.getProcessingStats(processedRecipes)
  }, [processedRecipes, processor])
  
  return stats
}
