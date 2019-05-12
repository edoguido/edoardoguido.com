const pid = new URLSearchParams(window.location.search).get("id");
const path = `data/${pid}`;

document.addEventListener("DOMContentLoaded", () => {

    const file = `${path}/${pid}.json`;

    fetch(file).then((response) => {
        return response.json();

    }).then((entries) => {

        // console.log(entries);
        document.getElementById("info").innerHTML = entries[0].map(injectContent).join("");
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
                        <p>${content.title ? content.title : ''}</p>
                    </div>
                    <div class="p-desc">
                        <p>${content.content}</p>
                    </div>
                </div>
            `;
        case 'h1':
            return `
                <div class="prj-h1">
                    <h1>${content.content}</h1>
                </div>
            `;
        case 'img':
            return `
                <img class="prj-img" src="${path}/${content.path}" 
                    style="width: 100%; height: auto; background-size: ${content.bgsize ? content.bgsize : "cover"}; 
                    ${content.style ? content.style : ""}">
                </img>
            `;
        case 'img-l':
            return `
                <a href="${content.href}" target="_blank">
                    <img class="prj-img" src="${path}/${content.path}" 
                        style="width: 100%; height: auto; ${content.style ? content.style : ""}">
                    </img>
                </a>
            `;
        case 'img-tight':
            return `
                <div class="prj-img-tight-container">
                    <img class="prj-img-tight" src="${path}/${content.path1}" ${content.style ? content.style : ""}">
                    </img>
                    <img class="prj-img-tight" src="${path}/${content.path2}" ${content.style ? content.style : ""}">
                    </img>
                    <img class="prj-img-tight" src="${path}/${content.path3}" ${content.style ? content.style : ""}">
                    </img>
                </div>
            `;
        case 'video':
            return `
                <div class="prj-vid" style="${content.style ? content.style : ''}">
                    <video loop muted playsinline autoplay>
                        <source src="${path}/${content.path}"/>
                    </video>
                </div>
            `;
        case 'embed':
            return `
            <div class="embed-container">
                ${content.href}
            </div>
            `;
        default:
            console.log('tag not recognized');

    }
}