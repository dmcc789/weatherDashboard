
// On Click function to trigger the AJAX Call
$("#userInputBtn").on("click", function (event) {
    event.preventDefault();

    // Grabbing the text from the input box
    var userSearch = $("#userCityInput").val();
    var apiKey = "1754611aa67e7252f9ca193bbd525c3a";

    // Here we construct our URL
    var queryURL = "api.openweathermap.org/data/2.5/forecast?q=" + userSearch + "&appid=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        // $("#resultDivMain").text(JSON.stringify(response));
    });

});