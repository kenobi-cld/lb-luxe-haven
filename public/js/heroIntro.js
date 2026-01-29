import {gsap} from "gsap";

if (typeof window !== "undefined")  {
  const hero = document.querySelector(".gsap-hero");

  gsap.fromTo(
    hero,
    {
      opacity: 0.75,
      scale: 0.8
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
      clearProps: "transform"
    }
  );
}