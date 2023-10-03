// var weatherCall = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=516185ca1f9a1daf4c8b8f750a2ec35b'
// var geoCall = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + stateCode + '&limit=1&appid=516185ca1f9a1daf4c8b8f750a2ec35b'


fetch('http://api.openweathermap.org/geo/1.0/direct?q=Sarasota,Florida,US&limit=1&appid=516185ca1f9a1daf4c8b8f750a2ec35b')
.then(function(response){
    return response.json()
})
.then(function (data){
    var cityLat = data[0].lat
    console.log(cityLat)
    var cityLon = data[0].lon
    console.log(cityLon)


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