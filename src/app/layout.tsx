import { UserProvider } from "@auth0/nextjs-auth0/client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PdfProvider } from "@/contexts/PdfContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chatbot",
  description: "Chatbot",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>{children}</UserProvider>
        <PdfProvider>{children} </PdfProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
