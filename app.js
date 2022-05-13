//DOM Selectors
const form = document.querySelector('#searchForm')
const watchList = document.querySelector('#watchList')

//Event Listeners
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchInput = form.elements.query.value
    fetch(`https://api.tvmaze.com/search/shows?q=${searchInput}`)
        .then(res => res.json())
        .then(data => console.log(data))
})