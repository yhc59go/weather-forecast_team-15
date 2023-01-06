const oneWeekForecast_view = {
    formElement(elementType, data){
        let element = [];
        const urlForDayAndNightIcon = "https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon";
        if(elementType==="sectionStructure"){
            element.push({
                tab: "h2",
                appendToElement: "#oneWeekForecast",
                attribute: [
                    ["id", "oneWeekForecastTitle"],
                    ["class", "main-title"]
                ]
            });
            element.push({
                tab: "div",
                appendToElement: "#oneWeekForecast",
                attribute: [
                    ["id", "oneWeekForecastContent"],
                    ["class", "oneWeekForecastContent"]
                ]
            });
            let contentID = ["date", "day", "night", "appTemp", "UVI"];
            for(let i=0; i<contentID.length; i++){
                element.push({
                    tab: "div",
                    appendToElement: "#oneWeekForecastContent",
                    attribute: [
                        ["id", "oneWeekForecastContent_" + contentID[i]]
                    ]
                });
            };
        }else if(elementType==="一週預報標題"){
            element.push({
                tab: "i",
                appendToElement: "#oneWeekForecastTitle",
                attribute: [
                    ["class", "fa-solid fa-temperature-half"]
                ]
            });
            element.push({
                tab: "span",
                innerText: `一週預報 - ${data.dateArray[0]}`,
                appendToElement: "#oneWeekForecastTitle",
                attribute: [
                    ["class", "oneWeekForecastTitle"]
                ]
            });
        }else if(elementType==="縣市與日期欄位"){
            element.push({
                tab: "div",
                innerText: data.dateArray[0],
                appendToElement: "#oneWeekForecastContent_date",
                attribute: [
                    ["class", "columnTitle_lightGreen"]
                ]
            });
            for(let i=1; i<data.dateArray.length; i++){
                element.push({
                    tab: "div",
                    innerHTML: `<span>星期${data.dayArray[new Date(data.dateArray[i]).getDay()]}</span><span>${data.dateArray[i].slice(5, 10)}</span>`,
                    appendToElement: "#oneWeekForecastContent_date",
                    attribute: [
                        ["class", (data.holidayArray[new Date(data.dateArray[i]).getDay()]===0) ? "columnTitle" : "columnTitle_red"]
                    ]
                });
            };
        }else if(elementType==="白天欄位"){
            element.push({
                tab: "div",
                innerText: "白天",
                appendToElement: "#oneWeekForecastContent_day",
                attribute: [
                    ["class", "rowTitle"]
                ]
            });
            for(let i=1; i<data.dayWeatherArray.length; i++){
                element.push({
                    tab: "div",
                    appendToElement: "#oneWeekForecastContent_day",
                    attribute: [
                        ["id", `oneWeekForecastContent_day_${i}`],
                        ["class", "content"]
                    ]
                });
                element.push({
                    tab: "img",
                    appendToElement: `#oneWeekForecastContent_day_${i}`,
                    attribute: [
                        ["class", "content__img"],
                        ["title", data.dayWeatherArray[i]["status"]],
                        ["src", `${urlForDayAndNightIcon}/day/${data.dayWeatherArray[i]["value"]}.svg`]
                    ]
                });
                element.push({
                    tab: "span",
                    innerText: `${data.minDayTempArray[i]} - ${data.maxDayTempArray[i]} ℃`,
                    appendToElement: `#oneWeekForecastContent_day_${i}`,
                    attribute: [
                        ["class", "content__span"]
                    ]
                });
            };
        }else if(elementType==="晚上欄位"){
            element.push({
                tab: "div",
                innerText: "晚上",
                appendToElement: "#oneWeekForecastContent_night",
                attribute: [
                    ["class", "rowTitle"]
                ]
            });
            for(let i=1; i<data.nightWeatherArray.length; i++){
                element.push({
                    tab: "div",
                    appendToElement: "#oneWeekForecastContent_night",
                    attribute: [
                        ["id", `oneWeekForecastContent_night_${i}`],
                        ["class", "content"]
                    ]
                });
                element.push({
                    tab: "img",
                    appendToElement: `#oneWeekForecastContent_night_${i}`,
                    attribute: [
                        ["class", "content__img"],
                        ["title", data.nightWeatherArray[i]["status"]],
                        ["src", `${urlForDayAndNightIcon}/night/${data.nightWeatherArray[i]["value"]}.svg`]
                    ]
                });
                element.push({
                    tab: "span",
                    innerText: `${data.minNightTempArray[i]} - ${data.maxNightTempArray[i]} ℃`,
                    appendToElement: `#oneWeekForecastContent_night_${i}`,
                    attribute: [
                        ["class", "content__span"]
                    ]
                });
            };
        }else if(elementType==="體感溫度欄位"){
            element.push({
                tab: "div",
                innerText: "體感溫度",
                appendToElement: "#oneWeekForecastContent_appTemp",
                attribute: [
                    ["class", "rowTitle"]
                ]
            });
            for(let i=1; i<data.minAppTempArray.length; i++){
                element.push({
                    tab: "div",
                    innerText: `${data.minAppTempArray[i]} - ${data.maxAppTempArray[i]} ℃`,
                    appendToElement: "#oneWeekForecastContent_appTemp",
                    attribute: [
                        ["class", "content"]
                    ]
                });
            };
        }else if(elementType==="紫外線欄位"){
            element.push({
                tab: "div",
                innerText: "紫外線",
                appendToElement: "#oneWeekForecastContent_UVI",
                attribute: [
                    ["class", "rowTitle"]
                ]
            });
            for(let i=1; i<data.UVIArray.length; i++){
                element.push({
                    tab: "div",
                    innerText: data.UVIArray[i]["value"],
                    appendToElement: "#oneWeekForecastContent_UVI",
                    attribute: [
                        ["class", "content_whitStroke"],
                        ["title", data.UVIArray[i]["status"]],
                        ["style", `background-image: url("icon/${data.UVIIconArray[data.UVIArray[i]["value"]]}");`]
                    ]
                });
            };
        }else{
            console.log("function 'formElement' encounter an error: parameter elementType is undefined.");
        };
        return element;
    },
    renderElement(element){
        for(let i=0; i<element.length; i++){
            let tab = document.createElement(element[i].tab);
            (element[i].innerText!=null) ? tab.innerText = element[i].innerText : null;
            (element[i].innerHTML!=null) ? tab.innerHTML = element[i].innerHTML : null;
            for(let j=0; j<element[i].attribute.length; j++){
                tab.setAttribute(element[i].attribute[j][0], element[i].attribute[j][1]);
            };
            document.querySelector(element[i].appendToElement).appendChild(tab);
        };
    },
    initializeOneWeekForecastElements(){
        document.querySelector("#oneWeekForecast").remove();
        let sectionTab = document.createElement("section");
        sectionTab.id = "oneWeekForecast";
        document.querySelector("#countySelected").appendChild(sectionTab);
    }
};
const oneWeekForecast_model = {
    formFetchURL(county, apiAuthorizationCode){
        let urlConfig = {
            url: "https://opendata.cwb.gov.tw/api/v1/rest/datastore",
            apiCode: "F-D0047-091",
            apiAuthorizationCode: apiAuthorizationCode,
            format: "JSON",
            county: county,
            elementName: "MinT,MaxT,MinAT,MaxAT,UVI,Wx",
            sort: "time",
        };
        let fetchURL = `${urlConfig.url}/${urlConfig.apiCode}?Authorization=${urlConfig.apiAuthorizationCode}`+
            `&format=${urlConfig.format}&locationName=${urlConfig.county}&elementName=${urlConfig.elementName}`+
            `&sort=${urlConfig.sort}`;
        // console.log("trying to fetch URL:", fetchURL);
        return fetchURL;
    },
    async getForecastData(fetchURL){
        let ForecastData = await fetch(fetchURL, {
            method: "GET"
        }).then((response)=>{
            return response.json();
        }).then((data)=>{
            let ForecastData = data["records"]["locations"][0]["location"][0]["weatherElement"];
            // console.log("successfully fetched the forecast data:", ForecastData);
            return ForecastData;
        }).catch((error)=>{
            // console.log("function 'getForecastDat' encounter an error:", error);
        });
        return ForecastData;
    },
    getStartItem(data){
        let startItem = (data.length===15) ? 1 : 0;
        return startItem;
    },
    getDataByValueType(valueType, data, i, array){
        if(valueType==="date"){
            return array.push(data[i]["startTime"].slice(0, 10));
        }else if(valueType==="value"){
            return array.push(data[i]["elementValue"][0]["value"]);
        }else if(valueType==="minValue"){
            let min = (data[i]["elementValue"][0]["value"]<=data[i+1]["elementValue"][0]["value"])
                ? data[i]["elementValue"][0]["value"] : data[i+1]["elementValue"][0]["value"];
            array.push(min);
        }else if(valueType==="maxValue"){
            let max = (data[i]["elementValue"][0]["value"]>=data[i+1]["elementValue"][0]["value"])
                ? data[i]["elementValue"][0]["value"] : data[i+1]["elementValue"][0]["value"];
            array.push(max);
        }else if(valueType==="valueAndStatus"){
            if(data[i]["elementValue"][0]["value"].match(/[0-9]/g)===null){
                let valueAndStatus = {
                    status: data[i]["elementValue"][0]["value"],
                    value: data[i]["elementValue"][1]["value"]
                };
                array.push(valueAndStatus);
            }else{
                let valueAndStatus = {
                    status: data[i]["elementValue"][1]["value"],
                    value: data[i]["elementValue"][0]["value"]
                };
                array.push(valueAndStatus);
            };
        }else{
            console.log("function 'getDataByValueType' encounter an error: parameter dataType is undefined.");
        };
        return array;
    },
    setFilterCondition(sequenceNumber, columnTitle, time, valueType){
        let filterCondition = {
            sequenceNumber: sequenceNumber,
            columnTitle: columnTitle,
            time: time,             //all, day, night
            valueType: valueType,   //date, valueAndStatus, value, minValue, maxValue, 
        };
        return filterCondition;
    },
    filterFetchedData(fetchedData, filterCondition){
        let data = fetchedData[filterCondition.sequenceNumber]["time"];
        let array = [filterCondition.columnTitle];
        if(filterCondition.time==="all"){
            for(let i=this.getStartItem(data); i<data.length; i++){
                this.getDataByValueType(filterCondition.valueType, data, i, array);
            };
        }else if(filterCondition.time==="day"){
            for(let i=this.getStartItem(data); i<data.length; i+=2){
                this.getDataByValueType(filterCondition.valueType, data, i, array);
            };
        }else if(filterCondition.time==="night"){
            for(let i=this.getStartItem(data)+1; i<data.length; i+=2){
                this.getDataByValueType(filterCondition.valueType, data, i, array);
            };
        }else{
            console.log("function 'filterFetchedData' encounter an error: undefined time parameter in filterCondition.");
        };
        return array;
    },
    formData(county, fetchedData){
        return {
            dayArray:     ["日", "一", "二", "三", "四", "五", "六"], 
            holidayArray: [1, 0, 0, 0, 0, 0, 1],
            dateArray:         this.filterFetchedData(fetchedData, this.setFilterCondition(3, county,                "all",    "date")),
            minDayTempArray:   this.filterFetchedData(fetchedData, this.setFilterCondition(2, "白天:最低白天溫度",     "day",   "value")),
            maxDayTempArray:   this.filterFetchedData(fetchedData, this.setFilterCondition(5, "白天:最高白天溫度",     "day",   "value")),
            dayWeatherArray:   this.filterFetchedData(fetchedData, this.setFilterCondition(1, "白天:天氣現象",         "day",   "valueAndStatus")),
            minNightTempArray: this.filterFetchedData(fetchedData, this.setFilterCondition(2, "晚上:最低晚上溫度",     "night", "value")),
            maxNightTempArray: this.filterFetchedData(fetchedData, this.setFilterCondition(5, "晚上:最高晚上溫度",     "night", "value")),
            nightWeatherArray: this.filterFetchedData(fetchedData, this.setFilterCondition(1, "晚上:天氣現象",        "night", "valueAndStatus")),
            minAppTempArray:   this.filterFetchedData(fetchedData, this.setFilterCondition(4, "體感溫度:最低體感溫度", "day",   "minValue")),
            maxAppTempArray:   this.filterFetchedData(fetchedData, this.setFilterCondition(0, "體感溫度:最高體感溫度", "day",   "maxValue")),
            UVIArray:          this.filterFetchedData(fetchedData, this.setFilterCondition(3, "紫外線:紫外線",         "all",  "valueAndStatus")),
            UVIIconArray: ["uvi_0-2.svg", "uvi_0-2.svg", "uvi_0-2.svg", "uvi_3-5.svg", "uvi_3-5.svg", "uvi_3-5.svg", "uvi_6-7.svg", "uvi_6-7.svg", 
                "uvi_8-10.svg", "uvi_8-10.svg", "uvi_8-10.svg", "uvi_11.svg"]
        };
    }
};
const oneWeekForecast_control = {
    renderResult(county){
        oneWeekForecast_view.initializeOneWeekForecastElements();
        oneWeekForecast_model.getForecastData(oneWeekForecast_model.formFetchURL(county, apiAuthorizationCode)).then((fetchedData)=>{
            let data = oneWeekForecast_model.formData(county, fetchedData);
            // console.log("filtered forecast data are:", data);
            let column = ["sectionStructure", "一週預報標題", "縣市與日期欄位", "白天欄位", "晚上欄位", "體感溫度欄位", "紫外線欄位"];
            for(let i=0; i<column.length; i++){
                let element  = oneWeekForecast_view.formElement(column[i], data);
                // console.log(`the elements in column "${column[i]}" are:`, element);
                oneWeekForecast_view.renderElement(element);
            };
        });
    }
};