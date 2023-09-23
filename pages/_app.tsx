import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { WagmiConfig, createConfig } from "wagmi";
import { createPublicClient, http } from "viem";
import { polygonMumbai } from "viem/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { XMTPProvider } from "@xmtp/react-sdk";
import BaseApp from "@/components/baseApp";

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: polygonMumbai,
    transport: http(),
  }),
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 10 * 60 * 1000, cacheTime: 30 * 60 * 1000 },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <XMTPProvider>
        <QueryClientProvider client={queryClient}>
          <BaseApp>
            <Component {...pageProps} />
          </BaseApp>
        </QueryClientProvider>
      </XMTPProvider>
    </WagmiConfig>
  );
}
