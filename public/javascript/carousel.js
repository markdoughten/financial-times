var slideIndex = 1;
var timer;

displaySlides(slideIndex);

window.addEventListener("load",function() {
  displaySlides(slideIndex);
  timer = setInterval(function () {
    moveSlides(1)
  }, 4000);
})

// Next/previous controls
function moveSlides(n) {
  clearInterval(timer)
  displaySlides(slideIndex += n);
  timer = setInterval(function(){moveSlides(n)}, 4000);
}

function displaySlides(n) {
  var i;
  var slides = document.getElementsByClassName("slides");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";

}