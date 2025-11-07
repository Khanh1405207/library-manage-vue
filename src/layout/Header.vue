<script setup>
    import LoginModal from '@/components/modal/LoginModal.vue';
    import { getCurrentInstance, inject, ref } from 'vue';

    const {appContext}= getCurrentInstance();
    const emitter=appContext.app.config.globalProperties.$emitter

    const loginModal = ref(null)
    const isLogin=inject('isLogin');
    const user=inject('user');

    const openLogin = () => {
            loginModal.value.open();
        }

    const logout = () =>{
        if(confirm("dang xuat ???")){
            emitter.emit('log-out');
        }
    }
        
    
</script>
<template>
    <nav class="header-container">
        <RouterLink class="logo" to="/">Bring your's book</RouterLink>
        <nav class="">
            <RouterLink class="router-header" to="/">Home</RouterLink>
            <RouterLink class="router-header" to="/books">Books</RouterLink>
        </nav>
        <nav class="info-nav">
            <RouterLink class="router-header" to="/profile" v-if="isLogin">{{ user.username }}</RouterLink>
            <a @click="openLogin" v-if="!isLogin" class="login">Login</a>
            <a @click="logout" v-if="isLogin" class="logout">Log out</a>
        </nav>
    </nav>
    <LoginModal ref="loginModal" />
</template>
<style scoped>

    .header-container{
        display: flex;
        background-color: darkcyan;
        width: 1080px;
        height: 40px;
        justify-content: space-between;
        align-items: center;
        padding: 0px 10px 0px 10px;
    }

    .nav-center{
        display: flex;
        gap: 2rem;
        flex: 1;
        justify-content: center;
    }

    .router-header{
        color: white;
    }

    .logo{
        color: aliceblue;
        font-weight: bolder;
    }

    .login{
        color: white;
    }

    .logout{
        color: white;
    }

    .info-nav{
        display: flex;
        justify-content: space-between;
        min-width: 150px ;
        align-items: center;
    }

    a:hover{
        cursor: pointer;
    }
</style>