import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const cards = gsap.utils.toArray(".gsap-card");

  cards.forEach((card) => {
    gsap.fromTo(
      card,
      {
        opacity: 0,
        filter: "blur(6px)",
        y: 24
      },
      {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          once: true
        }
      }
    );
  });

  ScrollTrigger.refresh();
});
