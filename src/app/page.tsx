import type { Metadata } from "next";
import { AtmosphereSection } from "@/shared/ui/home/AtmosphereSection";
import { Banner0to100 } from "@/shared/ui/home/Banner0to100";
import { CampHighlights } from "@/shared/ui/home/CampHighlights";
import { CorporateSection } from "@/shared/ui/home/CorporateSection";
import { HeroBanner } from "@/shared/ui/home/HeroBanner";
import { InstructorsSection } from "@/shared/ui/home/InstructorsSection";
import { LearningFormats } from "@/shared/ui/home/LearningFormats";
import { StatsCounter } from "@/shared/ui/home/StatsCounter";
import { TravelAndBenefits } from "@/shared/ui/home/TravelAndBenefits";
import { ManifestoSection } from "@/shared/ui/home/ManifestoSection";

export const metadata: Metadata = {
  title: "CodeCamp Thailand | Coding Bootcamp บ้านหลังแรกของคนเริ่มจากศูนย์",
  description:
    "Coding Bootcamp สอนเขียนโปรแกรม ปูพื้นฐานแน่น ไม่ทิ้งกัน เพราะเราเชื่อว่าคนธรรมดาก็เป็นโปรแกรมเมอร์ที่เก่งได้ แคมป์สอนเขียนโค้ดที่ได้รับการรับรองมาตรฐาน STEM เลขที่รับรอง TPC690045",
  keywords: [
    "Coding Bootcamp",
    "Bootcamp สอนเขียนโปรแกรม",
    "บูทแคมป์",
    "Fullstack Bootcamp",
    "เรียนเขียนโปรแกรมจากศูนย์",
    "เปลี่ยนสายงาน developer",
    "CodeCamp Thailand",
  ],
  openGraph: {
    title: "CodeCamp Thailand | Coding Bootcamp บ้านหลังแรกของคนเริ่มจากศูนย์",
    description:
      "Coding Bootcamp สอนเขียนโปรแกรม ปูพื้นฐานแน่น ไม่ทิ้งกัน เพราะเราเชื่อว่าคนธรรมดาก็เป็นโปรแกรมเมอร์ที่เก่งได้ แคมป์สอนเขียนโค้ดที่ได้รับการรับรองมาตรฐาน STEM เลขที่รับรอง TPC690045",
    url: "https://getcodecamp.com",
    siteName: "CodeCamp Thailand",
    images: [
      {
        url: "/home/hero-banner.jpg",
        width: 1200,
        height: 630,
        alt: "CodeCamp Thailand",
      },
    ],
    locale: "th_TH",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <div className="w-full bg-white flex flex-col">
      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Stats Counter (Teal) */}
      <StatsCounter />

      {/* 3. Camp Highlights (จุดเด่นของแคมป์เรา) */}
      <CampHighlights />

      {/* 4. Banner 0 to 100 with Mountain Shape Divider */}
      <Banner0to100 />

      {/* 5. Atmosphere Gallery & Experience (CODE CAMP แคมป์สอนเขียน CODE แห่งแรกในประเทศไทย) */}
      <AtmosphereSection />

      {/* 6 & 7. Learning Formats (Offline & Online cards / Core Curriculum Options) - ซ่อนไว้ชั่วคราว */}
      {/* <LearningFormats /> */}

      {/* 8 & 9. Instructors Section (ทีมอาจารย์ ผู้สอน) - ซ่อนไว้ชั่วคราว */}
      {/* <InstructorsSection /> */}

      {/* 10. Manifesto Section (พื้นที่ของคนเอาจริง) */}
      <ManifestoSection />

      {/* 11. Travel & Benefits (วิธีเดินทางมาเรียน & Code Camp ให้อะไรกับคุณ) */}
      <TravelAndBenefits />

      {/* 12 & 13. Corporate Section & STEM Certifications */}
      <CorporateSection />
    </div>
  );
}
