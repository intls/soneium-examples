"use client";

import { WAGMI_CONFIG } from "@/modules/wagmi/config";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

const client = new QueryClient();

export function WalletProvider({
	children,
}: React.PropsWithChildren): JSX.Element {
	return (
		<WagmiProvider config={WAGMI_CONFIG}>
			<QueryClientProvider client={client}>
				<RainbowKitProvider>{children}</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}
