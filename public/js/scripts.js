const headerButton = document.querySelector(".header-menu-toggler");
let timer;
const ANIMATION_DURATION = 500;

const toggleClassWithAnimationDelay = (el, btn) => {
  if (timer) {
    return;
  }
  if (el.classList.contains("opened")) {
    el.classList.add("closing");
    el.classList.remove("opened");
    btn.classList.add("collapsed");
    timer =
      !timer &&
      setTimeout(() => {
        el.classList.remove("closing");
        timer = clearTimeout(timer);
      }, ANIMATION_DURATION);
  } else {
    el.classList.add("opening");
    btn.classList.remove("collapsed");
    timer =
      !timer &&
      setTimeout(() => {
        el.classList.remove("opening");
        el.classList.add("opened");
        timer = clearTimeout(timer);
      }, ANIMATION_DURATION);
  }
};

headerButton.addEventListener("click", (e) => {
  const headerMenu = document.querySelector("#headerMenu");
  toggleClassWithAnimationDelay(headerMenu, headerButton);
});

const body = document.querySelector("body");
document.addEventListener("scroll", () => {
  if (window.scrollY > 1) {
    body.classList.add("scrolled");
  } else {
    body.classList.remove("scrolled");
  }
});

const socialOverlayBtn = document.querySelector("[data-target=socialOverlay]");
const socialOverlay = document.querySelector("#socialOverlay");
socialOverlayBtn.addEventListener("click", () => {
  toggleClassWithAnimationDelay(socialOverlay, socialOverlayBtn);
});
