var Twit = require('twit');

//Settings
var followCooldown = 60 * 60 * 1000 //60 * 60 seconds = 1h, we don't want to flood Twitter
var tracking = '#gamedev'

//Information
var user_screen_name = "MY_USERNAME";
var T = new Twit({
  consumer_key:         'MY_CONSUMER_KEY', 
  consumer_secret:      'MY_CONSUMER_SECRET',
  access_token:         'MY_ACCESS_TOKEN',
  access_token_secret:  'MY_ACCESS_TOKEN_SECRET'
});

//Vars
var stream = T.stream('statuses/filter', { track: tracking, language: 'en' })
var totalFollows = 0;
var lastFollowTick = 0

//Helper functions
function getTick()
{
  var d = new Date();
  var n = d.getTime();
  return n
}

//Listen
stream.on('tweet', function (tweet) {
  if (tweet.user.screen_name == user_screen_name)
    console.log("Found a Tweet from the user. Not following!")
  else if (getTick() - lastFollowTick >= followCooldown)
  {
    lastFollowTick = getTick()
    console.log("Found a Tweet from " + tweet.user.name + "!");

    var tweet_user = String(tweet.user.id_str);

    T.post('friendships/create', { id: tweet_user }, function (err, data, response) {
      if (err)
        console.log("ERROR: "+ err);
      else {
        totalFollows++;
        console.log("Followed! Total: " + totalFollows)
      }
    })
  }  
})
