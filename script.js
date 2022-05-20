//DOM Selectors
const form = document.querySelector('#searchForm')
const watchList = document.querySelector('#watchList')
const watchListBody = document.querySelector('#watchListBody')
const searchResults = document.querySelector('#searchResults')
const openWatchList = document.querySelector('#openWatchList')

//Event Listeners
//Fetches show information from TV Maze based off search value submitted
form.addEventListener('submit', (e) => {
    e.preventDefault()
    searchResults.innerHTML = '';
    const searchInput = form.elements.query.value
    fetch(`https://api.tvmaze.com/search/shows?q=${searchInput}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            data.forEach(show => renderShows(show))
        })
        .catch(e => {
            console.log('ERROR:', e)
        })
    form.elements.query.value = '';
})
//Opens and closes Watch List
openWatchList.addEventListener('click', () => {
    if (watchListBody.hidden === true) {
        watchListBody.hidden = false
        openWatchList.innerText = 'Close Watch List'
    } else {
        watchListBody.hidden = true
        openWatchList.innerText = 'Open Watch List'
    }
})

//Handler function
function renderShows(showResult) {
    //Renders show card from search and appends to the "Search Results" section
    let card = document.createElement('div')
    let isInWatchList = false
    card.setAttribute("class", "card text-center")
    if (showResult.show.image !== null) {
        card.innerHTML = `
    <img class="card-img-top" src="${showResult.show.image.original}">
    <div class="card-body">
    <h5 class="card-title">${showResult.show.name}</h5>
    <button class="btn btn-primary" id="addWatchList"> Add to Watch List </button>
    </div>
    `
    } else {
        card.innerHTML = `
    <img class="card-img-top" src="imgs/no-img-portrait-text.png">
    <div class="card-body">
    <h5 class="card-title">${showResult.show.name}</h5>
    <button class="btn btn-primary" id="addWatchList"> Add to Watch List </button>
    </div>
    `
    }
    //Clones show to "Watch List", removes "Add to Watch List" button
    //and adds "Remove" button
    card.querySelector('#addWatchList').addEventListener('click', () => {
        if (isInWatchList === false) {
            let newCard = card.cloneNode(true)
            let removeButton = document.createElement('button')
            newCard.setAttribute("class", "w-25 card text-center")
            newCard.querySelector('#addWatchList').remove()
            removeButton.setAttribute("id", "remove")
            removeButton.setAttribute("class", "btn btn-danger")
            removeButton.innerText = 'Remove'
            newCard.appendChild(removeButton)
            newCard.querySelector('#remove').addEventListener('click', () => {
                newCard.remove()
                isInWatchList = false
            })
            watchList.appendChild(newCard)
            isInWatchList = true
        }
    })
    searchResults.appendChild(card)
}
