const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.textContent=open?'×':'☰';});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.textContent='☰';}));
const lightbox=document.querySelector('.lightbox');
const lightboxImg=lightbox.querySelector('img');
const closeLightbox=()=>{lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');lightboxImg.src='';};
document.querySelectorAll('.gallery-item').forEach(item=>item.addEventListener('click',()=>{lightboxImg.src=item.dataset.full;lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');}));
lightbox.querySelector('.lightbox-close').addEventListener('click',closeLightbox);
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox();});
document.getElementById('year').textContent=new Date().getFullYear();
// Recent Celebrations Slideshow

const slides = document.querySelectorAll('.gallery-slider .slide');
const prevButton = document.querySelector('.slider-prev');
const nextButton = document.querySelector('.slider-next');
const dotsContainer = document.querySelector('.slider-dots');

let currentSlide = 0;
let slideTimer;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });

  document.querySelectorAll('.slider-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });

  currentSlide = index;
}

slides.forEach((slide, index) => {
  const dot = document.createElement('button');
  dot.className = 'slider-dot';
  dot.setAttribute('aria-label', `Go to photo ${index + 1}`);

  dot.addEventListener('click', () => {
    showSlide(index);
    restartTimer();
  });

  dotsContainer.appendChild(dot);
});

function nextSlide() {
  showSlide((currentSlide + 1) % slides.length);
}

function previousSlide() {
  showSlide((currentSlide - 1 + slides.length) % slides.length);
}

function restartTimer() {
  clearInterval(slideTimer);
  slideTimer = setInterval(nextSlide, 3000);
}

nextButton.addEventListener('click', () => {
  nextSlide();
  restartTimer();
});

prevButton.addEventListener('click', () => {
  previousSlide();
  restartTimer();
});

showSlide(0);
restartTimer();
