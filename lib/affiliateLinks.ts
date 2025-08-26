/**
 * Affiliate Links Configuration
 * 
 * This file contains mappings of ingredient keywords to their respective affiliate URLs.
 * Each product can have multiple keywords to match different variations and languages.
 */

export interface AffiliateProduct {
  keywords: string[]
  url: string
  displayName?: string
}

export interface AffiliateConfig {
  products: AffiliateProduct[]
}

// Default affiliate links configuration
export const defaultAffiliateLinks: AffiliateConfig = {
  products: [
    // Flour & Baking Ingredients
    {
      keywords: ["tepung", "flour", "self-raising flour", "tepung naik sendiri", "all purpose flour", "tepung serbaguna"],
      url: "https://shopee.com.my/product/123456789/flour",
      displayName: "Tepung / Flour"
    },
    {
      keywords: ["tepung gandum", "wheat flour", "plain flour"],
      url: "https://shopee.com.my/product/123456789/wheat-flour",
      displayName: "Tepung Gandum"
    },
    {
      keywords: ["tepung jagung", "corn flour", "cornstarch", "tepung ubi kayu"],
      url: "https://shopee.com.my/product/123456789/corn-flour",
      displayName: "Tepung Jagung"
    },
    {
      keywords: ["baking powder", "serbuk penaik"],
      url: "https://shopee.com.my/product/123456789/baking-powder",
      displayName: "Baking Powder"
    },
    
    // Dairy & Fats
    {
      keywords: ["margarin", "margarine", "butter", "mentega"],
      url: "https://shopee.com.my/product/123456789/margarine",
      displayName: "Margarin / Butter"
    },
    {
      keywords: ["fresh milk", "susu segar", "milk", "susu"],
      url: "https://shopee.com.my/product/123456789/fresh-milk",
      displayName: "Susu Segar"
    },
    {
      keywords: ["santan", "coconut milk", "santan pekat", "santan cair"],
      url: "https://shopee.com.my/product/123456789/coconut-milk",
      displayName: "Santan"
    },
    
    // Oils & Cooking Fats
    {
      keywords: ["minyak", "cooking oil", "minyak masak", "oil"],
      url: "https://shopee.com.my/product/123456789/cooking-oil",
      displayName: "Minyak Masak"
    },
    
    // Proteins
    {
      keywords: ["ayam", "chicken", "daging ayam"],
      url: "https://shopee.com.my/product/123456789/chicken",
      displayName: "Ayam"
    },
    {
      keywords: ["daging", "beef", "daging lembu"],
      url: "https://shopee.com.my/product/123456789/beef",
      displayName: "Daging Lembu"
    },
    {
      keywords: ["ikan", "fish"],
      url: "https://shopee.com.my/product/123456789/fish",
      displayName: "Ikan"
    },
    {
      keywords: ["telur", "egg", "eggs", "telur ayam"],
      url: "https://shopee.com.my/product/123456789/eggs",
      displayName: "Telur"
    },
    
    // Vegetables & Aromatics
    {
      keywords: ["bawang besar", "onion", "bawang merah", "yellow onion"],
      url: "https://shopee.com.my/product/123456789/onion",
      displayName: "Bawang Besar"
    },
    {
      keywords: ["bawang putih", "garlic", "garlic cloves"],
      url: "https://shopee.com.my/product/123456789/garlic",
      displayName: "Bawang Putih"
    },
    {
      keywords: ["tomato", "tomato tin", "canned tomato", "tomato puree"],
      url: "https://shopee.com.my/product/123456789/tomato",
      displayName: "Tomato"
    },
    {
      keywords: ["timun", "cucumber"],
      url: "https://shopee.com.my/product/123456789/cucumber",
      displayName: "Timun"
    },
    
    // Rice & Grains
    {
      keywords: ["beras", "rice", "nasi"],
      url: "https://shopee.com.my/product/123456789/rice",
      displayName: "Beras"
    },
    {
      keywords: ["rolled oats", "oats", "oat"],
      url: "https://shopee.com.my/product/123456789/oats",
      displayName: "Rolled Oats"
    },
    
    // Seasonings & Sauces
    {
      keywords: ["sos tiram", "oyster sauce"],
      url: "https://shopee.com.my/product/123456789/oyster-sauce",
      displayName: "Sos Tiram"
    },
    {
      keywords: ["kicap manis", "sweet soy sauce", "dark soy sauce"],
      url: "https://shopee.com.my/product/123456789/sweet-soy-sauce",
      displayName: "Kicap Manis"
    },
    {
      keywords: ["garam", "salt"],
      url: "https://shopee.com.my/product/123456789/salt",
      displayName: "Garam"
    },
    {
      keywords: ["gula", "sugar", "white sugar"],
      url: "https://shopee.com.my/product/123456789/sugar",
      displayName: "Gula"
    },
    
    // Herbs & Spices
    {
      keywords: ["serai", "lemongrass", "lemon grass"],
      url: "https://shopee.com.my/product/123456789/lemongrass",
      displayName: "Serai"
    },
    {
      keywords: ["daun limau purut", "kaffir lime leaves", "lime leaves"],
      url: "https://shopee.com.my/product/123456789/kaffir-lime-leaves",
      displayName: "Daun Limau Purut"
    },
    {
      keywords: ["daun kunyit", "turmeric leaves"],
      url: "https://shopee.com.my/product/123456789/turmeric-leaves",
      displayName: "Daun Kunyit"
    },
    {
      keywords: ["daun pandan", "pandan leaves"],
      url: "https://shopee.com.my/product/123456789/pandan-leaves",
      displayName: "Daun Pandan"
    },
    {
      keywords: ["vanilla essence", "vanilla extract"],
      url: "https://shopee.com.my/product/123456789/vanilla-essence",
      displayName: "Vanilla Essence"
    },
    
    // Nuts & Seeds
    {
      keywords: ["chia seeds", "biji chia"],
      url: "https://shopee.com.my/product/123456789/chia-seeds",
      displayName: "Chia Seeds"
    },
    {
      keywords: ["kacang tanah", "peanuts", "groundnuts"],
      url: "https://shopee.com.my/product/123456789/peanuts",
      displayName: "Kacang Tanah"
    },
    {
      keywords: ["peanut butter"],
      url: "https://shopee.com.my/product/123456789/peanut-butter",
      displayName: "Peanut Butter"
    },
    
    // Seafood
    {
      keywords: ["ikan bilis", "anchovies", "dried anchovies"],
      url: "https://shopee.com.my/product/123456789/anchovies",
      displayName: "Ikan Bilis"
    },
    
    // Fruits
    {
      keywords: ["pisang", "banana"],
      url: "https://shopee.com.my/product/123456789/banana",
      displayName: "Pisang"
    },
    {
      keywords: ["blueberry", "blueberries"],
      url: "https://shopee.com.my/product/123456789/blueberry",
      displayName: "Blueberry"
    },
    {
      keywords: ["raspberry", "raspberries"],
      url: "https://shopee.com.my/product/123456789/raspberry",
      displayName: "Raspberry"
    },
    {
      keywords: ["buah naga", "dragon fruit"],
      url: "https://shopee.com.my/product/123456789/dragon-fruit",
      displayName: "Buah Naga"
    },
    {
      keywords: ["kurma", "dates"],
      url: "https://shopee.com.my/product/123456789/dates",
      displayName: "Kurma"
    },
    
    // Sweeteners
    {
      keywords: ["honey", "madu"],
      url: "https://shopee.com.my/product/123456789/honey",
      displayName: "Honey"
    },
    {
      keywords: ["maple syrup", "sirap maple"],
      url: "https://shopee.com.my/product/123456789/maple-syrup",
      displayName: "Maple Syrup"
    },
    {
      keywords: ["sirap gula melaka", "gula melaka syrup", "palm sugar syrup"],
      url: "https://shopee.com.my/product/123456789/gula-melaka-syrup",
      displayName: "Sirap Gula Melaka"
    }
  ]
}

