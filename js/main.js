document.addEventListener("DOMContentLoaded", function() {

    fetch("prjs.json").then((response) => {
        return response.json();
    }).then((entries) => {

        document.getElementById("showcase").innerHTML = entries.map(prjList).join("");

        initListeners();

    })
})


function prjList(project) {
    // console.log(project);
    return `
        <a href="" class="prj-href">
            <div class="prj">
                <div class="prj-cover" style="background-image: url('${project.cover}'); background-repeat: no-repeat; background-position: 50% 50%; background-size: cover; ${project.style ? project.style : ''}"></div>
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