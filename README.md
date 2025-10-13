# 🍳 Resepi KhairulAming

Harini kita nak buat...

A modern recipe collection web app featuring delicious recipes from Malaysian TikTok chef [KhairulAming](https://www.tiktok.com/@khairulaming).

## ✨ Features

- 🔍 Smart search across recipes
- 📱 Responsive design for all devices
- 🎥 Embedded TikTok cooking videos
- ⚡ Fast performance with Next.js 15

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Supabase account

### Setup

1. Clone and install:
   ```bash
   git clone https://github.com/danishayman/resepi-kharulaming.git
   cd resepi-kharulaming
   npm install
   ```

2. Setup Supabase:
   - Create a project at [Supabase](https://supabase.com)
   - Run SQL from `SQL/sql_definition.sql`
   - Get your project URL and anon key

3. Configure environment:
   ```bash
   cp .env.example .env.local
   ```
   Add to `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

4. Start development:
   ```bash
   npm run dev
   ```
   Visit [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Supabase** - Database and backend

## 📁 Project Structure

```
app/
├── page.tsx          # Homepage with recipe grid
├── layout.tsx        # Root layout
└── resepi/[slug]/    # Recipe detail pages

components/
├── RecipeCard.tsx    # Recipe cards
├── SearchBar.tsx     # Search functionality
└── TikTokEmbed.tsx   # Video embeds

lib/
├── supabase.ts      # Database client
├── types.ts         # TypeScript types
└── utils.ts         # Utilities
```

## 🚀 Deployment

Deploy to Vercel:
1. Push to GitHub
2. Import project at [vercel.com](https://vercel.com)
3. Add environment variables
4. Deploy!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

**Made with ❤️ for food lovers everywhere**
