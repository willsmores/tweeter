/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $('#new-tweet').submit(function(event) {
    event.preventDefault();
    const tweetText = $(this).serialize();
    // console.log(tweetText);

    if (!validateForm(tweetText)) {
      $.post("/tweets", tweetText);
    }
  });


  const validateForm = (text) => {
    if (text.length - 5 === 0) {
      alert (`Don't be shy, write some tweet content!`);
    }
    if (text.length - 5 > 144) {
      alert (`Woah too many opinions! You only have 144 characters to use.`);
    }
  }


  const loadTweets = () => {

    // $.ajax('/tweets', { method: 'GET' })
    // .then(function (moreTweets) {
    //   renderTweets(moreTweets);
    // });

    // jQuery version
    $.get("/tweets", function(moreTweets, status) {
      renderTweets(moreTweets);
    });
  }

  loadTweets();


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
        <p class="timeago">${timeago.format(tweetData.created_at)}</p>
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
});