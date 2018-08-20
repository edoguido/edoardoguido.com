var t = 250;

$(document).ready(function(){

    smoothLinks();
    colourTime();


    $(document).scroll( function() {
        showMenu()
    });

});


//  dichiarazione funzioni  //

//  utilizza l'orologio della macchina per determinare lo schema di colori
//  e per non accecare l'utente durante le ore notturne
function colourTime() {
    var dt = new Date(),
        time = dt.getHours(),
        timeTravel = false;     //attiva schema colori notturno

    if (time > 19 && time <= 23 || time >= 0 && time < 7 || timeTravel == true) {
        
        document.documentElement.style.setProperty('--black', '#e9e9e9');
        document.documentElement.style.setProperty('--main-color', '#222');
        document.documentElement.style.setProperty('--main-darker', '#333');
        
    } else return;
//      console.log(time);
}

function smoothLinks() {
// Select all links with hashes
$('a[href*="#"]')
  .click(function(event) {
      // Figure out element to scroll to
      var target = $(this.hash);
        $('html, body').animate({ scrollTop: target.offset().top }, t*(1.5) );
    })
};

function showMenu() {
   var menu           = $(".menu"),
       offset         = menu.offset(),
       scrollTop      = $(window).scrollTop(),
       headerLine     = $(".h-line");

    if (scrollTop > headerLine.offset().top) {
        menu.addClass("show");
    }
    else menu.removeClass("show");

}

$(function(){
  'use strict';
  var options = {
    prefetch: true,
    cacheLength: 2,
    debug: true,  
    onStart: {
      duration: t, // Duration of our animation
      render: function ($container) {
        // Add your CSS animation reversing class
        $container.css({"white-space": "initial"}).fadeOut(t).animate({ "margin-top": 100 },{ queue: false, duration: t } );

        // Restart your animation
        smoothState.restartCSSAnimations();
      }
    },
    onReady: {
      duration: 0,
      render: function ($container, $newContent) {

        // Remove your CSS animation reversing class
        $container.fadeIn(t*2).animate({ 
            "opacity": 1,
            "margin-top": 0,
        },{ queue: false, duration: t*3, } );

        // Inject the new content
        $container.html($newContent);
          
        smoothLinks();

      }
    }
  },
  smoothState = $('#main').smoothState(options).data('smoothState');
});
