// ============================================================
// EXEMPLO DE CONFIGURAÇÃO DO SUPABASE
// ============================================================
// Este é só um MODELO. O arquivo real que o site usa é
// "js/supabaseClient.js" (sem ".example"), que fica de fora
// do Git por segurança (veja o .gitignore).
//
// Passo a passo:
// 1) Copie este arquivo e renomeie a cópia para "supabaseClient.js"
// 2) Troque os valores abaixo pelos dados do SEU projeto Supabase
//    (Project Settings > API)
// ============================================================

const SUPABASE_URL = "https://nhdxcvxdmxgurrpafglj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oZHhjdnhkbXhndXJycGFmZ2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2MTY1MzksImV4cCI6MjA5OTE5MjUzOX0.56PtsdYfiQ8qWMtjaPKwdK14xLei0JnTmIsNgUDKKTk";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
