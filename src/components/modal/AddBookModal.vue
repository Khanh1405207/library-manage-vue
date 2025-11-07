<script setup>
    import { bookAPI } from '@/api';
    import { ref } from 'vue';

    const emit = defineEmits(['add-book'])

    const showModal=ref(false);
    const book=ref({
        bookCode: "",
        title: "",
        author: "",
        category: "",
        remaining: ""
    })

    const open= () =>{
        showModal.value=true;
    }

    const close= () =>{
        showModal.value=false;
    }

    const addBook=async()=>{
        try{
            await bookAPI.addBook(book.value);
            emit('add-book');
            close();
            alert("Them thanh cong");
        }catch(err){
            alert(err.response?.data||err);
        }finally{
            book.value.bookCode="";
            book.value.title="";
            book.value.author="";
            book.value.category="";
            book.value.remaining=""
        }
    }

    defineExpose({open,close});
</script>
<template>
    <Teleport to="body">
        <div v-if="showModal" class="modal-overlay" @click="close()">
            <div class="modal-content" @click.stop>
                <div class="title">
                    Add book
                </div>
                <form class="form-book" @submit.prevent="addBook">
                    <input class="input" type="text" v-model="book.bookCode" placeholder="Code" required>
                    <input class="input" type="text" v-model="book.title" placeholder="Title" required>
                    <input class="input" type="text" v-model="book.author" placeholder="Author" required>
                    <input class="input" type="text" v-model="book.category" placeholder="Category" required>
                    <input class="input" type="number" v-model="book.remaining" placeholder="Remaining" required>
                    <div class="button-contain">
                        <button class="add-button" type="submit">Add</button>
                    </div>
                </form>
            </div>
        </div>
    </Teleport>
</template>
<style scoped>

    .modal-overlay{
        position: fixed;
        top: 0; bottom: 0; left: 0; right: 0;
        display: flex;
        z-index: 9999;
        justify-content: center;
        align-items: center;
        background-color: rgba(0,0,0,0.5);
        animation: fadeIn 0.3s ease;
    }

    .modal-content{
        position: relative;
        width: 650px;
        height: 510px;
        border-radius: 10px;
        background-color: white;
        animation: slideUp 0.3s ease;
    }

    .modal-content .title{
        text-align: center;
        margin-top: 20px;
        font-weight: 500;
        font-size: large;
    }

    .form-book{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .form-book .input{
        margin: 0.6rem 0;
        width: 500px;
        padding: 1rem;
        border: 1px solid #ddd;
        background-color: rgb(229, 255, 255);
        border-radius: 7px;
    }

    .form-book input:focus{
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
    }

    .form-book .button-contain{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: end;
        padding: 0 5rem;
    }

    .form-book .add-button{
        width: 200px;
        height: 50px;
        margin-top: 30px;
        font-size: 16px;
        font-weight: bold;
        color: white;
        text-transform: uppercase;
        background-color: #007bff;
        border: none;
        border-radius: 10px;
    }

    .form-book .add-button:hover{
        color: #ddd;
        background-color: #0056b3;
    }

    @keyframes fadeIn {
        from{opacity: 0;};
        to{opacity: 1;}
    }

    @keyframes slideUp {
        from{transform: translateY(50px);opacity: 0;};
        to{transform: translateY(0);opacity: 1;};
    }

</style>