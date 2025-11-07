<script setup>
    import { authAPI } from '@/api';
    import { getCurrentInstance, ref } from 'vue';

    const showModal=ref(false);
    const emit=defineEmits(['open-login']);
    const {appContext}=getCurrentInstance();
    const emitter=appContext.app.config.globalProperties.$emitter
    
    const form=ref({
        username: '',
        password: '',
        email: ''
    })

    const open=()=>{
        showModal.value=true;
    }

    const close=()=>{
        showModal.value=false;
    }

    const openLogin=()=>{
        emit('open-login');
    }

    const registry= async()=>{
        try{
            await authAPI.registry(form.value);
            alert('Registry success');  
            const res = await authAPI.login(form.value);
            emitter.emit('login-success');
            close();
        }catch(err){
            alert('Something went wrong'||err.respone?.data);
        }
    }

    defineExpose({open,close});
</script>
<template>
    <Teleport to="body">
        <div v-if="showModal" class="modal-overlay" @click="close">
            <div class="modal-content" @click.stop>
                <h2 class="title">Registry</h2>
                <form @submit.prevent="registry" class="registry-form">
                    <input v-model="form.username" type="text" placeholder="Username" required class="input"/>
                    <input v-model="form.password" type="password" placeholder="Password" required class="input"/>
                    <input v-model="form.email" type="email" placeholder="Email" required class="input"/>
                    <button type="submit" class="btn-registry">Registry</button>
                    <div class="button-contain">
                        <a class="login-open" @click="openLogin">Login</a>
                    </div>
                </form>
                <button class="close-btn" @click="close">×</button>
            </div>
        </div>
    </Teleport>
</template>
<style scoped>
    .modal-overlay {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        animation: fadeIn 0.3s ease;
    }

    .modal-content {
        background: white;
        padding: 2rem;
        border-radius: 12px;
        width: 90%;
        max-width: 400px;
        position: relative;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        animation: slideUp 0.3s ease;
    }

    .title {
        margin: 0 0 1.5rem;
        text-align: center;
        color: #2c3e50;
    }

    .registry-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .input {
        padding: 12px 16px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 1rem;
    }

    .input:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
    }

    .btn-registry {
        padding: 12px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 8px;
        font-weight: 500;
        cursor: pointer;
        transition: 0.2s;
    }

    .btn-registry:hover {
        background: #0056b3;
    }

    .close-btn {
        position: absolute;
        top: 12px;
        right: 16px;
        background: none;
        border: none;
        font-size: 1.8rem;
        color: #aaa;
        cursor: pointer;
    }

    .close-btn:hover {
        color: #000;
    }

    .button-contain{
        width: 100%;
        display: flex;
        justify-content: end;
    }

    .login-open{
        color: rgb(91, 91, 255);
    }

    .login-open:hover{
        color: rgb(34, 34, 193);
        text-decoration: underline;
        background-color: transparent;
        cursor: pointer;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes slideUp {
        from { transform: translateX(50px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
</style>