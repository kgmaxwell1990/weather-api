let locationInput = document.getElementById("location")


let request = new XMLHttpRequest();
function displayNicely(apiData){
     let newData = JSON.parse(apiData);
     let minTempCel = parseInt(newData.main.temp_min - 273.15);
     let maxTempCel = parseInt(newData.main.temp_max - 273.15);
     let minTempFar = parseInt(newData.main.temp_min * 9/5 - 459.67);
     let maxTempFar = parseInt(newData.main.temp_max * 9/5 - 459.67);
     document.getElementById("data").innerHTML = "<strong>Name: </strong>" + newData.name + "<br>"+ "<strong>Weather: </strong>" + newData.weather[0].description + "<br>" + "<strong>Min Temp: </strong>" + minTempCel + "°C/" + minTempFar + "°F<br>" + "<strong>Max Temp: </strong>" + maxTempCel + "°C/" + maxTempFar + "°F<br>"
     
     
}
request.onreadystatechange= function (){
    if (this.readyState == 4 && this.status == 200){
        locationInput.textContent = "";
        displayNicely(this.responseText);
    }
  if (this.readyState == 4 && this.status == 404) {
        document.getElementById("data").innerHTML = "<strong>City not found. Please try again!</strong>";
    }
}

function getThePlaceFromForm() {
    let place = document.getElementById("myForm")['location'].value
    console.log(place)
    request.open("GET", "https://api.openweathermap.org/data/2.5/weather?q=" + place + "&APPID=36096f3e734e2e6aedbcadc62f5e4105")
    request.send();
    return false;
    }



