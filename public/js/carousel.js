export default function initCarousel(selector) {
  const carousels = document.querySelectorAll(selector);
  carousels.forEach((carousel) => {
    const inner = carousel.querySelector(".carousel-inner");
    const slides = carousel.querySelectorAll(".carousel-slide");
    const prevBtn = carousel.querySelector(".carousel-btn.left");
    const nextBtn = carousel.querySelector(".carousel-btn.right");

    let index = 0;

    function showSlide(i) {
      index = (i + slides.length) % slides.length; // wrap around
      inner.style.transform = `translateX(-${index * 100}%)`;
    }

    prevBtn.addEventListener("click", () => showSlide(index - 1));
    nextBtn.addEventListener("click", () => showSlide(index + 1));

    showSlide(0);
  });
}
