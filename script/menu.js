//            calcola i margini per la larghezza di .projects-roll-container
var f = (function () {
    var margin;
    var viewportWidth = $(window).width();
    var projectsContainerWidth = $(".projects-roll-container").width();
        
    if (viewportWidth > 480) {
        margin = 20;
    }
    else margin = 10;
    
    projectsContainerWidth = viewportWidth - (margin*2);
    
    $(".projects-roll-container .projects-roll").css({'width': projectsContainerWidth+'px'})
});


var distance;   // distanza fra varie skills in homepage

$(document).ready(function(){
    f();
});
$(window).resize(function() {
    f();
});


//            setta stato pulsante menu default
(function( $ ) {
    $.fn.defaultState = function() {
        this.removeClass("open");
        this.css({'box-shadow' : 'none', 'background-color' : 'var(--4-shadow)'});
    };
}) ( jQuery );



$(".contentframe").click(function() {
    if ($("body").hasClass("navOpen")) {
        $("body").removeClass("navOpen");
        $(".wrap").css("box-shadow", "0 10px 40px var(--4-shadow)");    // ripristina ombra wrap default
        $("nav, .wrap, .frame, .menu-bar").toggleClass("open");
        $(".openNav").defaultState();
    }
});



//            Apre il menu

$(".openNav").click(function() {
    $("body").toggleClass("navOpen");
    $("nav, .wrap, .frame, .menu-bar").toggleClass("open");
    $(this).toggleClass("open");
});


//            Chiude il menu se si clicca sul link

$(".menu-link").click(function() {
    $(".wrap").css("box-shadow", "0 10px 40px var(--4-shadow)");    // ripristina ombra wrap default
    $("body").toggleClass("navOpen");
    $("nav, .wrap, .frame, .menu-bar, .openNav").toggleClass("open");
    $(this).toggleClass("open");
});

//            Chiude il menu se si clicca su skills
$(".big").click(function() {
    $("body").removeClass("navOpen");
    $("nav, .wrap, .frame, .menu-bar, .openNav").removeClass("open");
});


//            Gestione eventi in mouseout

$("a").hover(function() {
    $(".openNav").css({'background-color': 'var(--3)', 'box-shadow': 'var(--4-shadow)'});
    $(".openNav.open").css({'box-shadow' : '0 5px 10px var(--3-shadow)', 'background-color' : 'var(--3)'});
    $(".wrap.open").css("box-shadow", "0 10px 40px var(--3-shadow)");
});

$("a").mouseleave(function() {
    $("#content").css("background-color", "var(--1)");
    $(".openNav").css("background-color", "var(--4)");
    $(".wrap.open").css("box-shadow", "0 10px 40px var(--4)");
    $(".openNav.open").css({'box-shadow' : '0 5px 10px var(--4-shadow)', 'background-color' : 'var(--4-shadow)'});
    $(".wrap.open").css({'box-shadow' : '0 5px 10px var(--4-shadow)'});
});
