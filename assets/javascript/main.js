

// Array to store movies as they are entered into the input form
var moviesArray = [];

// Function to create buttons dynamically on the page from moviesArray
function createMovieButtons() {
    // Deletes any buttons currently on the page and clears input field
    $("#button-dump").empty();

    // Loop through moviesArray
    for (var i = 0; i < moviesArray.length; i++) {
        // Create a button for each index
        var a = $("<button>");
        // Add a class to each button
        a.addClass("movieButton btn btn-outline-primary");
        // Add a data attribute based on the movie title submitted
        a.attr("data-movie", moviesArray[i]);
        // Put the movie title label onto the button
        a.text(moviesArray[i]);
        // And finally add our newly created button to the div displayed on the page
        $("#button-dump").append(a);
    }
}

// Add movies to our array when submit button is clicked
$("#add-movie").on("click", function(event){
    event.preventDefault();

    // Capture the input from the text box
    var addedMovie = $("#movie-input").val().trim();

    // Push newly addedMovie to array
    moviesArray.push(addedMovie);

    // Create buttons for the array
    createMovieButtons();
})




// Captures when a movie button has been clicked
$("#button-dump").on("click", ".movieButton", function() {

    //Empties the gif-dump div in case it has previous gifs inside
    $("#gif-dump").empty();

    // Capture data value of the button that has been clicked and insert into API link
    var movie = $(this).attr("data-movie");
    console.log("New movie is" + movie);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        movie + "&api_key=IBz6TlfZPdLxtid7qmWl763Nx0zh5UgY&limit=20";
    
    // Ajax request to Giphy API
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {
            var results = response.data;
            console.log(results);
            
            // Loop through the length of the gifs returned
            for (var i = 0; i < results.length; i++) {
                // Create a div to house everything
                var gifDiv = $("<div class='item card border-0'>");
                // Pull the rating and put it into a p tag
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                // Pull the gif image and put it into an img tag
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_still.url);
                gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                gifImage.attr("data-animate", results[i].images.fixed_height.url);
                gifImage.attr("data-state", "still");
                gifImage.addClass("gif card-img-top");
                // Append the rating p tag and gif img tag into housing div
                gifDiv.append(gifImage);
                gifDiv.append(p);
                // append the housing div into the div displaying on the page
                $("#gif-dump").append(gifDiv);
            }
        });
});

// Capture when a gif is clicked
$("#gif-dump").on("click", ".gif", function(){
    // Pull the current state of the gif and store in variable "state"
    var state = $(this).attr("data-state");
    // If the gif is still, change it to animate and vice-versa
    if (state === "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
})