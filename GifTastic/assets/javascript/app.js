$(document).ready(function(){

    var animalArr = ["dog", "cat", "bird", "raccoon", "hedgehog", "skunk", "seal", "bunny"];

    function newButton(){
        $('.btn-group').empty();
        for (var i = 0; i < animalArr.length; i++){
            $('.btn-group').append('<button data-animal="' + animalArr[i] + '"type="button" class="btn btn-light">' + animalArr[i] + '</button>');
        }
    }

    newButton();

    $('button').on('click', function(){
    var animal = $(this).attr('data-animal');
    var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=V5mjlfTgWJcWgb2IIStIObQDPvf2P8aO&q=' + animal + '&limit=10&offset=0&lang=en';

    $.ajax({
        url: queryURL,
        method: 'GET'
    })
        .then(function(response){

            console.log(response);
            var results = response.data;

            for (var i = 0; i < results.length; i++){
                var gifDiv = $('<div>');
                var rating = results[i].rating;
                var p = $('<p>').text("rating: " + rating);
                var animalImage = $('<img>');
                animalImage.attr('src', results[i].images.fixed_height_still.url);
                animalImage.attr('data-still', results[i].images.fixed_height_still.url);
                animalImage.attr('data-animate', results[i].images.fixed_height.url);
                animalImage.attr('data-state', 'still');
                animalImage.addClass('gif');
                gifDiv.append(animalImage);
                gifDiv.append(p);
                $('.gif-space').prepend(gifDiv);
            }
        })
    });

    $('.add-animal').on('click', function(e){
        e.preventDefault();
        var newAnimal = $('#animal-input').val().trim();
        animalArr.push(newAnimal);
        newButton();
    });

    $(document).on('click', '.gif', function(){
        console.log('clicked')
        var state = $(this).attr('data-state');

        if(state === 'still'){
            $(this).attr('src', $(this).attr('data-animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-state', 'still');
        }
    });

});