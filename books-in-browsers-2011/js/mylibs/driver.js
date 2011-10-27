/*jslint bitwise: true, browser: true, eqeqeq: true, immed: true, newcap: true, regexp: true, white: true, nomen: false, onevar: false, undef: true, plusplus: false, white: true, indent: 2 */
/*global window $ */

var last_slide = 35;

function setDeceleratingTimeout(callback, factor, times) {
  var internalCallback = function (t, counter) {
    return function ()  {
      if (--t > 0) {
        window.setTimeout(internalCallback, ++counter * factor);
        callback();
      }
      else {
      }
    }
  }(times, 0);
  window.setTimeout(internalCallback, factor);
};

  
var driver = (function () {
  // dependencies
  // end dependencies
  
  // private data
  var current_slide_number = 0,
  // private methods

  listen_for_keys = function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey) {
      return;
    }

    switch (e.which) {

    case 9: // Tab = +1; Shift + Tab = -1
      break;
      
    case 13: // Enter
      break;
      
    case 27: // Esc
      break;
      
    case 33: // PgUp
    case 38: // Up
    case 37: // Left
    case 72: // h
    case 75: // k
      e.preventDefault();
      $('#container').removeClass('slide' + current_slide_number);      
      current_slide_number--;
      change_slide();
      break;
      
    case 34: // PgDown
    case 40: // Down
    case 39: // Right
    case 76: // l
    case 74: // j
      e.preventDefault();
      current_slide_number++;
      change_slide();
      break;
      
    case 36: // Home
      e.preventDefault();
      
      current_slide_number = 0;
      // Go to first slide
      break;
      
    case 35: // End
      e.preventDefault();
      
      // Go to last slide
      break;
      
    case 32: // Space = +1; Shift + Space = -1
      break;
      
    default:
      // Behave as usual
    }
  },

  
  // end private methods
  
  // public methods
  
  change_slide = function () {
    console.log("Transitioning to slide " + current_slide_number);
    var el = '[data-slide="' + current_slide_number + '"]';

    // Update the global slider counter for CSS
    $('#container').attr('data-currentslide', current_slide_number);
    $('#container').addClass('slide' + current_slide_number);

    // Make the slide visible
    $(el).addClass('visible').css('visibility', 'visible'); 

    // Events that happen instantly (not on a webkit-transition)
    if (current_slide_number === last_slide) {
      current_slide_number = 1;
      $('.slide').css('visibility', 'hidden');
      $.each($('#container').attr('class').split(' '), function (index, item) {
        $('#container').removeClass(item);
      });
      $('[data-slide="2"]').hide().css('visibility', 'visible').fadeIn('slow');
      $('#thanks').css('visibility', 'visible');

      change_slide();
    }    
  },

  initialize = function () {

    // Listen for keyboard events
    $(document).bind('keydown', listen_for_keys);

    console.log("Initalized");
  };
  // end public methods
  
  // one-time init procedures

  // public API
  return {
    initialize: initialize
  };
}());
