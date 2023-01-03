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
    // LoadCountyWeatherData(selected.innerHTML)
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
const navHome = document.querySelector(".navbar__home");
navHome.addEventListener("click", resetCountrywideWeather);
function resetCountrywideWeather() {
  selected.innerHTML = "請選擇縣市";
  // loadCountrywideWeatherData()
}
