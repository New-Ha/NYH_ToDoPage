import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/UI/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NYH_ToDoPage",
  description: "Kanban ToDoList",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex flex-col h-screen`}
      >
        <Header />
        {/* 💡 가로 스크롤이 브라우저에서 동작하도록 설정 */}
        <main className="w-full flex-1 pt-16">
          <div className="w-full max-w-[80rem] mx-auto h-full flex flex-col">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
