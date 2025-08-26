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
      keywords: ["self-raising flour", "tepung naik sendiri", "all purpose flour", "tepung serbaguna" , "baking powder"],
      url: "https://s.shopee.com.my/2LOPE1Xhz6",
      displayName: "Tepung / Flour"
    },
    {
      keywords: ["tepung gandum", "wheat flour", "plain flour"],
      url: "https://s.shopee.com.my/5pyHONqeUP",
      displayName: "Tepung Gandum"
    },
    {
      keywords: ["tepung jagung", "corn flour", "cornstarch", "tepung ubi kayu"],
      url: "https://s.shopee.com.my/AUk6wwLkPA",
      displayName: "Tepung Jagung"
    },
    {
      keywords: ["baking powder", "serbuk penaik"],
      url: "https://s.shopee.com.my/AA7GYNZD57",
      displayName: "Baking Powder"
    },
    
    // Dairy & Fats
    {
      keywords: ["margarin", "margarine", "butter", "mentega"],
      url: "",
      displayName: "Margarin / Butter"
    },
    {
      keywords: ["susu pekat" , "susu tin", "susu"],
      url: "https://s.shopee.com.my/qZbRNvhDu",
      displayName: "Susu Segar"
    },

    {
      keywords: ["santan", "coconut milk", "santan pekat", "santan cair"],
      url: "https://s.shopee.com.my/10t1dpaRi6",
      displayName: "Santan"
    },
    
    // Oils & Cooking Fats
    {
      keywords: ["minyak", "cooking oil", "minyak masak", "oil"],
      url: "https://s.shopee.com.my/9pUQA5p9ez",
      displayName: "Minyak Masak"
    },
    
    // Proteins
    {
      keywords: ["ayam", "chicken", "daging ayam"],
      url: "https://s.shopee.com.my/1BCRqBd8Xi",
      displayName: "Ayam"
    },
    {
      keywords: ["telur", "egg", "eggs", "telur ayam"],
      url: "https://s.shopee.com.my/8Uz2ZjQRjN",
      displayName: "Telur"
    },
    
    // Vegetables & Aromatics
    {
      keywords: ["bawang besar", "onion", "bawang merah", "yellow onion"],
      url: "https://s.shopee.com.my/1qS8dUu1nM",
      displayName: "Bawang Besar"
    },
    {
      keywords: ["bawang putih", "garlic", "garlic cloves"],
      url: "https://s.shopee.com.my/7fPvaEg4wM",
      displayName: "Bawang Putih"
    },
    {
      keywords: ["tomato", "tomato tin", "canned tomato", "tomato puree"],
      url: "https://s.shopee.com.my/4q5kD2YnFl",
      displayName: "Tomato"
    },
    {
      keywords: ["timun", "cucumber"],
      url: "https://s.shopee.com.my/Vwl36POFw",
      displayName: "Timun"
    },
    
    // Rice & Grains
    {
      keywords: ["beras", "rice", "nasi"],
      url: "https://s.shopee.com.my/gGBFRF9Fi",
      displayName: "Beras"
    },
    {
      keywords: ["rolled oats", "oats", "oat"],
      url: "https://s.shopee.com.my/802lyvm8hs",
      displayName: "Rolled Oats"
    },
    
    // Seasonings & Sauces
    {
      keywords: ["sos tiram", "oyster sauce"],
      url: "https://s.shopee.com.my/7ATezPbMgs",
      displayName: "Sos Tiram"
    },
    {
      keywords: ["kicap manis", "sweet soy sauce", "dark soy sauce"],
      url: "https://s.shopee.com.my/AUk6xYSOcL",
      displayName: "Kicap Manis"
    },
    {
      keywords: ["garam", "salt"],
      url: "https://s.shopee.com.my/9AEjN7LAuX",
      displayName: "Garam"
    },
    {
      keywords: ["gula", "sugar", "white sugar"],
      url: "https://s.shopee.com.my/5ferCo8ie3r",
      displayName: "Gula"
    },
    
    {
      keywords: ["gula merah", "brown sugar", "gula perang"],
      url: "https://s.shopee.com.my/9UrZlpBuj7",
      displayName: "Gula Merah"
    },
    
    
    // Herbs & Spices
    {
      keywords: ["serai", "lemongrass", "lemon grass"],
      url: "https://s.shopee.com.my/1VpIFANlU3",
      displayName: "Serai"
    },
    {
      keywords: ["daun limau purut", "kaffir lime leaves", "lime leaves"],
      url: "https://s.shopee.com.my/5VLR0Y33RZ",
      displayName: "Daun Limau Purut"
    },
    {
      keywords: ["daun kunyit", "turmeric leaves"],
      url: "https://s.shopee.com.my/3LGwQaTBY5",
      displayName: "Daun Kunyit"
    },
    {
      keywords: ["daun pandan", "pandan leaves"],
      url: "https://s.shopee.com.my/2qKfph3Owh",
      displayName: "Daun Pandan"
    },
    {
      keywords: ["vanilla essence", "vanilla extract"],
      url: "https://s.shopee.com.my/5L20oXxFfU",
      displayName: "Vanilla Essence"
    },
    
    // Nuts & Seeds
    {
      keywords: ["chia seeds", "biji chia"],
      url: "https://s.shopee.com.my/LdKrNnyoq",
      displayName: "Chia Seeds"
    },
    {
      keywords: ["kacang tanah", "peanuts", "groundnuts"],
      url: "https://s.shopee.com.my/70AEneB4A4",
      displayName: "Kacang Tanah"
    },
    {
      keywords: ["peanut butter"],
      url: "https://s.shopee.com.my/2VhpROWseO",
      displayName: "Peanut Butter"
    },
    
    // Seafood
    {
      keywords: ["ikan bilis", "anchovies", "dried anchovies"],
      url: "https://s.shopee.com.my/9KY9Zy2PGj",
      displayName: "Ikan Bilis"
    },
    
    // Fruits
    {
      keywords: ["pisang", "banana"],
      url: "https://s.shopee.com.my/2LOPF7EQ9H",
      displayName: "Pisang"
    },
    {
      keywords: ["blueberry", "blueberries"],
      url: "https://s.shopee.com.my/5AiacL47lI",
      displayName: "Blueberry"
    },
    {
      keywords: ["buah naga", "dragon fruit"],
      url: "https://s.shopee.com.my/9AEjNoLP7K",
      displayName: "Buah Naga"
    },
    {
      keywords: ["kurma", "dates"],
      url: "https://s.shopee.com.my/20lYqf2qoQ",
      displayName: "Kurma"
    },
    
    // Sweeteners
    {
      keywords: ["honey", "madu"],
      url: "https://s.shopee.com.my/7Kn5CU0QhL",
      displayName: "Honey"
    },
    {
      keywords: ["maple syrup", "sirap maple"],
      url: "https://s.shopee.com.my/2VhpRcHfZn",
      displayName: "Maple Syrup"
    },
    {
      keywords: ["sirap gula melaka", "gula melaka syrup", "palm sugar syrup"],
      url: "https://s.shopee.com.my/9pUQB6pUAt",
      displayName: "Sirap Gula Melaka"
    },
    // Noodles & Pasta
    {
      keywords: ["mee", "noodles", "kuey teow", "bihun", "spaghetti", "pasta"],
      url: "https://s.shopee.com.my/7V6VP45Ina",
      displayName: "Mee / Noodles"
    },
    {
      keywords: ["maggi", "instant noodles", "mee segera"],
      url: "https://s.shopee.com.my/50PAQU5Tjt",
      displayName: "Maggi / Instant Noodles"
    },

    // Condiments & Seasonings
    {
      keywords: ["sos cili", "chili sauce", "tomato sauce"],
      url: "https://s.shopee.com.my/2g1FeDaqkb",
      displayName: "Sos Cili"
    },
    {
      keywords: ["mayonnaise", "mayo", "mayonis"],
      url: "https://s.shopee.com.my/gGBGYe4YK",
      displayName: "Mayonnaise"
    },
    {
      keywords: ["mustard", "sos mustard"],
      url: "https://s.shopee.com.my/3VaMdmW2pB",
      displayName: "Mustard"
    },
    {
      keywords: ["white pepper", "black pepper", "lada putih", "lada hitam"],
      url: "https://s.shopee.com.my/7fPvbSgS4S",
      displayName: "Lada / Pepper"
    },
    {
      keywords: ["sesame oil", "minyak bijan"],
      url: "https://s.shopee.com.my/LdKs6VjXi",
      displayName: "Minyak Bijan"
    },

    // Spices & Powders
    {
      keywords: ["kunyit", "turmeric powder", "serbuk kunyit"],
      url: "https://s.shopee.com.my/7pjLnu80DE",
      displayName: "Kunyit"
    },
    {
      keywords: ["ketumbar", "coriander powder", "serbuk ketumbar"],
      url: "https://s.shopee.com.my/qZbT3bgTj",
      displayName: "Serbuk Ketumbar"
    },
    {
      keywords: ["chili powder", "cili boh", "serbuk cili"],
      url: "",
      displayName: "Cili Boh / Chili Powder"
    },
    {
      keywords: ["curry powder", "serbuk kari"],
      url: "https://s.shopee.com.my/3AxWFNbY6Z",
      displayName: "Serbuk Kari"
    },

    // Vegetables

    {
      keywords: ["carrot", "lobak merah"],
      url: "https://s.shopee.com.my/6pqocMz7FL",
      displayName: "Carrot"
    },
    {
      keywords: ["potato", "kentang"],
      url: "https://s.shopee.com.my/3LGwRxlVc9",
      displayName: "Kentang"
    },
    {
      keywords: ["bean sprouts", "taugeh"],
      url: "https://s.shopee.com.my/70AEojNwW5",
      displayName: "Taugeh"
    },

    // Proteins
    {
      keywords: ["prawn", "udang", "shrimp"],
      url: "https://s.shopee.com.my/802m0Zoael",
      displayName: "Udang"
    },
    {
      keywords: ["tofu", "tauhu"],
      url: "https://s.shopee.com.my/1VpIGf87yG",
      displayName: "Tauhu"
    },
    {
      keywords: ["tempeh", "tempe"],
      url: "https://s.shopee.com.my/3qDD2xyqBv",
      displayName: "Tempe"
    },

    // Vinegars & Acids
    {
      keywords: ["vinegar", "cuka"],
      url: "https://s.shopee.com.my/1BCRs58S24",
      displayName: "Cuka"
    },
    {
      keywords: ["lime", "limau nipis", "lemon"],
      url: "https://s.shopee.com.my/10UTx8hw7",
      displayName: "Limau Nipis"
    },
    {
      keywords: ["tamarind", "asam jawa"],
      url: "https://s.shopee.com.my/8AMCCyH4sl",
      displayName: "Asam Jawa"
    },

    // Dried Goods
    {
      keywords: ["mushroom", "cendawan", "shiitake"],
      url: "https://s.shopee.com.my/3ftmqiyXyR",
      displayName: "Cendawan"
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
