import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/UI/Header";
import { SubjectProvider } from "@/context/SubjectProvider";

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
        <SubjectProvider>
          <Header />
          <main className="w-full flex-1 pt-16">
            <div className="w-full max-w-[80rem] mx-auto mb-16 h-full flex flex-col">
              {children}
            </div>
          </main>
        </SubjectProvider>
      </body>
    </html>
  );
}
