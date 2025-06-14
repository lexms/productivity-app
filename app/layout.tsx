import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";
import "./globals.css";
import { AuthProvider } from "@/components/auth/auth-provider";
import { Navigation } from "@/components/organisms/navigation";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Productivity Companion",
  description: "Your personal productivity and wellness companion",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex min-h-screen bg-gray-50">
            <Navigation />
            <main className="flex-1 md:ml-20">
              <div className="container mx-auto max-w-7xl p-4 md:p-6 lg:p-8 pb-16 0">
                {children}
              </div>
            </main>
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
