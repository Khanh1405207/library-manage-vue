<script setup>
    import { accountAPI } from '@/api';
    import { getCurrentInstance, ref } from 'vue';

    const showModal=ref(false);
    const user=ref(null);
    const {appContext}= getCurrentInstance();
    const emitter=appContext.app.config.globalProperties.$emitter

    const open=() =>{
        showModal.value=true;
    }

    const close=() =>{
        showModal.value=false;
    }

    const confirm = async ()=>{
        try{
            await accountAPI.updateAccount(user.value);
            alert('Update succesesfuly');
            emitter.emit('update-profile');
            close();
        }catch(err){
            alert('Something went wrong'||err.response?.data);
        }
    }

    defineExpose({open,close,user});
</script>
<template>
    <Teleport to="body">
        <div v-if="showModal" class="modal-overlay" @click="close">
            <div class="modal-content" @click.stop>
                <div class="title">
                    Information
                </div>
                <form class="form-profile">
                    <input class="input" type="text" v-model="user.username" placeholder="Username" required>
                    <input class="input" type="text" v-model="user.email" placeholder="Email" required>
                    <div class="button-contain">
                        <button type="button" class="confirm-button" @click="confirm">Confirm</button>
                    </div>
                </form>
            </div>
        </div>
    </Teleport>
</template>
<style scoped>
    .modal-overlay{
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
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

    .form-profile{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .form-profile .input{
        margin: 0.6rem 0;
        width: 500px;
        padding: 1rem;
        border: 1px solid #ddd;
        background-color: rgb(229, 255, 255);
        border-radius: 7px;
    }

    .form-profile input:focus{
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
    }

    .form-profile .button-contain{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 5rem;
    }

    .form-profile .confirm-button{
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

    .form-profile .confirm-button:hover{
        color: #ddd;
        background-color: #0056b3;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes slideUp {
        from { transform: translateY(50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
</style>