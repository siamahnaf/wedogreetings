import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";

//Query
import { HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";

//Fonts
import { poppins } from "@/Fonts";

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <main className={`${poppins.variable} font-sans`}>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </HydrationBoundary>
      </QueryClientProvider>
    </main>
  )
}

export default App;