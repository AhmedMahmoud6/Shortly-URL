async function getData(link) {
    try {
        let myResponse = await fetch(`https://tinyurl.com/api-create.php?url=${link}`);
        
        if (!myResponse.ok) {
            throw new Error(myResponse.statusText);
        }

        let myData = await myResponse.text();
        return myData;
    } catch (err) {
        return err
    }
}


function createLinks(statsContainer, userInput, url) {
    let parent = document.createElement("div");
    parent.setAttribute("class", "shorten-links");

    let originalLink = document.createElement("div");
    originalLink.setAttribute("class", "orginal-link");
    
    let originalP = document.createElement("p");
    originalP.textContent = userInput;

    let shortLink = document.createElement("div");
    shortLink.setAttribute("class", "short-link");

    let shortP = document.createElement("p");
    shortP.textContent = url;

    let copyBtn = document.createElement("button");
    copyBtn.setAttribute("class", "can-copy")
    copyBtn.textContent = "Copy";

    originalLink.appendChild(originalP);
    shortLink.append(shortP, copyBtn);

    parent.append(originalLink, shortLink);

    statsContainer.before(parent);


}

function getLinks(statsContainer) {
    for (let i = 1; i <= counter; i++) {
        let localData = JSON.parse(localStorage.getItem(`link-${i}`));
        createLinks(statsContainer, localData.realUrl, localData.shortenUrl);
    }
}