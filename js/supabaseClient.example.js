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

const SUPABASE_URL = "COLE_AQUI_A_URL_DO_SEU_PROJETO";
const SUPABASE_ANON_KEY = "COLE_AQUI_A_CHAVE_ANON_PUBLIC";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
