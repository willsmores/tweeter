/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $('#new-tweet').submit(function(event) {
    // alert('Handler for .submit() called.');
    event.preventDefault();
    const tweetText = $(this).serialize();

    $.post("/tweets", tweetText);
    // console.log(tweetText);
  });


  // Test / driver code (temporary). Eventually will get this from the server.
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const renderTweets = (tweetArr) => {

    tweetArr.forEach(tweet => {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    })
  };


  const createTweetElement = (tweetData) => {
    // console.log(tweetData);
    let $tweet = `
    <article>
      <header>
        <div>
          <img src="${tweetData.user.avatars}">
          <h3>${tweetData.user.name}</h3>
        </div>
        <h4>${tweetData.user.handle}</h4>
      </header>
      <p class="tweet-text">${tweetData.content.text}</p>
      <footer>
        <p>${tweetData.created_at}</p>
        <div class="tweet-icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-sharp fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
    `;

    return $tweet;
  };

  // const $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  // console.log($tweet); // to see what it looks like
  // $('#tweets-container').append($tweet); // to add it to the page

  renderTweets(data);
});