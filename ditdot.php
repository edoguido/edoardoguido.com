<html>

<head>
    <?php include'head.html'?>
</head>

<body onTouchStart="">

    <div class="wrapper" id="main">

        <div class="content">
        </div>

        <div class="hero">
            <div class="section">
                <div class="left">
                </div>
                <div class="right">
                </div>
            </div>
            <script type="text/javascript">

            function layProjectData(projectData) {
                // console.log(projectData);
                var title = projectData.title;
                var images = projectData.images;
                var outputs = [];
                var output;

                output = `
                        <h1>${projectData.title}</h1>
                        <h1>${projectData.description}</h1>
                `;
                outputs.push(output);

                for (image in images) {
                    if (image !== 'cover') {
                        // TO-DO FUNZIONE CHE CONTROLLA SE PATH COMINCIA CON HTTPS://
                        // SE SI ALLORA FA IFRAME VIMEO, ALTRIMENTI TAG IMG CON A ATTORNO
                        output = `
                            <div class="project big">
                                <a href="#" class="project-link" style="pointer-events: none">
                                    <img class="img" src="projects/${title}/${images[image]}">
                                </a>
                            </div>
                            `
                        outputs.push(output);
                    }
                }
                return outputs.join('');
            }
            
            function getThisProject(sourceFile, targetElement) {
                request = new XMLHttpRequest();
                request.open('GET', sourceFile, true);
                
                request.onload = function() {
                    if (request.status >= 200 && request.status < 400){
                        // Success!
                        // Array contenente tutti i dati JSON
                        var data = JSON.parse(request.responseText);

                        var currentPage = window.location.pathname.split("/").pop();

                        var thisProject = data.filter(function(project){
                            // l'attributo link è la chiave del JSON
                            return project.link === currentPage
                        });
                        thisProject = thisProject[0];

                        // Elemento della pagina in cui posizionare i dati JSON
                        var el = document.getElementsByClassName(targetElement)[0];
                        
                        var images = [];
                        images.push(thisProject);

                        el.innerHTML = `${images.map(layProjectData).join('')}`;
                        
                    } else {
                        // We reached our target server, but it returned an error
                    }
                };
                request.onerror = function() {
                    // There was a connection error of some sort
                };
                
                request.send();
            }

            getThisProject('projects.json', 'content');

            </script>

        </div>

    </div>

</body>

<?php include 'feet.html'?>

</html>