'use strict';

function onInit() {
    renderBooks();
}

function onUpClicked(elRateUp) {
    // var book=onShowBookDetails();
    // console.log('the book: ', book)
    // console.log('the element rate: ', elRate)

    var rate = getRate(elRateUp);
    var elRate = document.querySelector('.rate');
    elRate.innerText = rate;
}
function onDownClicked(elRateDown) {
    var rate = getRate(elRateDown);
    var elRate = document.querySelector('.rate');
    elRate.innerText = rate;
}



function onShowBookDetails(event, bookId) {
    var book = getBook(bookId);
    var elDetails = document.querySelector('.details-win');
    elDetails.querySelector('h3').innerText = book.name;
    elDetails.querySelector('h4').innerText = book.price;
    elDetails.querySelector('p').innerHTML = `<img src="img/${book.img}.jpg"/>`;
    var elRate = document.querySelector('.rate');
    elRate.innerText = book.rate;
    elDetails.hidden = false;
   
}

function onCloseDetailsWin() {
    document.querySelector('.details-win').hidden = true;
}

// onCloseDetailsWin
function onRemoveBook(event, bookId) {
    event.stopPropagation();
    var isSure = confirm('Are you sure?');
    if (isSure) {
        removeBook(bookId);
        renderBooks();
    }
}

function onEditBook(event, bookId) {

    var book = getBook(bookId);
    console.log('i got u: ', book)///it got the book ob

    var bookName = book.name;
    bookName = prompt(`Please enter new name for the ${bookName} book: `);
    book.name = bookName;
    var bookPrice = book.price;
    bookPrice = + prompt(`Please enter new price for the ${bookName} book: `);
    book.price = bookPrice;

    console.log('now book: ', book)
    renderBooks();
    // event.stopPropagation();
}

// onAddBook()
function onAddBook() {
    console.log('onAddBook');
    // var book={};
    var bookName = prompt('Please enter book name to add');
    var bookPrice = +prompt('Please enter book price');
    var bookImg = prompt('Please enter book image (if there is no image please enter 0000)');
    // var elTxtVendor = document.querySelector('.txt-vendor');
    // var elTxtSpeed = document.querySelector('.txt-speed');
    // var vendor = elTxtVendor.value;
    // var speed = elTxtSpeed.value;
    // if (!vendor || !speed) return;

    // console.log('book: ',book)
    ////go to service and add it to my book
    if (!bookName || !bookPrice || !bookImg) return;

    // var carId = +elTxtVendor.dataset.id;
    // if (carId) {
    //     var car = getCar(carId);
    // book.bookName = bookName;
    // book.price=bookPrice;
    // book.img=bookImg;
    // car.speed = speed;
    // updateBook(book)
    // } else {
    addBook(bookName, bookPrice, bookImg)


    // elTxtVendor.value = '';
    // elTxtVendor.dataset.id = '';
    // elTxtSpeed.value = '';
    renderBooks();
}


function renderBooks() {
    var books = getBooksForDisplay();
    // var books=[];
    var strHTMLs = books.map(function (book) {
        // var className = (book.isDone)? 'done' : '';
        var className = 'book';
        return `
        <tr class="${className}">
        <td>${book.id}</td>
        <td><h3>${book.name}</h3>
        <img src="img/${book.img}.jpg" alt="${book.name}" />
        </td>
        <td>${book.price}</td>
        <td class="action">
        <button title="Book Details" onclick="onShowBookDetails(event, ${book.id})">Read</button>
        <button title="Edit Book" onclick="onEditBook(event, ${book.id})">Uppdate</button>
            <button onclick="onRemoveBook(event, ${book.id})">Delete</button>
            </td></tr>`
    })
    var elBookTable = document.querySelector('.books-table');
    elBookTable.innerHTML = strHTMLs.join('');
}