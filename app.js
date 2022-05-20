//DOM Selectors
const form = document.querySelector('#searchForm')
const watchList = document.querySelector('#watchList')
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
            data.forEach(show => renderShows(show))
        })
        .catch((e) => {
            console.log('ERROR:', e)
        })
    form.elements.query.value = '';
})
//Opens and closes Watch List
openWatchList.addEventListener('click', () => {
    if (watchList.hidden === true) {
        watchList.hidden = false
        openWatchList.innerText = 'Close Watch List'
    } else {
        watchList.hidden = true
        openWatchList.innerText = 'Open Watch List'
    }
})

//Handler function
function renderShows(showResult) {
    //Renders show card from search and appends to the "Search Results" section
    let card = document.createElement('li')
    let isInWatchList = false
    if (showResult.show.image) {
        if (showResult.show.summary === null) {
            card.innerHTML = `
    <img src="${showResult.show.image.medium}">
    <h4>${showResult.show.name}</h4>
    <p> No Summary Available </p>
    <button id="addWatchList"> Add to Watch List </button>
    `
        } else {
            card.innerHTML = `
    <img src="${showResult.show.image.medium}">
    <h4>${showResult.show.name}</h4>
    ${showResult.show.summary}
    <button id="addWatchList"> Add to Watch List </button>
    `
        }
    }
    //Clones show to "Watch List", removes "Add to Watch List" button
    //and adds "Remove" button
    card.querySelector('#addWatchList').addEventListener('click', () => {
        if (isInWatchList === false) {
            let newCard = card.cloneNode(true)
            let removeButton = document.createElement('button')
            newCard.querySelector('#addWatchList').remove()
            removeButton.setAttribute("id", "remove")
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
