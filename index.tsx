import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

// The gallery is plain HTML/CSS/JS in public/gallery/. This page forwards there.
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Film Diary — Dreamy Photo Gallery" },
      { name: "description", content: "Polaroid-style photo diary of nature, travel, cafes and flowers." },
      { property: "og:title", content: "The Film Diary — Dreamy Photo Gallery" },
      { property: "og:description", content: "Polaroid-style photo diary of nature, travel, cafes and flowers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    window.location.replace("/gallery/index.html");
  }, []);
  return null;
}
