<script setup>
    import LoginModal from '@/components/modal/LoginModal.vue';
    import { ref } from 'vue';
    const loginModal = ref(null)

    const openLogin = () => {
            loginModal.value.open();
        }
</script>
<template>
    <nav class="header-container">
        <RouterLink class="logo" to="/">Bring your's book</RouterLink>
        <nav class="">
            <RouterLink class="router-header" to="/">Home</RouterLink>
            <RouterLink class="router-header" to="/books">Books</RouterLink>
        </nav>
        <a @click="openLogin" class="login">Login</a>
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

    a:hover{
        cursor: pointer;
    }
</style>