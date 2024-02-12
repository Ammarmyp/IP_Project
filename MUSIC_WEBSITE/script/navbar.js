// handles the appearance of nav bar on scroll 
let lastScrollPosition = 0;
window.addEventListener('scroll', function() {
    const currentScrollPosition = window.scrollY;
    const header = document.querySelector('.header');
  
    if ( currentScrollPosition > lastScrollPosition && currentScrollPosition > 0 ) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScrollPosition = currentScrollPosition <= 0 ? 0 : currentScrollPosition;
  });

  