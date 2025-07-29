function openMap() {
  window.open('https://www.google.com/maps?q=Surbhi+Misthan+Varanasi', '_blank');
}

document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.swiper-track');
  const imgs = track ? track.querySelectorAll('img') : [];
  let current = 0;

  function showImage(idx) {
    if (!track || !imgs.length) return;
    
    // Loop back to start/end
    if (idx < 0) idx = imgs.length - 1;
    if (idx >= imgs.length) idx = 0;
    
    current = idx;
    track.style.transform = `translateX(-${current * 100}%)`;
  }

  const leftBtn = document.querySelector('.swiper-btn-left');
  const rightBtn = document.querySelector('.swiper-btn-right');
  
  if (leftBtn && rightBtn && imgs.length) {
    leftBtn.addEventListener('click', () => showImage(current - 1));
    rightBtn.addEventListener('click', () => showImage(current + 1));
  }

  // Touch swipe for mobile
  let startX = 0;
  let isDragging = false;

  if (track) {
    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });

    track.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
    });

    track.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      
      let endX = e.changedTouches[0].clientX;
      let diffX = startX - endX;

      if (Math.abs(diffX) > 50) {
        showImage(current + (diffX > 0 ? 1 : -1));
      }
      
      isDragging = false;
    });
  }

  // Auto slide every 4 seconds
  setInterval(() => {
    showImage(current + 1);
  }, 4000);

  // Initialize first image
  showImage(0);
});
