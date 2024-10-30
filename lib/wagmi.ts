import { mainnet, sepolia } from "wagmi/chains";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { base, baseSepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  // appName: process.env.PROJECT_NAME || "burn-bounty-app",
  appName: "burn-bounty-app",
  projectId: "fcf550f089d88a238047aab74e3d4864",
  // projectId: process.env.PROJECT_ID || "fcf550f089d88a238047aab74e3d4864",
  chains: [mainnet, sepolia, base, baseSepolia],
  ssr: true,
});
