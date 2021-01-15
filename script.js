// constructing a queryURL variable we will use instead of the literal string inside of the ajax method


$(document).ready(function () {
  $(".search-btn").on("click", function () {
    var searchValue = $(".search-value").val()





    console.log(searchValue);
    mainWeatherSearch(searchValue)
    forescastSearch(searchValue)
  })




  function mainWeatherSearch(searchValue) {
    let APIkey = "931abc2f197b56ef2fd113e5d91582df";
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=" + APIkey;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response)
      let cityname = $("<h1>").text(response.name)
      let temp = $("<div>").text((response.main.temp - 273.15) * 1.80 + 32).toFixed(2)
      
      //look for jquery & add class for styling to fixed look up

      $("#today").append(cityname, temp)
    });
  }


    function forescastSearch(searchValue) {
      let APIkey = "931abc2f197b56ef2fd113e5d91582df";
      let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=" + APIkey;

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {
        console.log(response)
        $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");
        for (var i = 0; i < response.list.length; i++) {
          // only look at forecasts around 3:00pm - card for each day when it hits 9 x 5 
          if (response.list[i].dt_txt.indexOf("9:00:00") !== -1) {
            // create html elements for a bootstrap card
            var forecastTemp = $("<h3>").text((response.list[i].main.temp- 273.15) * 1.80 + 32)
            $("#forecast .row").append(forecastTemp)
          }
        }
    });
  }



    })



      // function for uv + var for lon and lat and 5 day + var info for others outside of city and date, append those 













// ------