$(function() {
    /* inizializza smoothstate */
    'use strict';
    var options = { 
        prefetch: true,
        prefetchOn: 'mouseover touchstart',

        onStart: {
          duration: 500,
          render: function ($container) {
              $container.addClass('t-fade');
//              smoothState.restartCSSAnimations();
          }
        },
        onReady: {
          duration: 250,
          render: function ($container, $newContent) {
              // Update the HTML on the page
              $container.html($newContent);
              // Scroll to top
              $('html,body').animate({ scrollTop: 0 }, 0);
              // Reveal the nu shiat
              $container.removeClass('t-fade');

              // get the current url
              var url = smoothState.href
              // full html response
              var doc = smoothState.cache[url].doc

              var $href = url.replace(/^.*\/\/[^\/]+/, '');

              fetch(url);
          }
        }

    },
  smoothState = $('#main').smoothState(options).data('smoothState');

});

// $(function() { $('#main').smoothState({ }); });
