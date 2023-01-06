## 功能元件之「異常天氣跑馬燈」介紹：
- 異常天氣跑馬燈: 
	- 顯示中央氣象局所發布的關於今日異常天氣特報消息，提醒大家注意安全。
	- 如果該地區的異常天氣特報解除，跑馬燈的內容就會移除該地區、該事件、該特報的警示消息，讓使用者聚焦在當下需留意的危險情況。
	- 畫面呈現: 跑馬燈內容閃爍顯示，由視窗最右邊進入畫面，持續往左移動直到畫面最左邊，離開畫面，如此反覆循環。
- 關於異常天氣特報事件: 
	- 事件種類分為濃霧、陸上強風、大雨、豪雨、大豪雨、超大豪雨這六類事件。
	- 資訊來源: [中央氣象局開放資料平臺提供的API](https://opendata.cwb.gov.tw/dist/opendata-swagger.html)
- 畫面展示:
	- 有異常天氣特報事件時: 閃爍顯示有發布警示特報的地區，畫面呈現如下圖。
  
	  ![abnormalEvent_1](image/abnormalEvent_1.PNG)
	  ![abnormalEvent_2](image/abnormalEvent_2.PNG)
	- 沒有異常天氣特報事件時: 閃爍顯示問候祝福語，畫面呈現如下圖。
  
	  ![noAbnormalEvent_1](image/noAbnormalEvent_1.PNG)
	  ![noAbnormalEvent_2](image/noAbnormalEvent_2.PNG)
- 元件負責人員: 陳彥華
 
