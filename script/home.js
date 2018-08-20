//            Animazione link home
var brandClicked = false;
var brand = $("#brand");

var uiuxClicked = false;
var uiux = $("#uiux");

var motionClicked = false;
var motion = $("#motion");

var bg = $(".wrap.open");

var distance;   // distanza fra varie skills in homepage


//            calcola i margini per la larghezza di .projects-roll-container

var f = (function () {
    var margin;
    var viewportWidth = $(window).width();
    var projectsContainerWidth = $(".projects-roll-container").width();
        
    if (viewportWidth > 480) {
        margin = 20;
    }
    else margin = 10;
    
    projectsContainerWidth = viewportWidth - (margin * 2);
    
    $(".projects-roll-container .projects-roll").css({'width': projectsContainerWidth+'px'})
});


//            Genero progetti

var fileType = ".png";              //  Determina formato immagine nelle cartelle
var newProjectsVersion = true;      //  'true' mostra i progetti SENZA immagine di sfondo.
                                    //  'false' mostra i progetti CON immagine di sfondo

//            Branding

var brandProjects = (function() {
    var totalBrandProjects = 4;
    var brandProjectsTitles = ["VIMU", "Giuliano Diero", "Nonem", "Puzzleart"];
    var brandProjectsLinks = ["vimu", "gdiero", "nonem", "puzzleart"];
    
    //        Il ciclo parte da 1 perché quando chiamo div:nth-child, se chiamo l'elemento 0 non trovo nulla.
    //        Di conseguenza, quando chiamo l'array per assegnare i titoli a ciascun progetto, l'indice sarà numProjects-1
    for (var numProjects = 1; numProjects <= totalBrandProjects; numProjects++) {
        $('.projects-roll.1').append("<div><a href='"+brandProjectsLinks[numProjects-1]+".html'><span></span></a></div>");
        if (newProjectsVersion == true) {
            $('.projects-roll.1').find("div:nth-child("+numProjects+")").addClass("project");
        } else {
            $('.projects-roll.1').find("div:nth-child("+numProjects+")").addClass("project").css({ "background-image": "url(res/1-branding/" + numProjects + fileType + ")" });
        };
        $('.projects-roll.1').find("div:nth-child("+numProjects+") span").html(brandProjectsTitles[numProjects-1]).addClass("projectTitle").css({ "width": "100px"});
    };
});


//            Ui/Ux

var uiuxProjects = (function() {
    var totaluiuxProjects = 3;
    var uiuxProjectsTitles = ["Whatsapp", "Fitbit", "VIMU"];
    var uiuxProjectsLinks = ["whatsapp", "fitbit", "vimu"];
    
    //  Il ciclo parte da 1 perché quando chiamo div:nth-child, se chiamo l'elemento 0 non trovo nulla.
    //  Di conseguenza, quando chiamo l'array per assegnare i titoli a ciascun progetto, l'indice sarà numProjects-1
    for (var numProjects = 1; numProjects <= totaluiuxProjects; numProjects++) {
        $('.projects-roll.2').append("<div><a href='"+uiuxProjectsLinks[numProjects-1]+".html'><span></span></a></div>");
        if (newProjectsVersion == true) {
            $('.projects-roll.2').find("div:nth-child("+numProjects+")").addClass("project");
        } else {
            $('.projects-roll.2').find("div:nth-child("+numProjects+")").addClass("project").css("background-image", "url(res/2-uiux/" + numProjects + fileType + ")" );
        };
        $('.projects-roll.2').find("div:nth-child("+numProjects+") span").html(uiuxProjectsTitles[numProjects-1]).addClass("projectTitle");
    };
});


//            Motion

