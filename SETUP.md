# Setup Guide - Resepi Khairul Aming

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Supabase

1. Go to [Supabase](https://supabase.com) and create a new project
2. In the SQL Editor, run the SQL from `SQL/sql_definition.sql`
3. Go to Settings > API and copy your project URL and anon key

### 3. Environment Variables

Create `.env.local` in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 4. Add Sample Data (Optional)

You can insert the sample data from `sample-data.json` into your Supabase `recipes` table using the Supabase dashboard or API.

**Note:** The ingredients and instructions fields support flexible JSON structures:

**Ingredients:**
- Simple arrays: `["ingredient 1", "ingredient 2"]`
- Categorized objects: `{"main_ingredients": [{"name": "Chicken", "quantity": "1kg"}], "spices": [...]}`

**Instructions:**
- Simple arrays: `["Step 1 description", "Step 2 description"]`
- Step-based objects: `{"step1": "First step", "step2": "Second step", ...}`
- Categorized objects: `{"preparation": ["step1", "step2"], "cooking": ["step1", "step2"]}`

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## Features

- ✅ Recipe listing with search
- ✅ Recipe detail pages with TikTok embeds
- ✅ Responsive design
- ✅ SEO-friendly URLs (title-based slugs)
- ✅ TypeScript support
- ✅ Tailwind CSS styling

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

Make sure to set the environment variables in your hosting platform's dashboard.

## Troubleshooting

**Build fails with Supabase errors:**
- Make sure environment variables are set correctly
- Check that your Supabase project is active

**TikTok videos not loading:**
- Ensure the source URLs are valid TikTok video links
- Some TikTok embeds may be restricted

**No recipes showing:**
- Check your database connection
- Ensure you have data in the `recipes` table
- Check browser console for errors
