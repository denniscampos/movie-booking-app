const getDate = document.getElementById("date");
const container = document.querySelector(".container");
const getSeats = document.querySelectorAll(".row .seat:not(.occupied)");
const getCounts = document.getElementById("count");
const getTotal = document.getElementById("total");
const selectMovie = document.getElementById("movie");

populateUI();

// get ticket price
let ticketPrice = +selectMovie.value;

// Todays' date information
const todaysDate = new Date().toString().replace(/ \w+-\d+ \(.*\)$/, "");

getDate.innerText = todaysDate;

//functions

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  // get selected seats index
  const seatsIndex = [...selectedSeats].map((seat) =>
    [...getSeats].indexOf(seat)
  );

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  getCounts.innerText = selectedSeatsCount;
  getTotal.innerText = selectedSeatsCount * ticketPrice;
}

//get data from local storage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    getSeats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    selectMovie.selectedIndex = selectedMovieIndex;
  }
}

//event listeners

selectMovie.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

// initial count and total set
updateSelectedCount();
