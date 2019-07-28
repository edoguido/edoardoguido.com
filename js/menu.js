const nav = document.getElementById("nav");
const contact = nav.children[0].children[2];
const burger = document.getElementById("burger");

burger.addEventListener("click", () => {

    if (!burger.classList.contains("open")) {
        burger.classList.add("open")
        nav.children[1].classList.add("show");

    } else if (burger.classList.contains("open")) {
        burger.classList.remove("open");
        nav.children[1].classList.remove("show");
    }

})