const countyWeatherSection = document.querySelector("#countyWeather");
const nowHour = new Date().getHours();

const mainTitle = document.createElement("h2");
mainTitle.className = "main-title";
const weatherTable = document.createElement("ul");
weatherTable.className = "sec2_weather-table";
countyWeatherSection.appendChild(mainTitle);
countyWeatherSection.appendChild(weatherTable);

// 各別縣市36小時天氣function
async function LoadCountyWeatherData(cityName) {
  weatherTable.innerHTML = "";
  try {
    const response = await fetch(
      `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${apiAuthorizationCode}&locationName=${cityName}&elementName=`
    );
    const data = await response.json();
    if (data.success) {
      const locationLists = data.records.location;

      locationLists.forEach((locationList) => {
        const location = locationList.locationName;
        const wxData = locationList.weatherElement[0].time;
        const popData = locationList.weatherElement[1].time;
        const minTemperature = locationList.weatherElement[2].time;
        const feeling = locationList.weatherElement[3].time;
        const maxTemperature = locationList.weatherElement[4].time;

        mainTitle.innerHTML = `<i class="fa-solid fa-temperature-half"></i>縣市預報 - ${location}`;

        const dataStartHour = wxData[0].startTime.substring(11, 13);
        const title = [];
        const dayTime = [];
        if (nowHour >= 16 && nowHour < 24) {
          title.push("今晚明晨", "明日白天", "明日晚上");
          dayTime.push("night", "day", "night");
        } else if (dataStartHour == 00) {
          title.push("今日凌晨", "今日白天", "今日晚上");
          dayTime.push("day", "day", "night");
        } else if (dataStartHour == 06 || dataStartHour == 12) {
          title.push("今日白天", "今晚明晨", "明日白天");
          dayTime.push("day", "night", "day");
        }

        for (let i = 0; i < 3; i++) {
          const imgValue =
            (wxData[i].parameter.parameterValue < 10 ? 0 : "") +
            wxData[i].parameter.parameterValue;

          const content = `            
            <li>
                <span class="sec2_title">${title[i]}</span>
                <img src="https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/${dayTime[i]}/${imgValue}.svg"/>
                <span class="sec2_temperature">${minTemperature[i].parameter.parameterName} - ${maxTemperature[i].parameter.parameterName}˚C</span>
                <span class="sec2_rain"><span class="rain-icon">☂</span> ${popData[i].parameter.parameterName}%</span>
                <span class="sec2_feeling">${feeling[i].parameter.parameterName}</span>
            </li>`;
          weatherTable.innerHTML += content;
        }
      });
    }
  } catch (error) {
    console.log("error:", error);
  }
}
