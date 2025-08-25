// Types for recipe ingredients
export type IngredientItem = string | {
  name?: string
  quantity?: string
  [key: string]: unknown
}

export type IngredientsData = 
  | IngredientItem[]
  | Record<string, IngredientItem[]>
  | Record<string, unknown>

// Types for recipe instructions  
export type InstructionItem = string | {
  text?: string
  step?: string
  [key: string]: unknown
}

export type InstructionsData = 
  | InstructionItem[]
  | Record<string, InstructionItem[]>
  | Record<string, unknown>

export interface Recipe {
  id: string
  title: string
  description: string | null
  source_url: string
  video_platform: string | null
  language: string | null
  cuisine_type: string | null
  difficulty_level: string | null
  prep_time_minutes: number | null
  cook_time_minutes: number | null
  total_time_minutes: number | null
  servings: number | null
  ingredients: IngredientsData // JSONB - can be array or object with categories like {main_ingredients: [], spices_and_seasonings: []}
  instructions: InstructionsData // JSONB - can be array or object with categories
  nutrition_info: Record<string, string | number> | null // JSONB object
  tags: string[] | null
  transcript: string | null
  extraction_metadata: Record<string, unknown> | null // JSONB object
  created_at: string | null
  updated_at: string | null
  thumbnail_url: string | null
}

export type Database = {
  public: {
    Tables: {
      recipes: {
        Row: Recipe
        Insert: Omit<Recipe, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Recipe, 'id'>>
      }
    }
  }
}
