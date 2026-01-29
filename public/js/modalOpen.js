import { gsap } from "gsap";
import { urlFor } from "../../src/lib/sanityImage"

export default function initProjectModal() {
  if (typeof document === "undefined") return;

  // init carousel AFTER client load
  const carouselApi = initModalCarousel();
  if (!carouselApi) return;

  const { setSlides } = carouselApi;

  const modal = document.getElementById("project-modal");
  if (!modal) return;

  const modalContent = modal.querySelector(".modal-main");
  const closeBtn = document.getElementById("modal-close");
  const title = document.getElementById("modal-title");
  const location = document.getElementById("modal-location");
  const overview = document.getElementById("modal-overview");
  const category = document.getElementById("modal-category");
  const outcome = document.getElementById("modal-outcome");
  const scope = document.getElementById("modal-scope");

  const openModal = (project) => {
    scope.innerHTML = "";
    category.innerHTML = "";

    const carouselImages = (project.images || []).map((img) => ({
      url: urlFor(img).width(1200).url(),
      alt: img.alt || project.title || "",
    }));

    setSlides(carouselImages);

    title.textContent = project.title;
    location.textContent = project.location || "";
    overview.textContent = project.modal?.overview || "";
    category.textContent = project?.category || "";
    outcome.textContent = project.modal?.outcome || "";

    project.modal?.scope?.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      scope.appendChild(li);
    });

    modal.classList.remove("hidden");
    modal.classList.add("flex");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("overflow-hidden", "pr-3");

    gsap.set(modalContent, { opacity: 0, scale: 0.9, y: 40 });
    gsap.to(modalContent, { opacity: 1, scale: 1, y: 0, duration: 0.25, ease: "power3.out" });
    gsap.fromTo(modal, { opacity: 0 }, { opacity: 1, duration: 0.3 });
  };

  const closeModal = () => {
    gsap.to(modalContent, {
      opacity: 0,
      scale: 0.9,
      y: 40,
      duration: 0.2,
      ease: "power3.in",
      onComplete: () => {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("overflow-hidden", "pr-3");
      },
    });
    gsap.to(modal, { opacity: 0, duration: 0.2 });
  };

  document.addEventListener("click", (e) => {
    const card = e.target.closest(".project-card");
    if (!card) return;

    try {
      openModal(JSON.parse(card.dataset.project));
    } catch (err) {
      console.error("Invalid data-project JSON:", err);
    }
  });

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => e.target === modal && closeModal());
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
  });
}

function initModalCarousel() {
  const carousel = document.getElementById("modal-carousel");
  if (!carousel) return;

  const inner = carousel.querySelector(".carousel-inner");
  const prevBtn = carousel.querySelector(".carousel-btn.left");
  const nextBtn = carousel.querySelector(".carousel-btn.right");

  let slides = [];
  let index = 0;

  function showSlide(i) {
    if (!slides.length) return;
    index = (i + slides.length) % slides.length;
    inner.style.transform = `translateX(-${index * 100}%)`;
  }

  function setSlides(images) {
    inner.innerHTML = "";
    slides = images.map((img) => {
      const div = document.createElement("div");
      div.className = "carousel-slide min-w-full";
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
