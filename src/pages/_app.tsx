import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import GoogleAnalytics from "@bradgarropy/next-google-analytics"

//Query
import { HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";

//Fonts
import { poppins } from "@/Fonts";

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <main className={`${poppins.variable} font-sans`} style={{ fontFamily: poppins.style.fontFamily }}>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <Component {...pageProps} />
          <GoogleAnalytics measurementId="G-C4HM0X8J4R" />
        </HydrationBoundary>
      </QueryClientProvider>
    </main>
  )
}

export default App;