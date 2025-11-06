<script setup>
    import { accountAPI, recordAPI } from '@/api';
    import { inject, onBeforeMount, onBeforeUpdate, onMounted, onUpdated, ref, watch } from 'vue';

    const user=ref(null);
    const records=ref(null);
    const curUser=inject('user');

    const formatDate=(localDateString) =>{
        return new Date(localDateString).toLocaleDateString('vi-VN',{
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
    }

    const fetchUser= async () =>{
        try{
            const res= await accountAPI.getOne(curUser.value.id);
            user.value=res.data;
        }catch(err){
            alert('something went wrong:',err.response.data.message||err.message);
        }
    }

    const fetchRecord= async () =>{
        try{
            const res=await recordAPI.getByAccount(curUser.value.id);
            records.value=res.data; 
        }catch(err){
            alert('something went wrong:',err.response.data.message||err.message);
        }
    }

    const endRecord= async (bookId) =>{
        try{
            await recordAPI.endRecord(user.value.id,bookId);
            alert('Tra sach thanh cong');
            fetchRecord();
        }catch(err){
            alert('Someting went wrong'||err);
        }
    }

    watch(()=>curUser?.value?.id,(id) =>{
        if(id){
            fetchUser();
            fetchRecord();
        }},
        {
            immediate: true
        }
    )

</script>
<template>
    <div class="profile-view">
        <div class="profile">
            <p class="title">Account</p>
            <div v-if="user" class="profile-content">
                <p>Username: {{ user.username }}</p>
                <p>Email: {{ user.email }}</p>
                <p>Role: {{ user.role }}</p>
            </div>
            <div v-else>
                <p>Loading...</p>
            </div>
        </div>
        <div class="records-borrow">
            <table v-if="records" class="records-table">
                <thead>
                    <tr>
                        <th>Book title</th>
                        <th>Start date</th>
                        <th>End date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="book in records">
                        <td>{{ book.bookTittle }}</td>
                        <td>{{formatDate(book.startDate)}}</td>
                        <td>{{book.endDate ? formatDate(book.endDate) : '---'}}</td>
                        <td v-if="!book.endDate">
                            <button @click="endRecord(book.bookId)">Return book</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<style scoped>

</style>