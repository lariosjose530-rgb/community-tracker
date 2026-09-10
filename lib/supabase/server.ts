// Servidor simulado o de conexión para Supabase
export const createServerSupabaseClient = () => {
  return {
    from: () => ({
      select: () => Promise.resolve({ data: [], error: null }),
    }),
  };
};