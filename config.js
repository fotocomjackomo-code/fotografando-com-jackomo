/* Configure somente depois de criar o projeto Supabase.
   Nunca coloque a senha do banco de dados aqui. A chave anon/publishable é própria para uso público
   quando as políticas RLS do banco estiverem corretamente configuradas. */
window.JACKOMO_CONFIG = {
  SUPABASE_URL: "COLE_AQUI_A_URL_DO_PROJETO",
  SUPABASE_ANON_KEY: "COLE_AQUI_A_CHAVE_PUBLISHABLE_OU_ANON",
  WHATSAPP: "5543999999999"
};
window.jackomoSupabase = function () {
  const c = window.JACKOMO_CONFIG || {};
  if (!window.supabase || !c.SUPABASE_URL.startsWith("https://") || c.SUPABASE_ANON_KEY.startsWith("COLE_")) return null;
  return window.supabase.createClient(c.SUPABASE_URL, c.SUPABASE_ANON_KEY);
};