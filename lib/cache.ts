import { Recipe } from './types';

const CACHE_KEY = 'recipes_cache';
const CACHE_TIMESTAMP_KEY = 'recipes_cache_timestamp';
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

export const recipeCache = {
  // Get cached recipes
  get: (): Recipe[] | null => {
    if (typeof window === 'undefined') return null;
    
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
      
      if (!cached || !timestamp) return null;
      
      const age = Date.now() - parseInt(timestamp);
      
      // Check if cache is expired
      if (age > CACHE_DURATION) {
        recipeCache.clear();
        return null;
      }
      
      return JSON.parse(cached);
    } catch (error) {
      console.error('Error reading cache:', error);
      return null;
    }
  },

  // Save recipes to cache
  set: (recipes: Recipe[]) => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(recipes));
      localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
    } catch (error) {
      console.error('Error saving to cache:', error);
    }
  },

  // Clear cache
  clear: () => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(CACHE_KEY);
      localStorage.removeItem(CACHE_TIMESTAMP_KEY);
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  },

  // Check if cache exists and is valid
  isValid: (): boolean => {
    if (typeof window === 'undefined') return false;
    
    try {
      const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
      if (!timestamp) return false;
      
      const age = Date.now() - parseInt(timestamp);
      return age <= CACHE_DURATION;
    } catch (error) {
      return false;
    }
  }
};

