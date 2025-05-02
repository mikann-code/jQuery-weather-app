'use strict';

//geolocation
function success(pos) {
  ajaxRequest(pos.coords.latitude, pos.coords.longitude);
  console.log("get location information !");
  console.log(pos.coords.latitude);
  console.log(pos.coords.longitude);
}
function fail(error) {
  alert('位置情報の取得に失敗しました。エラーコード:' + error.code);
}

navigator.geolocation.getCurrentPosition(success, fail);

function utcToJSTime(utcTime) {
  return utcTime * 1000;
}
//utcは秒単位なのでミリ秒単位に戻している

//データ取得
function ajaxRequest(lat, long) {
  const url = 'https://api.openweathermap.org/data/2.5/forecast';
  const appId = 'f04575ffb813c36a27e0052c4ea9015a';

  $.ajax({
    url: url,
    data: {
      appid: appId,
      lat: lat,
      lon: long,
      units: 'metric',
      lang: 'ja',
    }
  })
    .done(function (data) {
      console.log('$.ajax succes');
      console.log(data);

      $('#place').text(`国名:${data.city.country},都市名:${data.city.name}`)

      data.list.forEach(function (forecast, index) {
        // functionで獲得できる二つ目の要素は一つ目の要素のindexつまり〇番目の部分
        const dateTime = new Date(utcToJSTime(forecast.dt));
        const month = dateTime.getMonth() + 1;
        const date = dateTime.getDate();
        const hours = dateTime.getHours();
        const min = String(dateTime.getMinutes()).padStart(2, "0");
        const temperature = Math.round(forecast.main.temp);
        const description = forecast.weather[0].description;
        const iconPath = `images/${forecast.weather[0].icon}.svg`;

        console.log(`国名:${data.city.country}`);
        console.log(`都市名:${data.city.name}`);
        console.log(`日時:${month}/${date} ${hours}:${min}`);
        console.log(`気温:${temperature}`);
        console.log(`天気:${description}`);
        console.log(`天気:${description}`)
        console.log(`画像パス:${iconPath}`);

        if(index === 0){
          const currentWeather = 
          `<div class="icon"><img src="${iconPath}"></div>
          <div class="info">
            <p>
              <span class="description">現在の天気:${description}</span>
              <span class="temp">${temperature}</span>℃
            </p>
          </div>`;
          $('#weather').html(currentWeather);
        }else{
          const tableRow = 
          `<tr>
             <td class="info">
             ${month}/${date} ${hours}:${min}
             </td>
             <td class="icon"><img src="${iconPath}"></td>
             <td><span class="description">${description}</spna></td>
             <td><span class="temp">${temperature}℃</span></td>
           </tr>`;
           $('#forecast').append(tableRow);
        }
      });

      


    })
    .fail(function () {
      console.log('$.ajax failed');
    })
}


