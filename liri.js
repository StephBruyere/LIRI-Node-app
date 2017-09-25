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

//Twitter
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

//Spotify
if (input === "spotify-this-song") {
	var queryInput = process.argv.splice(3).join(" ");
		if(!queryInput){
			queryInput = "Never Gonna Give You Up";
		}
		input3 = queryInput;	
    clientSP.search({ type: 'track', query: input3, limit: 5 }, function(error, data) {
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

//OMDB
if (input === "movie-this") {
    var queryInput2 = process.argv.splice(3).join(" ");
    if (!queryInput2) {
        queryInput2 = "Mr. Nobody";
    }
    input4 = queryInput2;
    request("http://www.omdbapi.com/?t=" + input4 + "&y=&plot=short&r=json&tomatoes&apikey=40e9cece", function(error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log("\nTitle: " + JSON.parse(body).Title);
                 console.log("----------------------------------------------------------------------------------");
                console.log("\nYear Released: " + JSON.parse(body).Year);
                console.log("\nIMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("\nRotten Tomatos Rating: " + JSON.parse(body).tomatoRating);
                console.log("\nCountry Produced: " + JSON.parse(body).Country);
                console.log("\nLanguages Available: " + JSON.parse(body).Language);
                console.log("\nPlot: " + JSON.parse(body).Plot);
                console.log("\nActors & Actresses: " + JSON.parse(body).Actors);
            }   
    });
}