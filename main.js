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

booksStore.forEach((item) => {
  bookList.innerHTML += `
<div class="book" id ="${item.title}">
      <p>${item.title}</p>
      <p>${item.author}</p>
      <button type="button" id="remove1">Remove</button>
      <hr>
    </div>
`;
});

const removeBook = document.querySelectorAll("#remove1");
removeBook.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.path[1].remove();
    const id = e.path[1].id;
    // console.log(id);
    for (let a = 0; a < existingData.length; a++) {
      if (existingData[a].title === id) {
        existingData.splice(a, 1);
        localStorage.removeItem('data');
        // console.log(existingData);
      }
    }
  });
});

function handleSubmit(e) {
  e.preventDefault();
  let title = bookTitle.value;
  let author = bookAuthor.value;
  let bookDescription = {
    title: title,
    author: author,
  };
  booksStore.push(bookDescription);
  const setData = localStorage.setItem("data", JSON.stringify(booksStore));
  let lastBook = booksStore[booksStore.length - 1];
  bookList.innerHTML += `
  <div class="book" id ="${lastBook.title}">
        <p >${lastBook.title}</p>
        <p>${lastBook.author}</p>
        <button type="button" id="remove">Remove</button>
        <hr>
      </div>
  `;

}
form.addEventListener("submit", handleSubmit);
