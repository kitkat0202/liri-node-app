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
          throw new Error(err)
        } else {
            log("--------------------------------------------\n" +
            `--- Tumblr Quotes from sakurasaki21 ---\n` +
            "--------------------------------------------\n\n")
            res.posts.forEach((post, i) => {
                log(` -- RESULT #${i+1} --\n` +
                `${post.text}\n` +
                `  -- Time Stamp: ${post.date} --\n\n`)
            })
            log("--------------------------------------------\n\n")
        }
      })

}

// Spotify Function
let getSpotify = (song = "The Sign") => {
    spotify.search({ type: 'track', query: song }, (err, data) => {
        if (err) {
            return console.log('Error occurred: ' + err)
        } else {
            log("--------------------------------------------\n" +
            `--- Song Search Results for: ${song} ---\n` +
            "--------------------------------------------\n\n")
            data.tracks.items.forEach((song, i) => {
                if (i < 5) {
                    var thisSong = data.tracks.items[i]
                    if (thisSong != undefined) {
                        log(`Result #${i+1}\n` +
                        `  Artist: ${thisSong.artists[0].name}\n` +
                        `  Song: ${thisSong.name}\n` +
                        `  Preview Url: ${thisSong.preview_url}\n` +
                        `  Album: ${thisSong.album.name}\n\n`)
                    }
                }
            })
            log("--------------------------------------------\n\n")
        }
        
    })
}

// OMDB Function
let getOMDB = (movie = "Mr. Nobody") => {
    request(`http://www.omdbapi.com/?t=${movie}&y=&plot=short&apikey=trilogy`, (err, res, body) => {

        if (!err && res.statusCode === 200) {
            let thisBody = JSON.parse(body)
           log("--------------------------------------------\n" +
           `--- Movie Search Results for: ${movie} ---\n` +
           "--------------------------------------------\n\n" +
           `  Title: ${thisBody.Title}\n` +
           `  Year: ${thisBody.Year}\n` +
           `  IMDB Rating: ${thisBody.imdbRating}\n` +
           `  Rotten Tomatoes Rating: ${thisBody.tomatoRating}\n` +
           `  Country: ${thisBody.Country}\n` +
           `  Language: ${thisBody.Language}\n` +
           `  Plot: ${thisBody.Plot}\n` +
           `  Actors: ${thisBody.Actors}\n\n` +
           "--------------------------------------------\n\n")
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

// log.txt LIRI
function log(log) {
    console.log(log)
    fs.appendFile("log.txt", log, (error) => {
      if(error) {
        return console.log('Error occurred: ' + err)
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
            log(`Sorry - ${apiChoice} - not found...` +
            "--------------------------------------------\n\n")
    }
}

liri(process.argv[2], process.argv[3])