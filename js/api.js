export async function renderLocalBooks() {
    const response = await fetch('/api/books');
    if (!response.ok) {
        throw new Error('Failed to fetch books');
    }
    return response.json();
}

export async function addBookToBackend(book) {
    const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    });
    if (!response.ok) {
        throw new Error('Failed to add book');
    }
    return response.json();
}

export async function updateBookOnBackend(id, book) {
    const response = await fetch(`/api/books/${id}`, { 
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    });
    if (!response.ok) {
        throw new Error('Failed to update book');
    }
    return response.json();
}

export async function deleteBookFromBackend(id) {
    const response = await fetch(`/api/books/${id}`, { 
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete book');
    }
}

export async function getBookByIdFromBackend(id) {
    const response = await fetch(`/api/books/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch book');
    }
    return response.json();
}
