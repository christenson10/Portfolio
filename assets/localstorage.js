var searchInput = document.querySelector('#search');
var msgDiv = document.querySelector('#msg');
var userSearchSpan = document.querySelector('#user-search');
var searchButton = document.querySelector('#searchField');

function renderLastSearch() {
    var response = localStorage.getItem('#search');
    var result = document.querySelector('#search-results');

    result.textContent = response

    userSearchSpan.textContent = search;
}


function displayMessage(type, message) {
    msdDiv.textContent = message;
    msgDiv.setAttribute('search', type)
}

searhButton.addEventListener('click', function(event) {
    event.preventDefault();

    var recentSearch = document.querySelector('#search');
    console.log(recentSearch);



    //localStorage.setItem('searchHistory', recentSearch);

})

renderLastSearch();

