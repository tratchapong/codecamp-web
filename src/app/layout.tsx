import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { FacebookPixel } from "@/shared/ui/FacebookPixel";
import { Footer } from "@/shared/ui/Footer";
import { Header } from "@/shared/ui/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://getcodecamp.com"),
  title: "เรียน Full‑Stack Web Development & Coding Bootcamp กับ CodeCamp Thailand",
  description:
    "Coding Bootcamp สอนเขียนโปรแกรมเพื่อคนเริ่มจากศูนย์ หลักสูตรเข้มข้นครอบคลุม React, Node.js, Git, Deployment ลงมือทำโปรเจกต์จริง เมนเทอร์ดูแลใกล้ชิด เตรียมพอร์ตและสัมภาษณ์งานได้อย่างมั่นใจ",
  keywords: [
    "Bootcamp",
    "Coding Bootcamp",
    "Bootcamp สอนเขียนโปรแกรม",
    "Fullstack Bootcamp",
    "บูทแคมป์โปรแกรมเมอร์",
    "เรียนเขียนโปรแกรม",
    "เปลี่ยนสายเป็นโปรแกรมเมอร์",
    "เรียน Fullstack",
    "CodeCamp Thailand",
  ],
  icons: {
    icon: [
      { url: "/icon/cropped-cc@512-32x32.png", sizes: "32x32" },
      { url: "/icon/cropped-cc@512-192x192.png", sizes: "192x192" },
    ],
    apple: "/icon/cropped-cc@512-180x180.png",
  },
  openGraph: {
    title: "เรียน Full‑Stack Web Development & Coding Bootcamp กับ CodeCamp Thailand",
    description:
      "Coding Bootcamp สอนเขียนโปรแกรมเพื่อคนเริ่มจากศูนย์ หลักสูตรเข้มข้นครอบคลุม React, Node.js, Git, Deployment ลงมือทำโปรเจกต์จริง เมนเทอร์ดูแลใกล้ชิด เตรียมพอร์ตและสัมภาษณ์งานได้อย่างมั่นใจ",
    url: "https://getcodecamp.com",
    siteName: "CodeCamp Thailand",
    images: [
      {
        url: "/icon/cropped-cc@512-192x192.png",
        width: 192,
        height: 192,
        alt: "CodeCamp Thailand",
      },
    ],
    locale: "th_TH",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-neutral-900 flex flex-col min-h-screen`}
      >
        <FacebookPixel />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Script
          async
          src="https://um.codekrub.dev/script.js"
          data-website-id="f4b7136d-a04c-4c51-b600-5daa5148d56a"
        />
      </body>
    </html>
  );
}
