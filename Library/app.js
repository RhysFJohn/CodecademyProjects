class Media {
  constructor(keyOne) {
    this._title = title;
    this._isCheckedOut = false;
    this._ratings = []
  }

  get title() {
    return this._title;
  }

  get isCheckedOut() {
    return this._isCheckedOut;
  }

  get ratings() {
    return this._ratings;
  }

  set isCheckedOut(newVal) {
    this._isCheckedOut = newVal;
  }

  toggleCheckOutStatus() {
    this._isCheckedOut = !this._isCheckedOut
  }

  getAverageRating() {
    let ratingsSum = this.ratings.reduce((currentSum, rating) => 
      currentSum + rating, 0
    )
  }

  addRating(inputValue) {
        if(inputValue <= 5) {
            this._ratings.push(inputValue);
        } else {
            console.log('Rating have to be under 5');
        }
    }
}

class Book extends Media {
  constructor(author, title, pages, genre) {
    super(title)
    this._author = author;
    this._pages = pages;
    this._genre = genre
  }
  get author() {
    return this._author
  }
  get pages() {
    return this._pages
  }
}

class Movie extends Media {
  constructor(director, title, runTime, movieCast) {
    super(title)
    this._director = director;
    this._runTime = runTime;
    this._movieCast = movieCast
  }
  get director() {
    return this._director
  }
  get runTime() {
    return this._runTime
  }
  get movieCast() {
    return this._movieCast
  }
}

class CD extends Media {
  constructor(artist, title, songs) {
    super(title)
    this._artist = artist;
    this._songs = songs;
  }
  get artist() {
    return this._artist
  }
  get songs() {
    return this._songs
  }
  shuffle() {
    return this._songs.sort(() => Math.random() - 0.5)
  }
}

// start book
// instance Book
const historyOfEverything = new Book('Bill Bryson', 'A Short History of Nearly Everything', 544)
historyOfEverything.toggleCheckOutStatus()
console.log(historyOfEverything.isCheckedOut)
historyOfEverything.addRating(4)
historyOfEverything.addRating(5)
historyOfEverything.addRating(5)

// start movie
// instance Movie
const speed = new Movie('Jan de Bont', 'Speed', 116)
speed.toggleCheckOutStatus()
console.log(speed.isCheckedOut)
speed.addRating(1)
speed.addRating(1)
speed.addRating(5)


// start CD
// instance CD
const americanDream = new CD('21 Savage', 'American Dream', ['dark days', 'letter to my brudda', "should've wore a bonnet"])
americanDream.toggleCheckOutStatus()
console.log(americanDream.isCheckedOut)
americanDream.addRating(1)
americanDream.addRating(4)
americanDream.addRating(5)
console.log(americanDream.shuffle())