<script setup>
    import { bookAPI, recordAPI } from '@/api';
    import { inject, onMounted, ref } from 'vue';
    import AddBookModal from './modal/AddBookModal.vue';

    const books=ref([]);
    const loading=ref(false);
    const error=ref('');
    const user=inject('user');
    const isAdmin=inject('isAdmin');
    const addBookModal=ref(null);
    
    const fetchBooks= async () =>{
        loading.value=true;
        try{
            const res = await bookAPI.getAll();
            books.value = res.data;
        }catch (err){
            error.value= err.response?.data?.message || 'Loi ket noi';
        }finally{
            loading.value=false;
        }
    };

    const borrowBook = async (bookId) => {
        if (!user.value?.id) {
            alert("Vui lòng đăng nhập!");
            return;
        }

        try {
            const res = await recordAPI.startRecord(user.value.id, bookId);
            // THÀNH CÔNG → thông báo
            alert("Mượn sách thành công!");
            fetchBooks();
        } catch (err) {
            // XỬ LÝ LỖI AN TOÀN
            const message = 
                err.response?.data ||
                "Đã có lỗi xảy ra khi mượn sách";
            alert(message);
        }
    };

    const handleAdd=(newBook) =>{
        fetchBooks();
    }

    onMounted(fetchBooks);

</script>
<template>
    <div class="book-view">
        <div class="book-bar">
            <div class="title">
                Book List
            </div>
            <div v-if="isAdmin">
                <button @click="addBookModal.open()" class="add-button">+</button>
            </div>
        </div>
        <table class="book-table">
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Remaining</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="book in books" :key="book.id">
                    <td>{{ book.bookCode }}</td>
                    <td>{{ book.title }}</td>
                    <td>{{ book.author }}</td>
                    <td>{{ book.category }}</td>
                    <td>{{ book.remaining }}</td>
                    <td>
                        <button class="borrow-button" @click="borrowBook(book.id)">
                            Borrow
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <AddBookModal @add-book="handleAdd" ref="addBookModal"></AddBookModal>
</template>
<style scoped>



    .book-view{
        padding-top: 30px;
        width: 1080px;
        justify-items: center;
    }

    .book-bar{
        width: 750px;
        display: flex;
        padding: 4px 4px 4px 4px;
        justify-content: space-between;
        align-items: center;
    }

    .book-bar .title{
        text-transform: uppercase;
        font-size: xx-large;
        font-weight: bold;
    }

    .book-bar .add-button{
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 8px;
        background-color: rgb(45, 192, 45);
        color: white;
        font-size: 40px;
        font-weight: bold;
    }

    .book-bar .add-button:hover{
        background-color: rgb(92, 235, 92);
        cursor: cell;
    }

    .book-table{
        border-collapse: collapse;
        min-width: 750px;
        background-color: aquamarine;
    }

    .book-table thead tr th{
        font-weight: bold;
    }

    .book-table tr{
        border-bottom: 1px solid rgb(89, 89, 89);
    }

    .book-table tbody{
        background-color: white;
        text-align: center;
    }

    .book-table tr:nth-child(even){
        background-color: rgb(239, 239, 239);
    }

    .book-table tr:last-child{
        border-bottom: none;
    }

    .book-table td{
        height: 35px;
    }

    .borrow-button{
        background-color: aqua;
        font-weight: 500;
        border: none;
        padding: 4px 10px 4px 10px;
        border-radius: 3px;
    }

    .borrow-button:hover{
        color: white;
        background-color: rgb(150, 224, 224);
        cursor: pointer;
    }
</style>
