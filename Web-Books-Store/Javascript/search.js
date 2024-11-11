function redirectSearch(event) {
  event.preventDefault();
  const searchQuery = document.getElementById("searchInput").value.trim();
  if (searchQuery) {
    window.location.href = `search.html?search=${encodeURIComponent(
      searchQuery
    )}`;
  }
}
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function searchBooks() {
  const searchInput = getQueryParam("search");
  const resultsContainer = document.getElementById("resultsContainer");
  const bookItems = Array.from(document.getElementsByClassName("book-item"));
  bookItems.forEach((book) => {
    book.style.display = "none";
  });
  const filteredBooks = bookItems
    .filter((book) => book.innerText.toLowerCase().includes(searchInput))
    .sort((a, b) => {
      const relevanceA = parseInt(a.getAttribute("data-relevance"));
      const relevanceB = parseInt(b.getAttribute("data-relevance"));
      return relevanceB - relevanceA;
    });
  if (filteredBooks.length > 0) {
    filteredBooks.forEach((book) => {
      book.style.display = "block";
    });
  } else {
    resultsContainer.innerHTML = "<p>Không tìm thấy sách nào phù hợp.</p>";
  }
}

function handleEnter(event) {
  if (event.keyCode === 13) {
    searchBooks();
  }
}

window.onload = function () {
  searchBooks();
};
