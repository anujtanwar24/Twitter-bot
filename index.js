// index.js
const fs = require("fs");
const { TwitterApi } = require("twitter-api-v2");

// Fill in your API credentials
const client = new TwitterApi({
  appKey: "YOUR_APP_KEY",
  appSecret: "YOUR_APP_SECRET",
  accessToken: "YOUR_ACCESS_TOKEN",
  accessSecret: "YOUR_ACCESS_SECRET",
  bearerToken: "YOUR_BEARER_TOKEN",
});

// Provide read and write controls
const rwClient = client.readWrite;

// Read tweets and images from a file (tweets.txt)
const tweetsFromFile = fs.readFileSync("tweets.txt", "utf8").split("\n");

// Create a function to post tweets from the file
const postTweetsFromFile = async () => {
  try {
    for (const tweet of tweetsFromFile) {
      // Assuming each line in the file contains a tweet
      await rwClient.v2.tweet(tweet);
      console.log(`Tweet posted: ${tweet}`);
      // Add a delay (e.g., 1 hour) between tweets
      await new Promise((resolve) => setTimeout(resolve, 3600000));
    }
  } catch (error) {
    console.error(error);
  }
};

// Call the function to start posting tweets
postTweetsFromFile();
