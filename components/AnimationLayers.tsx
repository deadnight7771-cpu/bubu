"use client";

import dynamic from "next/dynamic";

// These components use browser-only APIs (window), so ssr: false is needed.
// This wrapper is a Client Component, which allows ssr: false with next/dynamic.
const BackgroundHearts   = dynamic(() => import("@/components/BackgroundHearts"),   { ssr: false });
const FloatingCharacters = dynamic(() => import("@/components/FloatingCharacters"), { ssr: false });

export default function AnimationLayers() {
  return (
    <>
      <BackgroundHearts />
      <FloatingCharacters />
    </>
  );
}
