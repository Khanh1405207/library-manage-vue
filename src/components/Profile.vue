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
                <div class="img">
                    <img class="user-img" src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" alt="loading"></img>
                </div>
                <p>Username: {{ user.username }}</p>
                <p>Email: {{ user.email }}</p>
                <p>Role: {{ user.role }}</p>
                <button class="edit-button">
                    Edit
                </button>
            </div>
            <div v-else>
                <p>Loading...</p>
            </div>
        </div>
        <div class="records-borrow">
            <div class="title">
                Records
            </div>
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
                            <button class="return-button" @click="endRecord(book.bookId)">Return book</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<style scoped>
    .profile-view{
        display: grid;
        grid-template-columns: 1fr 1fr;
        width: 1080px;
        min-height: 100%;
        padding-top: 30px;
    }

    .title{
        font-weight: bold;
        width: 100%;
        padding-left: 10px;
        font-size: x-large;
        text-transform: uppercase;
    }

    .profile-content .img{
        display: flex;
        justify-content: center;
        padding: 20px 0px 20px 0px;
    }

    .user-img{
        width: 50%;
        border: 1px solid black;
        border-radius: 5%;
    }

    .profile-content p{
        font-size: large;
        margin: 3px 0px 3px 0px;
    }

    .profile-content .edit-button{
        margin-top: 20px;
        background-color: rgb(66, 159, 99);
        color: white;
        font-weight: 500;
        font-size: large;
        border: none;
        padding: 8px 20px 8px 20px;
        border-radius: 3px;
    }

    .profile-content .edit-button:hover{
        background-color: rgb(77, 188, 116);
        color: rgb(236, 234, 234);
    }

    .profile-view .records-borrow{
        justify-items: center;
        height: 100%;
        border-left: 1px solid rgb(89, 89, 89);
        padding: 0px 5px 0px 5px;
    }

    .profile-view .records-borrow .records-table{
        width: 100%;
        text-align: center;
    }

    .records-table{
        border-collapse: collapse;
    }

    .records-table thead{
        background-color: aqua;
    }

    .records-table th{
        width: 20%;
        font-weight: bold;
    }

    .records-table tr{
        border-bottom: 1px solid rgb(89, 89, 89);
    }

    .records-table tr td{
        height: 35px;
    }

    .records-table tr:nth-child(even){
        background-color: rgb(239, 239, 239);
    }

    .records-table tr:last-child{
        border-bottom: none;
    }

    .records-table .return-button{
        background-color: rgb(168, 76, 76);
        color: white;
        font-weight: 500;
        border: none;
        padding: 4px 10px 4px 10px;
        border-radius: 3px;
    }

    .return-button:hover{
         background-color: rgb(156, 70, 70);
        color: rgb(214, 214, 214);
    }
</style>