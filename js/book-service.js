const KEY = 'books'
var gID = 1111;
var gRate = 1;
var gCurrBookID;
var gBooks = _createBooks();


////////////// to move between pages
function getBooksForDisplay() {
    //     var from = (gCurrPage - 1) * CARS_IN_PAGE;
    //     var to = from + CARS_IN_PAGE;
    // return gCars.slice(from, to);
    return gBooks;
}

function removeBook(bookId) {
    var idx = gBooks.findIndex(function (book) {
        return book.id === bookId
    })
    gBooks.splice(idx, 1);
    saveToStorage(KEY, gBooks);
}

function getBook(bookId) {
    gCurrBookID=bookId;
    return gBooks.find(function (book) {
        return (book.id === bookId)
    })
}
function addBook(bookName, bookPrice, bookImg) {
    var book = _createBook(bookName, bookPrice, bookImg);
    gBooks.unshift(book);
    saveToStorage(KEY, gBooks);
}

function updateBook(book) {
    var idx = gBooks.findIndex(currBook => currBook.id === book.id)
    gBooks[idx] = book;
    saveToStorage(KEY, gBooks);
}

function getRate(elBtnClicked) {
    console.log('now bookid: ',gCurrBookID)
    if (elBtnClicked.classList.contains('btn-up')) {
        (gRate === 10) ? 10 : gRate++;
    }
    if (elBtnClicked.classList.contains('btn-down')) {
        (gRate === 1) ? 1 : gRate--;
    }

    var currBook=gBooks.find(function (book) {
        return (book.id === gCurrBookID)
    })
    currBook.rate=gRate;
    console.log('the book is: ',currBook)
    saveToStorage(KEY, gBooks);
    return gRate;

}




// Private functions:
function _createBooks() {
    var books = loadFromStorage(KEY);
    if (books) return books;

    var books = ['Harry Potter', 'Who Moved My Cheese', 'Hot Corn', 'Five Ballons']
        .map(bookName => _createBook(bookName))
    console.log('books:', books)
    saveToStorage(KEY, books);

    return books;
}

///gets vendor
function _createBook(bookName, bookPrice = parseInt(Math.random() * 100), bookImg = gID) {
    return {
        id: gID++,
        name: bookName,
        price: bookPrice + '₪', ///parseInt(Math.random() * 100)+'₪',
        img: bookImg,///`img/${gID}.jpg`
        rate: gRate
    }
}
