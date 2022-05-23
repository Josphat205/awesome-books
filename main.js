const bookList = document.querySelector('.book-list');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const form = document.querySelector('#form');
const addBook = document.querySelector('#add');
let booksStore = [];


function handleSubmit(e) {
  e.preventDefault()
  let title = bookTitle.value;
  let author = bookAuthor.value;
  let bookDescription = {
    title: title,
    author: author
  }

  booksStore.push(bookDescription);
}
form.addEventListener('submit', handleSubmit)