var motionProjects = (function() {
    var totalmotionProjects = 3;
    var motionProjectsTitles = ["ditdot", "A Lego Story", "VIMU"];
    var motionProjectsLinks = ["ditdot", "a-lego-story", "vimu"];
    
    //  Il ciclo parte da 1 perché quando chiamo div:nth-child, se chiamo l'elemento 0 non trovo nulla.
    //  Di conseguenza, quando chiamo l'array per assegnare i titoli a ciascun progetto, l'indice sarà numProjects-1
    for (var numProjects = 1; numProjects <= totalmotionProjects; numProjects++) {
        $('.projects-roll.3').append("<div><a href='"+motionProjectsLinks[numProjects-1]+".html'><span></span></a></div>");
        if (newProjectsVersion == true) {
            $('.projects-roll.3').find("div:nth-child("+numProjects+")").addClass("project");
        } else {
            $('.projects-roll.3').find("div:nth-child("+numProjects+")").addClass("project").css("background-image", "url(res/3-motion/" + numProjects + fileType + ")" );
        };
        $('.projects-roll.3').find("div:nth-child("+numProjects+") span").html(motionProjectsTitles[numProjects-1]).addClass("projectTitle");
    };
});



$(document).ready(function(){
    f();
    brandProjects();
    uiuxProjects();
    motionProjects();
    
    distance = $('#brand').offset().top - $('#uiux').offset().top;
});
$(window).resize(function() {
    f();
    
    distance = $('#brand').offset().top - $('#uiux').offset().top;
});


//            Apre il menu

$(".openNav").click(function() {
    $("body").toggleClass("navOpen");
    $("nav, .wrap, .frame, .menu-bar").toggleClass("open");
    $(this).toggleClass("open");
    
    if ($(this).hasClass("open") && (brandClicked == true || uiuxClicked == true || motionClicked == true)) {
        $(this).css({'box-shadow' : '0 5px 10px var(--4-shadow)', 'background-color' : 'var(--1)'});
        
    } else if ($(this).hasClass("open") && (brandClicked == false && uiuxClicked == false && motionClicked == false)) {
        $(this).css({'box-shadow' : '0 5px 10px var(--4-shadow)', 'background-color' : 'var(--4-shadow)'});
        
    } else if (!$(this).hasClass("open") && (brandClicked == true || uiuxClicked == true || motionClicked == true)) {
        $(this).css({'box-shadow' : 'none', 'background-color' : 'var(--1)'});
        
    } else if (!$(this).hasClass("open") && (brandClicked == false && uiuxClicked == false && motionClicked == false)) {
        $(this).css({'box-shadow' : 'none', 'background-color' : 'var(--4-shadow)'});
        
    };
    
//    alert("brandClicked: " + brandClicked + "\n" + "uiuxClicked: " + uiuxClicked + "\n" + "motionClicked: " + motionClicked  + "\n");
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
    $("nav, .wrap, .frame, .menu-bar").removeClass("open");
    if ($(".openNav").hasClass("open")) {       // resetta stato bottone menu se si clicca su skills
        $(".openNav").removeClass("open");
    };
});


//            Gestione animazione della sezione skills al click

var sTime = 450;        //spostamento testo
var oTime = 150;        //animazione opacità
var dTime = 250;        //delay per ritorno al posto

var offs = -125;


//            Funzione per calcolo altezza sezione selezionata

brand.click(function() {
    if (brandClicked == false) {
        
        $(this).css({
            position: 'relative',
            transform: 'translateY(' + (offs) + 'px)',
            '-webkit-transform': 'translateY(' + (offs) + 'px)',
            'transition-duration': '0.5s',  
            'transition-timing-function': 'swing',
        });
        $('#uiux').addClass("hidden");
        $('#motion').addClass("hidden");
        $('.projects-roll-container.1').addClass("show");
        $(".wrap").css("box-shadow", "0 10px 40px var(--brand-shadow)");
        
        brandClicked = true;
        return;
    };
    
    if (brandClicked == true) {
        
        $(this).css({
            position: 'relative',
            transform: 'translateY(0px)',
            '-webkit-transform': 'translateY(0px)',
            'transition-duration': '0.5s',
            'transition-timing-function': 'swing',
        });
        $('#uiux').removeClass("hidden");
        $('#motion').removeClass("hidden");
        $('.projects-roll-container.1').removeClass("show");
        $(".wrap").css("box-shadow", "0 5px 10px var(--4-shadow)");
        
        brandClicked = false;
        return;
    };
});

