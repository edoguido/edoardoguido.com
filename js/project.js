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

    fetch('prjs.json').then((response) => {
        return response.json();

    }).then((entries) => entries.map((entry, index, entries) => {

        if (entry.id == pid) {

            const adjacent = [
                entries[index - 1 >= 0 ? index - 1 : undefined],
                entries[index + 1 < entries.length ? index + 1 : undefined]
            ]

            document.getElementById("others").innerHTML = adjacent.map((proj, index) => {
                
                if (proj == undefined) {
                    return `<div class="project-link"></div>`;
                } else {
                    
                    if (index == 0) {
                        return `<a href="project.html?id=${proj.id}"><div class="project-link">Previous project<br>${proj.title}</div></a>`;
                    } else if (index == 1) {
                        return `<a href="project.html?id=${proj.id}"><div class="project-link">Next project<br>${proj.title}</div></a>`;
                    }
                }
            }).join("");

        }

    })).then(() => {

        // const videos = document.querySelectorAll("video");
        // console.log(videos);
        
        // document.addEventListener("scroll", () => {
    
        //     videos.forEach((video, i) => {
    
        //         const el = video;
        //         console.log(video);
    
        //         if (el.offsetTop < window.pageYOffset + window.innerHeight
        //             && el.offsetTop + el.offsetHeight > window.pageYOffset) {
        //             video.play();
    
        //         } else {
        //             if (!video.paused) {
        //                 video.pause()
        //                 console.log(`video ${i} paused`);
        //             } else return;
        //         };
    
        //     });
    
        // })
        
    })

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
            document.title = `${content.content} by Edoardo Guido`;
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
                    ${content.paths.map(content => {
                const type = content.split('.').pop();

                switch (type) {
                    case 'png':
                        return `<img class="prj-img-tight" src="${path}/${content}"></img>`;
                    case 'mp4':
                        return `<video loop muted playsinline autoplay class="prj-img-tight">
                                            <source src="${path}/${content}"/>
                                        </video>
                            `;
                }
            }).join("")}
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