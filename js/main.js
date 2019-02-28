document.addEventListener("DOMContentLoaded", function() {

    fetch("prjs.json").then((response) => {
        return response.json();
    }).then((entries) => {

        entries.map((entry) => {
            console.log(entry);

            document.getElementById("showcase").innerHTML =
            `<div>ciao</div>`;
        })

    })
    
})


var prjs = document.querySelectorAll(".prj-cover");

prjs.forEach((prj) => {

    prj.addEventListener("mouseover", function() {

        this.parentElement.classList.add("focus");
        
    }, false)
    
    prj.addEventListener("mouseout", function() {

        this.parentElement.classList.remove("focus");
        
    }, false)

})