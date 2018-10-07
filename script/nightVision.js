function nightVision() {
    var dt = new Date(),
        time = dt.getHours(),
        timeTravel = false; // attiva comunque i colori notturni

    if (timeTravel == true) { time = 19; }
    // console.log("Local Hour: " + time);
    // console.log(timeTravel);

    if (time >= 19 && time <= 23 || time >= 0 && time <= 7) { 
        dusk();
    } else return;
    /*console.log(time);*/
};
window.onload = nightVision;

function dusk () {
    var x = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a, span, li, .spoti');
    document.documentElement.style.setProperty('--bg', 'black');
    document.documentElement.style.setProperty('--main', '#f8f8f8');
    for (var i = 0; i < x.length; i++) {
        var ls = 2;
        x[i].style.letterSpacing = ls;
    }
}

function dusk_toggle() {
    var day = true;
    var x = document.getElementsByTagName('*');
    console.log(x);

    if (day == true) {
        document.documentElement.style.setProperty('--bg', 'black');
        document.documentElement.style.setProperty('--main', '#f8f8f8');

        for (var i = 0; i < x.length; i++) {
            x[i].style.letterSpacing = "0.15";
        }
        day = false;
    }
    else {                
        document.documentElement.style.setProperty('--bg', '#f8f8f8');
        document.documentElement.style.setProperty('--main', 'black');

        for (var i = 0; i < x.length; i++) {
            x[i].style.letterSpacing = "0";
        }
        day = true;
    }
}