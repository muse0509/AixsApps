import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // ★★★ この行があるか確認してください ★★★
import WalletContextProvider from "../providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Axis Pitch Demo",
  description: "Interactive pitch demo for Axis Protocol",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletContextProvider>
          {children}
        </WalletContextProvider>
      </body>
    </html>
  );
}