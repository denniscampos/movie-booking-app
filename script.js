const getDate = document.getElementById("date");

// Todays' date information
const todaysDate = new Date().toString().replace(/ \w+-\d+ \(.*\)$/, "");

getDate.innerText = todaysDate;
