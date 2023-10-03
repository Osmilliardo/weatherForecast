// var weatherCall = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=516185ca1f9a1daf4c8b8f750a2ec35b'
// var geoCall = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + stateCode + '&limit=1&appid=516185ca1f9a1daf4c8b8f750a2ec35b'

$('#submit').on('click', forecast)

defaultPage()

function defaultPage () {
    fetch('https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=28.5421109&lon=-81.3790304&appid=516185ca1f9a1daf4c8b8f750a2ec35b')
        .then(function(response){
        return response.json()
        })
        .then(function (data){
        // console.log(data[0].lat)
        // console.log(data[0].lon)
        $('#selectedCity').append('Orlando, Florida ' + data.list[0].weather[0].main)
        $('#todaysForecast').append('<li>' + data.list[0].main.temp + '°F' + '</li>')
        $('#todaysForecast').append('<li>' + data.list[0].wind.speed + 'MPH' + '</li>')
        $('#todaysForecast').append('<li>' + data.list[0].main.humidity + '%' + '</li>')
    })
}

function forecast (event) {
    event.preventDefault()
    // click event logs both the city name and state name
    var cityName = $("input[name='cityName']").val()
    console.log(cityName)
    var stateName = $('#stateName').val()
    console.log(stateName)

    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + ',' + stateName + ',US&limit=1&appid=516185ca1f9a1daf4c8b8f750a2ec35b')
    .then(function(response){
     return response.json()
    })
    .then(function (data){
        var cityLat = data[0].lat
        console.log(cityLat)
        var cityLon = data[0].lon
        console.log(cityLon)

    //this needs work
    if (stateName == 'default') {
        window.alert("Please select a state") //checks that a state was selected
    }else if (cityName == '') {
        window.alert("Please enter the name of a city") //checks that something was entered
    } else {
        $('#searched').append('<li>' + cityName + ', ' + stateName + '</li>')
    }

        fetch('https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=' + cityLat + '&lon=' + cityLon + '&appid=516185ca1f9a1daf4c8b8f750a2ec35b')
        .then(function(response){
        return response.json()
        })
        .then(function (data){
            // console.log(data)
            console.log("Today's forecast \n------------")
            console.log(data.list[0].weather[0].main) //weather condition array path
            console.log(data.list[0].main.temp + '°F') //temperature array path
            console.log(data.list[0].wind.speed + 'MPH') //wind speed array path
            console.log(data.list[0].main.humidity + '%') //humidity array path
        })
    })
}

