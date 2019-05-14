var trigger = document.getElementById("about-btn");
var about = {
    el: document.getElementById("about"),
    open: false
}

// var wrapper = document.getElementById("wrapper");
// var aboutContainer = document.createElement("DIV");
// aboutContainer.id = "about";
// wrapper.prepend(aboutContainer);

trigger.addEventListener("click", () => {
    if (about.open === false) {

        fetch("exp.json").then((response) => {
            return response.json();
        }).then((entries) => {
            document.getElementsByClassName("about-resume")[0].innerHTML = 
            entries.map((entry) => {
                return `
                <div class="about-resume-entry">
                    ${entry.place ? entry.place : ''}<br>
                    ${entry.position ? entry.position : ''}<br>
                    ${entry.date ? entry.date : ''}<br>
                </div>
                `
            }).join("");
        }).catch((err) => console.error(err))

        about.el.classList.add("open");
        document.body.style.overflow = 'hidden';

        about.open = true;
    } else if (about.open === true) {
        about.el.classList.remove("open");
        document.body.style.overflow = 'visible';

        about.open = false;
    }
})