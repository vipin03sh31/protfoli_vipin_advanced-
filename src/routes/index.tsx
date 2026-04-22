import { createFileRoute } from "@tanstack/react-router";
import { CustomCursor } from "@/components/CustomCursor";
import { Loader } from "@/components/Loader";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Vipin Sharma — Full-Stack & Embedded Engineer" },
      {
        name: "description",
        content:
          "Cinematic portfolio of Vipin Sharma — Electronics Engineering student crafting intelligent web experiences, embedded systems and creative interfaces.",
      },
      { property: "og:title", content: "Vipin Sharma — Portfolio" },
      {
        property: "og:description",
        content: "Immersive 3D portfolio · React, Next.js, Python, ESP32, VLSI.",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="relative min-h-screen">
      <Loader />
      <CustomCursor />
      <Navbar />
      <main className="noise">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
