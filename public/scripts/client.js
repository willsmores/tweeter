/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $('#new-tweet').submit(function(event) {
    event.preventDefault();

    const rawTweetText = $('#tweet-text').val();

    const tweetText = $(this).serialize();

    // console.log('event:', event);
    console.log('this:', tweetText);

    if (rawTweetText.length > 140) {
      $('#error-container')
        .text(`Woah, too many opinions bruh! You only have 140 characters to use. 😖`)
        .slideDown('slow')
        .addClass('unhide')
    }

    if (rawTweetText.length === 0) {
      $('#error-container')
        .text(`Don't be shy, share all those cool opinions you have! 😜`)
        .slideDown('slow')
        .addClass('unhide');
    }

    if (rawTweetText.length > 0 && rawTweetText.length <= 140) {
      $.post("/tweets", tweetText);
      // Reset form and counter on successful post
      $('#tweet-text').val('');
      $('.counter').val(140);
      // Clear any error messages
      $('#error-container')
        .removeClass('unhide')
        .slideUp('slow');

      // Refresh the tweet container
      $('#tweets-container').empty();
      setTimeout(() => {
        loadTweets();
      }, "100")
      
    }

  });


  const loadTweets = () => {

    $.ajax('/tweets', { method: 'GET' })
    .then(function (moreTweets) {
      renderTweets(moreTweets);
    })
    .catch((err) => {
      console.log(err);
    });

    // jQuery version
    // $.get("/tweets", function(moreTweets, status) {
    //   renderTweets(moreTweets);
    // });
  }

  loadTweets();


  const renderTweets = (tweetArr) => {

    tweetArr.forEach(tweet => {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    })
  };


  const createTweetElement = (tweetData) => {
    console.log('tweetData:', tweetData);
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