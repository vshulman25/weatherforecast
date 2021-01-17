// constructing a queryURL variable we will use instead of the literal string inside of the ajax method


$(document).ready(function () {
  let searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
  if (searchHistory === null) {
    searchHistory = []
  }

  // search value is for user input and will get out data 
  $(".search-btn").on("click", function () {
    let searchValue = $(".search-value").val()

    // $(".history").on("click", "li", function () {
    //   searchWeather($(this).text())
    // })

    // function makeRow(text) {
    //   let li = $("<li>").addClass("list-group-history").text(text)
    //   $(history).append(li)
    // }

    // console.log(searchValue)
    mainWeatherSearch(searchValue)
    forecastSearch(searchValue)
  })



  // below is the main search function, user inputs location and current weather is displayed //
  function mainWeatherSearch(searchValue) {
    let APIkey = "931abc2f197b56ef2fd113e5d91582df";
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=" + APIkey;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response)
      var longitude = response.coord.lon;
      var latitude = response.coord.lat;
      console.log('LONGITUDE: ', longitude)
      console.log('LATITUDE: ', latitude)
      let cityname = $("<h1>").text(response.name)
      let tempData = ((response.main.temp - 273.15) * 1.80 + 32).toFixed(2)
      let temp = $("<div>").text("Current Temp: " + tempData)
      let wind = $("<div>").text("Wind Speed: " + response.wind.speed)
      let humidity = $("<div>").text("Humidity: " + response.main.humidity)
      let img = $("<img>").attr("src", " http://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
      // let todayDate = (response.list[0].dt_txt)

      let APIkey = "931abc2f197b56ef2fd113e5d91582df";
      let queryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIkey;
      console.log(queryURL)
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response2){
        console.log(response2)
       let uvIndex = $("<div>").text("UV Index: " + response2.value)


       if (response2.value <= 3) {
        $(uvIndex).addClass("green");
       } else if (response2.value >= 3 && response2.value < 6 ) {
         $(uvIndex).addClass("yellow");
       } else if (response2.daily >= 6 && response2.value < 9) {
           $(uvIndex).addClass("orange");
       } else  {
           $(uvIndex).addClass("red");
       } console.log(response2)
      //  $("#uvIndex").addClass("")
       $("#today").append(uvIndex)
      }) 
      
      $("#today").append(cityname, temp, wind, humidity)
      $("#today").append(img)


      // $("#today").append(todayDate)
    });
  }




  // this function shows the 5 day forecast for the location inputted //
  function forecastSearch(searchValue) {
    let APIkey = "931abc2f197b56ef2fd113e5d91582df";
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=" + APIkey;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response)
      $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\" + \"row\">");
      $("#forecastSearch")

      
      for (let i = 0; i < response.list.length; i++) {
        // only look at forecasts around 12:00pm - card for each day when it hits 12 x 5 
        if (response.list[i].dt_txt.indexOf("12:00:00") !== -1) {
          // create html elements for a bootstrap card
          let forecastData = ((response.list[i].main.temp - 273.15) * 1.80 + 32).toFixed(2)
          let forecastTemp = $("<ol>").text(forecastData)
          let forecastHumData = ((response.list[i].main.humidity)).toFixed(2)
          let forecastHum = $("<br> <ol>").text(forecastHumData)
          $("#forecast .row").append(forecastTemp, forecastHum)
        }
      }
      searchHistory.push(searchValue)
      window.localStorage.setItem('searchHistory', JSON.stringify(searchHistory))

    });
  }

})

