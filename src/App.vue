<script setup>
import { getCurrentInstance, onBeforeUnmount, onMounted, provide, ref } from 'vue';
import Header from './layout/Header.vue';
import { authAPI } from './api';
const {appContext} = getCurrentInstance();
const emitter=appContext.app.config.globalProperties.$emitter;

const user=ref(null);
const isAdmin=ref(false);
const isLogin=ref(false);

provide('user',user);
provide('isAdmin',isAdmin);
provide('isLogin',isLogin);

const loadUser= async ()=>{
  try{
    const res= await authAPI.getInfo();
    user.value=res.data;
    isAdmin.value= res.data.role==='ADMIN';
    isLogin.value= res.data != null;
  }catch(err){
    user.value = null;
    isAdmin.value = false;
    isLogin.value = false;
  }
}

const handleLogout= async()=> {
  try{
    await authAPI.logout();
  }catch(err){
    console.warn('Logout failed:', err);
  }finally{
    user.value = null;
    isAdmin.value = false;
    isLogin.value = false;
  }
}

const handleLogin=() => {
  loadUser();
}

onMounted(()=>{
  emitter.on('login-success',handleLogin);
  emitter.on('log-out',handleLogout);
  loadUser();
})

onBeforeUnmount(()=>{
  emitter.off('login-success',handleLogin);
  emitter.off('log-out',handleLogout);
})

</script>

<template>
  <Header></Header>
  <container class="container">
    <RouterView></RouterView>
  </container>
</template>

<style scoped>
  .container{
    min-height: 600px;
  }
</style>
