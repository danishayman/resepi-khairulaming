/**
 * Test file to demonstrate the affiliate link system
 * This file shows how to use the RecipeProcessor with sample data
 */

import { processRecipes, recipeProcessor } from './recipeProcessor'
import { affiliateManager } from './affiliateLinks'
import { Recipe } from './types'

// Sample recipe data based on your existing structure
const sampleRecipes: Partial<Recipe>[] = [
  {
    "title": "Ayam Masak Merah",
    "description": "Resepi ayam masak merah yang sedap dan mudah. Sesuai untuk hidangan keluarga.",
    "ingredients": {
      "main_ingredients": [
        {"name": "Ayam", "quantity": "1 ekor dipotong 8 bahagian"},
        {"name": "Bawang Besar", "quantity": "2 biji dipotong"},
        {"name": "Bawang Putih", "quantity": "4 ulas dicantas"},
        {"name": "Tomato Tin", "quantity": "1 tin"}
      ],
      "seasonings": [
        {"name": "Sos Tiram", "quantity": "2 sudu besar"},
        {"name": "Kicap Manis", "quantity": "1 sudu besar"},
        {"name": "Garam", "quantity": "secukup rasa"},
        {"name": "Gula", "quantity": "secukup rasa"},
        {"name": "Minyak", "quantity": "untuk menumis"}
      ]
    }
  },
  {
    "title": "Overnight Oats",
    "description": "Sarapan sihat dan mudah yang boleh disediakan malam sebelumnya.",
    "ingredients": {
      "base": [
        {"name": "Rolled Oats", "quantity": "½ cawan"},
        {"name": "Chia Seeds", "quantity": "1 sudu besar"},
        {"name": "Fresh Milk", "quantity": "½ cawan"}
      ],
      "toppings": [
        {"name": "Blueberry", "quantity": "secukupnya"},
        {"name": "Raspberry", "quantity": "secukupnya"},
        {"name": "Honey", "quantity": "1 sudu teh"},
        {"name": "Pisang", "quantity": "1 biji dihiris"},
        {"name": "Peanut Butter", "quantity": "1 sudu besar"}
      ]
    }
  }
]

/**
 * Test the affiliate link system
 */
export function testAffiliateSystem() {
  console.log('🧪 Testing Affiliate Link System\n')
  
  // Test 1: Process individual ingredients
  console.log('📋 Test 1: Processing individual ingredients')
  const testIngredients = {
    "main_ingredients": [
      {"name": "Tepung naik sendiri / Self-raising flour", "quantity": "250g"},
      {"name": "Margarin", "quantity": "250g"},
      {"name": "Fresh Milk", "quantity": "1 cup"}
    ]
  }
  
  const result1 = recipeProcessor.processIngredients(testIngredients)
  console.log('Original:', JSON.stringify(testIngredients, null, 2))
  console.log('Processed:', JSON.stringify(result1.processed, null, 2))
  console.log(`Links found: ${result1.linksFound}`)
  console.log(`Processed items: ${result1.processedItems.join(', ')}\n`)
  
  // Test 2: Process complete recipes
  console.log('🍳 Test 2: Processing complete recipes')
  const processedRecipes = processRecipes(sampleRecipes as Recipe[])
  
  processedRecipes.forEach((recipe, index) => {
    console.log(`\n--- Recipe ${index + 1}: ${recipe.title} ---`)
    console.log('Processed ingredients:', JSON.stringify(recipe.ingredients, null, 2))
    if (recipe._affiliateProcessing) {
      console.log(`Links found: ${recipe._affiliateProcessing.linksFound}`)
      console.log(`Processed items: ${recipe._affiliateProcessing.processedItems.join(', ')}`)
    }
  })
  
  // Test 3: Get processing statistics
  console.log('\n📊 Test 3: Processing Statistics')
  const stats = recipeProcessor.getProcessingStats(processedRecipes)
  console.log('Statistics:', JSON.stringify(stats, null, 2))
  
  // Test 4: Test keyword matching
  console.log('\n🔍 Test 4: Keyword Matching Tests')
  const testKeywords = [
    'Tepung naik sendiri',
    'flour',
    'Margarin',
    'ayam',
    'fresh milk',
    'unknown ingredient'
  ]
  
  testKeywords.forEach(keyword => {
    const product = affiliateManager.findProductByKeyword(keyword)
    console.log(`"${keyword}" -> ${product ? `${product.displayName} (${product.url})` : 'No match found'}`)
  })
  
  // Test 5: Runtime addition of new affiliate links
  console.log('\n➕ Test 5: Adding new affiliate link at runtime')
  affiliateManager.addProduct({
    keywords: ['coconut oil', 'minyak kelapa'],
    url: 'https://s.shopee.com.my/8pbt0OnQYg',
    displayName: 'Minyak Kelapa'
  })
  
  const coconutOilTest = affiliateManager.findProductByKeyword('coconut oil')
  console.log(`Added coconut oil: ${coconutOilTest ? 'Success' : 'Failed'}`)
  
  console.log('\n✅ All tests completed!')
}

/**
 * Test with custom processing options
 */
export function testCustomOptions() {
  console.log('\n🎛️ Testing Custom Processing Options\n')
  
  const testIngredients = {
    "ingredients": [
      {"name": "Tepung Gandum", "quantity": "2 cups"},
      {"name": "Butter", "quantity": "100g"}
    ]
  }
  
  // Test with link indicators
  console.log('Test with link indicators:')
  const withIndicators = recipeProcessor.processIngredients(testIngredients, {
    addLinkIndicator: true
  })
  console.log(JSON.stringify(withIndicators.processed, null, 2))
  
  // Test with custom attributes
  console.log('\nTest with custom link attributes:')
  const withCustomAttrs = recipeProcessor.processIngredients(testIngredients, {
    customLinkAttributes: {
      target: '_blank',
      rel: 'noopener noreferrer',
      class: 'affiliate-link',
      'data-affiliate': 'true'
    }
  })
  console.log(JSON.stringify(withCustomAttrs.processed, null, 2))
}

// Export functions for use in other files
export { sampleRecipes }

// Run tests if this file is executed directly
if (typeof window === 'undefined' && require.main === module) {
  testAffiliateSystem()
  testCustomOptions()
}
