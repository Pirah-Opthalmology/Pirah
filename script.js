const header = document.querySelector("[data-elevate]");
const nav = document.querySelector("#site-nav");
const menuButton = document.querySelector(".menu-button");
const year = document.querySelector("#year");
const slides = [...document.querySelectorAll(".carousel-slide")];
const dots = [...document.querySelectorAll("[data-carousel-dot]")];
const prevButton = document.querySelector("[data-carousel-prev]");
const nextButton = document.querySelector("[data-carousel-next]");
let activeSlide = 0;
let carouselTimer;

const setHeaderState = () => {
  header.classList.toggle("is-elevated", window.scrollY > 12);
};

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();
year.textContent = new Date().getFullYear();

const showSlide = (index) => {
  if (!slides.length) {
    return;
  }

  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === activeSlide);
  });
  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === activeSlide);
  });
};

const startCarousel = () => {
  clearInterval(carouselTimer);
  carouselTimer = setInterval(() => showSlide(activeSlide + 1), 5200);
};

prevButton?.addEventListener("click", () => {
  showSlide(activeSlide - 1);
  startCarousel();
});

nextButton?.addEventListener("click", () => {
  showSlide(activeSlide + 1);
  startCarousel();
});

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    showSlide(Number(dot.dataset.carouselDot));
    startCarousel();
  });
});

showSlide(0);
startCarousel();
