var request = require("request");
var keys = require("./keys");
var Twitter = require('twitter');
var twitterKeys = keys.twitterKeys;
var client = new Twitter(twitterKeys);
var Spotify = require('node-spotify-api');
var spotifyKeys = keys.spotifyKeys;
var clientSP = new Spotify(spotifyKeys);
var input = process.argv[2];
var input2 = process.argv[3];

if (input === "") {
console.log("\nPlease enter:\n****************** \n (1) node liri my-tweets,\n (2) node liri spotify-this-song, \n (3) node liri movie-this,\n (4) node liri do-what-it-says ");}



if (input === "my-tweets") {
	var parameters = {
	screen_name: 'StephTestAcct01',
	count:20};

    client.get('statuses/user_timeline/text', parameters, function(error, tweets, response) {
        if (!error && response.statusCode === 200) {            
            for (i = 0; i < tweets.length; i++) {
                var results =
                    tweets[i].user.screen_name + ": " +
                    tweets[i].text + "\n" +
                    tweets[i].created_at + "\n" +
                    "----------------------------------------------------------------------------------";
                console.log('\nTwitter Feed: ');
                console.log(results);
            }
        }
    });
}

if (input === "spotify-this-song") {
    clientSP.search({ type: 'track', query: input2, limit: 5 }, function(error, data) {
        if (!error) {
            for (i = 0; i < 5; i++) {
            	console.log('\nSpotify Results: ');
                console.log("Artist(s): " + data.tracks.items[i].artists[0].name);
                console.log("Song Name: " + data.tracks.items[i].name);
                console.log("Song Link: " + data.tracks.items[i].preview_url);
                console.log("Album Name: " + data.tracks.items[i].album.name);
                console.log("----------------------------------------------------------------------------------");
            }
        }
    });
}






/*
// We then run the request module on a URL with a JSON
request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=40e9cece", function(error, response, body) {

  // If there were no errors and the response code was 200 (i.e. the request was successful)...
  if (!error && response.statusCode === 200) {

    // Then we print out the imdbRating
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
  }
});
*/