const { createClient } = require('@supabase/supabase-js');

async function pingSupabase() {
  try {
    console.log('🏃 Starting Supabase ping...');
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase environment variables are not set');
    }
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // Simple query to keep the database active
    // This creates a minimal connection to your database
    const { data, error } = await supabase
      .from('recipes') // Change this to any table you have
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Error pinging Supabase:', error.message);
      process.exit(1);
    }
    
    console.log('✅ Successfully pinged Supabase database');
    console.log(`🕐 Timestamp: ${new Date().toISOString()}`);
    
  } catch (error) {
    console.error('❌ Failed to ping Supabase:', error.message);
    process.exit(1);
  }
}

pingSupabase();