// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rushqtzamcqrxzbzaixy.supabase.co';  // Proje URL'nizi buraya ekleyin
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1c2hxdHphbWNxcnh6YnphaXh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0NDQwODUsImV4cCI6MjA1NTAyMDA4NX0.Iq3vrnFkjANrp6nBb-s5vFSSRX0seuQfunv96tkXvmA';  // API anahtarınızı buraya ekleyin

export const supabase = createClient(supabaseUrl, supabaseKey);
