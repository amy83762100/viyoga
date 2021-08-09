'use strict';
let logo = 'favicon.8076570f.png';

const nav = document.querySelector('.header__navigation');
const sliders = function () {
  let currentSlide = 0;
  const btnRight = document.querySelector('.slider__btn--right');
  const btnLeft = document.querySelector('.slider__btn--left');
  const slides = document.querySelectorAll('.slide');
  const maxSlide = slides.length - 1;
  const goToSlide = function () {
    slides.forEach(
      (slide, i) =>
        (slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`)
    );
  };
  const dotsContainer = document.querySelector('.dots');
  const creatDots = function () {
    slides.forEach((_, i) =>
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data--slide="${i}"></button>`
      )
    );
  };
  const activeDot = function () {
    document
      .querySelectorAll('.dots__dot')
      .forEach((dot) => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data--slide="${currentSlide}"]`)
      .classList.add('dots__dot--active');
  };
  const nextSlide = function () {
    currentSlide++;
    if (currentSlide > maxSlide) currentSlide = 0;
    goToSlide();
    activeDot();
  };
  const prevSlide = function () {
    currentSlide--;
    if (currentSlide === -1) currentSlide = maxSlide;
    goToSlide();
    activeDot();
  };

  creatDots();
  goToSlide();
  activeDot();
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);
  document.addEventListener('keydown', function (event) {
    event.key === 'ArrowRight' && nextSlide();
    event.key === 'ArrowLeft' && prevSlide();
  });
  dotsContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('dots__dot')) {
      const { Slide } = event.target.dataset;
      currentSlide = Slide;
      goToSlide();
      activeDot();
    }
  });
};
const navLinkEffect = function () {
  const handleMover = function (event) {
    if (event.target.classList.contains('nav_link')) {
      const link = event.target;
      const siblings = link
        .closest('.header__navigation')
        .querySelectorAll('.nav_link');
      siblings.forEach((l) => {
        if (l !== link) l.style.opacity = this;
      });
    }
  };
  nav.addEventListener('mouseover', handleMover.bind(0.5));
  nav.addEventListener('mouseout', handleMover.bind(1));
};
const stickyNavBar = function () {
  const navHeight = nav.getBoundingClientRect().height;
  const header = document.querySelector('.header');
  const stickyNav = function (entrise) {
    const [entry] = entrise;
    //console.log(navHeight);
    !entry.isIntersecting
      ? nav.classList.add('sticky')
      : nav.classList.remove('sticky');
  };
  const headerObserve = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0.15,
    rootMargin: `-${navHeight}px`,
  });
  headerObserve.observe(header);
};
const scrollToEffect = function () {
  const sectionAbout = document.querySelector('#section-about');
  const sectionPractice = document.querySelector('#section-practice');
  const sectionCourses = document.querySelector('#section-courses');
  document
    .querySelector('.toSectionAbout')
    .addEventListener('click', function (event) {
      event.preventDefault();
      sectionAbout.scrollIntoView({ behavior: 'smooth' });
    });
  document
    .querySelector('.toSectionCourses')
    .addEventListener('click', function (event) {
      event.preventDefault();
      sectionCourses.scrollIntoView({ behavior: 'smooth' });
    });

  const scrollSmooth = function (event) {
    event.preventDefault();
    const id = event.target.getAttribute('href');
    //document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    const coords = document.querySelector(id).getBoundingClientRect();
    window: scrollTo({
      left: coords.left + window.pageXOffset,
      top: coords.top + window.pageYOffset,
      behavior: 'smooth',
    });
  };
  document
    .querySelector('.navigation__list')
    .addEventListener('click', function (event) {
      if (event.target.classList.contains('navigation__link')) {
        scrollSmooth(event);
        document.querySelector('.navigation__checkbox').checked = false;
      }
    });
  document.querySelector('.menu').addEventListener('click', function (event) {
    if (
      event.target.classList.contains('nav_link') &&
      !event.target.classList.contains('nav_link-btn')
    ) {
      scrollSmooth(event);
    }
  });
};
const fadeIn = function () {
  const practiceBox = document.querySelector('.practice-box');
  const coursesBoxs = document.querySelectorAll('.courses-box');
  const showSection = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    //console.log(entries);
    entries.forEach((entry) =>
      entry.target.classList.remove('section--hidden')
    );
    //console.log(observer);
    observer.unobserve(entry.target);
  };
  const sectionObserve = new IntersectionObserver(showSection, {
    root: null,
    threshold: 0.15,
  });
  sectionObserve.observe(practiceBox);
  practiceBox.classList.add('section--hidden');
  coursesBoxs.forEach((coursesBox) => {
    sectionObserve.observe(coursesBox);
    coursesBox.classList.add('section--hidden');
  });
};
const toggleClassCheckbox = function () {
  const checkbox = document.querySelector('.classes__checkbox');
  document.querySelector('body').addEventListener('click', function (event) {
    if (
      !event.target.classList.contains('classes__checkbox') &&
      !event.target.classList.contains('nav_link-btn')
    ) {
      if (checkbox.checked) checkbox.checked = false;
    }
  });
};
const loadMap = function () {
  const map = L.map('map').setView([13.7285349, 100.5335829], 17);

  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  const viyogaIcon = L.icon({
    iconUrl: logo,

    iconSize: [50, 50], // size of the icon
    iconAnchor: [25, 50], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -50], // point from which the popup should open relative to the iconAnchor
  });
  L.marker([13.7285349, 100.5335829], { icon: viyogaIcon })
    .addTo(map)
    .bindPopup('VIONA YOGA')
    .openPopup();
};
const openAccount = function () {
  const modal = document.querySelector('.modal');
  const overlay = document.querySelector('.overlay');
  const btnCloseModal = document.querySelector('.btn-close-modal');
  const btnOpenModal = document.querySelectorAll('.btn-show-modal');
  const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
  };
  const openModal = function (event) {
    event.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  };
  btnCloseModal.addEventListener('click', closeModal);
  btnOpenModal.forEach((btn) => btn.addEventListener('click', openModal));
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !modal.classList.contains('hidden'))
      closeModal();
  });
};
const closeModal = function () {
  const popup = document.querySelector('.popup');
  if (popup.classList.contains('hidden')) {
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') popup.classList.add('hidden');
    });
    document
      .querySelector('.popup__close')
      .addEventListener('click', function () {
        popup.classList.add('hidden');
      });
    document
      .querySelector('.popup')
      .addEventListener('click', function (event) {
        if (!event.target.closest('.popup__content'))
          popup.classList.add('hidden');
      });
    // document
    //   .querySelector(".btn--submit")
    //   .addEventListener("click", function () {
    //     popup.classList.add("hidden");
    //   });
  }
  document.querySelectorAll('.btn--white--small').forEach((btn) =>
    btn.addEventListener('click', function (event) {
      popup.classList.remove('hidden');
      const { Course: course } = event.target.dataset;
      const popupTitle = document.querySelector('.popup--title');
      popupTitle.textContent =
        course === '0' ? `Contact Me` : `Booking - ${course} Course`;
      const courseType = document.getElementById("courseType");
      courseType.value = course === '0' ? `Private` : `Booking - ${course} Course`;
      console.log(courseType.value);
    })
  );
};

toggleClassCheckbox();
navLinkEffect();
stickyNavBar();
scrollToEffect();
sliders();
fadeIn();
loadMap();
closeModal();
