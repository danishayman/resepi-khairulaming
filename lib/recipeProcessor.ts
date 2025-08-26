/**
 * Recipe Processor for Affiliate Links
 * 
 * This module processes recipe JSON data to automatically convert ingredient names
 * into clickable affiliate links while preserving the original structure.
 */

import { AffiliateLinksManager } from './affiliateLinks'
import { IngredientsData, IngredientItem, Recipe } from './types'

export interface ProcessedIngredientItem {
  name?: string
  quantity?: string
  originalName?: string
  hasAffiliateLink?: boolean
  [key: string]: unknown
}

export interface ProcessingOptions {
  preserveOriginalName?: boolean
  addLinkIndicator?: boolean
  customLinkAttributes?: Record<string, string>
}

export interface ProcessingResult {
  processed: IngredientsData
  linksFound: number
  processedItems: string[]
}

/**
 * Main Recipe Processor Class
 */
export class RecipeProcessor {
  private affiliateManager: AffiliateLinksManager

  constructor(affiliateManager?: AffiliateLinksManager) {
    this.affiliateManager = affiliateManager || new AffiliateLinksManager()
  }

  /**
   * Process recipe ingredients data and convert matching items to affiliate links
   */
  processIngredients(
    ingredients: IngredientsData, 
    options: ProcessingOptions = {}
  ): ProcessingResult {
    const defaultOptions: ProcessingOptions = {
      preserveOriginalName: true,
      addLinkIndicator: false,
      customLinkAttributes: {
        target: '_blank',
        rel: 'noopener noreferrer'
      }
    }

    const finalOptions = { ...defaultOptions, ...options }
    const linksFound = 0
    const processedItems: string[] = []

    const processedIngredients = this.processIngredientsRecursive(
      ingredients, 
      finalOptions, 
      linksFound, 
      processedItems
    )

    return {
      processed: processedIngredients.data,
      linksFound: processedIngredients.linksFound,
      processedItems: processedIngredients.processedItems
    }
  }

  /**
   * Recursively process ingredients data structure
   */
  private processIngredientsRecursive(
    data: IngredientsData,
    options: ProcessingOptions,
    linksFound: number,
    processedItems: string[]
  ): { data: IngredientsData; linksFound: number; processedItems: string[] } {
    // Handle array of ingredients
    if (Array.isArray(data)) {
      const processedArray = data.map(item => 
        this.processIngredientItem(item, options)
      )
      
      return {
        data: processedArray.map(result => result.item),
        linksFound: processedArray.reduce((sum, result) => sum + result.linksAdded, linksFound),
        processedItems: processedArray.reduce((acc, result) => [...acc, ...result.newProcessedItems], processedItems)
      }
    }

    // Handle object with nested arrays or other structures
    if (typeof data === 'object' && data !== null) {
      const processedObject: Record<string, unknown> = {}
      let totalLinksFound = linksFound
      let allProcessedItems = [...processedItems]

      for (const [key, value] of Object.entries(data)) {
        if (Array.isArray(value)) {
          // Process array values
          const arrayResult = this.processIngredientsRecursive(
            value, 
            options, 
            totalLinksFound, 
            allProcessedItems
          )
          processedObject[key] = arrayResult.data
          totalLinksFound = arrayResult.linksFound
          allProcessedItems = arrayResult.processedItems
        } else if (typeof value === 'object' && value !== null) {
          // Recursively process nested objects
          const nestedResult = this.processIngredientsRecursive(
            value as IngredientsData, 
            options, 
            totalLinksFound, 
            allProcessedItems
          )
          processedObject[key] = nestedResult.data
          totalLinksFound = nestedResult.linksFound
          allProcessedItems = nestedResult.processedItems
        } else {
          // Keep primitive values as-is
          processedObject[key] = value
        }
      }

      return {
        data: processedObject,
        linksFound: totalLinksFound,
        processedItems: allProcessedItems
      }
    }

    // Return data as-is if it's not an array or object
    return { data, linksFound, processedItems }
  }

  /**
   * Process a single ingredient item
   */
  private processIngredientItem(
    item: IngredientItem,
    options: ProcessingOptions
  ): { item: IngredientItem; linksAdded: number; newProcessedItems: string[] } {
    let linksAdded = 0
    const newProcessedItems: string[] = []

    // Handle string ingredients
    if (typeof item === 'string') {
      const processedString = this.processIngredientString(item, options)
      if (processedString.hasLink) {
        linksAdded = 1
        newProcessedItems.push(item)
      }
      return {
        item: processedString.processed,
        linksAdded,
        newProcessedItems
      }
    }

    // Handle object ingredients
    if (typeof item === 'object' && item !== null) {
      const processedItem: ProcessedIngredientItem = { ...item }
      
      // Process the 'name' field if it exists
      if (item.name && typeof item.name === 'string') {
        const processedName = this.processIngredientString(item.name, options)
        processedItem.name = processedName.processed
        
        if (processedName.hasLink) {
          processedItem.originalName = options.preserveOriginalName ? item.name : undefined
          processedItem.hasAffiliateLink = true
          linksAdded = 1
          newProcessedItems.push(item.name)
        }
      }

      // Process any other string fields that might contain ingredient names
      for (const [key, value] of Object.entries(item)) {
        if (key !== 'name' && typeof value === 'string' && this.mightBeIngredientName(value)) {
          const processedValue = this.processIngredientString(value, options)
          if (processedValue.hasLink) {
            processedItem[key] = processedValue.processed
            linksAdded++
            newProcessedItems.push(value)
          }
        }
      }

      return {
        item: processedItem,
        linksAdded,
        newProcessedItems
      }
    }

    return { item, linksAdded: 0, newProcessedItems: [] }
  }

