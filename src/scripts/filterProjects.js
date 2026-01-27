import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".filter-btn");
  const items = gsap.utils.toArray(".project-item");
  const noResults = document.getElementById("no-results");

  let activeFilter = "all";

  gsap.set(items, { height: "auto", opacity: 1, scale: 1 });

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      if (!filter || filter === activeFilter) return;
      activeFilter = filter;

      // Active button styles
      buttons.forEach((btn) => {
        btn.classList.remove("bg-black", "text-white", "border-black");
        btn.classList.add("border-gray-600", "text-gray-700");
      });

      button.classList.add("bg-black", "text-white", "border-black");
      button.classList.remove("border-gray-600", "text-gray-700");

      let visibleCount = 0;

      items.forEach((item) => {
        const tags = (item.dataset.tags || "")
          .toLowerCase()
          .split(",");

        const match = filter === "all" || tags.includes(filter);

        if (match) {
          visibleCount++;
          gsap.to(item, {
            autoAlpha: 1,
            scale: 1,
            height: "auto",
            duration: 0.45,
            ease: "power2.out",
            clearProps: "height"
          });
        } else {
          gsap.to(item, {
            autoAlpha: 0,
            scale: 0.96,
            height: 0,
            duration: 0.35,
            ease: "power2.in"
          });
        }
      });

      if (noResults) {
        noResults.classList.toggle("hidden", visibleCount !== 0);
      }

      gsap.delayedCall(0.5, () => {
        ScrollTrigger.refresh();
      });
    });
  });
});
