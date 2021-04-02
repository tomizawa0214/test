function hamburger() {
  document.querySelector('.hamburger_line1').classList.toggle('hamburger_line_1');
  document.querySelector('.hamburger_line2').classList.toggle('hamburger_line_2');
  document.querySelector('.hamburger_line3').classList.toggle('hamburger_line_3');
  document.querySelector('nav').classList.toggle('slide-in');
}
document.querySelector('.hamburger').addEventListener('click' , function () {
  hamburger();
} );