import { QueryClient } from '@tanstack/react-query';

const DEFAULT_CACHE_TIME = 300000;

class QueryClientManager {
  private readonly _queryClient: QueryClient;

  constructor() {
    this._queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          onError: this.onError,
          refetchOnWindowFocus: false,
          cacheTime: DEFAULT_CACHE_TIME,
        },
      },
    });
  }

  onError(err: any) {
    console.error(err);
  }

  get queryClient() {
    return this._queryClient;
  }
}
/** */

const queryClientManager = new QueryClientManager();
export { queryClientManager };
