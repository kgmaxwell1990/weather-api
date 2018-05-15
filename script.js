let request = new XMLHttpRequest();

function displayWeather(apiData){
     let newData = JSON.parse(apiData);
     
     $("#current_weather_div").addClass("display")
     
     let currentName = document.getElementById("current_weather_name")
     currentName.innerHTML = "<h1>" + newData.name + "</h1>"
     
     let weatherIcon = newData.weather[0].icon
     let weatherIconLink = "https://openweathermap.org/img/w/" + weatherIcon +".png"
     $("#current_weather_image").attr("src", weatherIconLink)
     
     let tempCel = parseInt(newData.main.temp - 273.15);
     let tempFar = parseInt(newData.main.temp * 9/5 - 459.67);
     let currentMainDesc = document.getElementById("current_weather_desc")
     currentMainDesc.innerHTML = "<h3>" + newData.weather[0].main + "</h3>" + "<h4>" + newData.weather[0].description + "</h4>" + "<h4>" + tempCel + "°C/" + tempFar + "°F</h4>";
        
     let minTempCel = parseInt(newData.main.temp_min - 273.15);
     let maxTempCel = parseInt(newData.main.temp_max - 273.15);
     let minTempFar = parseInt(newData.main.temp_min * 9/5 - 459.67);
     let maxTempFar = parseInt(newData.main.temp_max * 9/5 - 459.67);
     
     function timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var hour = a.getHours() < 10 ? '0' + a.getHours() : a.getHours(); 
        var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes(); 
        var time = hour + ':' + min  ;
        return time;
    }
    
    function toTextualDescription(degree){
        if (degree>337.5) return 'Northerly';
        if (degree>292.5) return 'North Westerly';
        if(degree>247.5) return 'Westerly';
        if(degree>202.5) return 'South Westerly';
        if(degree>157.5) return 'Southerly';
        if(degree>122.5) return 'South Easterly';
        if(degree>67.5) return 'Easterly';
        if(degree>22.5){return 'North Easterly';}
        return 'Northerly';
    }
    
    let windDirection = toTextualDescription(newData.wind.deg)
    
    let sunRise = timeConverter(newData.sys.sunrise)
    let sunSet = timeConverter(newData.sys.sunset)
     let smallInfo = document.getElementById("current_weather_small_info")
     smallInfo.innerHTML = "<div><i class='fas fa-thermometer-empty fa-2x'></i><p>Min Temp</p>" + minTempCel + "°C/" + minTempFar + "°F</div><div> <i class='fas fa-thermometer-full fa-2x'></i><p>Max Temp</p>" + maxTempCel + "°C/" + maxTempFar + "°F </div>";
     smallInfo.innerHTML += "<div><i class='fas fa-tint fa-2x'></i><p>Humidity</p>" + newData.main.humidity + "</div>";
     smallInfo.innerHTML += "<div><i class='fas fa-random fa-2x'></i><p>Wind Speed:</p>" + newData.wind.speed + "</div><div><i class='fas fa-compass fa-2x'></i><p>Wind Direction:</p>" + windDirection + "</div>";
     smallInfo.innerHTML += "<div><i class='fas fa-sun fa-2x'></i><p>Sunrise</p>" + sunRise + "</div><div><i class='far fa-sun fa-2x'></i><p>Sunset</p>" + sunSet + "</div>";
}


request.onreadystatechange= function (){
    if (this.readyState == 4 && this.status == 200){
        $(".info_title" ).addClass("remove_top_padding_on_info_title");
        setTimeout(displayWeather, 1000, this.responseText);
    }
    if (this.readyState == 4 && this.status == 404) {
        document.getElementById("current_weather_name").innerHTML = "<strong>City not found. Please try again!</strong>";
    }
}


function getThePlaceFromForm() {
    let place = document.getElementById("myForm")['location'].value
    request.open("GET", "https://api.openweathermap.org/data/2.5/weather?q=" + place + "&APPID=36096f3e734e2e6aedbcadc62f5e4105")
    
    request.send();
    
    return false;
    }



