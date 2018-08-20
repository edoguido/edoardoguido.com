function dusk() {
    var day = true;
    var x = document.getElementsByTagName('*');
    /*console.log(x);*/

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