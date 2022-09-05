// header menu workaround
const headerButton = document.querySelector(".header-menu-toggler");
let timer;
const ANIMATION_DURATION = 500;

const toggleClassWithAnimationDelay = (el, btn, extra) => {
  // TODO rewrite extra
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
//

// toggle scrolled flag
const body = document.querySelector("body");
document.addEventListener("scroll", () => {
  if (window.scrollY > 1) {
    body.classList.add("scrolled");
  } else {
    body.classList.remove("scrolled");
  }
});
//

// handle overlay
const socialOverlayBtn = document.querySelector("[data-target=socialOverlay]");
const socialOverlay = document.querySelector("#socialOverlay");
socialOverlayBtn.addEventListener("click", () => {
  if (window.innerWidth < 992) {
    toggleClassWithAnimationDelay(socialOverlay, socialOverlayBtn);
  }
});
//

// scroll to anchor
const hashItems = document.querySelectorAll(`.by-hash .nav-link`);
Array.from(hashItems).forEach((item) =>
  item.addEventListener("click", function (e) {
    e.preventDefault();
    const hash = this.getAttribute("href");
    window.location.hash = hash;
    const targetItem = document.querySelector(hash);
    window.scroll(0, targetItem.offsetTop - 100);
  })
);

const handleHash = () => {
  const pagehash = window.location.hash;
  if(!pagehash) {
    return
  }
  const activeItems = document.querySelectorAll(`.by-hash .active`);
  const items = document.querySelectorAll(`.by-hash [href="${pagehash}"]`);

  Array.from(activeItems).forEach((item) => item.classList.remove("active"));
  Array.from(items).forEach((item) => item.classList.add("active"));

  const targetItem = document.querySelector(pagehash);
  window.scroll(0, targetItem.offsetTop - 100);
};
handleHash(); // move to onLoad listener?
window.addEventListener("popstate", handleHash);
//


const inputNumbers = document.querySelectorAll(`.spinner input`)
Array.from(inputNumbers).forEach((item) => {
  const step = item.getAttribute('step') || '0.0';
  const stepNumber = +step;
  item.parentNode.querySelector('.up').addEventListener('click', () => {
    item.value = (+item.value + stepNumber).toFixed(step.length - 2)
  })
  item.parentNode.querySelector('.down').addEventListener('click', () => {
    item.value = (+item.value - stepNumber).toFixed(step.length - 2)
  })
});

document.querySelectorAll('input:not([type=checkbox]):not([type=radio]), .select2-selection.select2-selection--single').forEach((input) => {
  input.addEventListener("focus", (e) => {
    console.log('focus', e)
    body.classList.add('focused');
  });
  input.addEventListener("blur", (e) => {
    console.log('blur', e)
    body.classList.remove('focused');
  });
})
$?.('select').on("select2:close", function(e) {
  console.log('remove')
  body.classList.remove('focused');
}); 