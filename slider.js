(function () {
  var root = document.querySelector(".hero-slider");
  if (!root) return;
  var track = root.querySelector(".slider-track");
  var slides = root.querySelectorAll(".slide");
  var dotsWrap = root.querySelector(".slider-dots");
  var total = slides.length;
  var index = 0;
  var timer;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function go(next) {
    index = (next + total) % total;
    track.style.transform = "translateX(" + (-index * 100) + "%)";
    var dots = dotsWrap.querySelectorAll("button");
    for (var i = 0; i < dots.length; i++) dots[i].classList.toggle("is-on", i === index);
  }
  function start() {
    if (reduce) return;
    stop();
    timer = setInterval(function () { go(index + 1); }, 4500);
  }
  function stop() { if (timer) clearInterval(timer); }
  for (var i = 0; i < total; i++) {
    var b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", (i + 1) + "枚目");
    if (i === 0) b.className = "is-on";
    (function (n) { b.addEventListener("click", function () { go(n); start(); }); })(i);
    dotsWrap.appendChild(b);
  }
  root.querySelector(".slider-btn.prev").addEventListener("click", function () { go(index - 1); start(); });
  root.querySelector(".slider-btn.next").addEventListener("click", function () { go(index + 1); start(); });
  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  start();
})();
