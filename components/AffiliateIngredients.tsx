/**
 * Component for rendering ingredients with affiliate links
 */

'use client'

import React from 'react'
import { IngredientsData, IngredientItem } from '@/lib/types'
import { useAffiliateProcessor } from '@/lib/hooks/useAffiliateProcessor'

interface AffiliateIngredientsProps {
  ingredients: IngredientsData
  className?: string
  showStats?: boolean
}

interface IngredientItemProps {
  item: IngredientItem
  index: number
}

/**
 * Component to render a single ingredient item
 */
const IngredientItemComponent: React.FC<IngredientItemProps> = ({ item, index }) => {
  if (typeof item === 'string') {
    return (
      <li key={index} className="flex items-start gap-2 py-1">
        <span className="text-gray-400 mt-1">•</span>
        <span dangerouslySetInnerHTML={{ __html: item }} />
      </li>
    )
  }

  if (typeof item === 'object' && item !== null) {
    const name = item.name || 'Unknown ingredient'
    const quantity = item.quantity || ''
    
    return (
      <li key={index} className="flex items-start gap-2 py-1">
        <span className="text-gray-400 mt-1">•</span>
        <div className="flex-1">
          <span dangerouslySetInnerHTML={{ __html: name }} />
          {quantity && (
            <span className="text-gray-600 ml-2">({quantity})</span>
          )}
        </div>
      </li>
    )
  }

  return null
}

/**
 * Component to render a list of ingredients
 */
const IngredientsList: React.FC<{ items: IngredientItem[]; title?: string }> = ({ 
  items, 
  title 
}) => {
  if (!items || items.length === 0) return null

  return (
    <div className="mb-4">
      {title && (
        <h4 className="font-semibold text-gray-900 mb-2 capitalize">
          {title.replace(/_/g, ' ')}
        </h4>
      )}
      <ul className="space-y-1">
        {items.map((item, index) => (
          <IngredientItemComponent key={index} item={item} index={index} />
        ))}
      </ul>
    </div>
  )
}

/**
 * Main component for rendering affiliate ingredients
 */
export const AffiliateIngredients: React.FC<AffiliateIngredientsProps> = ({
  ingredients,
  className = '',
  showStats = false
}) => {
  const result = useAffiliateProcessor(ingredients)

  if (!result || !result.processed) {
    return <div className="text-gray-500">No ingredients available</div>
  }

  const processedIngredients = result.processed

  // Handle array format
  if (Array.isArray(processedIngredients)) {
    return (
      <div className={`ingredients-container ${className}`}>
        <IngredientsList items={processedIngredients} />
        {showStats && result.linksFound > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              🔗 {result.linksFound} affiliate link{result.linksFound !== 1 ? 's' : ''} found
            </p>
          </div>
        )}
      </div>
    )
  }

  // Handle object format with categories
  if (typeof processedIngredients === 'object' && processedIngredients !== null) {
    const categories = Object.entries(processedIngredients).filter(
      ([_, value]) => Array.isArray(value)
    )

    return (
      <div className={`ingredients-container ${className}`}>
        {categories.map(([categoryName, items]) => (
          <IngredientsList 
            key={categoryName}
            items={items as IngredientItem[]}
            title={categoryName}
          />
        ))}
      </div>
    )
  }

  return <div className="text-gray-500">Unable to process ingredients</div>
}

export default AffiliateIngredients
