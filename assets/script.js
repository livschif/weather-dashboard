var APIKey = 'e699308254834bb4bef5a50692f22f49';
var searchBarEl = $('#search-bar');
var searchBtn = $('#search-btn');
var pastLocationEL = $('#past-locations');

var currentCity;

function getWeather(data) {
    var requestUrl = 'api.openweathermap.org/data/2.5/forecast?lat={data.lat}&lon={data.lon}&appid={API key}'
    fetch(requestUrl)
    .then(function (response){
        if (!response.ok){
            return response.json();
        }
    })

    .then(function(data) {

     var weatherStatusEl = ('#weather-stat');
     weatherStatusEl.addClass('border border-primary');

     var cityNameEl = $('<h2>');
     cityNameEl.text(currentCity);
     weatherStatusEl.append(cityNameEl);

     var currentCityDate = data.current.dt;
     currentCityDate = dayjs.unix(currentCityDate).format('MM/DD/YYYY');
     var currentDateEl = $('<span>');
     currentDateEl.text('(${currentCityData})');
     cityNameEl.append(currentDateEl);

     var currentWeatherIcon = data.current.weather[0].icon;
     var currentWeatherIconEl = $('<img>');
     currentWeatherIconEl.attr("src", "http://openweathermap.org/img/wn/" + currentWeatherIcon + ".png");
     cityNameEl.append(currentWeatherIconEl);

     var currentCityTemp = data.current.temp;
     var currentTempEl = $('<p>')
     currentTempEl.text('Temp: ${currentCityTemp}°F')
     weatherStatusEl.append(currentTempEl);

     var currentCityWind = data.current.wind_speed;
     var currentWindEl = $('<p>')
     currentWindEl.text('Wind: ${currentCityWind} MPH')
     weatherStatusEl.append(currentWindEl);

     var currentCityHumidity = date.current.humidity;
     var currentHumidityEl = $('<p>')
     currentHumidityEl.text('Humidity: ${currentCityHumidity}%')
     weatherStatusEl.append(currentHumidityEl);

     var currentCityUV = data.current.uvi;
     var currentUvEl = $('<p>')
     var currentUvSpanEl = $('<span>')
     currentUvEl.append(currentUvSpanEl);

     currentUvSpanEl.text('UV: ${currentCityUV}')

     if ( currentCityUV < 3) {
        currentUvSpanEl.css({'background-color': 'green', 'color': 'white'});
     } else if (currentCityUV < 6) {
        currentUvSpanEl.css({'background-color': 'yellow', 'color': 'black'});
     } else if (currentCityUV < 8) {
        currentUvSpanEl.css({'backgrouns-color': 'orange', 'color': 'white'});
     } else if (currentCityUV < 11) {
        currentUvSpanEl.css({'backgrouns-color': 'red', 'color': 'white'});
     } else {
        currentUvSpanEl.css({'background-color': 'violet', 'color': 'white'});
     }

     weatherStatusEl.append(currentUvEl);

     var fiveDayStatHeaderEl = $('#fiveDayStatHeader');
     var fiveDayHeaderEl = $('<h2>');
     fiveDayHeaderEl.text('5-Day Forecast:');
     fiveDayStatHeaderEl.append(fiveDayHeaderEl);

     var fiveDayStatEl = $('#FiveDayStat');

     for (var i = 1; i <= 5; i++) {
        var date;
        var temp;
        var icon;
        var wind;
        var humidity;

        date = data.daily[i].dt;
        date = dayjs.unix(date).format('MM/DD/YYYY');

        temp = data.daily[i].temp.day;
        icon = data.daily[i].weather[0].icon;
        wind = data.daily[i].wind_speed;
        humidity = data.daily[i].humidity;

        var card = document.createElement('div');
        card.classList.add('card', 'col-2', 'm-1', 'bg-primary', 'text-white');

        var cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        cardBody.innerHTML =  `<h6>${date}</h6>
        <img src= "http://openweathermap.org/img/wn/${icon}.png"></> <br>
         ${temp}°F<br>
         ${wind} MPH <br>
         ${humidity}%`

        card.appendChild(cardBody);
        fiveDayStatEl.append(card); 
     }
    })
    return;
}

