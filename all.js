/*
let data = [
  {
    "id": 0,
    "name": "肥宅心碎賞櫻3日",
    "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
    "area": "高雄",
    "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
    "group": 87,
    "price": 1400,
    "rate": 10
  },
  {
    "id": 1,
    "name": "貓空纜車雙程票",
    "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    "area": "台北",
    "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
    "group": 99,
    "price": 240,
    "rate": 2
  },
  {
    "id": 2,
    "name": "台中谷關溫泉會1日",
    "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    "area": "台中",
    "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
    "group": 20,
    "price": 1765,
    "rate": 7
  }
];
*/
// DOM
// 表單區
const ticketName = document.querySelector("#ticketName");
const ticketNameMessage = document.querySelector("#ticketName-message");
const ticketImgUrl = document.querySelector("#ticketImgUrl");
const ticketImgUrlMessage = document.querySelector("#ticketImgUrl-message");
const ticketRegion = document.querySelector("#ticketRegion");
const ticketRegionMessage = document.querySelector("#ticketRegion-message");
const ticketPrice = document.querySelector("#ticketPrice");
const ticketPriceMessage = document.querySelector("#ticketPrice-message");
const ticketNum = document.querySelector("#ticketNum");
const ticketNumMessage = document.querySelector("#ticketNum-message");
const ticketRate = document.querySelector("#ticketRate");
const ticketRateMessage = document.querySelector("#ticketRate-message");
const ticketDescription = document.querySelector("#ticketDescription");
const ticketDescriptionMessage = document.querySelector("#ticketDescription-message");
const addTicketbtn = document.querySelector(".addTicket-btn");

// 搜尋區
const regionSearch = document.querySelector(".regionSearch");
const searchResultText = document.querySelector("#searchResult-text");
// 套票卡片區
const ticketCardarea = document.querySelector(".ticketCard-area");

// 將資料呈現在畫面
function showCardData(dataArr){
  let cardTxt = '';
  // 頁面card內容利用innerHTML更改
  dataArr.forEach(function(item){
    cardTxt += `
      <li class="ticketCard">
        <div class="ticketCard-img">
          <a href="#">
            <img src=${item.imgUrl} alt="">
          </a>
          <div class="ticketCard-region">${item.area}</div>
          <div class="ticketCard-rank">${item.rate}</div>
        </div>
        <div class="ticketCard-content">
          <div>
            <h3>
              <a href="#" class="ticketCard-name">${item.name}</a>
            </h3>
            <p class="ticketCard-description">
              ${item.description}
            </p>
          </div>
          <div class="ticketCard-info">
            <p class="ticketCard-num">
              <span><i class="fas fa-exclamation-circle"></i></span>
              剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
            </p>
            <p class="ticketCard-price">
              TWD <span id="ticketCard-price">${item.price}</span>
            </p>
          </div>
        </div>
      </li> 
    `;
  });
  // 將組好的結構放到ul內
  ticketCardarea.innerHTML = cardTxt;

  
  let dataCol = getAreaNum(dataArr);
  // 圖表
  const chart = c3.generate({
    bindto: '.chart', 
    data: {
      columns: dataCol, 
      type:"donut", 
      colors:{ 
        "高雄":"#E68618",
        "台中":"#5151D3",
        "台北":"#26BFC7"
      }
    },
    donut: { 
        title: "套票地區比重",
        width: 10,
        label: {        
          show: false
        }
    },
    size: {
      width: 160,
      height:184
    }
  });

}

// 資料寫入、呈現、更動篩選出來的數量
function showAndChange(arr){
  // 新增資料同時新增下方卡片
  showCardData(arr);
  // 隨著資料變動內容
  searchResultText.textContent = `本次搜尋共 ${arr.length} 筆資料`;
}

function showAlert(form){
  form.innerHTML = `<i class="fas fa-exclamation-circle"></i>
  <span>必填!</span>`;
}

function getAreaNum(data){
  let dataObj = {};
  data.forEach(item => {
    if(dataObj[item.area] == undefined){
      dataObj[item.area] = 1;
    }else{
      dataObj[item.area] += 1;
    }
  });
  return Object.entries(dataObj);
}

axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelAPI-lv1.json')
  .then(function (response) {
    // 取得資料後將資料放到裡面
    let data = response.data;
    // 印出初始資料
    showCardData(data);
    
    // 新增資料按鈕監聽
    addTicketbtn.addEventListener("click",() => {
      let addData = {
        "id": data.length,
        "name": ticketName.value,
        "imgUrl": ticketImgUrl.value,
        "area": ticketRegion.value,
        "description": ticketDescription.value,
        "group": ticketNum.value,
        "price": ticketPrice.value,
        "rate": ticketRate.value
      };
      
      // 要全部都有資料才會 push Message
      // 清除必填警告
      ticketNameMessage.innerHTML = '';
      ticketImgUrlMessage.innerHTML = '';
      ticketRegionMessage.innerHTML = '';
      ticketPriceMessage.innerHTML = '';
      ticketNumMessage.innerHTML = '';
      ticketRateMessage.innerHTML = '';
      ticketDescriptionMessage.innerHTML = '';

      if(addData.name === ""){
        alert(`請輸入套票名稱`);
        showAlert(ticketNameMessage);
        return;
      }else if(addData.imgUrl === ""){
        alert(`請輸入圖片網址`);
        showAlert(ticketImgUrlMessage);
        return;
      }else if(addData.area === ""){
        alert(`請選擇景點地區`);
        showAlert(ticketRegionMessage);
        return;
      }else if(addData.price === ""){
        alert(`請輸入套票金額`);
        showAlert(ticketPriceMessage);
        return;
      }else if(addData.group === ""){
        alert(`請輸入套票組數`);
        showAlert(ticketNumMessage);
        return;
      }else if(addData.rate === ""){
        alert(`請輸入套票星級`);
        showAlert(ticketRateMessage);
        return;
      }else if(addData.rate > 10 || addData.rate < 1){
        alert(`輸入錯誤：套票星級區間為 1-10 分`);
        showAlert(ticketRateMessage);
        return ;
      }else if(addData.description === ""){
        alert(`請輸入套票描述`);
        showAlert(ticketDescriptionMessage);
        return;
      }else if(addData.description.length > 100 ){
        alert(`套票描述不得超過100字`);
        showAlert(ticketDescriptionMessage);
        return ;
      }else{
        data.push(addData);
      }

      // 新增資料後更新下方資料並清空表單
      showAndChange(data);
      ticketName.value = null;
      ticketImgUrl.value = null;
      ticketRegion.value = "";
      ticketPrice.value = null;
      ticketNum.value = null;
      ticketRate.value = null;
      ticketDescription.value = null;
    });

    // 搜尋區篩選 
    regionSearch.addEventListener("change", () => {
      if(regionSearch.value == ""){
        showAndChange(data);
        return ;
      }
  
      let ticketRegionSelect = [];
      data.forEach(function(item){
        if(regionSearch.value === item.area){
          ticketRegionSelect.push(item);
        }
      });
      showAndChange(ticketRegionSelect);
    });

    
  });