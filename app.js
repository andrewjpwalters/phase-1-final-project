//DOM Selectors
const form = document.querySelector('#searchForm')
const watchList = document.querySelector('#watchList')

//Event Listeners
form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(form.elements.query.value)
    console.log(e)
})