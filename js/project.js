const pid = new URLSearchParams(window.location.search).get("id");
const path = `data/${pid}`;

document.addEventListener("DOMContentLoaded", () => {

    const file = `${path}/${pid}.json`;

    fetch(file).then((response) => {
        return response.json();
    }).then((entries) => {

        console.log(entries);

        const hero = document.getElementById("hero");

        hero.style.backgroundImage = `url(${path}/_hero.${entries[0].type})`;
        hero.style.backgroundColor = `${entries[0].bg}`;

        document.getElementById("showcase").innerHTML = entries[1].map(injectContent).join("");

    }).catch((err) => console.error(err))
    
})

function injectContent(content) {

    switch (content.tag) {
        case 'a':
            return `<${content.tag} href="${content.href}">${content.content}</${content.tag}>`;
        case 'p':
            return `
                <div class="prj-p">
                    <div class="p-title">
                        <p>${content.title}</p>
                    </div>
                    <div class="p-desc">
                        <p>${content.content}</p>
                    </div>
                </div>
            `;
        case 'img':
            return `
                <div class="prj-img" style="
                    background-image: url(${path}/${content.path});
                    background-size: ${content.bgsize ? content.bgsize : "cover"};
                    ${content.style ? content.style : ""}">
                </div>
            `;
        default:
            console.log('tag not recognized');

    }
}