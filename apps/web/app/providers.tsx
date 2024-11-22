"use client";
import { ReactNode, useState } from "react";
import { config } from "@/lib/wagmi";
import {
  RainbowKitProvider,
  type Theme,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import merge from "lodash.merge";
import { WagmiProvider } from "wagmi";

const customRainbowKitTheme = merge(lightTheme(), {
  colors: {
    connectButtonBackground: "#fff",
    connectButtonInnerBackground: "#fff",
    connectButtonText: "#000",
  },
  radii: {
    actionButton: "9999px", // Custom radius for action buttons,
    connectButton: "9999px", // Custom radius for action buttons
  },
  // fonts: {
  //   body: '...'
  // }
} as Theme);

export function Providers(props: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={customRainbowKitTheme}
          modalSize="compact"
          showRecentTransactions
        >
          {props.children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
