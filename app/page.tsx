"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Recipe } from "@/lib/types";
import { shuffleArray } from "@/lib/utils";
import { recipeCache } from "@/lib/cache";
import FloatingSearch from "@/components/FloatingSearch";
import RecipeCard from "@/components/RecipeCard";
import Image from "next/image";

const RECIPES_PER_PAGE = 15;

export default function Home() {
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [displayedRecipes, setDisplayedRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      
      // Try to get from cache first
      const cachedRecipes = recipeCache.get();
      
      if (cachedRecipes && cachedRecipes.length > 0) {
        // Use cached data
        console.log('Using cached recipes');
        setTimeout(() => {
          const shuffledRecipes = shuffleArray([...cachedRecipes]);
          setAllRecipes(shuffledRecipes);
          setFilteredRecipes(shuffledRecipes);
          
          const firstPage = shuffledRecipes.slice(0, RECIPES_PER_PAGE);
          setDisplayedRecipes(firstPage);
          setHasMore(shuffledRecipes.length > RECIPES_PER_PAGE);
          setLoading(false);
        }, 0);
        return;
      }

      // Fetch from Supabase if no cache
      console.log('Fetching recipes from Supabase');
      const { data, error } = await supabase.from("recipes").select("*");

      if (error) {
        throw error;
      }

      const rawData = data || [];
      
      // Save to cache
      recipeCache.set(rawData);
      
      // Apply shuffling in a separate effect after hydration is complete
      setTimeout(() => {
        const shuffledRecipes = shuffleArray(rawData);
        setAllRecipes(shuffledRecipes);
        setFilteredRecipes(shuffledRecipes);
        
        // Load first page
        const firstPage = shuffledRecipes.slice(0, RECIPES_PER_PAGE);
        setDisplayedRecipes(firstPage);
        setHasMore(shuffledRecipes.length > RECIPES_PER_PAGE);
      }, 0);
      
    } catch (err) {
      console.error("Error fetching recipes:", err);
      setError("Error fetching resepi. Sila cuba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const loadMoreRecipes = useCallback(() => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    
    setTimeout(() => {
      const startIndex = page * RECIPES_PER_PAGE;
      const endIndex = startIndex + RECIPES_PER_PAGE;
      const recipesToDisplay = searchQuery.trim() 
        ? filteredRecipes 
        : allRecipes;
      
      const nextRecipes = recipesToDisplay.slice(startIndex, endIndex);
      
      if (nextRecipes.length > 0) {
        setDisplayedRecipes(prev => [...prev, ...nextRecipes]);
        setPage(prev => prev + 1);
        setHasMore(endIndex < recipesToDisplay.length);
      } else {
        setHasMore(false);
      }
      
      setLoadingMore(false);
    }, 500); // Small delay for smooth loading experience
  }, [page, hasMore, loadingMore, filteredRecipes, allRecipes, searchQuery]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (loading) return;

    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 0.1
    };

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loadingMore) {
        loadMoreRecipes();
      }
    }, options);

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, loadingMore, loadMoreRecipes, loading]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setFilteredRecipes(allRecipes);
      const firstPage = allRecipes.slice(0, RECIPES_PER_PAGE);
      setDisplayedRecipes(firstPage);
      setPage(1);
      setHasMore(allRecipes.length > RECIPES_PER_PAGE);
      return;
    }

    const searchQueryLower = query.toLowerCase();
    const filtered = allRecipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(searchQueryLower) ||
        recipe.description?.toLowerCase().includes(searchQueryLower) ||
        recipe.tags?.some((tag: string) => tag.toLowerCase().includes(searchQueryLower)) ||
        recipe.cuisine_type?.toLowerCase().includes(searchQueryLower)
    );

    setFilteredRecipes(filtered);
    const firstPage = filtered.slice(0, RECIPES_PER_PAGE);
    setDisplayedRecipes(firstPage);
    setPage(1);
    setHasMore(filtered.length > RECIPES_PER_PAGE);
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        {/* Banner Skeleton */}
        <div className="w-full h-48 md:h-56 lg:h-64 bg-gray-200 dark:bg-gray-700"></div>

        <div className="container mx-auto px-4 py-8">
          {/* Header Section Skeleton */}
          <div className="text-center mb-8">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-96 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto mb-8"></div>

            {/* Search Bar Skeleton */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            </div>
          </div>

          {/* Recipe Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
            {[...Array(RECIPES_PER_PAGE)].map((_, index) => (
              <div key={index} className="w-80 h-96 mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden h-full flex flex-col">
                  {/* Image Skeleton */}
                  <div className="h-70 bg-gray-200 dark:bg-gray-700 flex-shrink-0"></div>
                  
                  {/* Content Skeleton */}
                  <div className="p-4 flex-1 flex flex-col min-h-0">
                    {/* Title */}
                    <div className="space-y-2 mb-3">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    </div>
                    
                    {/* Meta Info */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                      </div>
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
                    </div>
                    
                    {/* Tags */}
                    <div className="mt-auto flex flex-wrap gap-1">
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-14"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="text-red-600 dark:text-red-400 mb-4">
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Ralat</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={fetchRecipes}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Cuba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Banner Section */}
      <div className="w-full h-48 md:h-56 lg:h-64 relative overflow-hidden">
        <Image
          src="/banner.png"
          alt="Khairul Aming Banner"
          fill
          className="object-cover object-bottom"
          priority
        />
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Koleksi Resepi{" "}
            <a
              href="https://www.tiktok.com/@khairulaming"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline transition-all duration-200"
            >
              @Khairulaming
            </a>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Hey what&apos;s up guys!
          </p>

          <div className="mb-8">
            <FloatingSearch onSearch={handleSearch} placeholder="Cari resepi..." />
          </div>
        </div>

        {/* Recipe Stats - Only show when user is searching */}
        {searchQuery.trim() && (
          <div className="text-center mb-8">
            <p className="text-gray-600 dark:text-gray-400">
              Menunjukkan {filteredRecipes.length} daripada {allRecipes.length} resepi
            </p>
          </div>
        )}

        {/* No Results */}
        {filteredRecipes.length === 0 && allRecipes.length > 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <svg
                className="w-12 h-12 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              Tiada resepi dijumpai
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Cuba cari dengan kata kunci yang berbeza
            </p>
          </div>
        )}

        {/* No Recipes at all */}
        {allRecipes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <svg
                className="w-12 h-12 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              Belum ada resepi
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Resepi akan dipaparkan di sini setelah ditambah ke dalam pangkalan
              data
            </p>
          </div>
        )}

        {/* Recipe Grid */}
        {displayedRecipes.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
              {displayedRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>

            {/* Loading More Indicator */}
            <div ref={loadMoreRef} className="py-8">
              {loadingMore && (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">Memuatkan resepi...</p>
                </div>
              )}
              {!hasMore && displayedRecipes.length > 0 && (
                <div className="text-center">
                  <p className="text-gray-500 dark:text-gray-400">Itu sahaja! Semua resepi telah dipaparkan.</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
