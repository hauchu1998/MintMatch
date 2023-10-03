import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { XmtpProvider } from "@/components/providers/xmtpProvider";
import { XMTPProvider } from "@xmtp/react-sdk";
import BaseApp from "@/components/baseApp";

import { polygonMumbai } from "@wagmi/core/chains";

import { WagmiConfig, createConfig } from "wagmi";
import { createPublicClient, http } from "viem";
import dynamic from "next/dynamic";
import React from "react";

const config = createConfig({
  autoConnect: false,
  publicClient: createPublicClient({
    chain: polygonMumbai,
    transport: http(),
  }),
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 2 * 1000, cacheTime: 30 * 60 * 1000 },
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
