// var weatherCall = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=516185ca1f9a1daf4c8b8f750a2ec35b'
// var geoCall = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + stateCode + '&limit=1&appid=516185ca1f9a1daf4c8b8f750a2ec35b'
var dayIndexArray = [7, 15, 23, 31, 39]
var today = dayjs()
var tomorrow = today.add(1, 'd')
// console.log(dayjs(tomorrow).format('M/D/YYYY'))

$('#submit').on('click', forecast)

defaultPage()

// default city forecast for when the page loads
function defaultPage () {
    var defaultCity = 'https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=28.5421109&lon=-81.3790304&appid=516185ca1f9a1daf4c8b8f750a2ec35b' 
    fetch(defaultCity)
        .then(function(response){
        console.log(response)
        return response.json()
        })
        .then(function(data){
        // console.log(data.list)
        var iconID = data.list[0].weather[0].icon
        var iconSRC = 'https://openweathermap.org/img/wn/' + iconID + '@2x.png'
        // console.log(data.list[dayIndexArray[4]].main.temp)
        $('#selectedCity').append('Orlando, Florida'+ ' ' + dayjs().format('M/D/YYYY') + ' ' + '<img src=' + iconSRC + '>')
        $('#todaysForecast').append('<li>' + data.list[0].main.temp + '°F' + '</li>')
        $('#todaysForecast').append('<li>' + data.list[0].wind.speed + 'MPH' + '</li>')
        $('#todaysForecast').append('<li>' + data.list[0].main.humidity + '%' + '</li>')
    })
    for (let i=0; i<dayIndexArray.length; i++) {
        var nextDay = tomorrow.add(i, 'd')
        // console.log(dayjs(nextDay).format('ddd'))
        $('#fiveDay').append('<li class="col">' + dayjs(nextDay).format('M/D/YYYY') + '</li>')
        fetch(defaultCity)
            .then(function(response){
                return response.json()
            })
            .then(function(data){
                console.log(i)
            })
        
    }
}

function forecast (event) {
    event.preventDefault()

    $('#selectedCity').text('')
    $('#todaysForecast').empty()
    $('#fiveDay').empty()

    // click event logs both the city name and state name
    var cityName = $("input[name='cityName']").val()
    console.log(cityName)
    var stateName = $('#stateName').val()
    console.log(stateName)

    //this first fetch gets the coordinates of the city based on the name of the city and state
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + ',' + stateName + ',US&limit=1&appid=516185ca1f9a1daf4c8b8f750a2ec35b')
    .then(function(response){
     return response.json()
    })
    .then(function (data){
        var cityLat = data[0].lat
        console.log(cityLat)
        var cityLon = data[0].lon
        console.log(cityLon)

    if (cityName) {
        $('#searched').append('<li class="clicky" >' + cityName + ', ' + stateName + '</li>')//adds the searched city to the list of cities

    }
    
    //this needs work
    // if (stateName == 'default') {
    //     window.alert("Please select a state") //checks that a state was selected
    // }else if (cityName == '') {
    //     window.alert("Please enter the name of a city") //checks that something was entered
    // } else {
    //     $('#searched').append('<li>' + cityName + ', ' + stateName + '</li>')//adds the searched city to the list of cities
    // }

        //this fetch take the coords and actually puts them through to get the weather data
        fetch('https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=' + cityLat + '&lon=' + cityLon + '&appid=516185ca1f9a1daf4c8b8f750a2ec35b')
        .then(function(response){
        return response.json()
        })
        .then(function (data){
        $('#selectedCity').append(cityName + ', ' + stateName + ' ' + dayjs().format('M/D/YYYY') + ' ' + data.list[0].weather[0].main)
        $('#todaysForecast').append('<li>' + data.list[0].main.temp + '°F' + '</li>')
        $('#todaysForecast').append('<li>' + data.list[0].wind.speed + 'MPH' + '</li>')
        $('#todaysForecast').append('<li>' + data.list[0].main.humidity + '%' + '</li>')

            // console.log(data)
            console.log("Today's forecast \n------------")
            console.log(data.list[0].weather[0].main) //weather condition array path
            console.log(data.list[0].main.temp + '°F') //temperature array path
            console.log(data.list[0].wind.speed + 'MPH') //wind speed array path
            console.log(data.list[0].main.humidity + '%') //humidity array path
        })
    })

    // this needs work

    //if nothing is entered, returns the original page
    if (cityName == '' || stateName == 'default' ){
        $('#forecast').empty()
        // $('#selectedCity').empty()
        // $('#todaysForecast').empty()
        $('#fiveDay').empty()
        return defaultPage()
    }
    // if (stateName === 'default'){
    //     defaultPage()
    // }
}

