"use client";

import { useEffect, useState } from "react";

interface LineCTAProps {
  courseTitle: string;
  type: "enroll" | "enquiry";
  className?: string;
  children: React.ReactNode;
}

export function LineCTA({ courseTitle, type, className, children }: LineCTAProps) {
  const [href, setHref] = useState(`https://line.me/ti/p/@221mbxdw`);

  useEffect(() => {
    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
      const message = type === "enroll"
        ? `สนใจสมัครเรียนคอร์ส ${courseTitle}`
        : `อยากสอบถามรายละเอียดเพิ่มเติมเกี่ยวกับคอร์ส ${courseTitle}`;

      setHref(`https://line.me/R/oaMessage/@221mbxdw/?${encodeURIComponent(message)}`);
    } else {
      // Desktop link - default to "Add Friend" page which shows QR code nicely
      setHref(`https://line.me/ti/p/@221mbxdw`);
    }
  }, [courseTitle, type]);


  const handleClick = () => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      if (type === "enroll") {
        (window as any).fbq("track", "InitiateCheckout", {
          content_name: courseTitle,
          content_category: "Course Inquiry",
        });
      } else {
        (window as any).fbq("track", "Contact", {
          content_name: courseTitle,
          content_category: "Course Inquiry",
        });
      }
    }
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={handleClick}
      data-umami-event={`${type === "enroll" ? "register" : "inquiry"}-click: ${courseTitle}`}
      data-umami-event-type="click"
      data-umami-event-course={courseTitle}
    >
      {children}
    </a>
  );
}
