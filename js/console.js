'use strict'

// const { number } = require("yargs");

// // const { number } = require("yargs");

// // const { json } = require("body-parser");

const arrowKey = () => {
  window.addEventListener('keydown', function sname(e) {
    if (e.key == 'ArrowRight') {
      couterPluse()
      currentCouter.innerHTML = `0${couter + 1}`;
      activeButton(couter);

      hideSlide();
      showSlide(couter);

    } else if (e.key == 'ArrowLeft') {
      couterMinuse()
      currentCouter.innerHTML = `0${couter + 1}`;
      activeButton(couter);

      hideSlide();
      showSlide(couter);
    }
  })
}

// window.addEventListener('mouseover',(e)=>{
//   console.log(e.target)
//   if(e.target === slider){
//     arrowKey();
//   }
// });
//local storage по прокрутці сторінки  
window.addEventListener('scroll', (e) => {
  localStorage.setItem('scroll', window.scrollY);
})
if (localStorage.getItem('scroll')) {
  window.scroll(0, localStorage.getItem('scroll'))
}



class User {
  constructor(name, age) {
    this.name = name,
      this._age = age
  }
  surname = 'Kalynych';
  fullName() {
    console.log(`${this.name} ${this.surname}`)
  }
  get age() {
    return this._age;
  }
  set age(age) {
    this._age = age;
  }
}
const Alex = new User('Alex', 20);
console.log(Alex.age = 30)


const sayHello = (function () {
  console.log('Hello');
}())
console.log(sayHello);


function myModel() {
  this.hello = function () {
    console.log('Hello')
  };
  this.goodbay = function () {
    console.log('Goodbay')
  };
};

// module.exports = myModel;


const numbers = [12, 3413, 45, 4, 23, 5, 4, 23];

console.log([...numbers])