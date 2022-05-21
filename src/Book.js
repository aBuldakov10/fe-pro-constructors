import { Author } from './Author.js';
import { User } from './User.js';

/**
 * @param {string} title
 * @param {Date} year
 * @param {User} publicationBy
 * @param {Author[]} authors
 * @constructor
 * @property {string} title
 * @property {Date} year
 * @property {Author[]} authors
 * @property {User[]} likedUsers
 * @property {User} publicationBy
 */
export function Book(title, year = new Date(), publicationBy, authors = []) {
  this.title = title;
  this.year = year;
  this.publicationBy = publicationBy;
  this.authors = authors;
  this.likedUsers = [];

  this.publicationBy.myBooks.push(this);

  this.authors.forEach((author) => {
    author.books.push(this);
  });

  Object.defineProperty(this, 'suggestedBooks', {
    get() {
      let bookList = [];

      this.authors.forEach(({books}) => {
        books.forEach(({title}) => {
          bookList.push(title);
        });
      });

      return Array.from(new Set(bookList)).filter(title => title !== this.title).join(', ');
    }
  });

  Object.defineProperty(this, 'suggestedPublicators', {
    get() {
      let publicatorList = [];

      this.authors.forEach(({books}) => {
        books.forEach(({publicationBy}) => {
          publicatorList.push(publicationBy);
        })
      })

      return Array.from(new Set(publicatorList))
          .map(({name}) => name)
          .filter(name => name !== this.publicationBy.name)
          .join(', ');
    }
  });
}
