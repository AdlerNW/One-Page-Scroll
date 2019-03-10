import "./index.scss";
let radioButtons = [],
    activeSection = 1,
    container = null,
    section1 = null,
    section2 = null,
    section3 = null;

window.onload = function () {
  radioButtons = document.querySelectorAll('.radio__button');
  container = document.querySelector('.container');
  section1 = document.querySelector('.section1');
  section2 = document.querySelector('.section2');
  section3 = document.querySelector('.section3');

  radioButtons[0].addEventListener('click', showSection1);
  radioButtons[1].addEventListener('click', showSection2);
  radioButtons[2].addEventListener('click', showSection3);
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

  if (e.keyCode == 38) {
    choiceSectionDirectionUp();
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