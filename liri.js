require("dotenv").config()

const keys = require('./keys.js')
const tumblr = require('tumblr')
const Spotify = require('node-spotify-api')
const request = require('request')
const fs = require('fs')


var spotify = new Spotify(keys.spotify)
var client = new tumblr.Blog('sakurasaki21.tumblr.com', keys.tumblr)



// Twitter Function
let getTumblr = () => {
    client.quote({limit: 20}, (err, res) => {
        if (err) {
          throw new Error(err);
        } else {
            console.log("--------------------------------------------")
            console.log(`--- Tumblr Quotes from sakurasaki21 ---`)
            console.log("--------------------------------------------")
            res.posts.forEach((post, i) => {
                console.log(`\n -- RESULT #${i+1} --`)
                console.log(`${post.text}`)
                console.log(`  -- Time Stamp: ${post.date} --\n`)
                
            })
            console.log("--------------------------------------------\n")
        }
      })

}

// Spotify Function
let getSpotify = (song = "The Sign") => {
    spotify.search({ type: 'track', query: song }, (err, data) => {
        if (err) {
            return console.log('Error occurred: ' + err)
        } else {
            console.log("--------------------------------------------")
            console.log(`--- Song Search Results for: ${song} ---`)
            console.log("--------------------------------------------")
            data.tracks.items.forEach((song, i) => {
                if (i < 5) {
                    var thisSong = data.tracks.items[i]
                    if (thisSong != undefined) {
                        console.log(`\nResult #${i+1}`)
                        console.log(`  Artist: ${thisSong.artists[0].name}`)
                        console.log(`  Song: ${thisSong.name}`)
                        console.log(`  Preview Url: ${thisSong.preview_url}`)
                        console.log(`  Album: ${thisSong.album.name}\n`)
                    }
                }
            })
            console.log("--------------------------------------------\n")
        }
        
    })
}

// OMDB Function
let getOMDB = (movie = "Mr. Nobody") => {
    request(`http://www.omdbapi.com/?t=${movie}&y=&plot=short&apikey=trilogy`, (err, res, body) => {

        if (!err && res.statusCode === 200) {
            let thisBody = JSON.parse(body)
            console.log("--------------------------------------------")
            console.log(`--- Movie Search Results for: ${movie} ---`)
            console.log("--------------------------------------------")
            console.log(`\n  Title: ${thisBody.Title}`)
            console.log(`  Year: ${thisBody.Year}`)
            console.log(`  IMDB Rating: ${thisBody.imdbRating}`)
            console.log(`  Rotten Tomatoes Rating: ${thisBody.tomatoRating}`)
            console.log(`  Country: ${thisBody.Country}`)
            console.log(`  Language: ${thisBody.Language}`)
            console.log(`  Plot: ${thisBody.Plot}`)
            console.log(`  Actors: ${thisBody.Actors}\n`)
            console.log("--------------------------------------------\n")
        }
      })
}

// Do What I Say Function
let doWhatISays = () => {
    fs.readFile("random.txt", "utf8", (err, data) => {
        if (err) {
            return console.log('Error occurred: ' + err)
        } else {
            let def = data.split(',')
            liri(def[0], def[1])
        }
    })
}


// LIRI Function
let liri = (apiChoice, userInput) => {
    switch (apiChoice) {
        case `my-tumblr`:
            getTumblr()
            break
        case `spotify-this-song`:
            getSpotify(userInput)
            break
        case `movie-this`:
            getOMDB(userInput)
            break
        case `do-what-it-says`:
            doWhatISays()
            break
        default:
            console.log(`Sorry Please Try Again...`)
    }
}

liri(process.argv[2], process.argv[3])