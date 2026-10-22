"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

interface TrackedLinkProps extends ComponentProps<typeof Link> {
  children: ReactNode;
  eventName?: string | string[];
  eventParams?: Record<string, any>;
  umamiEvent?: string;
}

export function TrackedLink({
  children,
  eventName,
  eventParams,
  umamiEvent,
  onClick,
  ...props
}: TrackedLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== "undefined" && (window as any).fbq && eventName) {
      const names = Array.isArray(eventName) ? eventName : [eventName];
      names.forEach((name) => {
        (window as any).fbq("track", name, eventParams || {});
      });
    }

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Link
      {...props}
      onClick={handleClick}
      data-umami-event={umamiEvent}
      data-umami-event-type="click"
    >
      {children}
    </Link>
  );
}
