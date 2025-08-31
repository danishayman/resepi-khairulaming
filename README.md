# 🍳 Resepi Khairul Aming

> **Hey what's up guys!** 👋 A modern web application featuring a curated collection of delicious recipes from the famous Malaysian TikTok chef, Khairul Aming.


## ✨ Features

🔍 **Smart Search** - Find recipes instantly with intelligent search across titles, descriptions, tags, and cuisine types  
📱 **Responsive Design** - Perfect experience on mobile, tablet, and desktop  
🎥 **TikTok Integration** - Watch cooking videos directly embedded in recipe pages  
⚡ **Lightning Fast** - Built with Next.js 15 and optimized for performance  
🎯 **SEO Optimized** - SEO-friendly URLs with recipe title-based slugs  
🌍 **Multi-language Ready** - Supports Malay content with English fallbacks  
🎨 **Beautiful UI** - Clean, modern interface with Tailwind CSS  
📊 **Recipe Analytics** - Track cooking time, servings, difficulty levels  
🏷️ **Tag System** - Organize recipes by cuisine type, ingredients, and more  

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/danishayman/resepi-khairulaming.git
   cd resepi-khairulaming
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Supabase Database**
   - Create a new project at [Supabase](https://supabase.com)
   - Run the SQL from `SQL/sql_definition.sql` in your SQL Editor
   - Copy your project URL and anon key from Settings > API

4. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Supabase credentials to `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

5. **Add sample data (optional)**
   - Import `sample-data.json` into your Supabase `recipes` table

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   - Visit [http://localhost:3000](http://localhost:3000) 🎉

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)
- **Deployment**: [Vercel](https://vercel.com/) (recommended)

## 📁 Project Structure

```
resepi-khairulaming/
├── 📄 README.md
├── 📄 SETUP.md
├── 📦 package.json
├── 🔧 next.config.ts
├── 🎨 tailwind.config.js
├── 📂 app/
│   ├── 🏠 page.tsx           # Homepage with recipe grid
│   ├── 🎨 globals.css        # Global styles
│   ├── 📝 layout.tsx         # Root layout
│   └── 📂 resepi/
│       └── 📂 [slug]/
│           ├── 📄 page.tsx   # Recipe detail page
│           └── 🚫 not-found.tsx
├── 📂 components/
│   ├── 🃏 RecipeCard.tsx     # Recipe card component
│   ├── 🔍 SearchBar.tsx      # Search functionality
│   └── 📺 TikTokEmbed.tsx    # TikTok video embed
├── 📂 lib/
│   ├── 🗄️ supabase.ts       # Supabase client
│   ├── 📝 types.ts          # TypeScript definitions
│   └── 🔧 utils.ts          # Utility functions
├── 📂 public/              # Static assets
└── 📂 SQL/
    └── 📄 sql_definition.sql # Database schema
```

## 🍽️ Recipe Data Structure

Our flexible recipe schema supports various data formats:

### 🥘 Ingredients
```json
// Simple array
["1 kg ayam", "2 biji bawang besar"]

// Categorized object
{
  "bahan_utama": ["1 kg ayam", "2 cawan beras"],
  "rempah_ratus": ["1 sudu besar garam", "2 sudu kecil lada"]
}
```

### 👨‍🍳 Instructions
```json
// Simple array
["Cuci bersih ayam", "Tumis bawang hingga naik bau"]

// Categorized steps
{
  "penyediaan": ["Cuci bahan", "Potong sayuran"],
  "memasak": ["Panaskan minyak", "Masukkan ayam"]
}
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | 🚀 Start development server with Turbopack |
| `npm run build` | 🏗️ Build for production |
| `npm run start` | ▶️ Start production server |
| `npm run lint` | 🧹 Run ESLint |

## 🌟 Key Components

### 🏠 Homepage (`app/page.tsx`)
- Recipe grid with infinite scroll
- Smart search with real-time filtering
- Loading states and error handling
- Responsive design for all devices

### 📄 Recipe Detail (`app/resepi/[slug]/page.tsx`)
- Individual recipe pages
- TikTok video integration
- SEO-optimized metadata
- Recipe information display

### 🃏 RecipeCard Component
- Beautiful recipe cards
- Hover effects and animations
- Recipe metadata display
- Navigation to detail pages

### 🔍 SearchBar Component
- Real-time search functionality
- Debounced input for performance
- Search across multiple fields

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Import your project at [vercel.com](https://vercel.com)
   - Add your environment variables
   - Deploy! 🎉

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway  
- AWS Amplify
- DigitalOcean App Platform

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **🍴 Fork the repository**
2. **🌿 Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **💾 Commit your changes**: `git commit -m 'Add amazing feature'`
4. **📤 Push to the branch**: `git push origin feature/amazing-feature`
5. **🔄 Open a Pull Request**

### 📋 Contribution Guidelines

- Follow the existing code style
- Add TypeScript types for new features
- Test your changes thoroughly
- Update documentation as needed
- Add emojis to make it fun! 😄

## 🐛 Troubleshooting

### Common Issues

**❌ Build fails with Supabase errors**
- ✅ Verify environment variables are set correctly
- ✅ Check that your Supabase project is active
- ✅ Ensure database schema matches `sql_definition.sql`

**❌ TikTok videos not loading**
- ✅ Verify TikTok URLs are valid
- ✅ Some videos may have embedding restrictions
- ✅ Check network connectivity

**❌ No recipes showing**
- ✅ Check database connection
- ✅ Ensure recipes table has data
- ✅ Check browser console for errors
- ✅ Verify API keys are correct

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- 👨‍🍳 **Khairul Aming** - For the amazing recipes and content
- 💜 **Supabase** - For the excellent backend-as-a-service
- ⚡ **Vercel** - For the fantastic hosting platform
- 🎨 **Tailwind CSS** - For the beautiful styling framework

## 📞 Support

If you have any questions or need help, feel free to:

- 📧 Open an issue on GitHub
- 💬 Start a discussion in the repository
- 📱 Follow [@khairulaming](https://www.tiktok.com/@khairulaming) on TikTok

---

<div align="center">

**Made with ❤️ for food lovers everywhere**

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-2.39-green?style=for-the-badge&logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)

</div>
