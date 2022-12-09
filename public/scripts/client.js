/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // Move focus to tweet text area
  $('#write-tweet-link').click(function(event) {
    event.preventDefault();
    $("textarea#tweet-text").focus();
  });

  const totalChars = $('.counter').text();

  $('#new-tweet').submit(function(event) {
    event.preventDefault();

    const rawTweetText = $('#tweet-text').val();

    if (rawTweetText.length > totalChars) {
      $('#error-container')
        .text(`Woah, too many opinions bruh! You only have 140 characters to use. 😖`)
        .slideDown('slow')
        .addClass('unhide');
    }

    if (rawTweetText.length === 0) {
      $('#error-container')
        .text(`Don't be shy, share all those cool opinions you have! 😜`)
        .slideDown('slow')
        .addClass('unhide');
    }

    const tweetText = $(this).serialize();

    if (rawTweetText.length > 0 && rawTweetText.length <= totalChars) {
      $.post("/tweets", tweetText)
        .then(function() {
          // Reset form and counter on successful post
          $('#tweet-text').val('');
          $('.counter').val(140);

          // Clear any error messages
          $('#error-container')
            .removeClass('unhide')
            .slideUp('slow');

          // Refresh the tweet container
          $('#tweets-container').empty();
          loadTweets();
        });
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
  };
  // Call immediately to preload page with existing tweets
  loadTweets();


  const renderTweets = (tweetArr) => {

    tweetArr.forEach(tweet => {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    })
  };


  const createTweetElement = (tweetData) => {

    // Prevent Cross-Site Scripting
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const $tweet = `
    <article>
      <header>
        <div>
          <img src="${tweetData.user.avatars}">
          <h3>${tweetData.user.name}</h3>
        </div>
        <h4>${tweetData.user.handle}</h4>
      </header>
      <p class="tweet-text">${escape(tweetData.content.text)}</p>
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