import "./index.scss";
import img from "./img/polygon.png";
let radioButtons = [],
    activeSection = 1,
    activeSlide = 2,
    relayX = 298,
    relayY = 0,
    targetLocked = false,
    container = null,
    section1 = null,
    section2 = null,
    section3 = null,
    nextOnSec1 = null,
    nextOnSec2 = null,
    slide1 = null,
    slide2 = null,
    slide3 = null,
    toggle = null,
    ctx = null,
    relay = new Image(),
    relayWidth = 44,
    relayHeight = 56;

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
  toggle = document.getElementById("toggle");
  ctx = toggle.getContext("2d");

  radioButtons[0].addEventListener('click', showSection1);
  radioButtons[1].addEventListener('click', showSection2);
  radioButtons[2].addEventListener('click', showSection3);
  nextOnSec1.addEventListener('click', showSection2);
  nextOnSec2.addEventListener('click', showSection3);

  document.addEventListener("keydown", keyDownHandler);

  document.addEventListener("wheel", mouseScroll);

  toggle.addEventListener('mousedown', targetLock);
  toggle.addEventListener('touchstart', targetLockOnDesktop)
  toggle.addEventListener('mouseup', targetUnlock);
  toggle.addEventListener('touchend', targetUnlock);
  toggle.addEventListener('mousemove', move);
  toggle.addEventListener('touchmove', moveOnDesktop);

  section2.style.display = 'none';
  section3.style.display = 'none';
  radioButtons[0].style.background = '#f78b1f';

  relay.src = img;

  drawYears();
  setInterval(relayPosition, 10);
}

 relay.onload = function() {
   ctx.drawImage(relay, relayX, relayY, relayWidth, relayHeight); 
 }

function targetLock(e){
  if (e.pageX < relayX + relayWidth + toggle.offsetLeft && e.pageX > relayX - relayWidth +
    toggle.offsetLeft && e.pageY < relayY + relayHeight + toggle.offsetTop &&
    e.pageY > relayY - relayHeight + toggle.offsetTop){
    targetLocked = true;
  }
}

function targetLockOnDesktop(e){
  let touch = e.changedTouches[0];
  if (touch.pageX < relayX + relayWidth + toggle.offsetLeft && touch.pageX > relayX - relayWidth +
    toggle.offsetLeft && touch.pageY < relayY + relayHeight + toggle.offsetTop &&
    touch.pageY > relayY - relayHeight + toggle.offsetTop){
    targetLocked = true;
  }
}

function targetUnlock(){
  targetLocked = false;
}

function move(e){
  if (targetLocked){
    if (e.pageX - toggle.offsetLeft - relayWidth / 2 >= 0 && e.pageX - toggle.offsetLeft - relayWidth / 2 < toggle.width - relayWidth){
      relayX = e.pageX - toggle.offsetLeft - relayWidth / 2;
    }
  }
}

function moveOnDesktop(e){
  let touch = e.changedTouches[0];
  if (targetLocked){
    if (touch.pageX - toggle.offsetLeft - relayWidth / 2 >= 0 && touch.pageX - toggle.offsetLeft - relayWidth / 2 < toggle.width - relayWidth){
      relayX = touch.pageX - toggle.offsetLeft - relayWidth / 2;
    }
  }
}

function relayPosition(){
  ctx.clearRect(0, 0, toggle.width, relayHeight);
  ctx.drawImage(relay, relayX, relayY, relayWidth, relayHeight);
  if (relayX < 213) showSlide1();
  if (relayX > 212 && relayX < 427) showSlide2();
  if (relayX > 426) showSlide3();
  drawLine();
}

function drawLine(){
  ctx.beginPath();
  ctx.rect(0, 22, relayX + relayWidth / 2, 13);
  ctx.fillStyle = "#d1eaff";
  ctx.fill();
  ctx.closePath();
}

function drawYears(){
  ctx.beginPath();
  ctx.font = "20px Gotham Pro";
  ctx.fillStyle = "white";
  ctx.fillText("1988", 0, toggle.height - 5);
  ctx.fillText("2009", (toggle.width - 45) / 2, toggle.height - 5);
  ctx.fillText("2016", toggle.width - 45, toggle.height - 5);
  ctx.closePath();
}

function showSection1() {
  if (activeSection !== 1) {
    activeSection = 1;

    container.style.bottom = '0vh';
    section1.style.display = 'block';
    setTimeout(hiddenSec2and3, 500);

    setTimeout("toggle.style.display = 'none'", 100);

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

    setTimeout("toggle.style.display = 'none'", 100);

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

    setTimeout("toggle.style.display = 'block'", 400);

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
          relayX = (toggle.width - relayWidth) / 2;
          break;
        case 2:
          showSlide3();
          relayX = toggle.width - relayWidth;
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
          relayX = 0;
          break;
        case 3:
          showSlide2();
          relayX = (toggle.width - relayWidth) / 2;
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