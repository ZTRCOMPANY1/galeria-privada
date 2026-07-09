// ============================================================
// CONFIGURAÇÃO DO SUPABASE
// ============================================================
// Troque os valores abaixo pelos dados do SEU projeto Supabase.
// Você encontra esses dados em: Project Settings > API
//
// SUPABASE_URL   -> "https://nhdxcvxdmxgurrpafglj.supabase.co"
// SUPABASE_ANON_KEY -> "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oZHhjdnhkbXhndXJycGFmZ2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2MTY1MzksImV4cCI6MjA5OTE5MjUzOX0.56PtsdYfiQ8qWMtjaPKwdK14xLei0JnTmIsNgUDKKTk" key
//
// (Detalhes de como pegar isso estão no README.md, passo 2)
// ============================================================

const SUPABASE_URL = "https://nhdxcvxdmxgurrpafglj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oZHhjdnhkbXhndXJycGFmZ2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2MTY1MzksImV4cCI6MjA5OTE5MjUzOX0.56PtsdYfiQ8qWMtjaPKwdK14xLei0JnTmIsNgUDKKTk";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