uiux.click(function() {
    if (uiuxClicked == false) {
        
        $(this).css({
            position: 'relative',
            transform: 'translateY(' + (offs + distance) + 'px)',
            '-webkit-transform': 'translateY(' + (offs + distance) + 'px)',
            'transition-duration': '0.5s',
            'transition-timing-function': 'swing',
        });
        $('#brand').addClass("hidden");
        $('#motion').addClass("hidden");
        $('.projects-roll-container.2').addClass("show");
        $(".wrap").css("box-shadow", "0 10px 40px var(--uiux-shadow)");
        
        uiuxClicked = true;
        return;
    };
    
    if (uiuxClicked == true) {

        $(this).css({
            position: 'relative',
            transform: 'translateY(0px)',
            '-webkit-transform': 'translateY(0px)',
            'transition-duration': '0.5s',
            'transition-timing-function': 'swing',
        });
        $('#brand').removeClass("hidden");
        $('#motion').removeClass("hidden");
        $('.projects-roll-container.2').removeClass("show");
        $(".wrap").css("box-shadow", "0 5px 10px var(--4-shadow)");

        uiuxClicked = false;
        return;
    };
});

motion.click(function() {
    if (motionClicked == false) {
        
        $(this).css({
            position: 'relative',
            transform: 'translateY(' + (offs + (distance * 2)) + 'px)',
            '-webkit-transform': 'translateY(' + (offs + (distance * 2)) + 'px)',
            'transition-duration': '0.5s',
            'transition-timing-function': 'swing',
        });
        $('#brand').addClass("hidden");
        $('#uiux').addClass("hidden");
        $('.projects-roll-container.3').addClass("show");
        $(".wrap").css("box-shadow", "0 10px 40px var(--motion-shadow)");
        
        motionClicked = true;
        return;
    };
    
    if (motionClicked == true) {
        
        $(this).css({
            position: 'relative',
            transform: 'translateY(0px)',
            '-webkit-transform': 'translateY(0px)',
            'transition-duration': '0.5s',
            'transition-timing-function': 'swing',
        });
        $('#brand').removeClass("hidden");
        $('#uiux').removeClass("hidden");
        $('.projects-roll-container.3').removeClass("show");
        $(".wrap").css("box-shadow", "0 5px 10px var(--4-shadow)");
        
        motionClicked = false;
        return;
    };
});


//            Cambia schema colori a seconda del .big

$("a").hover(function() {
    if (brandClicked == false && uiuxClicked == false && motionClicked == false){
        $(".openNav").css({'background-color': 'var(--1)', 'box-shadow': 'var(--4-shadow)'});
        $(".openNav.open").css({'box-shadow' : '0 5px 10px var(--3-shadow)', 'background-color' : 'var(--3)'});
        $(".wrap.open").css("box-shadow", "0 10px 40px var(--3-shadow)");
    }
    else return false;
});

$(".big").hover(function() {
    $(".openNav.open").css({
        "background-color": "var(--4-shadow)",      // override "a" hover
        "box-shadow": "0 5px 10px var(--4-shadow)",
    });
    
});

brand.hover(function() {
    $(".wrap.open").css("box-shadow", "0 10px 40px var(--brand-shadow)");
    $("#content").css("background-color", "var(--brand)");
});

uiux.hover(function() {
    $(".wrap.open").css("box-shadow", "0 10px 40px var(--uiux-shadow)");
    $("#content").css("background-color", "var(--uiux)");
});

motion.hover(function() {
    $(".wrap.open").css("box-shadow", "0 10px 40px var(--motion-shadow)");
    $("#content").css("background-color", "var(--motion)");
});

$(".label").hover(function() {
    $(".openNav").css("background-color", "var(--3)");
    $(".openNav.open").css("background-color", "var(--3)");
    $(".wrap.open").css("box-shadow", "0 10px 40px var(--3-shadow)");
    $("#content").css("background-color", "var(--1)");
});


//            Gestione eventi in mouseout

