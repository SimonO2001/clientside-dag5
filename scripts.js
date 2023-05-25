
const swapiApp = (async function() {
    const SWAPIURL = "https://swapi.dev/api"
    const navBar = document.querySelector("#nav-bar");
    const cardContainer = document.querySelector(".card-container")
    

    try {
        const response = await fetch(SWAPIURL);
        const jsonData = await response.json();
        for(let key in jsonData) {
            let navItem = document.createElement("a");
            navItem.addEventListener("click", navClick)
            navItem.className = "nav-item";
            navItem.innerText = key;
            navItem.href = jsonData[key];
            navBar.appendChild(navItem);
        }
    } 
    catch (error) {
        console.log(error);
    }

    async function navClick (e) {
        e.preventDefault();
        cardContainer.innerHTML ="";
        document.querySelector(".active") ?.classList.remove("active");
        this.classList.add("active");
        
        let data = await getData(this.href)
        data.results.forEach(dataItem => {
            let card = document.createElement("div");
            card.className = "card"
            //card.innerText = dataItem.name
            for(let [k, v] of Object.entries(dataItem) ) {
                card.insertAdjacentHTML("beforeend", `<span class="key">${k}</span> <span class="val">${v}</span><br>`)
            }
            cardContainer.appendChild(card);
        })

        // console.log(data);
    }

    async function getData(url) {
        const response = await fetch(url);
        return await response.json();
    }
    
})();