const apiAuthorizationCode = "CWB-BA8318ED-96EC-4050-BA0B-F51074DCEA4A";
const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");
const searchBox = document.querySelector(".search-box");
const optionsList = document.querySelectorAll(".option");
const searchBoxInput = document.querySelector(".search-box > input");
const countrywide = document.getElementById("countrywide");
const countySelected = document.getElementById("countySelected");
const navBox = document.querySelector(".nav__box");
selected.addEventListener("click", (event) => {
  event.stopPropagation();
  optionsContainer.classList.toggle("active");
  searchBoxInput.value = "";
  filterList("");
  if (optionsContainer.classList.contains("active")) {
    searchBox.focus;
  }
});

optionsList.forEach((option) => {
  option.addEventListener("click", () => {
    selected.innerHTML = option.querySelector("label").innerHTML;
    countrywide.setAttribute("hidden", true);
    LoadCountyWeatherData(selected.innerHTML);
    countySelected.removeAttribute("hidden");
    optionsContainer.classList.remove("active");
    searchBoxInput.value = "";
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
  searchBoxInput.value = "";
  countrywide.removeAttribute("hidden");
  countySelected.setAttribute("hidden", true);
}

document.addEventListener("click", (event) => {
  if (
    optionsContainer.classList.contains("active") &&
    !optionsContainer.contains(event.target) &&
    !searchBoxInput.contains(event.target)
  ) {
    optionsContainer.classList.remove("active");
  }
});
