document.addEventListener("DOMContentLoaded", function() {

    const inject = document.createElement("P");
    document.getElementById("hero").appendChild(inject);
    inject.innerHTML = '_';

    // setTimeout(() => {
    //     document.getElementById("wrapper").classList.add("show");
    // }, 500);

    fetch("prjs.json").then((response) => {
        return response.json();
    }).then((entries) => {

        document.getElementById("showcase").innerHTML = entries.map(prjList).join("");

        initListeners();

    })

    const lfmUrl = "https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=drivinward&period=7day&limit=10&api_key=db7d0310d7432eceb3ecd5589f20df0f&format=json";
    fetch(lfmUrl).then((response) => {
        return response.json();
    }).then((entries) => {
        const fetched = entries.toptracks.track[0];

        inject.innerHTML = `Currently obsessed with <span style="white-space:nowrap"><a href="${fetched.url}" target="_blank">${fetched.name}</a> by <a href="${fetched.artist.url}" target="_blank">${fetched.artist.name}</a></span>`;
        inject.classList.add("loaded");
    })

})

var nav = document.getElementById("nav");
var contact = nav.children[0].children[2];

var burger = document.getElementById("burger");
burger.addEventListener("click", () => {
    if (!burger.classList.contains("open")) {
        burger.classList.add("open")
        nav.children[1].classList.add("show");
    } else if (burger.classList.contains("open")) {
        burger.classList.remove("open");
        nav.children[1].classList.remove("show");
    }
})

function prjList(project) {
    // const loc = window.location.href;
    // const path = loc.substring(0, loc.lastIndexOf('/'));
    // const path = `data/${project.id}`;

    return `
        <a href="${project.href ? project.href : 'project.html?id=' + project.id }" target="${project.href ? '_blank' : ''}" class="prj-href">
            <div class="prj">
                <div class="prj-cover" background-repeat: no-repeat; background-position: 50% 50%; background-size: cover; ${project.style ? project.style : ''}">
                    <video loop muted autoplay playsinline>
                        <source src="cover_${project.id}.mp4"/>
                    </video>
                </div>
                <div class="prj-data">
                    <h2>${project.title}</h2>
                    <h2>${project.category}</h2>
                    <h2>${project.date}</h2>
                </div>
            </div>
        </a>
`;
}

function initListeners() {
    var prjs = document.querySelectorAll(".prj-cover");    

    prjs.forEach((prj) => {

        prj.addEventListener("mouseover", function() {

            this.parentElement.classList.add("focus");
            
        }, false)
        
        prj.addEventListener("mouseout", function() {
            
            this.parentElement.classList.remove("focus");
            
        }, false)

    })
}