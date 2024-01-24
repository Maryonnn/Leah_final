import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bhksikkajisifpcsawlh.supabase.co' 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoa3Npa2thamlzaWZwY3Nhd2xoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU0OTcyMDgsImV4cCI6MjAyMTA3MzIwOH0.QYE5YD3ZursNKXJxFzUgSLXD8GX6gy3xfwQymOj9XBc'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase;