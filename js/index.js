const apiAuthorizationCode = "CWB-BA8318ED-96EC-4050-BA0B-F51074DCEA4A";
const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");
const searchBox = document.querySelector(".search-box");
const optionsList = document.querySelectorAll(".option");
const searchBoxInput = document.querySelector(".search-box > input");
const countrywide = document.getElementById("countrywide");
const countySelected = document.getElementById("countySelected");
const navLogo = document.querySelector(".navbar__logo");
const navHomes = document.querySelectorAll(".navbar__home");

countySelected.style.display = "none";
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
    countyName = option.querySelector("label").textContent;
    setCountyWeather(countyName);
  });
});

function setCountyWeather(countyName) {
  selected.textContent = countyName;
  document.title = `${countyName}預報`;
  LoadCountyWeatherData(countyName);
  oneWeekForecast_control.renderResult(countyName);
  countrywide.setAttribute("hidden", true);
  countySelected.style.display = "block";
  optionsContainer.classList.remove("active");
  searchBoxInput.value = "";
}

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

navLogo.addEventListener("click", resetCountrywideWeather);
navHomes.forEach((navHome) => {
  navHome.addEventListener("click", resetCountrywideWeather);
});

function resetCountrywideWeather() {
  selected.textContent = "請選擇縣市";
  searchBoxInput.value = "";
  document.title = `首頁`;
  countrywide.removeAttribute("hidden");
  countySelected.style.display = "none";
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
