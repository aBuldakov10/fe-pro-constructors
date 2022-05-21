import { Book } from './Book.js';

/**
 * @param {string} name
 * @param {Date} date
 * @constructor
 * @property {string} name
 * @property {Date} date
 * @property {Book[]} myBooks
 * @property {User[]} friends
 * @property {Book[]} likes
 */
export function User(name, date = new Date()) {
  this.name = name;
  this.date = date;
  this.myBooks = [];
  this.friends = [];
  this.likes = [];

  this.addToFriends = function (User) {
    if (this.friends.includes(User)) {
      this.friends = this.friends.filter(item => item !== User);
      User.friends = User.friends.filter(item => item !== this);
    } else {
      this.friends.push(User);
      User.friends.push(this);
    }
  };

  this.removeFriend = this.addToFriends;

  this.likeBook = function (Book) {
    if (this.likes.includes(Book)) {
      this.likes = this.likes.filter(item => item !== Book);
      Book.likedUsers = Book.likedUsers.filter(item => item !== this);
    } else {
      this.likes.push(Book);
      Book.likedUsers.push(this);
    }
  };

  this.unlikeBook = this.likeBook;

  Object.defineProperty(this, 'friendsNames', {
    get() {
      return this.friends.map(({name}) => name).join(', ');
    }
  });

  Object.defineProperty(this, 'likedBooks', {
    get() {
      return this.likes.map(({title}) => title).join(', ');
    }
  });

  Object.defineProperty(this, 'publishedBooks', {
    get() {
      return this.myBooks.map(({title}) => title).join(', ');
    }
  })
}
