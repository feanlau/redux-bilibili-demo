import { createStore } from 'redux'

// 用来记录 old state
let recordState
// 初始化 state
const initialState = []

// 创建 reducer
const reducer = function (state = initialState, action) {
    recordState = state
    switch (action.type) {
        case 'addBook':
            console.log(action)
            return [
                ...state,
                {
                    bookId: action.info.bookId,
                    bookName: `<<${action.info.bookName}>>`
                }
            ]
        case 'delBook':
            return state.filter((book) => book.bookId !== action.info.bookId)
        default:
            return [
                ...state
            ]
    }
}

// 创建 store
const store = createStore(reducer)

// 获取添加书籍的元素
const addBook = document.getElementById('addBook');
// 获取删除书籍的元素
const delBook = document.getElementById('delBook');
// 获取展示书籍列表的元素
const bookList = document.getElementById('bookList');

// 创建添加书籍的按钮
const addBookBtn = document.createElement('button');
// 创建添加书籍的input框，输入书名添加书籍
const bookNameInput = document.createElement('input');
// 创建删除书籍的按钮
const delBookBtn = document.createElement('button');
// 创建删除书籍的input框，输入书籍id删除书籍
const bookIdInput = document.createElement('input');

addBookBtn.innerText = "添加"
delBookBtn.innerText = "删除"

addBookBtn.addEventListener('click', addBookFn)
delBookBtn.addEventListener('click', delBookFn)

addBook.appendChild(bookNameInput)
addBook.appendChild(addBookBtn)
delBook.appendChild(bookIdInput)
delBook.appendChild(delBookBtn)

// 定义一个生成器函数生成 id
function* generateID() {
    let id = 0;
    while (true) {
        yield id++
    }
}

const generateId = generateID()
const genBookId = () => generateId.next().value.toString()

// 添加书籍函数
function addBookFn() {
    const bookName = bookNameInput.value
    if (bookName) {
        const bookId = genBookId()
        bookNameInput.value = ''
        const action = {
            type: 'addBook',
            info: {
                bookId,
                bookName
            }
        }
        store.dispatch(action)
    }
}

// 删除书籍函数
function delBookFn() {
    const bookId = bookIdInput.value
    if (bookId) {
        bookIdInput.value = ''
        const action = {
            type: 'delBook',
            info: {
                bookId: bookId
            }
        }
        store.dispatch(action)
    }
}

// 如果 state 发生变化，打印旧的 state 和新的 state
const showState = store.subscribe(() => {
    console.log('Old State' + recordState)
    console.log('New State' + store.getState())
})

// state 发生变化，重新渲染 bookList
const showNewList = store.subscribe(() => {
    const currentState = store.getState()
    if (currentState.length !== recordState.level) {
        bookList.innerText = ''
        currentState.forEach((element) => {
            bookList.appendChild(createBookList(element))
        })
    }
})

function createBookList(info) {
    const element = document.createElement('li')
    element.innerText = `BookID: ${info.bookId} BookName: ${info.bookName}`
    return element
}