// scroll Reveal
//reveal options to create reveal animation

ScrollReveal({
  reset: true,
  distance: "70px",
  duration: 2500,
  delay: 400,
});

ScrollReveal().reveal(".home .content", { delay: 600, origin: "top" });
ScrollReveal().reveal(".about .content , .about .heading", {
  delay: 600,
  origin: "left",
});
ScrollReveal().reveal(".artist .heading ", { delay: 700, origin: "left" });
ScrollReveal().reveal(".btn", { delay: 800, origin: "left" });
ScrollReveal().reveal(".about .row .image ", { delay: 700, origin: "bottom" });
ScrollReveal().reveal(".artist .box-container .box ", {
  delay: 700,
  origin: "left",
});
