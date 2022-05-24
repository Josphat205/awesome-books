const bookList = document.querySelector(".book-list");
const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const form = document.querySelector("#form");
const addBook = document.querySelector("#add");
let booksStore = [];

// getting existing data from localStorage
let existingData = JSON.parse(localStorage.getItem("data"));
if (existingData == null) existingData = booksStore;

// adding existingData to booksStore
booksStore = booksStore.concat(existingData);

// displaying data in the ui
booksStore.forEach((item) => {
  bookList.innerHTML += `
<div class="book" id ="${item.title}">
      <p>${item.title}</p>
      <p>${item.author}</p>
      <button type="button" class="remove">Remove</button>
      <hr>
    </div>
`;
});

function handleSubmit(e) {
  e.preventDefault();
  let title = bookTitle.value;
  let author = bookAuthor.value;
  let bookDescription = {
    title: title,
    author: author,
  };

  // setting the inputValue to empty
  bookTitle.value = '';
  bookAuthor.value = '';

  // add new book
  if(title && author !== ''){
    booksStore.push(bookDescription);
    localStorage.setItem("data", JSON.stringify(booksStore));
    let lastBook = booksStore[booksStore.length - 1];
    bookList.innerHTML += `
    <div class="book" id ="${lastBook.title}">
          <p>${lastBook.title}</p>
          <p>${lastBook.author}</p>
          <button type="button" class="remove">Remove</button>
          <hr>
        </div>
    `;
  }
}
form.addEventListener("submit", handleSubmit);

// remove book handler

document.querySelector('.book-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('remove')) {
      e.target.parentElement.remove();
      const id = e.path[1].id;
      for (let a = 0; a < booksStore.length; a++) {
        if (booksStore[a].title === id) {
          booksStore.splice(a, 1);
          localStorage.setItem("data", JSON.stringify(booksStore));
        }
      }
    }
});