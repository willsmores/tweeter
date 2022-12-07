$(document).ready(function() {

  // Set the total number of characters available for a tweet
  // Thought it best not to hardcode this value
  const totalChars = $('.counter').text();

  $('#tweet-text').on('input', function() {
    
    // Total length of characters in input
    const charCount = $(this).val().length;

    // Traverse to sibling element
    const tweetFooter = $(this).next();
    // In sibling, find output element
    const counter = tweetFooter.find('output');

    // Sets the new count
    const charsRemaining = totalChars - charCount;
    $(counter).text(charsRemaining);

    // Sets the 'negative count' text colour
    if (charsRemaining < 0) {
      $(counter).addClass('counter-negative');
    } else {
      $(counter).removeClass('counter-negative');
    }
  })
});