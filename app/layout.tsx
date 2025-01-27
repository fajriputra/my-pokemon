import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GlobalProvider } from "@/context/pokemon.context";

import Navbar from "@/components/navbar";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokémon Encyclopedia",
  description:
    "Explore the complete list of Pokémon with detailed stats, evolutions, and abilities. Your ultimate guide to the world of Pokémon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
