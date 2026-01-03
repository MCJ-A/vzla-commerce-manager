import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ERP Dashboard",
  description: "Modern ERP Dashboard",
};

import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={esES}>
      <html lang="en" suppressHydrationWarning={true}>
        <body
          suppressHydrationWarning={true}
          className={`${outfit.variable} antialiased`}
        >
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
