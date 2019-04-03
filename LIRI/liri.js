require('dotenv').config();

var keys = require('./keys.js');

var fs = require('fs');
var axios = require('axios');
var Spotify = require('node-spotify-api');

var input = process.argv;
var command = input[2];
var query = input[3];
for(var i = 4; i < process.argv.length; i++){
    query += '+' + process.argv[i];
}

switch(command){
    case "concert-this":
        bands(query);
        break;

    case "spotify-this-song":
        spotify(query);
        break;

    case "movie-this":
        movie(query);
        break;

    case "do-what-it-says":
        doit();
        break;
};

function log(){
    fs.appendFile("random.txt", command + " " + query + "<br>", function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("content added!");
        }
    });
}

function bands(query){
    log();
    axios.get("https//:rest.bandsintown.com/artists/" + query + "/events?app_id=aadcbee84eb1b7dfcd2e029fd8fb1c22")
        .then(function(response){
            console.log("venue: " + response.data.venue.name);
            console.log("location: " + response.data.venue.city + ", " + response.data.venue.country);
            console.log("date: " + response.data.datetime);
        })
        .catch(function(error){
        console.log(error);
    });
}

function spotify(query){
    var spotify = new Spotify(keys.spotify);
    if(!query){
        query = "The Sign";
    }
    log();
    spotify.search({ type: 'track', query: query }, function(error, data) {
        if(error){
            console.log(error);
            return;
        }
        var songInfo = data.tracks.items;
        console.log("title: " + songInfo[0].name);
        console.log("artist(s): " + songInfo[0].artists[0].name);
        console.log("album: " + songInfo[0].album.name);
        console.log("preview: " + songInfo[0].preview_url);
    });
}


function movie(query){
    if (!query){
        query = 'Mr Nobody';
    }
    log();
    axios.get("http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=31c4e6a5")
        .then(function(response){
            console.log("title: " + response.data.Title);
            console.log("released: " + response.data.Year);
            console.log("imdb rating: " + response.data.imdbRating);
            console.log("rotten tomatoes rating: " + response.data.Ratings[1].Value);
            console.log("country: " + response.data.Country);
            console.log("language: " + response.data.Language);
            console.log("plot: " + response.data.Plot);
            console.log("actors: " + response.data.Actors);

        })
        .catch(function(error) {
            console.log(error);
        });
};

function doit(){
    fs.readFile('random.txt', "utf8", function(error, data){
        if (error){
            return console.log(error);
        }
        var dataArr = data.split(",");
        if(dataArr[0] === "spotify-this-song"){
            var songcheck = dataArr[1].slice(1, -1);
            spotify(songcheck);
        }else if(dataArr[0] === "movie-this"){
            var movie_name = dataArr[1].slice(1, -1);
            movie(movie_name);
        }
    });
};