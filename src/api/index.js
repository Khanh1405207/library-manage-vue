import axios from "axios";

const api= axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 10000,
    headers:{
        'Content-Type':'application/json',
    },
});

//Book API
export const bookAPI={
    getAll: () => api.get("/books"),
    getOne: (bookId) => api.get(`/book/${bookId}`),
    addBook: (book) => api.post("/books",book),
    updateBook: (book) => api.put("/books",book),
    deleteBook: (bookId) => api.delete(`/books/${bookId}`)
}

//Account API
export const accountAPI={
    getAll: () => api.get("/accounts"),
    getOne: (accountId) => api.get(`/account/${accountId}`),
    updateAccount: (account) => api.put("/accounts",account)
}

//Record API
export const recordAPI={
    getAll: () => api.get("/records"),
    getByAccount: (acountId) => api.get("/records-by-account",{params:{acountId}}),
    getByRecord: (acountId,bookId) => api.get("/records-by-record",{params:{acountId,bookId}}),
    startRecord: (acountId,bookId) => api.post("/records",{params:{acountId,bookId}}),
    endRecord: (acountId,bookId) => api.put("/records",{params:{acountId,bookId}})
}

//Auth API
export const authAPI={
    baseURL: "/auth",
    login: (account) => api.get("/login",account),
    registry: (account) => api.post("/registry",account)
}