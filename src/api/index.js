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
    getAll: () => api.get("/books")
}

//Account API
export const accountAPI={
    getAll: () => api.get("/accounts")
}

//Record API
export const recordAPI={
    getAll: () => api.get("/borrow-records"),
    getByAccount: (acountId) => api.get("/borrow-records",acountId),
    getByRecord: (acountId,bookId) => api.get("/borrow-records",acountId,bookId)
}