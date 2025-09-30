const { createClient } = require('@supabase/supabase-js');

async function pingSupabaseGeneric() {
  try {
    console.log('🏃 Starting Supabase ping (generic)...');
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase environment variables are not set');
    }
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // Use a generic PostgreSQL query that works on any database
    const { data, error } = await supabase
      .rpc('ping_database', {})
      .maybeSingle();
    
    // If the RPC doesn't exist, fall back to a simple auth check
    if (error && error.message.includes('function ping_database')) {
      console.log('📡 Using auth check as fallback...');
      const { data: authData, error: authError } = await supabase.auth.getSession();
      
      if (authError) {
        console.error('❌ Error with auth check:', authError.message);
      } else {
        console.log('✅ Successfully connected to Supabase (auth check)');
      }
    } else if (error) {
      console.error('❌ Error pinging Supabase:', error.message);
      process.exit(1);
    } else {
      console.log('✅ Successfully pinged Supabase database (RPC)');
    }
    
    console.log(`🕐 Timestamp: ${new Date().toISOString()}`);
    
  } catch (error) {
    console.error('❌ Failed to ping Supabase:', error.message);
    process.exit(1);
  }
}

pingSupabaseGeneric();