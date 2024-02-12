// scroll Reveal
//reveal options to create reveal animation

ScrollReveal({
  reset: true,
  distance: "70px",
  duration: 2500,
  delay: 400,
});

ScrollReveal().reveal(".bigHeadline", {
  delay: 500,
  origin: "top",
});
ScrollReveal().reveal(".about .content , .about .heading", {
  delay: 600,
  origin: "left",
});
ScrollReveal().reveal(".artist .heading ", { delay: 600, origin: "left" });
ScrollReveal().reveal(".btn", { delay: 700, origin: "left" });
ScrollReveal().reveal(".about .row .image ", { delay: 600, origin: "bottom" });
ScrollReveal().reveal(".artist .box-container .box ", {
  delay: 600,
  origin: "left",
});