  /**
   * Process a single ingredient string and convert to link if match found
   */
  private processIngredientString(
    ingredientName: string,
    options: ProcessingOptions
  ): { processed: string; hasLink: boolean } {
    const product = this.affiliateManager.findProductByKeyword(ingredientName)
    
    if (!product) {
      return { processed: ingredientName, hasLink: false }
    }

    // Build link attributes
    const attributes: string[] = []
    if (options.customLinkAttributes) {
      for (const [attr, value] of Object.entries(options.customLinkAttributes)) {
        attributes.push(`${attr}="${value}"`)
      }
    }

    const attributeString = attributes.length > 0 ? ` ${attributes.join(' ')}` : ''
    const displayName = ingredientName  // Always use original ingredient name
    const linkIndicator = options.addLinkIndicator ? ' 🔗' : ''
    
    const processedLink = `<a href="${product.url}"${attributeString}>${displayName}${linkIndicator}</a>`
    
    return { processed: processedLink, hasLink: true }
  }

  /**
   * Helper method to determine if a string might be an ingredient name
   * This helps avoid processing non-ingredient fields
   */
  private mightBeIngredientName(value: string): boolean {
    // Skip very short strings, numbers, or strings that look like quantities
    if (value.length < 3) return false
    if (/^\d+(\.\d+)?$/.test(value.trim())) return false
    if (/^\d+\s*(g|kg|ml|l|cup|cups|tbsp|tsp|pieces?)$/i.test(value.trim())) return false
    
    return true
  }

  /**
   * Process entire recipe object, focusing on ingredients
   */
  processRecipe(recipe: Recipe, options: ProcessingOptions = {}): Recipe & { _affiliateProcessing?: { linksFound: number; processedItems: string[]; processedAt: string } } {
    const processedRecipe: Recipe & { _affiliateProcessing?: { linksFound: number; processedItems: string[]; processedAt: string } } = { ...recipe }
    
    if (recipe.ingredients) {
      const result = this.processIngredients(recipe.ingredients, options)
      processedRecipe.ingredients = result.processed
      
      // Add metadata about processing
      processedRecipe._affiliateProcessing = {
        linksFound: result.linksFound,
        processedItems: result.processedItems,
        processedAt: new Date().toISOString()
      }
    }
    
    return processedRecipe
  }

  /**
   * Batch process multiple recipes
   */
  processRecipes(recipes: Recipe[], options: ProcessingOptions = {}): (Recipe & { _affiliateProcessing?: { linksFound: number; processedItems: string[]; processedAt: string } })[] {
    return recipes.map(recipe => this.processRecipe(recipe, options))
  }

  /**
   * Get statistics about affiliate link processing
   */
  getProcessingStats(recipes: (Recipe & { _affiliateProcessing?: { linksFound: number; processedItems: string[]; processedAt: string } })[]): {
    totalRecipes: number
    recipesWithLinks: number
    totalLinksFound: number
    mostCommonIngredients: { ingredient: string; count: number }[]
  } {
    let totalLinksFound = 0
    let recipesWithLinks = 0
    const ingredientCounts: Record<string, number> = {}

    recipes.forEach(recipe => {
      if (recipe._affiliateProcessing) {
        if (recipe._affiliateProcessing.linksFound > 0) {
          recipesWithLinks++
        }
        totalLinksFound += recipe._affiliateProcessing.linksFound
        
        recipe._affiliateProcessing.processedItems.forEach((ingredient: string) => {
          ingredientCounts[ingredient] = (ingredientCounts[ingredient] || 0) + 1
        })
      }
    })

    const mostCommonIngredients = Object.entries(ingredientCounts)
      .map(([ingredient, count]) => ({ ingredient, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    return {
      totalRecipes: recipes.length,
      recipesWithLinks,
      totalLinksFound,
      mostCommonIngredients
    }
  }
}

// Export default instance
export const recipeProcessor = new RecipeProcessor()

// Export utility functions
export const processRecipeIngredients = (
  ingredients: IngredientsData, 
  options?: ProcessingOptions
): ProcessingResult => {
  return recipeProcessor.processIngredients(ingredients, options)
}

export const processRecipe = (recipe: Recipe, options?: ProcessingOptions): Recipe & { _affiliateProcessing?: { linksFound: number; processedItems: string[]; processedAt: string } } => {
  return recipeProcessor.processRecipe(recipe, options)
}

export const processRecipes = (recipes: Recipe[], options?: ProcessingOptions): (Recipe & { _affiliateProcessing?: { linksFound: number; processedItems: string[]; processedAt: string } })[] => {
  return recipeProcessor.processRecipes(recipes, options)
}
