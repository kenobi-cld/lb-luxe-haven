import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  // Text blocks (headings, paragraphs, buttons)
  gsap.utils.toArray(".gsap-text").forEach((el) => {
    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: 24
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true
        }
      }
    );
  });

  // Larger grouped blocks (sections)
  gsap.utils.toArray(".gsap-block").forEach((block) => {
    gsap.fromTo(
      block,
      {
        opacity: 0,
        scale: 0.96
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: block,
          start: "top 80%",
          once: true
        }
      }
    );
  });

  // Optional image reveal
  gsap.utils.toArray(".gsap-image").forEach((img) => {
    gsap.fromTo(
      img,
      {
        opacity: 0,
        scale: 1.05
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: img,
          start: "top 85%",
          once: true
        }
      }
    );
  });
});
