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
  const newData = JSON.stringify(booksStore);
  const oldData = localStorage.setItem('data2', newData);

  console.log(newData);
}
form.addEventListener('submit', handleSubmit);

const book = `
<div class="book">
       <p>Lorem ipsum</p>
       <p>Testeroo Testyy</p>
       <button type="button" id="remove">Remove</button>
       <hr>
     </div>
`;
