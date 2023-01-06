window.addEventListener("load", function(event) {
    const newsTicker=document.getElementById("newsTicker");
    newsTicker.classList.add('marqueeContainer');

    const newsContainer=document.createElement("div");
    newsContainer.classList.add('marqueeLine');
    newsContainer.id="marqueeLine";

    getNewsEvent(newsTicker,newsContainer);
});

function getNewsEvent(newsTicker,newsContainer){
    src="https://opendata.cwb.gov.tw/api/v1/rest/datastore/W-C0033-001?Authorization="+`${apiAuthorizationCode}`;
    fetch(src).then((response)=>{
        return response.json();
    }).then((data)=>{
        var hazardsEvents={ "濃霧":[],
                            "陸上強風":[],
                            "大雨":[],
                            "豪雨":[],
                            "大豪雨":[],
                            "超大豪雨":[]
                        };
        for(let i=0;i<data.records.location.length;i++){
            if(data.records.location[i].hazardConditions.hazards.length!=0){
                //There is hazard event in this location
                for(let j=0;j<data.records.location[i].hazardConditions.hazards.length;j++){
                    var startDay = new Date(data.records.location[i].hazardConditions.hazards[j].validTime.startTime);
                    var endtDay = new Date(data.records.location[i].hazardConditions.hazards[j].validTime.endTime);  
                    var dateNow = new Date();
                    /*  滿足條件:
                        1 當下時間大於等於start time
                        2 當下時間小於等於end time
                    */
                    if((dateNow.getFullYear()-startDay.getFullYear())>=0 &&
                        (dateNow.getMonth()-startDay.getMonth())>=0 &&
                        (dateNow.getDate()-startDay.getDate())>=0 &&
                        (endtDay.getFullYear()-dateNow.getFullYear())>=0 &&
                        (endtDay.getMonth()-dateNow.getMonth())>=0 &&
                        (endtDay.getDate()-dateNow.getDate())>=0 
                    ){
                        if(hazardsEvents[data.records.location[i].hazardConditions.hazards[j].info.phenomena]!=undefined){
                            hazardsEvents[data.records.location[i].hazardConditions.hazards[j].info.phenomena].push(data.records.location[i].locationName);
                        }
                    }          
                }         
            }       
        }
        var countEvent=0;
        var weatherIcon={ "濃霧":"☁",
                        "陸上強風":"🌪",
                        "大雨":"☂",
                        "豪雨":"☔",
                        "大豪雨":"🌧",
                        "超大豪雨":"🌧"
                        };
        for(key in hazardsEvents){
            if(hazardsEvents[key].length>0){
                countEvent=countEvent+1;
                let iconExclamation=document.createElement("img");
                iconExclamation.className = "newsTickerIcon"; 
                iconExclamation.src = "icon/info_black_48dp.svg"; 

                let newsContent=document.createElement("span");
                newsContent.className = "contentNewsTicker"; 

                var eventDetails="  📣 🌍 "+weatherIcon[key]+" 今日"+key+"特報地區: "+hazardsEvents[key].join("、")+"，請留意安全。 🌍  ";
                newsContent.textContent=eventDetails;
                newsContent.classList.remove('fontStyleFornewsContentNormal');
                newsContent.classList.add('fontStyleFornewsContentAbnormal');

                newsContainer.appendChild(iconExclamation);
                newsContainer.appendChild(newsContent);
                newsTicker.appendChild(newsContainer);
            }
        
        }
        if(countEvent==0){
            newsTicker.classList.remove('newsTickerBackgroundAbnormal');
            newsTicker.classList.add('newsTickerBackgroundNormal');
            
            let newsContent=document.createElement("span");
            newsContent.className = "contentNewsTicker"; 
            var eventDetails="  📣 🌍 目前台灣沒有濃霧、陸上強風、大雨、豪雨、大豪雨、超大豪雨相關特報，享受這美好時光，祝福您! 🌍  ";
            newsContent.textContent=eventDetails;
            newsContent.classList.remove('fontStyleFornewsContentAbnormal');
            newsContent.classList.add('fontStyleFornewsContentNormal');

            newsContainer.appendChild(newsContent);
            newsTicker.appendChild(newsContainer);
        }
        else{
            newsTicker.classList.remove('newsTickerBackgroundNormal');
            newsTicker.classList.add('newsTickerBackgroundAbnormal');
        }
    });
}
