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
        
        var cityNameEl =$("#cityNameId");
        var iconEl = $("#iconSpanId");
        
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
        
        // populating the current weather card header with the city name, date, and populating the span with the weather icon
        cityNameEl.prepend(cityName + " " + myDate);
        iconEl.html(iconImgEl);

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