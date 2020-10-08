// Defining global variables for the user search text and the weather API


// On Click function to trigger the AJAX Call
$("#userInputBtn").on("click", function (event) {
    event.preventDefault();
    
    var userSearch = $("#userCityInput").val();
    var apiKey = "1754611aa67e7252f9ca193bbd525c3a";

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userSearch + "&units=imperial&appid=" + apiKey;

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

        //creating a new date string object
        var dateString = new Date();
        //converting the date to the US string MM/DD/YYYY
        var myDate = new Date(dateString).toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        console.log(myDate);

        //getting current weather icon
        var icon = response.weather[0].icon;
        console.log(icon);
        //creating an icon URL & adding it as an attribute to a new image element
        var iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        console.log(iconURL);
        var iconImgEl = $("<img>");
        iconImgEl.attr("src", iconURL);
        
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
        //populating the temp, humidity, and wind speed elements
        tempEl.html("");
        tempEl.prepend("Tempature: " + temp + " F");
        humidEl.html("");
        humidEl.prepend("Humidity: " + humidity + "%");
        windEl.html("");
        windEl.prepend("Wind Speed: " + wind + "MPH");

    });

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