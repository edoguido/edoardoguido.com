<html>

    <head>
        <?php include'head.html'?>
    </head>

    <body onTouchStart="">

        <div class="wrapper" id="main">

                <div class="hero">
                    <div id="title" class="section">
                        <div class="left">
                        </div>
                        <div class="right">
                            <h1>Edoardo Guido</h1>
                        </div>
                    </div>
                    <div class="section">
                        <div class="left">
                        </div>
                        <div class="right">
                            <h1>Milan&#45;based communication designer<br>who loves to&nbsp;run, to&nbsp;cook and&nbsp;to&nbsp;geek</h1><br>
                        </div>
                    </div>
                    <div class="section">
                        <div class="left">
                        </div>
                        <div class="right">
                            <li class="links">
                                <ul><a href="#" class="social-link">Instagram</a></ul>
                                <ul><a href="#" class="social-link">LinkedIn</a></ul>
                                <ul><a href="#" class="social-link">E-Mail</a></ul>
                            </li>
                        </div>
                    </div>
                </div>

                <div class="content">

                    <script type="text/javascript">

                        function prjTemplate(project) {
                            return `
                                <div class="project ${project.id == 0 ? 'big' : ''} json" data-title="${project.title}">
                                    <a href="${project.link}" class="project-link">
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
                                
                                // data.map() per inserire nell'array 'data' tutti i progetti del file .json
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