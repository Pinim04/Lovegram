const carousel = document.querySelector('.carousel');
const cards = document.querySelector('.cards');
const cardWidth = document.querySelector('.card').offsetWidth;
const cardMargin = parseInt(getComputedStyle(document.querySelector('.card')).marginRight);

let currentIndex = 0;

function animateCarousel() {
  const cardWidth = document.querySelector('.card').offsetWidth;
  const cardMargin = parseInt(getComputedStyle(document.querySelector('.card')).marginRight);
  const newPosition = -(currentIndex * (cardWidth + cardMargin));
  cards.style.transform = `translateX(${newPosition}px)`;
}

function handleNext() {
  currentIndex++;
  if (currentIndex > cards.childElementCount - 1) {
    currentIndex = 0;
  }
  animateCarousel();
}

function handlePrev() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = cards.childElementCount - 1;
  }
  animateCarousel();
}

prevBtn.addEventListener('click', handlePrev);
nextBtn.addEventListener('click', handleNext);

carousel.addEventListener('mouseover', () => {
  carousel.classList.add('hovered');
});

carousel.addEventListener('mouseout', () => {
  carousel.classList.remove('hovered');
});

carousel.addEventListener('click', (event) => {
  if (event.clientX > carousel.getBoundingClientRect().left + carousel.offsetWidth / 2) {
    handleNext();
  } else {
    handlePrev();
  }
});