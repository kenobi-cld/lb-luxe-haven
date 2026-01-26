import gsap from "gsap";
import { urlFor } from "../lib/sanityImage.js";
import initModalCarousel from "./modalCarousel.js";

const { setSlides } = initModalCarousel();
export default function initProjectModal() {
  const modal = document.getElementById("project-modal");
  if (!modal) return;

  // Updated selector
  const modalContent = modal.querySelector(".modal-main");
  const closeBtn = document.getElementById("modal-close");
  const carouselContainer = document.getElementById("modal-carousel");
  const title = document.getElementById("modal-title");
  const location = document.getElementById("modal-location");
  const overview = document.getElementById("modal-overview");
  const category = document.getElementById("modal-category");
  const outcome = document.getElementById("modal-outcome");
  const scope = document.getElementById("modal-scope");

  const openModal = (project) => {
  // scope and category clearing is fine
  scope.innerHTML = "";
  category.innerHTML = "";

  // Prepare images for carousel
  const carouselImages = (project.images || []).map((img) => ({
    url: urlFor(img).width(1200).url(),
    alt: img.alt || project.title || "",
  }));

  // Inject into carousel (do NOT clear #modal-carousel itself)
  setSlides(carouselImages);

  // Fill modal content
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

  // Animate modal open
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

  // Open modal when clicking a card
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".project-card");
    if (!card) return;

    try {
      const projectData = JSON.parse(card.dataset.project);
      openModal(projectData);
    } catch (err) {
      console.error("Invalid data-project JSON:", err);
    }
  });

  // Close modal
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
  });
}
