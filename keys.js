console.log('this is loaded')

// You can either replace the process.env variables here or create your own .env file and add you variables there.

// This is your Tumblr account's Username
exports.tumblrUser =  process.env.TUMBLR_USERNAME


/*
These are the variables needed to access the Tumblr account's API
You will need a Tumblr account to access this part of the aplication
Then you need to regester your app at https://www.tumblr.com/oauth/apps
Once you are completed you will be given your OAuth consumer key and consumer secret
Then you will need to go https://api.tumblr.com/console/calls/user/info and paste in your OAuth consumer key and consumer secret
This will token key and token secret (it will also repeat your consumer key and secret as well)
*/
exports.tumblr = {
  consumer_key: process.env.TUMBLR_CONSUMER_KEY,
  consumer_secret: process.env.TUMBLR_CONSUMER_SECRET,
  access_token_key: process.env.TUMBLR_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TUMBLR_ACCESS_TOKEN_SECRET
};

/*
To access the spotify API you will need an accout at https://developer.spotify.com/dashboard/login
Then you 'Create a client ID'
A module will pop up to ask you a bunch of questions about your application
Once you are done you will be provided with a Client ID and Client Secret
*/
exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
}