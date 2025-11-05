<script setup>
    import { bookAPI, recordAPI } from '@/api';
    import { inject, onMounted, ref } from 'vue';

    const books=ref([]);
    const loading=ref(false);
    const error=ref('');
    const user=inject('user');
    
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
            err.response?.data?.message || 
            err.message || 
            "Đã có lỗi xảy ra khi mượn sách";
        alert(message);
    }
};

    onMounted(fetchBooks);
</script>
<template>

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

</template>
<style scoped>

    table{
        border-collapse: collapse;
    }

    .book-table{
        min-width: 550px;
        background-color: aquamarine;
    }

    .book-table tbody{
        background-color: white;
    }

    .book-table tbody tr td{
        text-align: center;
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
