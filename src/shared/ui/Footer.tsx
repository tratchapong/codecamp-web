import Link from "next/link";
import { Container } from "@/shared/ui/Container";
import { TrackedLink } from "@/shared/ui/TrackedLink";

export function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-100 pt-16">
      <Container size="2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 pb-16">
          <div className="md:col-span-1">
            <img
              src="/icon/codecamp@300.jpg"
              alt="Logo"
              className="h-14 mb-1"
            />
            <p className="text-neutral-600 text-[15px] leading-relaxed mb-8">
              เราเชื่อว่า "คนธรรมดา" ก็เป็นโปรแกรมเมอร์ที่เก่งได้
              ที่นี่คือสภาพแวดล้อมที่ปลอดภัยที่สุดสำหรับการเริ่มต้น ปูพื้นฐานแน่น ไม่ทิ้งกัน ตลอด 5 ปี 22
              รุ่น (900+ คน) เพื่อพาคุณก้าวสู่ครอบครัว Dev มืออาชีพในยุค AI อย่างมั่นใจ
            </p>
            <div className="flex items-center gap-4">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/CodeCampThailand"
                target="_blank"
                className="text-[#467ff7] hover:scale-110 transition-transform"
                rel="noopener"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 fill-current"
                  viewBox="0 0 320 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://www.instagram.com/codecampthai.academy"
                target="_blank"
                className="text-[#467ff7] hover:scale-110 transition-transform"
                rel="noopener"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 fill-current"
                  viewBox="0 0 448 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                </svg>
              </a>
              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@codecampthai"
                target="_blank"
                className="text-[#467ff7] hover:scale-110 transition-transform"
                rel="noopener"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.33-.85.51-1.33 1.45-1.38 2.39-.15 1.4 1 2.73 2.4 2.88.59.06 1.19-.07 1.67-.44.91-.62 1.25-1.71 1.25-2.78.01-4.7 0-9.41 0-14.11z" />
                </svg>
              </a>
              {/* Line */}
              <TrackedLink
                href="https://page.line.me/221mbxdw"
                target="_blank"
                rel="noopener noreferrer"
                eventName="Contact"
                eventParams={{
                  content_name: "Footer Line Icon",
                  content_category: "General Inquiry",
                }}
                umamiEvent="contact-click: footer-line-icon"
                className="text-[#467ff7] hover:scale-110 transition-transform"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 fill-current"
                  viewBox="0 0 448 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M272.1 204.2v71.1c0 1.8-1.4 3.2-3.2 3.2h-11.4c-1.1 0-2.1-.6-2.6-1.3l-32.6-44v42.2c0 1.8-1.4 3.2-3.2 3.2h-11.4c-1.8 0-3.2-1.4-3.2-3.2v-71.1c0-1.8 1.4-3.2 3.2-3.2H219c1 0 2.1.5 2.6 1.4l32.6 44v-42.2c0-1.8 1.4-3.2 3.2-3.2h11.4c1.8-.1 3.3 1.4 3.3 3.1zm-82-3.2h-11.4c-1.8 0-3.2 1.4-3.2 3.2v71.1c0 1.8 1.4 3.2 3.2 3.2h11.4c1.8 0 3.2-1.4 3.2-3.2v-71.1c0-1.7-1.4-3.2-3.2-3.2zm-27.5 59.6h-31.1v-56.4c0-1.8-1.4-3.2-3.2-3.2h-11.4c-1.8 0-3.2 1.4-3.2 3.2v71.1c0 .9.3 1.6.9 2.2.6.5 1.3.9 2.2.9h45.7c1.8 0 3.2-1.4 3.2-3.2v-11.4c0-1.7-1.4-3.2-3.1-3.2zM332.1 201h-45.7c-1.7 0-3.2 1.4-3.2 3.2v71.1c0 1.7 1.4 3.2 3.2 3.2h45.7c1.8 0 3.2-1.4 3.2-3.2v-11.4c0-1.8-1.4-3.2-3.2-3.2H301v-12h31.1c1.8 0 3.2-1.4 3.2-3.2V234c0-1.8-1.4-3.2-3.2-3.2H301v-12h31.1c1.8 0 3.2-1.4 3.2-3.2v-11.4c-.1-1.7-1.5-3.2-3.2-3.2zM448 113.7V399c-.1 44.8-36.8 81.1-81.7 81H81c-44.8-.1-81.1-36.9-81-81.7V113c.1-44.8 36.9-81.1 81.7-81H367c44.8.1 81.1 36.8 81 81.7zm-61.6 122.6c0-73-73.2-132.4-163.1-132.4-89.9 0-163.1 59.4-163.1 132.4 0 65.4 58 120.2 136.4 130.6 19.1 4.1 16.9 11.1 12.6 36.8-.7 4.1-3.3 16.1 14.1 8.8 17.4-7.3 93.9-55.3 128.2-94.7 23.6-26 34.9-52.3 34.9-81.5z"></path>
                </svg>
              </TrackedLink>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-neutral-900 mb-6 text-sm">
              Quick Links
            </h4>
            <ul>
              <li>
                <Link
                  href="/courses/"
                  className="text-neutral-500 text-sm hover:text-accent"
                >
                  คอร์สเรียน
                </Link>
              </li>
              <li>
                <Link
                  href="/showcase/"
                  className="text-neutral-500 text-sm hover:text-accent"
                >
                  โชว์เคส
                </Link>
              </li>
              <li>
                <Link
                  href="/guide/switch-to-developer/"
                  className="text-neutral-500 text-sm hover:text-accent"
                >
                  คู่มือเปลี่ยนสายงาน Developer
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/"
                  className="text-neutral-500 text-sm hover:text-accent"
                >
                  คลังความรู้
                </Link>
              </li>
              <li>
                <Link
                  href="/location/"
                  className="text-neutral-500 text-sm hover:text-accent"
                >
                  สถานที่ตั้ง
                </Link>
              </li>
              <li>
                <Link
                  href="/aboutus/"
                  className="text-neutral-500 text-sm hover:text-accent"
                >
                  เกี่ยวกับเรา
                </Link>
              </li>
              <li>
                <Link
                  href="/manifesto/"
                  className="text-neutral-500 text-sm hover:text-accent"
                >
                  แนวคิดของเรา
                </Link>
              </li>
              <li>
                <TrackedLink
                  href="https://page.line.me/221mbxdw"
                  target="_blank"
                  rel="noopener noreferrer"
                  eventName="Contact"
                  eventParams={{
                    content_name: "Footer Contact Us Link",
                    content_category: "General Inquiry",
                  }}
                  umamiEvent="contact-click: footer-link"
                  className="text-neutral-500 text-sm hover:text-accent"
                >
                  ติดต่อเรา
                </TrackedLink>
              </li>
            </ul>
          </div>

          {/* Get In Touch - ซ่อนไว้ชั่วคราว */}
          {/* <div>
            <h4 className="font-bold text-neutral-900 mb-6 text-sm">
              Get In Touch
            </h4>
            <ul>
              <li className="text-sm text-neutral-600 flex items-center gap-2">
                <span className="w-4 h-4 text-accent">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                </span>
                support@codecampthai.academy
              </li>
            </ul>
          </div> */}

          <div>
            <h4 className="font-bold text-neutral-900 mb-6 text-sm">สถานที่ตั้ง</h4>
            <div className="aspect-video bg-neutral-100 rounded-lg overflow-hidden relative border border-neutral-100">
              <iframe
                className="w-full h-full"
                loading="lazy"
                src="https://maps.google.com/maps?q=%E0%B8%AD%E0%B8%B2%E0%B8%84%E0%B8%B2%E0%B8%A3%E0%B8%A3%E0%B8%A3%E0%B8%93%E0%B8%AA%E0%B8%A3%E0%B8%93%E0%B9%8C&amp;t=m&amp;z=15&amp;output=embed&amp;iwloc=near"
                title="อาคารวรรณสรณ์"
              ></iframe>
            </div>
          </div>
        </div>
      </Container>

      <div className="bg-primary py-4 text-center">
        <p
          className="text-white text-xs font-semibold"
          suppressHydrationWarning
        >
          © {new Date().getFullYear()} CodeCamp Thailand. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
