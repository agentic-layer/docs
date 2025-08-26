;(function () {
  'use strict'
  
  var searchInput = document.getElementById('search-input')
  var searchResults = document.getElementById('search-results')
  
  if (!searchInput || !searchResults) return
  
  var index
  
  // Load search index
  function loadSearchIndex() {
    return fetch(window.antoraBasePath + '/search-index.js')
      .then(function (response) { return response.text() })
      .then(function (scriptText) {
        new Function(scriptText)()
        index = window.antoraLunr.index
        return window.antoraLunr.store
      })
  }
  
  var store
  loadSearchIndex().then(function (searchStore) {
    store = searchStore
  })
  
  var searchTimeout
  
  searchInput.addEventListener('input', function (e) {
    var query = e.target.value.trim()
    
    clearTimeout(searchTimeout)
    
    if (query.length < 2) {
      searchResults.innerHTML = ''
      searchResults.style.display = 'none'
      return
    }
    
    searchTimeout = setTimeout(function () {
      if (!index || !store) return
      
      try {
        var results = index.search(query + '*').slice(0, 10)
        displayResults(results)
      } catch (err) {
        console.warn('Search error:', err)
      }
    }, 150)
  })
  
  function displayResults(results) {
    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-result-item">No results found</div>'
    } else {
      searchResults.innerHTML = results.map(function (result) {
        var doc = store[result.ref]
        return '<div class="search-result-item">' +
               '<a href="' + doc.url + '">' +
               '<div class="search-result-title">' + doc.title + '</div>' +
               '<div class="search-result-text">' + (doc.text || '').substring(0, 150) + '...</div>' +
               '</a></div>'
      }).join('')
    }
    
    searchResults.style.display = 'block'
  }
  
  // Hide results when clicking outside
  document.addEventListener('click', function (e) {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.style.display = 'none'
    }
  })
})()