window.onload=function(){
    const newsTicker=document.getElementById("newsTicker");
    newsTicker.classList.add('newsTickerBackground');
    newsTicker.classList.add('marqueeContainer');

    const newsContainer=document.createElement("div");
    newsContainer.classList.add('marqueeLine');
    newsContainer.id="marqueeLine";

    getNewsEvent(newsTicker,newsContainer);
}

function getNewsEvent(newsTicker,newsContainer){
    const CWB_API_KEY="CWB-25142137-EFE4-4F9E-9B46-D41BF5BD73D5";
    src="https://opendata.cwb.gov.tw/api/v1/rest/datastore/W-C0033-001?Authorization="+CWB_API_KEY;

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

        for(key in hazardsEvents){
            if(hazardsEvents[key].length>0){
                let iconExclamation=document.createElement("img");
                iconExclamation.className = "newsTickerIcon"; 
                iconExclamation.src = "icon/info_black_48dp.svg"; 

                let newsContent=document.createElement("span");
                newsContent.className = "contentNewsTicker"; 

                var eventDetails=" 今日"+key+"特報地區: "+hazardsEvents[key].join("、")+"，請留意安全。 ";
                newsContent.textContent=eventDetails;
                newsContent.classList.add('fontStyleFornewsContent');

                newsContainer.appendChild(iconExclamation);
                newsContainer.appendChild(newsContent);
                newsTicker.appendChild(newsContainer);
            }
        
        }
    });
}
