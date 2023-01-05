const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");
const searchBox = document.querySelector(".search-box");
const optionsList = document.querySelectorAll(".option");
selected.addEventListener("click", () => {
  optionsContainer.classList.toggle("active");
  searchBox.value = "";
  filterList("");
  if (optionsContainer.classList.contains("active")) {
    searchBox.focus;
  }
});
optionsList.forEach((option) => {
  option.addEventListener("click", () => {
    selected.innerHTML = option.querySelector("label").innerHTML;
    LoadCountyWeatherData(selected.innerHTML);
    const countrywide = document.getElementById("countrywide");
    countrywide.style.display = "none";
    optionsContainer.classList.remove("active");
  });
});
searchBox.addEventListener("keyup", function (e) {
  filterList(e.target.value);
});
const filterList = (searchTerm) => {
  optionsList.forEach((option) => {
    let label = option.firstElementChild.nextElementSibling.innerHTML;
    if (label.indexOf(searchTerm) != -1) {
      option.style.display = "block";
    } else {
      option.style.display = "none";
    }
  });
};
const navHomes = document.querySelectorAll(".navbar__home");
navHomes.forEach((navHome) => {
  navHome.addEventListener("click", resetCountrywideWeather);
});

function resetCountrywideWeather() {
  selected.innerHTML = "請選擇縣市";
  const countrywide = document.getElementById("countrywide");
  countrywide.style.display = "block";
  const countySelected = document.getElementById("countySelected");
  countySelected.style.display = "none";
}
