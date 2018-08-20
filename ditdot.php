<html>

<head>
    <?php include'head.html'?>
</head>

<body onTouchStart="">

    <div class="wrapper" id="main">

        <div class="content">
            <!-- <div class="project big">
                <a href="index.php" class="project-link">
                            <img class="img" src="res/ditdot.gif">
                </a>
            </div> -->
        </div>

        <div class="hero">
            <div class="section">
                <div class="left">
                </div>
                <div class="right">
                </div>
            </div>
            <script type="text/javascript">
            
            request = new XMLHttpRequest();
            request.open('GET', 'projects.json', true);
            
            request.onload = function() {
                if (request.status >= 200 && request.status < 400){
                    // Success!
                    // Array contenente tutti i dati JSON
                    var data = JSON.parse(request.responseText);
                    // Elemento della pagina in cui posizionare i dati JSON
                    var el = document.getElementsByClassName("content");
                    // data.map() copia in un nuovo array tutti i dati JSON
                    el[0].innerHTML = `
                        <div class="project big">
                            <a href="index.php" class="project-link">
                                <img class="img" src="${data[3].images['cover']}">
                            </a>
                        </div>
                    `;

                    document.getElementsByClassName("right")[0].innerHTML = `<h1>${data[3].description}</h1>`;
                } else {
                    // We reached our target server, but it returned an error
                }
            };
            request.onerror = function() {
                // There was a connection error of some sort
            };
            
            request.send();
            </script>

        </div>

    </div>

</body>

<?php include 'feet.html'?>

</html>