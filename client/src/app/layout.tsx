import ClientLayout from "@/app/ClientLayout";
import { TailwindSizeIndicator } from "@/lib/tailwindSizeIndicator";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Dealt | Créez votre offre de services pour transformer votre expérience client.",
  description:
    "Montage, installation, configuration, entretien ou réparation… Dealt construit, implémente et gère votre offre de services en marque blanche.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>
          <TailwindSizeIndicator />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