$("a").mouseleave(function() {
    if (brandClicked == false && uiuxClicked == false && motionClicked == false){
        $("#content").css("background-color", "var(--1)");
        $(".openNav.open").css("background-color", "var(--3)");
        $(".openNav.open").css({'box-shadow' : '0 5px 10px var(--4-shadow)', 'background-color' : 'var(--4-shadow)'});
        $(".wrap.open").css("box-shadow", "0 10px 40px var(--4)");
    };
    $(".openNav.open").css({'box-shadow' : '0 5px 10px var(--4-shadow)', 'background-color' : 'var(--4-shadow)'});
    $(".wrap.open").css({'box-shadow' : '0 5px 10px var(--4-shadow)'});
});

brand.mouseleave(function() {
    if (brandClicked == true) {
        $("#content").css("background-color", "var(--brand)");
        $(".openNav.open").css("background-color", "var(--1)");
        $(".wrap.open").css("box-shadow", "0 10px 40px var(--brand-shadow)");
    }
    else {
        $("#content").css("background-color", "var(--1)");
        $(".openNav").css("background-color", "var(--4-shadow)");
        $(".wrap.open").css("box-shadow", "0 5px 10px var(--4-shadow)");
    };
});

uiux.mouseleave(function() {
    if (uiuxClicked == true) {
        $("#content").css("background-color", "var(--uiux)");
        $(".openNav.open").css("background-color", "var(--1)");
        $(".wrap.open").css("box-shadow", "0 10px 40px var(--uiux-shadow)");
    }
    else {
        $("#content").css("background-color", "var(--1)");
        $(".openNav").css("background-color", "var(--4-shadow)");
        $(".wrap.open").css("box-shadow", "0 5px 10px var(--4-shadow)");
    };
});

motion.mouseleave(function() {
    if (motionClicked == true) {
        $("#content").css("background-color", "var(--motion)");
        $(".openNav.open").css("background-color", "var(--1)");
        $(".wrap.open").css("box-shadow", "0 10px 40px var(--motion-shadow)");
    }
    else {
        $("#content").css("background-color", "var(--1)");
        $(".openNav").css("background-color", "var(--4-shadow)");
        $(".wrap.open").css("box-shadow", "0 5px 10px var(--4-shadow)");
    };
});

$(".label").mouseleave(function() {
    if (brandClicked == false && uiuxClicked == false && motionClicked == false){
        $("#content").css("background-color", "var(--1)");
        $(".openNav").css("background-color", "var(--4-shadow)");
        $(".openNav.open").css({'box-shadow' : '0 5px 10px var(--4-shadow)', 'background-color' : 'var(--4)'});
        $(".wrap.open").css("box-shadow", "0 5px 10px var(--4-shadow)");
    }
    else if (brandClicked == true) {
        $(".openNav").css("background-color", "#00000050");
        $(".openNav.open").css({'box-shadow' : '0 5px 10px var(--4-shadow)', 'background-color' : 'var(--4)'});
        $(".wrap.open").css("box-shadow", "0 10px 40px var(--brand-shadow)");
        $("#content").css("background-color", "var(--brand)");
    }
    else if (uiuxClicked == true) {
        $(".openNav").css("background-color", "#00000050");
        $(".openNav.open").css({'box-shadow' : '0 5px 10px var(--4-shadow)', 'background-color' : 'var(--4)'});
        $(".wrap.open").css("box-shadow", "0 10px 40px var(--uiux-shadow)");
        $("#content").css("background-color", "var(--uiux)");
    }
    else if (motionClicked == true) {
        $(".openNav").css("background-color", "#00000050");
        $(".openNav.open").css({'box-shadow' : '0 5px 10px var(--4-shadow)', 'background-color' : 'var(--4)'});
        $(".wrap.open").css("box-shadow", "0 10px 40px var(--motion-shadow)");
        $("#content").css("background-color", "var(--motion)");
    } else {
        $(".openNav.open").css({'box-shadow' : '0 5px 10px var(--4-shadow)', 'background-color' : 'var(--4-shadow)'});
        $(".wrap.open").css({'box-shadow' : '0 5px 10px var(--4-shadow)'});
    }
});


