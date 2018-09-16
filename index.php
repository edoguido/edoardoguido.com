<html>

    <head>
        <?php include'head.html'?>
    </head>

    <body onTouchStart="">

        <div class="wrapper" id="main">

                <div class="hero">
                    <div id="title" class="section">
                        <div class="right">
                            <h1>Edoardo Guido</h1>
                        </div>
                    </div>
                    <div class="section">
                        <h1>Milan&#45;based communication designer<br>who loves to&nbsp;run, to&nbsp;cook and&nbsp;to&nbsp;geek.</h1>
                    </div>
                    <div class="section">
                        <div class="spoti">
                        <script>
                            var key     = 'f16b0724839e781f43ce4ad721297f13';
                            var user    = 'drivinward';
                            var limit   = 1;
                            var what    = 'topartists'
                            var url     = 'http://ws.audioscrobbler.com/2.0/?method=user.get' + what + '&user=' + user + '&api_key=' + key + '&limit=' + limit + '&period=1month&format=json';
                            
                            function startBars() {
                                var bars = document.getElementsByClassName('bar');
                                // console.log(bars.length);
                                for (i = 0; i < bars.length; i++) {
                                    bars[i].classList.add('animate');
                                }
                            }

                            function stopBars() {
                                var bars = document.getElementsByClassName('bar');
                                // console.log(bars.length);
                                for (i = 0; i < bars.length; i++) {
                                    var childElement = bars[i];
                                    // console.log(bars[i]);
                                    bars[i].addEventListener("animationiteration webkitAnimationIteration", doStop(), false);
                                }
                                function doStop() {
                                    bars[i].classList.remove('animate');
                                }
                            }

                            function showMusicStats(item) {
                                console.log(item.name);
                                item.name = item.name.replace(/ /g,"&nbsp;");
                                return `<h1>Currently listening to 
                                    <a href="${item.url}" target="_blank" onmouseover="" onmouseout="">${item.name}</a>
                                    <div id="bars">
                                        <div class="bar animate"></div>
                                        <div class="bar animate"></div>
                                        <div class="bar animate"></div>
                                    </div>
                                </h1>`;
                            };

                            xmlhttp = new XMLHttpRequest();
                            xmlhttp.open('GET', url, true);

                            xmlhttp.onload = function() {
                                if (xmlhttp.status >= 200 && xmlhttp.status < 400){
                                    // Success!
                                    // Array contenente tutti i dati ricvuti
                                    var data = JSON.parse(xmlhttp.responseText);
                                    // Elemento della pagina in cui posizionare i dati ricevuti
                                    var el = document.getElementsByClassName("spoti");

                                    // data.map() per inserire nell'elemento el[0] i risultati della chiamata AJAX
                                    el[0].innerHTML = `${data.topartists.artist.map(showMusicStats).join('')}`;
                                    // console.log(data.topartists);
                                    } else {
                                        // We reached our target server, but it returned an error
                                    }
                                };
                            xmlhttp.onerror = function() {
                                // There was a connection error of some sort
                            };
                                        
                            xmlhttp.send();
                        </script>

                        </div>
                    </div>
                    <div class="section">
                        <li class="links">
                            <ul><a href="#" class="social link">Instagram</a></ul>
                            <ul><a href="#" class="social link">LinkedIn</a></ul>
                            <ul><a href="#" class="social link">E-Mail</a></ul>
                        </li>
                    </div>
                </div>

                <div class="content">

                    <script type="text/javascript">

                        function prjTemplate(project) {
                            // console.log(project));
                            return `
                                <div class="project ${project.id == 0 ? 'big' : ''} json" data-title="${project.title}">
                                    <a href="${project.link}" class="project-link"">
                                        <img class='img lazyload' src="${project.images['cover']}">
                                    </a>
                                </div>
                            `;
                        }

                        request = new XMLHttpRequest();
                        request.open('GET', 'projects.json', true);

                        request.onload = function() {
                            if (request.status >= 200 && request.status < 400){
                                // Success!
                                // Array contenente tutti i dati ricvuti
                                var data = JSON.parse(request.responseText);
                                // Elemento della pagina in cui posizionare i dati ricevuti
                                var el = document.getElementsByClassName("content");
                                
                                // data.map() per inserire nell'elemento el[0] tutti i progetti del file .json
                                el[0].innerHTML = `${data.map(prjTemplate).join('')}`;
                                } else {
                                    // We reached our target server, but it returned an error
                                }
                            };
                        request.onerror = function() {
                            // There was a connection error of some sort
                        };
                        
                        request.send();

                    </script>

                    <!-- <div class="project big">
                        <a href="ditdot.php" class="project-link">
                            <img class="img lazyload" src="res/ditdot.gif" data-src="res/ditdot.gif">
                        </a>
                    </div>
                    <div class="project">
                        <a href="#" class="project-link">
                            <img class="img lazyload" src="res/vimu.jpg" data-src="res/vimu.jpg">
                        </a>
                    </div>
                    <div class="project">
                        <a href="#" class="project-link">
                            <img class="img lazyload" src="res/legostory.gif" data-src="res/legostory.gif">
                        </a>
                    </div>
                    <div class="project dark">
                        <a href="#" class="project-link">
                            <img class="img lazyload" src="res/simphone.gif" data-src="res/simphone.gif">
                        </a>
                    </div>
                    <div class="project">
                        <a href="#" class="project-link">
                            <img class="img lazyload" src="res/sivedenonsivede.gif" data-src="res/sivedenonsivede.gif">
                        </a>
                    </div> -->

                </div>

        </div>

    </body>
    
    <?php include 'feet.html'?>

</html>