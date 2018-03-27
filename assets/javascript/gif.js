var actors = [];

function displayGif() {

    var apiKey = 'giKIjvNMpjayXQyO60o1E5goD3DrA4qG'
    var gif = $(this).attr('data-name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=" + apiKey + "&limit=10&rating=pg";

    $.ajax(
        {
            url: queryURL,
            method: 'GET'
        }).done(function (response) {
            console.log(response);
            $("#actorsView").empty();
            for (var i = 0; i < response.data.length; i++) {

                var rating = response.data[i].rating;
                var imageUrl = response.data[i].images.fixed_height.url;
                var imageStillUrl = response.data[i].images.fixed_height_still.url;

                var image = $("<img>");
                var ratingText = $("<p id='rating'>" + "Rating: " + rating + "</p>");


                image.attr('src', imageStillUrl);
                image.attr('alt', 'gif');
                image.attr('data-state', 'still');
                image.attr('data-still', imageStillUrl);
                image.attr('data-animate', imageUrl);


                $('#actorsView').prepend(image, ratingText);
                checkState();
            }
        });
}

function renderButtons() {

    $('#buttonsView').empty();

    for (var i = 0; i < actors.length; i++) {

        var newButton = $('<button class="btn btn-danger">')
        newButton.addClass('actor');
        newButton.attr('data-name', actors[i]);
        newButton.text(actors[i]);
        $('#buttonsView').append(newButton);
    }
}

$('#addActor').on('click', function () {

    var actor = $('#actor-input').val().trim();

    actors.push(actor);

    renderButtons();

    return false;
})


$(document).on('click', '.actor', displayGif);

renderButtons();

function checkState() {
    $('img').on('click', function () {
        var state = $(this).attr('data-state');
        if (state === 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }

    });
};