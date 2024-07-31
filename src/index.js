import { createStore } from "redux";

const initialState = []

const reducer = function (state = initialState, action) {
    switch (action.type) {
        case "addBook":
            console.log(state);
            return []
        case "delBook":
            return []
        default:
            return [
                ...state
            ]
            break;
    }
}


const store = createStore(reducer);


// console.log("Redux Hello!");
const root = document.getElementById("app");
const addBook = document.getElementById("addBook");
const delBook = document.getElementById("delBook");
const bookList = document.getElementById("bookList");

const addBookBtn = document.createElement('button');
const bookNameInput = document.createElement('input');
const delBookBtn = document.createElement('button');
const bookIdInput = document.createElement('input');

addBookBtn.innerText = "ADD BOOK"
delBookBtn.innerText = "DEL BOOK"

addBookBtn.addEventListener("click", addBookBtn)
delBookBtn.addEventListener("click", delBookBtn)

function* generateID() {
    let id=0;
    while(true) {
        yield id++;
    }
} 

function addBookFn() { 
    const bookName = bookNameInput.value;
    if(bookName) {
        console.log(bookName);
        const bookId = generateID();
        bookNameInput.value = "";
        const action = {
            type: "addBook",
            info: {
                bookId: bookId,
                bookName: bookName
            } 
        }

        store.dispatch(action);
    }
}
function delBookFn() { }

addBook.appendChild(bookNameInput)
addBook.appendChild(addBookBtn)
delBook.appendChild(bookIdInput)
delBook.appendChild(delBookBtn)