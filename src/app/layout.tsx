import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/provider";
import Header from "@/components/UI/layout/header";
import { siteConfig } from "@/config/site.config";
import { layoutConfig } from "@/config/layout.config";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth/auth";
import AppLoader from "@/hoc/app-loader";
import Title from "@/components/UI/layout/title";
import BackButton from "@/components/UI/BackButton/BackButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <SessionProvider session={session}>
            <AppLoader>
              <div className="relative flex min-h-screen flex-col justify-between">
                <BackButton />
                <div className="flex flex-col">
                  <Header />
                  <main
                    className={`flex flex-col w-full overflow-x-hidden max-w-[1024px] mx-auto px-[24px] justify-start items-center`}
                  >
                    {/* min-w-[1024px] */}
                    <Title />
                    {children}
                  </main>
                </div>
                <footer
                  className={`w-full flex items-center justify-center py-3`}
                  style={{ height: layoutConfig.footerHeight }}
                >
                  <p>{siteConfig.description}</p>
                </footer>
              </div>
            </AppLoader>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
