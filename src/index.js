import "./index.scss";
let radioButtons = [],
    activeSection = 1,
    activeSlide = 2,
    container = null,
    section1 = null,
    section2 = null,
    section3 = null,
    nextOnSec1 = null,
    nextOnSec2 = null,
    slide1 = null,
    slide2 = null,
    slide3 = null;

window.onload = function () {
  radioButtons = document.querySelectorAll('.radio__button');
  container = document.querySelector('.container');
  section1 = document.querySelector('.section1');
  section2 = document.querySelector('.section2');
  section3 = document.querySelector('.section3');
  nextOnSec1 = document.querySelector('.section1__next');
  nextOnSec2 = document.querySelector('.section2__next');
  slide1 = document.querySelector('.slide1');
  slide2 = document.querySelector('.slide2');
  slide3 = document.querySelector('.slide3');

  radioButtons[0].addEventListener('click', showSection1);
  radioButtons[1].addEventListener('click', showSection2);
  radioButtons[2].addEventListener('click', showSection3);
  nextOnSec1.addEventListener('click', showSection2);
  nextOnSec2.addEventListener('click', showSection3);

  document.addEventListener("keydown", keyDownHandler);

  document.addEventListener("wheel", mouseScroll);

  section2.style.display = 'none';
  section3.style.display = 'none';
  radioButtons[0].style.background = '#f78b1f';
}

function showSection1() {
  if (activeSection !== 1) {
    activeSection = 1;

    container.style.bottom = '0vh';
    section1.style.display = 'block';
    setTimeout(hiddenSec2and3, 500);

    radioButtonOn(0);
  }
}

function showSection2() {
  if (activeSection !== 2) {
    activeSection = 2;

    container.style.bottom = '100vh';
    section1.style.display = 'block';
    section2.style.display = 'block';
    setTimeout(hiddenSec3, 500);

    radioButtonOn(1);
  }
}

function showSection3() {
  if (activeSection !== 3) {
    activeSection = 3;

    container.style.bottom = '200vh';
    section1.style.display = 'block';
    section2.style.display = 'block';
    section3.style.display = 'block';

    radioButtonOn(2);
  }
}

function showSlide1() {
  if (activeSlide !== 1) {
    activeSlide = 1;
    slide1.style.right = '0';
    slide2.style.left = '100vw';
    slide3.style.left = '100vw';
  }
}

function showSlide2() {
  if (activeSlide !== 2) {
    activeSlide = 2;
    slide1.style.right = '100vw';
    slide2.style.left = '0';
    slide3.style.left = '100vw';
  }
}

function showSlide3() {
  if (activeSlide !== 3) {
    activeSlide = 3;
    slide1.style.right = '100vw';
    slide2.style.left = '-100vw';
    slide3.style.left = '0';
  }
}

function radioButtonOn(num){
  for (let i = 0; i < radioButtons.length; i++){
    radioButtons[i].style.background = 'white';
  }
  
  radioButtons[num].style.background = '#f78b1f';
}

function hiddenSec3(){
  section3.style.display = 'none';
}

function hiddenSec2and3(){
  section2.style.display = 'none';
  section3.style.display = 'none';
}

function keyDownHandler(e) {
  if (e.keyCode == 40) {
    choiceSectionDirectionDown();
  }

  if (e.keyCode == 39) {
    if (activeSection == 3){
      switch(activeSlide) {
        case 1:
          showSlide2();
          break;
        case 2:
          showSlide3();
          break;
        case 3:
          break;
      }
    }
  }

  if (e.keyCode == 38) {
    choiceSectionDirectionUp();
  }

  if (e.keyCode == 37) {
    if (activeSection == 3){
      switch(activeSlide) {
        case 1:
          break;
        case 2:
          showSlide1();
          break;
        case 3:
          showSlide2();
          break;
      }
    }
  }
}

function mouseScroll(e){
  let direction = e.deltaY;
  if (direction > 0){
    choiceSectionDirectionDown()
  } else {
    choiceSectionDirectionUp()
  }
}

function choiceSectionDirectionUp(){
  switch (activeSection) {
    case 1:
      break;
    case 2:
      showSection1();
      break;
    case 3:
      showSection2();
      break;
  }
}

function choiceSectionDirectionDown(){
  switch (activeSection) {
    case 1:
      showSection2();
      break;
    case 2:
      showSection3();
      break;
    case 3:
      break;
  }
}