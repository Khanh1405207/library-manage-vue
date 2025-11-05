import axios from "axios";

const api= axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 10000,
    headers:{
        'Content-Type':'application/json',
    },
    withCredentials:true,
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
    getByAccount: (accountId) => api.get("/records-by-account",{params:{accountId}}),
    getByRecord: (accountId,bookId) => api.get("/records-by-record",{params:{accountId,bookId}}),
    startRecord: (accountId,bookId) => api.post("/records",null,{params:{accountId,bookId}}),
    endRecord: (accountId,bookId) => api.put("/records",null,{params:{accountId,bookId}})
}

//Auth API
export const authAPI={
    login: (account) => api.post("/auth/login",account),
    registry: (account) => api.post("/auth/registry",account),
    getInfo: () => api.get("/auth/get-info"),
    logout: () => api.get("/auth/logout")
}