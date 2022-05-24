const bookList = document.querySelector(".book-list");
let bookTitle = document.querySelector("#title");
let bookAuthor = document.querySelector("#author");
const form = document.querySelector("#form");
let booksStore = [];
class BookCollection {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  existingData() {
    // getting existing data from localStorage
    let existingData = JSON.parse(localStorage.getItem("data"));
    if (existingData == null) existingData = booksStore;

    // adding existingData to booksStore
    booksStore = booksStore.concat(existingData);

    // displaying data in the ui
    booksStore.forEach((item) => {
      bookList.innerHTML += `
     <li class="book" id ="${item.title}">
     <p>${item.title} <span>By</span> <span> ${item.author}</span></p>
     <button type="button" class="remove">Remove</button>
    </li>
 `;
    });
  }
  saveData() {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = this.title;
      const author = this.author;

      const bookDescription = {
        title: title.value,
        author: author.value,
      };
      // setting the inputValue to empty

      // console.log(bookTitle.value, bookAuthor.value)
      title.value = "";
      author.value = "";

      // add new book
      if (title && author !== "") {
        booksStore.push(bookDescription);
        localStorage.setItem("data", JSON.stringify(booksStore));
        const lastBook = booksStore[booksStore.length - 1];
        bookList.innerHTML += `
      <li class="book" id ="${lastBook.title}">
            <p>${lastBook.title} <span> By</span> <span> ${lastBook.author}</span></p>
            <button type="button" class="remove">Remove</button>
       </li>
      `;
      }
    });
  }

  removeData() {
    document.querySelector(".book-list").addEventListener("click", (e) => {
      if (e.target.classList.contains("remove")) {
        e.target.parentElement.remove();
        const { id } = e.path[1];
        for (let a = 0; a < booksStore.length; a += 1) {
          if (booksStore[a].title === id) {
            booksStore.splice(a, 1);
            localStorage.setItem("data", JSON.stringify(booksStore));
          }
        }
      }
    });
  }
}

//instatiate
const Book1 = new BookCollection(bookTitle, bookAuthor);
Book1.saveData();
Book1.removeData();
Book1.existingData();
