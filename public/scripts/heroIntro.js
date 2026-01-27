import {gsap} from "gsap";

document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".gsap-hero");
  if (!hero) return;

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
});
