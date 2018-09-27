window.onload = function() {
    nightVision(); 
    smoothLinks();
    
    $('.page-img').on('dragstart', function(event) { event.preventDefault(); });
    $('.page-img').on('contextmenu', function(event) { event.preventDefault(); });

    $('.header-title').click(function () {
        $('.about').toggleClass('open');
        if ($('.about').hasClass('open') == true ) {
            $('rect').css('transform', 'translateX(-100px)');
            $('#E').css('transform', 'rotateZ(-180deg)');
        }
        else { 
            $('rect').css('transform', 'translateX(00px)');
            $('#E').css('transform', 'rotateZ(0deg)');
            }
    });

};


//  dichiarazione funzioni  //

//  utilizza l'orologio della macchina per determinare lo schema di colori
//  e per non accecare l'utente durante le ore notturne
function nightVision() {
    var dt = new Date(),
        time = dt.getHours(),
        timeTravel = false;     //attiva comunque lo schema colori notturno

    if (time >= 19 && time <= 23 || time >= 0 && time <= 7 || timeTravel == true) {
        
        document.documentElement.style.setProperty('--black-head', '#ffffff');
        document.documentElement.style.setProperty('--black-head-fade', '#00ffa7');
        document.documentElement.style.setProperty('--main', '#111118');
        document.documentElement.style.setProperty('--accent', '#00ffa7');
        document.documentElement.style.setProperty('--accentInv', '#6010f2');
        document.documentElement.style.setProperty('--accent-shadow', 'rgb(32, 39, 37)');
        document.documentElement.style.setProperty('--accentInv-shadow', 'rgb(38, 18, 88)');
        document.documentElement.style.setProperty('--shadow', 'rgb(38, 18, 88)');
        document.documentElement.style.setProperty('--white', '#000000');

//        $('.header-title').append('<br><p class="night-alert">Yes, you&#39;re in the same website, but the colours have&nbsp;been&nbsp;darkened not to damage your sight at&nbsp;night :)</p>');
//        $('.night-alert').delay(2800).fadeOut(1000);

/*
        document.body.style.cssText = "--black-head: #ffffffff";
        document.body.style.cssText = "--black-head-fade: #00ffa7ff";
        document.body.style.cssText = "--main: #111118ff";
        document.body.style.cssText = "--accent: #00ffa7ff";
        document.body.style.cssText = "--accentInv: #6010f2ff";
        document.body.style.cssText = "--accent-shadow: #00ffa733";
        document.body.style.cssText = "--accentInv-shadow: #6010f233";
        document.body.style.cssText = "--shadow: #6010f222";
        document.body.style.cssText = "--white: #000000ff";
*/
        
    } else return;
//      console.log(time);
}

function smoothLinks() {
    var t = 250;
    // Select all links with hashes
    $('a[href*="#"]')
      .click(function(event) {
        event.preventDefault;
        // Figure out element to scroll to
        var target = $(this.hash);
        $('html, body').animate({ scrollTop: target.offset().top - target.height() }, t * (4), "swing" );
        })
    };