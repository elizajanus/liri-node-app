require("dotenv").config();

var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require("fs");
var request = require("request");
var spotifyKeys = new Spotify(keys.spotify);
var twitterKeys = new Twitter(keys.twitter);
var nodeArgs = process.argv;
var command = process.argv[2];

function myTweets() {
    var client = twitterKeys;
    var params = {screen_name: 'FKACCouNT4SKOOL', count: 20};
   client.get('statuses/user_timeline', params, function(error, tweets, response) {
     if (!error) {
         for (i = 0; i < 20; i++) {
             console.log(tweets[i].text);
         }
     }
   });
};

function spotifyThis() {
    var songName = "";
    for (var i = 2; i < nodeArgs.length; i++) {
        if (i > 2 && i < nodeArgs.length) {
          songName = songName + "+" + nodeArgs[i];
        }
    }
    if (songName.charAt(0) === "+") {
       songName = songName.substr(1);
    }

  var spotify = spotifyKeys;
  spotify.request('https://api.spotify.com/v1/search?query=' + songName + '&type=track&offset=0&limit=1')
  .then(function(data) {
    if (data.tracks.items[0] !== undefined) {
    console.log(`
    Artist: ${data.tracks.items[0].artists[0].name}
    Song Name: ${data.tracks.items[0].name}
    Preview Link: ${data.tracks.items[0].preview_url}
    Album: ${data.tracks.items[0].album.name}`); } else {
        spotify.request('https://api.spotify.com/v1/search?query=Ace+of+Base+The+Sign&type=track&offset=0&limit=1')
        .then(function(data) {
    console.log(`
    Artist: ${data.tracks.items[0].artists[0].name}
    Song Name: ${data.tracks.items[0].name}
    Preview Link: ${data.tracks.items[0].preview_url}
    Album: ${data.tracks.items[0].album.name}`);
    });
}
  })
  .catch(function(err) {
    console.error('Error occurred: ' + err); 
  });
};

function movieThis() {
    var movieName = "";
for (var i = 2; i < nodeArgs.length; i++) {
  if (i > 2 && i < nodeArgs.length) {
    movieName = movieName + "+" + nodeArgs[i];
  }
if (process.argv[3] == undefined) {
    movieName = "Mr. Nobody";
}
}
if (movieName.charAt(0) === "+") {
    movieName = movieName.substr(1);
 }
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy";
request(queryUrl, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    console.log(response.body);
    var bodyOmdb = JSON.parse(response.body);
    console.log(`
    Title: ${bodyOmdb.Title}
    Year: ${bodyOmdb.Year}
    IMDB Rating: ${bodyOmdb.imdbRating}
    Rotten Tomatoes Rating: ${bodyOmdb.Ratings[1].Value}
    Country: ${bodyOmdb.Country}
    Language: ${bodyOmdb.Language}
    Plot: ${bodyOmdb.Plot}
    Actors: ${bodyOmdb.Actors}
    `);
  }
});
 }

if (command == "my-tweets") {
   myTweets();
} else if (command == "spotify-this-song") {
    spotifyThis();
} else if (command == "movie-this") {
    movieThis();
} else if (command == "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
          return console.log(err);
        }
        data = data.split(",");
        //console.log(data);
        var pseudoArgv = data;
        pseudoArgv.unshift("dummy1", "dummy2");
        //console.log(pseudoArgv);
        
        var newCommand = pseudoArgv[2];

           if (newCommand == "my-tweets") {
               myTweets();
           } else if (newCommand == "spotify-this-song") {
            var songName = "";
            for (var i = 2; i < pseudoArgv.length; i++) {
                if (i > 2 && i < pseudoArgv.length) {
                  songName = songName + "+" + pseudoArgv[i];
                }
            }
            if (songName.charAt(0) === "+") {
               songName = songName.substr(1);
            }
          var spotify = spotifyKeys;
          spotify.request('https://api.spotify.com/v1/search?query=' + songName + '&type=track&offset=0&limit=1')
          .then(function(data) {
            if (data.tracks.items[0] !== undefined) {
            console.log(`
            Artist: ${data.tracks.items[0].artists[0].name}
            Song Name: ${data.tracks.items[0].name}
            Preview Link: ${data.tracks.items[0].preview_url}
            Album: ${data.tracks.items[0].album.name}`); } else {
                spotify.request('https://api.spotify.com/v1/search?query=Ace+of+Base+The+Sign&type=track&offset=0&limit=1')
                .then(function(data) {
            console.log(`
            Artist: ${data.tracks.items[0].artists[0].name}
            Song Name: ${data.tracks.items[0].name}
            Preview Link: ${data.tracks.items[0].preview_url}
            Album: ${data.tracks.items[0].album.name}`);
            });
        }
          })
          .catch(function(err) {
            console.error('Error occurred: ' + err); 
          });
        } else if (newCommand == "movie-this") {
            var movieName = "";
            for (var i = 2; i < pseudoArgv.length; i++) {
              if (i > 2 && i < pseudoArgv.length) {
                movieName = movieName + "+" + pseudoArgv[i];
              }
            }
            if (movieName.charAt(0) === "+") {
                movieName = movieName.substr(1);
             }
            var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy";
            request(queryUrl, function(error, response, body) {
              if (!error && response.statusCode === 200) {
                console.log(response.body);
                var bodyOmdb = JSON.parse(response.body);
                console.log(`
                Title: ${bodyOmdb.Title}
                Year: ${bodyOmdb.Year}
                IMDB Rating: ${bodyOmdb.imdbRating}
                Rotten Tomatoes Rating: ${bodyOmdb.Ratings[1].Value}
                Country: ${bodyOmdb.Country}
                Language: ${bodyOmdb.Language}
                Plot: ${bodyOmdb.Plot}
                Actors: ${bodyOmdb.Actors}
                `);
              }
            });
             }
            });
        };