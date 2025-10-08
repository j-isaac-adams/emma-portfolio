document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('section.content-section') || document.querySelector('section');
  const slides = Array.from(section.querySelectorAll('article'));

  let index = -1;
  let timeout;

  // Define patterns as "which slide indices should be visible"
  const pattern = [
    [0],          // show only slide 0
    [1, 2],       // show slide 1 + 2
    [3],          // show slide 3
    [4, 5],       // show slide 4 + 5
    [0, 3],       // show 0 + 3
    [2, 4],       // show 2 + 4
  ];

  function applyPattern() {
    index = (index + 1) % pattern.length;
    const visible = pattern[index];

    slides.forEach((slide, slideIndex) => {
      const cardInSlide = slide.querySelector('.card');

      if (visible.includes(slideIndex)) {
        slide.classList.remove('hide');
        if (cardInSlide) {
          cardInSlide.classList.remove('no-shadow');
          cardInSlide.style.removeProperty('box-shadow');
          cardInSlide.style.removeProperty('transform');
        }
      } else {
        slide.classList.add('hide');
        if (cardInSlide) {
          cardInSlide.classList.add('no-shadow');
          cardInSlide.style.setProperty('box-shadow', 'none', 'important');
          cardInSlide.style.setProperty('transform', 'none', 'important');
        }
      }
    });
  }

  function startTimer() {
    timeout = setTimeout(function tick() {
      applyPattern();
      timeout = setTimeout(tick, 3000);
    }, 3000);
  }

  // Initial render
  applyPattern();
  startTimer();

  // Allow click to advance manually
  section.addEventListener('click', () => {
    clearTimeout(timeout);
    applyPattern();
    startTimer();
  });
});
