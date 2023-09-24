import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { XmtpProvider } from "@/components/providers/xmtpProvider";
import BaseApp from "@/components/baseApp";

import { polygonMumbai } from "@wagmi/core/chains";
import { alchemyProvider } from "@wagmi/core/providers/alchemy";
import { InjectedConnector } from "@wagmi/core/connectors/injected";

import { createClient, configureChains, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [polygonMumbai],
  // prettier-ignore
  [
    alchemyProvider({ apiKey:  process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!}), 
    publicProvider()
  ]
);

export const WAGMI_CLIENT = createClient({
  autoConnect: true,
  connectors: [new InjectedConnector({ chains })],
  provider,
});

const config = createClient({
  autoConnect: true,
  connectors: [new InjectedConnector({ chains })],
  provider,
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 10 * 60 * 1000, cacheTime: 30 * 60 * 1000 },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={config}>
      <XmtpProvider>
        <QueryClientProvider client={queryClient}>
          <BaseApp>
            <Component {...pageProps} />
          </BaseApp>
        </QueryClientProvider>
      </XmtpProvider>
    </WagmiConfig>
  );
}
