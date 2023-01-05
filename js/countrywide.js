// 方便後面用的抓取ID元素的函式，減少變數宣告及衝突的可能性
const el = (name) => document.getElementById(name);

// DOM
el("countrywide").innerHTML = `
    <h2 class="main-title">縣市預報
        <i class="fa-solid fa-temperature-half"></i>            
    </h2>
    <div id="sec1_dayContent">
        <div id="sec1_dayNight0"></div>
        <div id="sec1_dayNight1"></div>
        <div id="sec1_dayNight2"></div>
    </div>
    <div id="sec1_table">
        <div class="sec1_cityContainer"></div>
        <div class="sec1_cityContainer"></div>
        <div class="sec1_cityContainer"></div>
        <div class="sec1_cityContainer"></div>
        <div class="sec1_cityContainer"></div>
        <div class="sec1_cityContainer"></div>
        <div class="sec1_cityContainer"></div>
        <div class="sec1_cityContainer"></div>
        <div class="sec1_cityContainer"></div>
        <div class="sec1_cityContainer"></div>
        <div class="sec1_cityContainer"></div>
        <div class="sec1_cityContainer"></div>
        <div class="sec1_cityContainer"></div>
        <div class="sec1_cityContainer"></div>
        <div class="sec1_cityContainer"></div>
        <div class="sec1_cityContainer"></div>
        <div class="sec1_cityContainer"></div>
        <div class="sec1_cityContainer"></div>
        <div class="sec1_cityContainer"></div>
        <div class="sec1_cityContainer"></div>
        <div class="sec1_cityContainer"></div>
        <div class="sec1_cityContainer"></div>
    </div>`

// api跟氣象局網站的縣市順序不同，不確定api以後是否會換順序
// 故照氣象局網站順序列List，方便後續fetch
const cityList = [
    '基隆市', '臺北市', '新北市', '桃園市', '新竹市', '新竹縣', '苗栗縣', '臺中市', 
    '彰化縣', '南投縣', '雲林縣', '嘉義市', '嘉義縣', '臺南市', '高雄市', '屏東縣', 
    '宜蘭縣', '花蓮縣', '臺東縣', '澎湖縣', '金門縣', '連江縣'
];

// 寫入畫面的主函式
loadDayNightName();
// 點縣市區塊，隱藏目前畫面，並引入其他相對應的 section 內容
document.querySelectorAll(".sec1_cityContainer").forEach((city,index) => {
    city.addEventListener("click", ()=>{
        el("countrywide").setAttribute("hidden", true);
        el("countySelected").removeAttribute("hidden");
        document.title = `${cityList[index]}預報`;
        LoadCountyWeatherData(cityList[index]);
        oneWeekForecast_control.renderResult(cityList[index]);
    }); 
})

async function loadDayNightName(){
    const url = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${apiAuthorizationCode}&locationName=基隆市&sort=time`
    const res = await fetch(url);
    const data = await res.json();
    const now = new Date().getHours();
    const endHour = new Date(data.records.location[0].weatherElement[0].time[0].endTime).getHours();

    if (endHour ===6 && now >=12) 
        return PeriodContent('今晚明晨', '明日白天', '明日晚上', 'night', 'day', 'night');
    if (endHour ===6) 
        return PeriodContent('今日凌晨', '今日白天', '今日晚上', 'day', 'day', 'night');
    PeriodContent('今日白天', '今晚明晨', '明日白天', 'day', 'night', 'day');  
};

// 依現在時間自動判斷 按鈕顯示：今明白天/晚上，並將相對應的參數帶入 fetch 函式
function PeriodContent(a, b, c, dayNight0, dayNight1, dayNight2){
    el("sec1_dayNight0").textContent = a;
    el("sec1_dayNight1").textContent = b;
    el("sec1_dayNight2").textContent = c;
    fetchByCity(0, dayNight0);
    el("sec1_dayNight0").className = "sec1_active";
    el("sec1_dayNight0").addEventListener("click",()=>{
        el("sec1_dayNight1").className = "";
        el("sec1_dayNight2").className = "";
        el("sec1_dayNight0").className = "sec1_active";
        fetchByCity(0, dayNight0);
    })
    el("sec1_dayNight1").addEventListener("click",()=>{
        el("sec1_dayNight0").className = "";
        el("sec1_dayNight2").className = "";
        el("sec1_dayNight1").className = "sec1_active"
        fetchByCity(1, dayNight1);
    })
    el("sec1_dayNight2").addEventListener("click",()=>{
        el("sec1_dayNight1").className = "";
        el("sec1_dayNight0").className = "";
        el("sec1_dayNight2").className = "sec1_active"
        fetchByCity(2, dayNight2);
    })
};

// 依 縣市 個別fetch api 資料，並隨其他參數帶入 load 函式，寫入DOM
async function fetchByCity(dNIndex, dayNight){ // dNIndex為sec1_dayNight的index
    for (const [index, ct] of cityList.entries()) {
        const url = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${apiAuthorizationCode}&locationName=${ct}&sort=time`
        const res = await fetch(url);
        const resp = await res.json();
        const data = resp.records.location[0];
        loadDayNightWeather(index, data, dNIndex, dayNight);
    }
}

// 縣市及今明日夜的index、data帶入函式，寫入DOM
function loadDayNightWeather(index, data, dNIndex, dayNight){ // dNIndex為sec1_dayNight 1 2 3
    const d =  data.weatherElement;
    const wx = d[0].time[dNIndex].parameter.parameterName; // 天氣概況
    // 抓氣象局的天氣概況icon
    const num = d[0].time[dNIndex].parameter.parameterValue.toString().padStart(2, "0"); //img編號
    const img = `https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/${dayNight}/${num}.svg`
    const pop = d[1].time[dNIndex].parameter.parameterName; // 降雨率
    const min = d[2].time[dNIndex].parameter.parameterName; // 最低溫
    const max = d[4].time[dNIndex].parameter.parameterName; // 最高溫
    const city = document.getElementsByClassName("sec1_cityContainer")[index]; // 對應的縣市元素
    // hover顯示的提示內容
    const ariaLabel = `${wx}，降雨率${pop}%，點此觀看${data.locationName}詳細內容`; 
    city.ariaLabel = ariaLabel;
    city.innerHTML = `
        <span class="sec1_city">${data.locationName}</span>
        <span class="sec1_weather">
            <img src=${img} alt="${wx}">
            <span class="sec1_temperature">
                <i>${min}</i>~<i>${max}</i>°C
            </span>
        </span>
        <span class="sec1_rain">☂<br><i>${pop}%</i></span>`
}