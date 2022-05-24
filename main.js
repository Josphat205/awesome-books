const bookList = document.querySelector('.book-list');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const form = document.querySelector('#form');
const booksStore = [];

class BookCollection {
  constructor(title, author, booksStore) {
    this.title = title;
    this.author = author;
    this.booksStore = booksStore;
  }

  existingData() {
    // getting existing data from localStorage
    let existingData = JSON.parse(localStorage.getItem('data'));
    if (existingData == null) existingData = this.booksStore;

    // adding existingData to booksStore
    this.booksStore = booksStore.concat(existingData);

    // displaying data in the ui
    this.booksStore.forEach((item) => {
      bookList.innerHTML += `
     <li class="book" id ="${item.title}">
     <p>"${item.title}" <span>By</span> <span> ${item.author}</span></p>
     <button type="button" class="remove">Remove</button>
    </li>
 `;
    });
  }

  saveData() {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const { title } = this;
      const { author } = this;

      const bookDescription = {
        title: title.value,
        author: author.value,
      };
      // setting the inputValue to empty
      // console.log(this.title.value , this.author.value);
      // add new book
      if (title.value.length && author.value.length > 0) {
        booksStore.push(bookDescription);
        localStorage.setItem('data', JSON.stringify(booksStore));
        const lastBook = booksStore[booksStore.length - 1];
        bookList.innerHTML += `
      <li class="book" id ="${lastBook.title}">
            <p>"${lastBook.title}" <span>By </span> <span> ${lastBook.author}</span></p>
            <button type="button" class="remove">Remove</button>
       </li>
      `;
      }
      title.value = '';
      author.value = '';
    });
  }

  removeData() {
    document.querySelector('.book-list').addEventListener('click', (e) => {
      if (e.target.classList.contains('remove')) {
        e.target.parentElement.remove();
        const { id } = e.path[1];
        for (let a = 0; a < this.booksStore.length; a += 1) {
          if (this.booksStore[a].title === id) {
            this.booksStore.splice(a, 1);
            localStorage.setItem('data', JSON.stringify(this.booksStore));
          }
        }
      }
    });
  }
}

// instatiate
const Book1 = new BookCollection(bookTitle, bookAuthor, booksStore);
Book1.saveData();
Book1.removeData();
Book1.existingData();
