import { createClient } from "@supabase/supabase-js";

const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabase_anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(
    supabase_url as string,
    supabase_anon as string
);