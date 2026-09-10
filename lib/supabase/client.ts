// Cliente simulado o de conexión para Supabase
export const supabase = {
  auth: {},
  from: () => ({
    select: () => Promise.resolve({ data: [], error: null }),
    insert: () => Promise.resolve({ data: null, error: null }),
  }),
};