const bookList = document.querySelector('.book-list');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const form = document.querySelector('#form');
const addBook = document.querySelector('#add');
let booksStore = [];


// getting existing data from localStorage
let existingData = JSON.parse(localStorage.getItem('data'));
if(existingData == null) existingData = booksStore;

// adding existingData to booksStore
booksStore = booksStore.concat(existingData);

booksStore.forEach(item => {
  bookList.innerHTML+= `
<div class="book">
      <p>${item.title}</p>
      <p>${item.author}</p>
      <button type="button" id="remove">Remove</button>
      <hr>
    </div>
`;})

function handleSubmit(e) {
  e.preventDefault()
  let title = bookTitle.value;
  let author = bookAuthor.value;
  let bookDescription = {
    title: title,
    author: author
  }
  booksStore.push(bookDescription);
  localStorage.setItem('data', JSON.stringify(booksStore));
  let lastBook = booksStore[booksStore.length -1]
  bookList.innerHTML+= `
  <div class="book">
        <p>${lastBook.title}</p>
        <p>${lastBook.author}</p>
        <button type="button" id="remove">Remove</button>
        <hr>
      </div>
  `;
}
form.addEventListener('submit', handleSubmit);