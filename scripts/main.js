// api
// https://tinyurl.com/api-create.php?url=yourLink


let shortenInput = document.querySelector(".shorten input");
let shortenItBtn = document.querySelector("#shorten-btn");
let statsContainer = document.querySelector(".stats-container")


let counter = 0;

if (localStorage.getItem("counter")) {
    counter = JSON.parse(localStorage.getItem("counter"));
    getLinks(statsContainer);
}


shortenItBtn.addEventListener("click", _ => {
    if (shortenInput.value != "") {
        getData(shortenInput.value).then(shortUrl => {

            if (shortUrl.startsWith("https")) {
                shortenInput.style = "border: none";
                createLinks(statsContainer, shortenInput.value, shortUrl);
                localStorage.setItem(`link-${counter += 1}`, JSON.stringify({realUrl: shortenInput.value, shortenUrl: shortUrl}));
                localStorage.setItem("counter", counter);
            }
        });
        
    } else {
        shortenInput.style = "border: 5px solid #e66678";
    }
})


document.addEventListener("click", e => {
    if (e.target.classList[0] === "can-copy") {
        navigator.clipboard.writeText(e.target.previousSibling.textContent)
        e.target.style = "background-color: #3a3053"
        e.target.textContent = "Copied!";
        setTimeout(_ => {
            e.target.style = "background-color: hsl(180, 66%, 49%);"
            e.target.textContent = "Copy";
        }, 3000)
    }
})