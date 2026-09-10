const mockSupabase: any = new Proxy(
  function () {
    return mockSupabase;
  },
  {
    get: function (target, prop) {
      if (prop === 'then') {
        return function (resolve: any) {
          resolve({ data: [], error: null });
        };
      }
      return mockSupabase;
    },
  }
);

export const createClient = (...args: any[]): any => mockSupabase;