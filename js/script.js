let books = [];
let editIndex = -1;

class Book {
    constructor(title, author, pages, price) {
        this.title = title;
        this.author = author;
        this.pages = parseInt(pages);
        this.price = parseFloat(price);
    }
}

function addBook() {
    const title = document.getElementById('title-create').value;
    const author = document.getElementById('author-create').value;
    const pages = document.getElementById('pages-create').value;
    const price = document.getElementById('price-create').value;

    if (title && author && pages && price) {
        const book = {
            title: title,
            author: author,
            pages: parseInt(pages),
            price: parseFloat(price)
        };

        // Відправлення POST-запиту на сервер для додавання книги
        fetch('http://localhost:3000/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(book),
        })
        .then(response => response.json())
        .then(data => {
            books.push(data); // Додаємо книгу до локального списку
            renderBooks();
            clearInputFields('create');
            updateTotals();
            document.getElementById('create-error').style.display = 'none';
        })
        .catch(error => {
            console.error('Помилка при додаванні книги:', error);
        });
    } else {
        document.getElementById('create-error').style.display = 'block';
    }
}

function startEdit(index) {
    const book = books[index];
    document.getElementById('title-edit').value = book.title;
    document.getElementById('author-edit').value = book.author;
    document.getElementById('pages-edit').value = book.pages;
    document.getElementById('price-edit').value = book.price;

    editIndex = index;
    openTab(null, 'edit');
}

function saveChanges() {
    const title = document.getElementById('title-edit').value;
    const author = document.getElementById('author-edit').value;
    const pages = document.getElementById('pages-edit').value;
    const price = document.getElementById('price-edit').value;

    if (title && author && pages && price) {
        const updatedBook = {
            title: title,
            author: author,
            pages: parseInt(pages),
            price: parseFloat(price)
        };

        const bookId = books[editIndex].id; // Отримайте ID книги для оновлення

        // Відправлення PUT-запиту на сервер для оновлення книги
        fetch(`http://localhost:3000/books/${bookId}`, { // Використовуйте ID
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedBook),
        })
        .then(response => response.json())
        .then(data => {
            books[editIndex] = data; // Оновлюємо книгу в локальному списку
            renderBooks();
            clearInputFields('edit');
            updateTotals();
            document.getElementById('edit-error').style.display = 'none';
            openTab(null, 'book-list');
        })
        .catch(error => {
            console.error('Помилка при оновленні книги:', error);
        });
    } else {
        document.getElementById('edit-error').style.display = 'block';
    }
}

function deleteBook(id) {
    fetch(`http://localhost:3000/books/${id}`, { // Використовуйте ID замість index
        method: 'DELETE',
    })
    .then(() => {
        books = books.filter(book => book.id !== id); // Оновлюємо локальний масив
        renderBooks();
        updateTotals();
    })
    .catch(error => {
        console.error('Помилка при видаленні книги:', error);
    });
}

function renderBooks(filteredBooks = books) {
    const bookList = document.getElementById('book-list-content');
    bookList.innerHTML = filteredBooks.length > 0
        ? filteredBooks.map((book) => `
            <div class="book-item">
                <span><b>Назва:</b> ${book.title}</span><br>
                <span><b>Автор:</b> ${book.author}</span><br>
                <span><b>Кількість сторінок:</b> ${book.pages}</span><br>
                <span><b>Ціна:</b> ${book.price} грн</span><br>
                <button onclick="startEdit(${books.indexOf(book)})">Редагувати</button>
                <button onclick="deleteBook(${book.id})">Видалити</button> <!-- Використовуйте ID -->
            </div>
        `).join('')
        : `<p>Книги не знайдено</p>`;
}

function updateTotals() {
    const totalPages = books.reduce((total, book) => total + book.pages, 0);
    const totalPrice = books.reduce((total, book) => total + book.price, 0);

    document.getElementById('total-pages').innerText = totalPages;
    document.getElementById('total-price').innerText = totalPrice;
}

function openTab(evt, tabName) {
    const tabcontent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    const tablinks = document.getElementsByClassName("tab-link");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    document.getElementById(tabName).style.display = "block";
    if (evt) {
        evt.currentTarget.classList.add("active");
    }
}

function clearInputFields(type) {
    document.getElementById(`${type === 'create' ? 'title-create' : 'title-edit'}`).value = '';
    document.getElementById(`${type === 'create' ? 'author-create' : 'author-edit'}`).value = '';
    document.getElementById(`${type === 'create' ? 'pages-create' : 'pages-edit'}`).value = '';
    document.getElementById(`${type === 'create' ? 'price-create' : 'price-edit'}`).value = '';
}

function searchBook() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm)
    );
    renderBooks(filteredBooks);
}

function resetSearch() {
    document.getElementById('search').value = '';
    renderBooks();
}

function sortBooks() {
    books.sort((a, b) => a.price - b.price);
    renderBooks();
}

openTab(null, 'book-list'); // Відкриваємо вкладку "Мої книги" за замовчуванням
