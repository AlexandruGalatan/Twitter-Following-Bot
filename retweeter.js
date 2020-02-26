var Twit = require('twit');

//user info
var user_screen_name = "Mere3_";

// insert your twitter app info here
var T = new Twit({
  consumer_key:         'tCqUNejdlgD1Npocvk3N7SVZA', 
  consumer_secret:      'ESUP8ZLbzGUTLaMOqoBD7HXYCFELpJp5fG6cXExkh23dyC4gDS',
  access_token:         '447476606-HVvkE0jinYV262TQAmSOdgQgpASm918Lx5HtXPPp',
  access_token_secret:  'rpOM0l0eGSVfmJdDt1fVoY3YgDf4zRu80y9YVDIJjOAGn'
});

var RTs = 0;

var stream = T.stream('statuses/filter', { track: '#gamedev', language: 'en' })

stream.on('tweet', function (tweet) {
        if (tweet.user.screen_name == user_screen_name)
            console.log("Found a Tweet from the user. Not retweeting!")
        else{
            console.log("Found a Tweet from " + tweet.user.name+ "!");

            var TWEET_ID = String(tweet.id_str);

            T.post('statuses/retweet/:id', { id: TWEET_ID}, function (err, data, response) {
                if (err)
                  console.log("ERROR: "+ err);
                else {
                      RTs++;
                      console.log("Retweeted! Total: "+RTs)
                    }
            })
        }    
})
