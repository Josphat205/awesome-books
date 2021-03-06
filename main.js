const bookList = document.querySelector('.book-list');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const form = document.querySelector('#form');
const date = document.querySelector('#date');
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
    this.booksStore = this.booksStore.concat(existingData);

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
        this.booksStore.push(bookDescription);
        localStorage.setItem('data', JSON.stringify(this.booksStore));
        const lastBook = this.booksStore[this.booksStore.length - 1];
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

// display current date
function currentDate() {
  const today = new Date();

  return today;
}

date.textContent = currentDate();

window.onload = () => {
  const switcher = document.querySelectorAll('[data-switcher]');
  for (let i = 0; i < switcher.length; i += 1) {
    const dataSwitch = switcher[i];
    const pageId = dataSwitch.dataset.tab;
    dataSwitch.addEventListener('click', () => {
      document.querySelector('.is-Active').classList.remove('is-Active');
      dataSwitch.classList.add('is-Active');
      document.querySelectorAll('.page').forEach((page) => { page.classList.remove('is-Active'); });
      const nextPage = document.querySelector(`.home-page .page[data-page = "${pageId}"]`);
      nextPage.classList.add('is-Active');
    });
  }
};
