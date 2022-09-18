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

let swiperList;
setAdaptiveSwiper = (width) => {
  if (window.innerWidth <= width) {
    if (swiperList) {
      return;
    }
    swiperList = new Swiper(".swiper-list", {
      slidesPerView: 1,
      spaceBetween: 8,
      pagination: {
        el: ".swiper-list .swiper-pagination",
        clickable: true,
      },
    });
  } else {
    if (swiperList) {
      swiperList.destroy();
      swiperList = null;
      isListSwiperExists = false;
    }
  }
};

setAdaptiveSwiper(575);
window.addEventListener("resize", () => {
  setAdaptiveSwiper(575);
});

var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})
var popover = new bootstrap.Popover(
  document.querySelector(".popover-dismiss"),
  {
    trigger: "focus",
  }
);