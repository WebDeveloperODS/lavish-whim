"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { pageview } from "app/lib/facebook-pixels";

export default function PixelTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    pageview();
  }, [pathname, searchParams]);

  return null;
}
