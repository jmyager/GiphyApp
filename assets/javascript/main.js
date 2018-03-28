console.log("test1");

$(".button").on("click", function() {
    console.log("test2");
    var movie = $(this).attr("data-movie");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=IBz6TlfZPdLxtid7qmWl763Nx0zh5UgY=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        console.log(response);
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var gifImage = $("<div>");
            gifImage.attr("src", results[i].images.fixed_height.url);
            gifImage.append(gifImage);
            $("#gifs-appear-here").prepend(gifDiv);
        }
      });
  });