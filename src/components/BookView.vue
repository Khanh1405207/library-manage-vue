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
    <p v-if="loading">Loading...</p>
    <ul>
        <li v-for="book in books" :key="book.id">
            {{ book.title }} - {{ book.author }}
        </li>
    </ul>
</template>
