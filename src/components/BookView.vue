<script setup>
    import { bookAPI } from '@/api';
    import { onMounted, ref } from 'vue';

    const books=ref([]);
    const loading=ref(false);
    const error=ref('');
    
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
                    <button class="borrow-button">
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