/**
 * Class to manage affiliate links configuration
 */
export class AffiliateLinksManager {
  private config: AffiliateConfig

  constructor(initialConfig: AffiliateConfig = defaultAffiliateLinks) {
    this.config = { ...initialConfig }
  }

  /**
   * Get all products
   */
  getProducts(): AffiliateProduct[] {
    return this.config.products
  }

  /**
   * Add a new affiliate product
   */
  addProduct(product: AffiliateProduct): void {
    this.config.products.push(product)
  }

  /**
   * Remove a product by URL
   */
  removeProduct(url: string): boolean {
    const initialLength = this.config.products.length
    this.config.products = this.config.products.filter(product => product.url !== url)
    return this.config.products.length < initialLength
  }

  /**
   * Update a product
   */
  updateProduct(url: string, updates: Partial<AffiliateProduct>): boolean {
    const productIndex = this.config.products.findIndex(product => product.url === url)
    if (productIndex === -1) return false

    this.config.products[productIndex] = {
      ...this.config.products[productIndex],
      ...updates
    }
    return true
  }

  /**
   * Find product by keyword (case-insensitive, partial match)
   */
  findProductByKeyword(keyword: string): AffiliateProduct | null {
    const normalizedKeyword = keyword.toLowerCase().trim()
    
    return this.config.products.find(product => 
      product.keywords.some(productKeyword => 
        normalizedKeyword.includes(productKeyword.toLowerCase()) ||
        productKeyword.toLowerCase().includes(normalizedKeyword)
      )
    ) || null
  }

  /**
   * Get current configuration
   */
  getConfig(): AffiliateConfig {
    return { ...this.config }
  }

  /**
   * Replace entire configuration
   */
  setConfig(newConfig: AffiliateConfig): void {
    this.config = { ...newConfig }
  }
}

// Export a default instance
export const affiliateManager = new AffiliateLinksManager()
