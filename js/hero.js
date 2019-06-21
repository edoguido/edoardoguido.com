document.addEventListener("DOMContentLoaded", function () {

    const inject = document.createElement("P");
    document.getElementById("hero").appendChild(inject);
    inject.innerHTML = '_';

    const lfmUrl = "https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=drivinward&period=7day&limit=1&api_key=db7d0310d7432eceb3ecd5589f20df0f&format=json";
    fetch(lfmUrl).then((response) => {
        return response.json();
    }).then((entries) => {
        const fetched = entries.toptracks.track[0];

        inject.innerHTML = `Currently obsessed with <span style="white-space:nowrap"><a href="${fetched.url}" target="_blank">${fetched.name}</a> by <a href="${fetched.artist.url}" target="_blank">${fetched.artist.name}</a></span>`;
        inject.classList.add("loaded");
    })

})