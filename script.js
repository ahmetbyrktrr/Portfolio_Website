//////////////////////////////////////////////////////////
// Variables /////////////////////////////////////////////
//////////////////////////////////////////////////////////

const nav = document.querySelector(".header_nav");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--projects");
const sliderr = document.querySelector(".slider");
const slides = sliderr.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider_btn--left");
const btnRight = document.querySelector(".slider_btn--right");
const dotContainer = document.querySelector(".dots");
const maxSlide = slides.length;
const tabs = document.querySelectorAll(".skills_tab");
const tabsContainer = document.querySelector(".skills_tab_container");
const tabsContent = document.querySelectorAll(".skills_content");
const imgTargets = document.querySelectorAll("img[data-src]");
const navHeight = nav.getBoundingClientRect().height;

//////////////////////////////////////////////////////////
// Page Navigation ///////////////////////////////////////
//////////////////////////////////////////////////////////

document.querySelectorAll(".nav_link").forEach(function (el) {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    const id = this.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  });
});

//////////////////////////////////////////////////////////
// Navbar fade animation /////////////////////////////////
//////////////////////////////////////////////////////////

const handleHover = function (e) {
  if (e.target.classList.contains("nav_link")) {
    const link = e.target;
    const siblings = link.closest(".header_nav").querySelectorAll(".nav_link");
    const logo = link.closest(".header_nav").querySelector(".head_logo");

    if (!logo) return;

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

//////////////////////////////////////////////////////////
// Sticky navbar fade effect /////////////////////////////
//////////////////////////////////////////////////////////

const headerObserver = new IntersectionObserver(
  function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) nav.classList.add("sticky");
    else nav.classList.remove("sticky");
  },
  {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
  },
);

headerObserver.observe(section1);

//////////////////////////////////////////////////////////
// Button Scroll To Section-1 ////////////////////////////
//////////////////////////////////////////////////////////

btnScrollTo.addEventListener("click", function (e) {
  e.preventDefault();

  section1.scrollIntoView({ behavior: "smooth" });

  //   const s1coords = section1.getBoundingClientRect();

  //   window.scrollTo({
  //     left: s1coords.left + window.pageXOffset,
  //     top: s1coords.top + window.pageYOffset,
  //     behavior: "smooth",
  //   });
});

//////////////////////////////////////////////////////////
// Project Section (Slider) //////////////////////////////
//////////////////////////////////////////////////////////

const slider = function () {
  let curSlide = 0;

  const createDots = function () {
    slides.forEach(function (s, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots_dot" data-slide="${i}"></button>`,
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots_dot")
      .forEach((dot) => dot.classList.remove("dots_dot--active"));

    document
      .querySelector(`.dots_dot[data-slide="${slide}"]`)
      .classList.add("dots_dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`),
    );
  };

  // Next slide

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots_dot")) {
      curSlide = Number(e.target.dataset.slide);
      goToSlide(curSlide);
      activateDot(curSlide);
    }
  });
};
slider();

//////////////////////////////////////////////////////////
//Project Image Slider ///////////////////////////////////
//////////////////////////////////////////////////////////

document.querySelectorAll(".project_image_container").forEach((container) => {
  const slidesWrapper = container.querySelector(".project_images");
  const slides = container.querySelectorAll(".project_image");
  const btnLeft = container.querySelector(".project_btn--left");
  const btnRight = container.querySelector(".project_btn--right");

  let curSlide = 0;
  const maxSlide = slides.length;

  const goToSlide = (slide) => {
    slidesWrapper.style.transform = `translateX(-${slide * 100}%)`;
  };

  btnRight.addEventListener("click", () => {
    curSlide = curSlide === maxSlide - 1 ? 0 : curSlide + 1;
    goToSlide(curSlide);
  });

  btnLeft.addEventListener("click", () => {
    curSlide = curSlide === 0 ? maxSlide - 1 : curSlide - 1;
    goToSlide(curSlide);
  });

  goToSlide(0);
});

//////////////////////////////////////////////////////////
// Skills Section ////////////////////////////////////////
//////////////////////////////////////////////////////////

if (tabsContainer) {
  tabsContainer.addEventListener("click", function (e) {
    const clicked = e.target.closest(".skills_tab");

    //Guard clause
    if (!clicked) return;

    //Remove active classes
    tabs.forEach((t) => t.classList.remove("skills_tab--active"));
    tabsContent.forEach((c) => c.classList.remove("skills_content--active"));

    //Activate tab
    clicked.classList.add("skills_tab--active");
    //Activate content area
    document
      .querySelector(`.skills_content--${clicked.dataset.tab}`)
      .classList.add("skills_content--active");
  });
}

//////////////////////////////////////////////////////////
// Lazy Loading Images ///////////////////////////////////
//////////////////////////////////////////////////////////

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy_img");
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "-200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));
