import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://sdxbrsvqmgzlgormtojb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkeGJyc3ZxbWd6bGdvcm10b2piIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYxNDc4NDIsImV4cCI6MjAxMTcyMzg0Mn0.m5zs2gylfYdrBUOu8V3pq6kHA8ackumqh7jZxvTVy8E";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
