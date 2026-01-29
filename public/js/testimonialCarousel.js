import {gsap} from "gsap";

if (typeof window !== "undefined")  {
  const track = document.querySelector(".testimonial-track");
  const slides = gsap.utils.toArray(".testimonial-slide");
  const prevBtn = document.querySelector(".testimonial-prev");
  const nextBtn = document.querySelector(".testimonial-next");

  let index = 0;
  const total = slides.length;

  // Ensure correct width
  function updatePosition(animate = true) {
    const x = -index * 100;

    gsap.to(track, {
      xPercent: x,
      duration: animate ? 0.6 : 0,
      ease: "power2.out"
    });
  }

  nextBtn?.addEventListener("click", () => {
    index = (index + 1) % total;
    updatePosition();
  });

  prevBtn?.addEventListener("click", () => {
    index = (index - 1 + total) % total;
    updatePosition();
  });

  // Init
  gsap.set(track, { xPercent: 0 });
}