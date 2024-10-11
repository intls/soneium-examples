import { Header } from "@/common/components/Header";
import { WalletProvider } from "@/modules/wagmi/components/WalletProvider";
import "@rainbow-me/rainbowkit/styles.css";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wagmi + Rainbowkit Demo App",
  description:
    "Demo app for minting NFTs on Soneium Minato by using WAGMI and Rainbowkit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <WalletProvider>
          <Header />
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}
