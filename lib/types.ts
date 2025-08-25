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
  ingredients: (string | { name?: string; amount?: string; unit?: string; [key: string]: unknown })[] // JSONB array
  instructions: (string | { step?: string; text?: string; [key: string]: unknown })[] // JSONB array
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
