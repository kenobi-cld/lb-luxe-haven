export default function initModalCarousel() {
  const carousel = document.getElementById("modal-carousel");
  if (!carousel) return;

  const inner = carousel.querySelector(".carousel-inner");
  const prevBtn = carousel.querySelector(".carousel-btn.left");
  const nextBtn = carousel.querySelector(".carousel-btn.right");

  let slides = [];
  let index = 0;

  function showSlide(i) {
    if (!slides.length) return;
    index = (i + slides.length) % slides.length; // wrap around
    inner.style.transform = `translateX(-${index * 100}%)`;
  }

  function setSlides(images) {
    inner.innerHTML = "";
    slides = images.map((img) => {
      const div = document.createElement("div");
      div.classList.add("carousel-slide", "min-w-full");
      div.innerHTML = `<img src="${img.url}" alt="${img.alt || ""}" class="w-full object-cover rounded-lg" />`;
      inner.appendChild(div);
      return div;
    });
    showSlide(0);
  }

  prevBtn.addEventListener("click", () => showSlide(index - 1));
  nextBtn.addEventListener("click", () => showSlide(index + 1));

  return { setSlides };
}
