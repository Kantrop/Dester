const headerButton = document.querySelector(".header-menu-toggler");
let timer;
const ANIMATION_DURATION = 500;

// TODO rewrite extra
const toggleClassWithAnimationDelay = (el, btn, extra) => {
  if (timer) {
    return;
  }
  if (el.classList.contains("opened")) {
    el.classList.add("closing");
    el.classList.remove("opened");

    extra?.classList.add("closing");
    extra?.classList.remove("opened");

    btn.classList.add("collapsed");
    timer =
      !timer &&
      setTimeout(() => {
        el.classList.remove("closing");
        extra?.classList.remove("closing");
        timer = clearTimeout(timer);
      }, ANIMATION_DURATION);
  } else {
    el.classList.add("opening");
    extra?.classList.add("opening");
    btn.classList.remove("collapsed");
    timer =
      !timer &&
      setTimeout(() => {
        el.classList.remove("opening");
        el.classList.add("opened");
        extra?.classList.remove("opening");
        extra?.classList.add("opened");
        timer = clearTimeout(timer);
      }, ANIMATION_DURATION);
  }
};

headerButton.addEventListener("click", (e) => {
  const headerMenu = document.querySelector("#headerMenu");
  const header = document.querySelector(".header");
  toggleClassWithAnimationDelay(headerMenu, headerButton, header);
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
  if (window.innerWidth < 992) {
    toggleClassWithAnimationDelay(socialOverlay, socialOverlayBtn);
  }
});

const hashItems = document.querySelectorAll(`.by-hash .nav-link`);
Array.from(hashItems).forEach(item => item.addEventListener('click', function(e) {
  e.preventDefault();
  const hash = this.getAttribute('href')
  console.log('click', hash)
  document.querySelector(hash).scrollIntoView({ 
    behavior: 'smooth' 
  });
  window.scrollBy(0, -100);
})
);

const handleHash = () => {
  const pagehash = window.location.hash;
  const activeItems = document.querySelectorAll(`.by-hash .active`);
  const items = document.querySelectorAll(`.by-hash [href="${pagehash}"]`);
  Array.from(activeItems).map(item => item.classList.remove('active'))
  Array.from(items).map(item => item.classList.add('active'))
}
handleHash()
window.addEventListener('popstate', handleHash);