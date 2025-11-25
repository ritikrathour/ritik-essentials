import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes - data considered fresh,
      gcTime: 10 * 60 * 1000, // 10 minutes - Garbage collection retention
      refetchOnWindowFocus: false, // Don't refetch on tab focus
      refetchOnReconnect: true, //Refetch on network reconnect
      retry: 0, // Retry failed requests 3 times
      retryDelay: (attempIndex) => Math.min(1000 * 2 ** attempIndex, 3000),
    },
    mutations: {
      retry: 1,
    },
  },
});
