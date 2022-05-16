//DOM Selectors
const form = document.querySelector('#searchForm')
const watchList = document.querySelector('#watchList')
const searchResults = document.querySelector('#searchResults')

//Event Listeners
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
    form.elements.query.value = '';
})

//Handler functions
function renderShows(showResult) {
    let card = document.createElement('li')
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
    searchResults.appendChild(card)
}