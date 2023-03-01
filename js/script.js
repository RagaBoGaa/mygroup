// ============== Setup Elements
let img = document.querySelector("#person-img");
let author = document.querySelector("#author");
let job = document.querySelector("#job");
let info = document.querySelector("#info");
let review = document.querySelector(".review");

let prevBtn = document.querySelector(".prev-btn");
let nextBtn = document.querySelector(".next-btn");
let randomBtn = document.querySelector(".random-btn");

let reviews = fetch("./json/review.json");
let currentReview = 0;

// ============== Events
window.addEventListener("DOMContentLoaded", () => {
  intialPerson();
});

// ============== Functions
function intialPerson() {
  reviews
    .then((readData) => {
      let myData = readData.json();
      return myData;
    })
    .then((showIntial) => {
      showPerson(showIntial);
      return showIntial;
    })
    .then((getArray) => {
      nextBtn.addEventListener("click", () => {
        currentReview++;
        if (currentReview > getArray.length - 1) currentReview = 0;
        showPerson(getArray);
      });
      return getArray;
    })
    .then((prevPerson) => {
      prevBtn.addEventListener("click", () => {
        currentReview--;
        if (currentReview < 0) currentReview = prevPerson.length - 1;
        showPerson(prevPerson);
      });
      return prevPerson;
    })
    .then((randomPerson) => {
      randomBtn.addEventListener("click", () => {
        currentReview = Math.trunc(Math.random() * randomPerson.length - 1);
        showPerson(randomPerson);
      });
    });
}

function showPerson(show) {
  img.src = show[currentReview].img;
  author.textContent = show[currentReview].name;
  job.textContent = show[currentReview].job;
  info.textContent = show[currentReview].text;
}
