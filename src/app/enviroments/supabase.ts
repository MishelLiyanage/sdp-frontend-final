import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://qzzxiegdwjsvmunmymki.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6enhpZWdkd2pzdm11bm15bWtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTUyOTgsImV4cCI6MjA2MTc5MTI5OH0.4rBbdH85AdoZL8JOhHHOh_RO-BsRKvjH_qPlZZLGDOU'
);
