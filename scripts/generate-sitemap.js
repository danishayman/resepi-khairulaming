/**
 * Script to generate sitemap.xml manually from recipe data
 * This can be useful for debugging or creating a static sitemap backup
 * 
 * Run with: node scripts/generate-sitemap.js
 */

const fs = require('fs')
const path = require('path')

// Read sample data (replace with actual data source in production)
const sampleDataPath = path.join(__dirname, '..', 'sample-data.json')
const recipes = JSON.parse(fs.readFileSync(sampleDataPath, 'utf8'))

// Utility function to convert title to slug (matching your utils.ts)
function titleToSlug(title) {
  return title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// Generate sitemap XML
function generateSitemap() {
  const baseUrl = 'https://www.resepika.my'
  const currentDate = new Date().toISOString().split('T')[0] // YYYY-MM-DD format
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`

  // Add recipe pages
  recipes.forEach(recipe => {
    const slug = titleToSlug(recipe.title)
    xml += `  
  <!-- ${recipe.title} -->
  <url>
    <loc>${baseUrl}/resepi/${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`
  })

  xml += `</urlset>`
  
  return xml
}

// Write sitemap to public directory
function writeSitemap() {
  const sitemap = generateSitemap()
  const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml')
  
  fs.writeFileSync(outputPath, sitemap, 'utf8')
  console.log(`✅ Sitemap generated successfully!`)
  console.log(`📄 Location: ${outputPath}`)
  console.log(`🔗 Will be available at: https://www.resepika.my/sitemap.xml`)
  console.log(`📊 Generated ${recipes.length} recipe URLs`)
  
  // Also log the slugs for verification
  console.log('\n📋 Generated recipe URLs:')
  recipes.forEach(recipe => {
    const slug = titleToSlug(recipe.title)
    console.log(`   • https://www.resepika.my/resepi/${slug}`)
  })
}

// Run the script
if (require.main === module) {
  try {
    writeSitemap()
  } catch (error) {
    console.error('❌ Error generating sitemap:', error)
    process.exit(1)
  }
}
