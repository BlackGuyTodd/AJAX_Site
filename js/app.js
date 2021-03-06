var searchArray = ["trump", "dogs", "cats", "hamburger", "birds", "willsmith", "comedy", "wtf", "cars", "food"];

function displaySearchTerm() {
    var searchTerm = $(this).attr("data-searchterm");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=yiqC8G0guS0zsGnjeIao5QfVBGDA7GQ7&limit=10";
    console.log("Function Working");
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            console.log(results[i]);
            var searchDiv = $("<div class='search'>");
            var rating = results[i].rating;
            var ratingParag = $("<p class='rating'>").text("Rating: " + rating);
            searchDiv.append(ratingParag);
            
            var image = results[i].images.fixed_width.url;
            var imageTag = $("<img>").attr("src", image);
            searchDiv.append(imageTag);

            $("#gifs-appear-here").prepend(searchDiv);

        };
    })
};

function renderButtons() {
    $("#buttons").empty();
    for (var i = 0; i < searchArray.length; i++) {
        var createButton = $("<button type='button' class='btn btn-secondary gif-button'>");
        createButton.attr("data-searchterm", searchArray[i]);
        createButton.text(searchArray[i]);
        $("#buttons").append(createButton);
    }
}

$("#add-search").on("click", function (event) {
    event.preventDefault();
    var search = $("#search-input").val().trim();
    searchArray.push(search);

    renderButtons();
})

$(document).on("click", ".gif-button", displaySearchTerm);
renderButtons();


