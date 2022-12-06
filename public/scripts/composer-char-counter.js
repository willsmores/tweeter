$(document).ready(function() {

  $('#tweet-text').on('input', function() {
    const charCount = this.value.length;
    // console.log(charsRemaining - charCount);
    let charsRemaining = 140 - charCount;
    
    $('.counter').text(charsRemaining);

    if (charsRemaining < 0) {
      $('.counter').addClass('counter-negative');
    } else {
      $('.counter').removeClass('counter-negative');
    }
  })
});