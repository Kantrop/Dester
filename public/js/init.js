var swiperReview = new Swiper(".swiper-reviews", {
  slidesPerView: 1,
  spaceBetween: 10,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    550: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    700: {
      slidesPerView: 2,
      spaceBetween: 0,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 0,
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
var swiperPhotos = new Swiper(".swiper-photos", {
  slidesPerView: "auto",
  spaceBetween: 20,
  watchSlidesProgress: true,
  speed: 600,
  lazy: {
    loadOnTransitionStart: !0,
    loadPrevNext: !0,
    loadPrevNextAmount: 4,
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: !1,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

setAdaptiveSwiper = (selector, width = 575, options = {}) => {
  let swiperList;
  if (window.innerWidth <= width) {
    if (swiperList) {
      return;
    }
    swiperList = new Swiper(selector, {
      slidesPerView: 1,
      spaceBetween: 8,
      pagination: {
        el: `${selector} .swiper-pagination`,
        clickable: true,
      },
      ...options,
    });
  } else {
    if (swiperList) {
      swiperList.destroy();
      swiperList = null;
      isListSwiperExists = false;
    }
  }
};

setAdaptiveSwiper(".swiper-list");
setAdaptiveSwiper(".swiper-tabs", 768, {
  slidesPerView: "auto",
  noSwiping: false,
});
window.addEventListener("resize", () => {
  setAdaptiveSwiper(".swiper-list");
  setAdaptiveSwiper(".swiper-tabs", 768, {
    slidesPerView: "auto",
    noSwiping: false,
  });
});

// Bootstrap popoper
const popoverTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="popover"]')
);
const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl);
});
const popoverElements = document.querySelectorAll(".popover-dismiss");
const popoverDismissNodeList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="popover"]')
);
const popoverDismissList = popoverDismissNodeList.map(function (
  popoverTriggerEl
) {
  return new bootstrap.Popover(popoverTriggerEl, {
    trigger: "focus",
  });
});

// custom selects
$("select")?.select2?.({
  minimumResultsForSearch: -1,
});

Fancybox?.bind('[data-fancybox="swiper-photos"]', {
  Hash: !1,
  Toolbar: {
    right: ["counter", "zoom", "fullscreen", "close", "left"],
  },
  Thumbs: !1,
  on: {
    reveal: function () {
      swiperPhotos.autoplay &&
        swiperPhotos.autoplay.running &&
        swiperPhotos.autoplay.pause();
    },
    closing: function () {
      swiperPhotos.autoplay &&
        swiperPhotos.autoplay.running &&
        swiperPhotos.autoplay.run();
    },
  },
});