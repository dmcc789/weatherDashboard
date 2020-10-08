// Defining global variables for the user search text and the weather API

//defining a function to render last search data from local storage
function renderLastCity () {
    var lastUserSearch = localStorage.getItem("citySearch");
    console.log(lastUserSearch);
    var lastSearchDate = localStorage.getItem("lastDate");
    var lastSearchIcon = localStorage.getItem("lastCurrentIconURL");
    var lastSearchTemp = localStorage.getItem("lastTemp");
    var lastSearchH = localStorage.getItem("lastHumidity");
    var lastSearchW = localStorage.getItem("lastWind");

    var cityNameElO = $("#cityNameId");
    var tempElO = $("#cityTemp");
    var humidElO = $("#cityHumidity");
    var windElO = $("#cityWind");

    //creating a button for the previous search
    var buttonsDiv = $("#btnsDiv");
    var searchBtn = $("<button>");
    searchBtn.attr("type", "button");
    searchBtn.attr("class", "btn btn-outline-secondary btn-block text-left");
    searchBtn.html(lastUserSearch);
    buttonsDiv.prepend(searchBtn);

    var iconImgElO = $("<img>");
    iconImgElO.attr("src", lastSearchIcon);

    // populating the previous search city name, date, and creating a span and populating it with the weather icon
    cityNameElO.html("");
    var spanO = $("<span>");
    spanO.html(iconImgElO);
    cityNameElO.prepend(spanO);
    cityNameElO.prepend(lastUserSearch + " " + lastSearchDate);

    //populating the temp, humidity, and wind speed elements
    tempElO.html("");
    tempElO.prepend("Tempature: " + lastSearchTemp + " F");
    humidElO.html("");
    humidElO.prepend("Humidity: " + lastSearchH + "%");
    windElO.html("");
    windElO.prepend("Wind Speed: " + lastSearchW + "MPH");
}

// Calling the function to render the last city data on load
renderLastCity();

// On Click function to trigger the AJAX Call
$("#userInputBtn").on("click", function (event) {
    event.preventDefault();
    
    var userSearch = $("#userCityInput").val();
    var apiKey = "1754611aa67e7252f9ca193bbd525c3a";

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userSearch + "&units=imperial&appid=" + apiKey;

    //setting the city having been searched in local storage
    // localStorage.setItem("citySearch", userSearch);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(queryURL); 
        
        var cityNameEl = $("#cityNameId");
        var tempEl = $("#cityTemp");
        var humidEl = $("#cityHumidity");
        var windEl = $("#cityWind");

        // getting city name
        var cityName = response.name;
        console.log(cityName);
        //setting the city having been searched in local storage
        localStorage.setItem("citySearch", cityName);

        //creating a new date string object
        var dateString = new Date();
        //converting the date to the US string MM/DD/YYYY
        var myDate = new Date(dateString).toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        console.log(myDate);
        //setting the date in local storage
        localStorage.setItem("lastDate", myDate);

        //getting current weather icon
        var icon = response.weather[0].icon;
        console.log(icon);
        //creating an icon URL & adding it as an attribute to a new image element
        var iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        console.log(iconURL);
        var iconImgEl = $("<img>");
        iconImgEl.attr("src", iconURL);
        //setting the icon URL in local storage
        localStorage.setItem("lastCurrentIconURL", iconURL);
        
        // populating the current weather card header with the city name, date, and creating a span and populating it with the weather icon
        cityNameEl.html("");
        var span = $("<span>");
        span.html(iconImgEl);
        cityNameEl.prepend(span);
        cityNameEl.prepend(cityName + " " + myDate);

        // getting tempature, humidity, and wind speed
        var temp = response.main.temp;
        console.log(temp);
        var humidity = response.main.humidity;
        console.log(humidity);
        var wind = response.wind.speed;
        console.log(wind);
        //setting the tempature, humidity, and wind speed in local storage
        localStorage.setItem("lastTemp", temp);
        localStorage.setItem("lastHumidity", humidity);
        localStorage.setItem("lastWind", wind);


        //populating the temp, humidity, and wind speed elements
        tempEl.html("");
        tempEl.prepend("Tempature: " + temp + " F");
        humidEl.html("");
        humidEl.prepend("Humidity: " + humidity + "%");
        windEl.html("");
        windEl.prepend("Wind Speed: " + wind + "MPH");

    });

    // localStorage.setItem("count", count);

    // // Five day forecast URL
    // var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userSearch + "&appid=" + apiKey;

    // $.ajax({
    //     url: queryURL,
    //     method: "GET"
    // }).then(function (response) {
    //     console.log(response);
    //     $("#fiveDayDiv").text(JSON.stringify(response));
    // });

});

// //defining a function for current weather
// function currentWeather() {
    
//     var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userSearch + "&appid=" + apiKey;

//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function (response) {
//         console.log("HEY GIRL!");
//         console.log(response);
//     });
// };

//     //Calling current weather function
//     currentWeather();