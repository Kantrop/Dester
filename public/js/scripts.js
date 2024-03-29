// header menu workaround
const headerButton = document.querySelector(".header-menu-toggler");
let timer;
const ANIMATION_DURATION = 500;

const toggleClassWithAnimationDelay = ({ el, btn, extra, onOpenStart, onCloseStart, onCloseEnd }) => {
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
        onCloseStart?.();
        el.classList.remove("closing");
        extra?.classList.remove("closing");
        el.style.removeProperty("width");
        timer = clearTimeout(timer);
        onCloseEnd?.();
      }, ANIMATION_DURATION);
  } else {
    onOpenStart?.();
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

headerButton?.addEventListener("click", (e) => {
  const headerMenu = document.querySelector("#headerMenu");
  const header = document.querySelector(".header");
  toggleClassWithAnimationDelay({
    el: headerMenu,
    btn: headerButton,
    extra: header,
  });
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
socialOverlayBtn?.addEventListener("click", () => {
  if (window.innerWidth < 992) {
    toggleClassWithAnimationDelay({ el: socialOverlay, btn: socialOverlayBtn });
  }
});
document.addEventListener("click", (e) => {
  if (
    e.target === socialOverlay &&
    socialOverlay?.classList.contains("opened")
  ) {
    toggleClassWithAnimationDelay({ el: socialOverlay, btn: socialOverlayBtn });
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
    window.scroll(0, targetItem?.offsetTop - 100);
  })
);

const handleHash = () => {
  const pagehash = window.location.hash;
  if (!pagehash) {
    return;
  }
  const activeItems = document.querySelectorAll(`.by-hash .active`);
  const items = document.querySelectorAll(`.by-hash [href="${pagehash}"]`);

  Array.from(activeItems).forEach((item) => item.classList.remove("active"));
  Array.from(items).forEach((item) => item.classList.add("active"));

  const targetItem = document.querySelector(pagehash);
  window.scroll(0, targetItem?.offsetTop - 100);
};
handleHash(); // move to onLoad listener?
window.addEventListener("popstate", handleHash);
//

const inputNumbers = document.querySelectorAll(`.spinner input`);
Array.from(inputNumbers).forEach((item) => {
  const step = item.getAttribute("step") || "0.0";
  const max = item.getAttribute("max");
  const min = item.getAttribute("min");
  const comma = step.split(".")[1] || '';
  const stepNumber = +step;
  const maxLimit = max ? Number(max) : Infinity;
  const minLimit = min ? Number(min) : -Infinity;

  item.parentNode.querySelector(".up")?.addEventListener("click", () => {
    const newValue = +item.value + stepNumber; 
    if (newValue <= maxLimit && newValue >= minLimit) {
      item.value = newValue.toFixed(comma.length);
    }
  });
  item.parentNode.querySelector(".down")?.addEventListener("click", () => {
    const newValue = +item.value - stepNumber; 
    if (newValue <= maxLimit && newValue >= minLimit) {
      item.value = newValue.toFixed(comma.length);
    }
  });
});

// hide socials on field focus
document
  .querySelectorAll("input:not([type=checkbox]):not([type=radio])")
  .forEach((input) => {
    input.addEventListener("focus", (e) => {
      body.classList.add("focused");
    });
    input.addEventListener("blur", (e) => {
      body.classList.remove("focused");
    });
  });
if (window.$) {
  $("select").on("select2:close", function (e) {
    body.classList.remove("focused");
  });
  $("select").on("select2:opening", function (e) {
    body.classList.add("focused");
  });
}
//

// orderlist info tooltip
document.querySelectorAll(".order-item-stage").forEach((order) => {
  order.addEventListener("mouseover", function () {
    const popup = this.querySelector(".order-item-stage-popup");
    const topOffset = popup.getBoundingClientRect().top;

    if (topOffset < 90) {
      popup.classList.add("to-bottom");
    }
  });
  order.addEventListener("mouseleave", function () {
    const popup = this.querySelector(".order-item-stage-popup");
    popup.classList.remove("to-bottom");
  });
});
//

// handle collapse with save sizes
const saveCollapseBtns = document.querySelectorAll("[data-target=saveSizesCollapse]");
const saveCollapseOverlay = document.querySelector("#saveSizesCollapseOverlay");
Array.from(saveCollapseBtns).forEach((collapseBtn) => {
  collapseBtn.addEventListener("click", () => {
    toggleClassWithAnimationDelay({
      el: saveCollapseOverlay,
      btn: collapseBtn,
      onOpenStart: () => {
        saveCollapseOverlay.style.width = `${saveCollapseOverlay.getBoundingClientRect().width}px`;
      },
      onCloseStart: () => {
        const targetHeight = saveCollapseOverlay.querySelector('*').getBoundingClientRect().height;
        saveCollapseOverlay.style.height = `${targetHeight}px`;
        saveCollapseOverlay.style.removeProperty('width');
      },
    });
  });
});
//

// handle basic collapse 
const basicCollapseBtns = document.querySelectorAll("[data-target=basicCollapse]");
const basicCollapseOverlay = document.querySelector("#basicCollapseOverlay");
Array.from(basicCollapseBtns).forEach((collapseBtn) => {
  collapseBtn.addEventListener("click", () => {
    toggleClassWithAnimationDelay({ el: basicCollapseOverlay, btn: collapseBtn });
  });
});
//


// email subscribe
document.querySelectorAll('.emailSubscribtionForm').forEach((form) => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const success = `
        <div class="row">
          <div class="col-xs-9 position-relative">
            <div class="h2">
              Thank you!
              <br>
              Your submission has been received!
              <div class="subscribe-letter"></div>
            </div>
          </div>
        </div>
    `
    const failure = this.querySelector('.invalid-feedback');
    failure.style.display = 'none'

    const handleSuccess = () => {
      this.innerHTML = success;
    }

    const data = new FormData(e.target);
    const sendFormat = {
      email_address: data.get('email'),
      status: "subscribed",
      merge_fields: {
        "FNAME": data.get('name'),
        "LNAME": ""
      }
    }
  
    fetch('https://us21.api.mailchimp.com/3.0/lists/02ffb86bbc/members', {
      method: "POST",
      headers: {
        'Authorization': 'Bearer 8cfa163f394224ac1a693cf07ca879d9-us21', 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendFormat)
    }).then(async (response) => {
      let data = await response.json()
      if(data.status === 'subscribed' || data.title === 'Member Exists') {
        handleSuccess()
      } else {
        failure.style.display = 'block'
      }
    }).catch(() => failure.style.display = 'block')
  })
})

// show modal window on start
const modalNode = document.querySelector('.modal-emailSubscription');
const modal = modalNode && new bootstrap.Modal(modalNode);
modalNode?.addEventListener('hide.bs.modal', () => {
  localStorage.setItem('subscribeShown', 'true')
});

setTimeout(() => {
  const isWasShown = localStorage.getItem('subscribeShown')=== 'true';

  if(!isWasShown) {
    modal?.show();
  }
}, 30 * 1000)