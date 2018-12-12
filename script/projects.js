function prjTemplate(project) {
    // console.log(project);
    return `
            <div class="project ${project.id == 0 ? 'big' : ''} ${project.dark == true ? 'dark' : ''} json" data-title="${project.title}">
                <a href="${project.link}" class="project-link">
                    <img class='lazy' src="res/${project.images['cover']}" data-src="res/${project.images['cover']}">
                </a>
            </div>
        `;
}

function getProjects(sourceFile, targetElement) {
    request = new XMLHttpRequest();
    request.open('GET', sourceFile, true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            // Array contenente tutti i dati ricvuti
            var data = JSON.parse(request.responseText);
            // Elemento della pagina in cui posizionare i dati ricevuti
            var el = document.getElementsByClassName(targetElement)[0];

            // data.map() per inserire nell'elemento el tutte le entries del file .json
            el.innerHTML = `${data.map(prjTemplate).join('')}`;
        } else {
            // We reached our target server, but it returned an error
        }
    };
    request.onerror = function () {
        // There was a connection error of some sort
    };

    request.send();
}