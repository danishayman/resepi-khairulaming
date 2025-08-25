# Resepi Khairul Aming

Sebuah aplikasi web untuk koleksi resepi masakan Malaysia dari Khairul Aming. Dibina menggunakan Next.js, Supabase, dan TailwindCSS.

## ✨ Ciri-ciri

- 📱 **Responsive Design** - Berfungsi dengan baik di desktop, tablet, dan mobile
- 🔍 **Carian Resepi** - Cari resepi mengikut nama, deskripsi, atau tag
- 🎥 **Integrasi TikTok** - Paparan video resepi terus dari TikTok
- 📋 **Maklumat Lengkap** - Bahan-bahan, cara masakan, dan maklumat pemakanan
- ⚡ **Pantas & Moden** - Dibina dengan teknologi terkini

## 🛠️ Teknologi

- **Frontend**: Next.js 15 dengan App Router
- **Database**: Supabase (PostgreSQL)
- **Styling**: TailwindCSS
- **Bahasa**: TypeScript
- **Hosting**: Vercel (disyorkan)

## 🚀 Cara Memasang

### 1. Klon Repositori

```bash
git clone <repository-url>
cd resepi-khairulaming
```

### 2. Pasang Dependencies

```bash
npm install
```

### 3. Setup Supabase

1. Buat akaun di [Supabase](https://supabase.com)
2. Buat projek baru
3. Jalankan SQL berikut dalam SQL Editor Supabase:

```sql
create table public.recipes (
    id uuid not null default gen_random_uuid (),
    title text not null,
    description text null,
    source_url text not null,
    video_platform text null,
    language text null default 'ms'::text,
    cuisine_type text null,
    difficulty_level text null,
    prep_time_minutes integer null,
    cook_time_minutes integer null,
    total_time_minutes integer null,
    servings integer null,
    ingredients jsonb not null,
    instructions jsonb not null,
    nutrition_info jsonb null,
    tags text[] null,
    transcript text null,
    extraction_metadata jsonb null,
    created_at timestamp with time zone null default now(),
    updated_at timestamp with time zone null default now(),
    thumbnail_url text null,
    constraint recipes_pkey primary key (id),
    constraint recipes_source_url_key unique (source_url)
);

create index idx_recipes_source_url on public.recipes using btree (source_url);
create index idx_recipes_title on public.recipes using btree (title);
create index idx_recipes_cuisine_type on public.recipes using btree (cuisine_type);
create index idx_recipes_created_at on public.recipes using btree (created_at);
```

### 4. Setup Environment Variables

1. Salin `.env.example` kepada `.env.local`:

```bash
cp .env.example .env.local
```

2. Isi nilai-nilai berikut dalam `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Dapatkan nilai-nilai ini dari Supabase Dashboard > Settings > API.

### 5. Jalankan Aplikasi

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) untuk melihat aplikasi.

## 📁 Struktur Projek

```
resepi-khairulaming/
├── app/
│   ├── globals.css          # Styling global
│   ├── layout.tsx           # Layout utama
│   ├── page.tsx            # Halaman utama (senarai resepi)
│   └── resepi/
│       └── [slug]/
│           ├── page.tsx     # Halaman detail resepi
│           └── not-found.tsx # Halaman 404
├── components/
│   ├── RecipeCard.tsx       # Komponen kad resepi
│   ├── SearchBar.tsx        # Komponen carian
│   └── TikTokEmbed.tsx      # Komponen embed TikTok
├── lib/
│   ├── supabase.ts         # Konfigurasi Supabase
│   ├── types.ts            # Definisi TypeScript
│   └── utils.ts            # Fungsi utiliti
└── SQL/
    └── sql_definition.sql   # Schema database
```

## 📝 Cara Menggunakan

### Menambah Resepi

Resepi boleh ditambah melalui Supabase Dashboard atau API. Contoh struktur data:

```json
{
  "title": "Ayam Masak Merah",
  "description": "Resepi ayam masak merah yang sedap dan mudah",
  "source_url": "https://www.tiktok.com/@khairulaming/video/...",
  "thumbnail_url": "https://example.com/thumbnail.jpg",
  "difficulty_level": "Mudah",
  "prep_time_minutes": 15,
  "cook_time_minutes": 30,
  "total_time_minutes": 45,
  "servings": 4,
  "ingredients": [
    "1 ekor ayam dipotong",
    "2 biji bawang besar",
    "3 ulas bawang putih"
  ],
  "instructions": [
    "Tumis bawang hingga naik bau",
    "Masukkan ayam dan masak hingga keperangan",
    "Tambah air dan didihkan"
  ],
  "tags": ["ayam", "masak-merah", "mudah"],
  "cuisine_type": "Melayu"
}
```

### URL Resepi

URL resepi akan dijana secara automatik berdasarkan title:
- Title: "Ayam Masak Merah" 
- URL: `/resepi/ayam-masak-merah`

## 🎨 Kustomisasi

### Warna Tema

Edit `app/globals.css` untuk mengubah warna tema:

```css
:root {
  --primary-color: #3b82f6;    /* Biru */
  --secondary-color: #64748b;  /* Kelabu */
}
```

### Komponen

Semua komponen berada dalam folder `components/` dan boleh dikustomisasi mengikut keperluan.

## 🚀 Deployment

### Vercel (Disyorkan)

1. Push kod ke GitHub
2. Import projek di [Vercel](https://vercel.com)
3. Tambah environment variables dalam Vercel dashboard
4. Deploy!

### Netlify

1. Build projek: `npm run build`
2. Upload folder `out/` ke Netlify

## 🤝 Kontribusi

1. Fork projek ini
2. Buat branch untuk feature baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 Lesen

Projek ini adalah open source dan tersedia di bawah [MIT License](LICENSE).

## 📞 Sokongan

Jika ada sebarang masalah atau soalan, sila buat issue dalam repositori ini.

---

**Dibuat dengan ❤️ untuk komuniti masakan Malaysia**
