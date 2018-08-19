console.log('this is loaded')

exports.tumblr = {
  consumer_key: process.env.TUMBLR_CONSUMER_KEY,
  consumer_secret: process.env.TUMBLR_CONSUMER_SECRET,
  access_token_key: process.env.TUMBLR_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TUMBLR_ACCESS_TOKEN_SECRET
};

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
}