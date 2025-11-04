<script setup>
import { getCurrentInstance, onBeforeUnmount, onMounted, provide, ref } from 'vue';
import Header from './layout/Header.vue';
import { authAPI } from './api';
const {appContext} = getCurrentInstance();
const emitter=appContext.app.config.globalProperties.$emitter;

const user=ref(null);
const isAdmin=ref(false);

provide('user',user);
provide('isAdmin',isAdmin);

const loadUser= async ()=>{
  const res= await authAPI.getInfo();
  user.value=res.data;
  isAdmin.value= res.data.role==='ADMIN';
}

const handleLogin=() => {
  loadUser();
}

onMounted(()=>{
  emitter.on('login-success',handleLogin);
  loadUser();
})

onBeforeUnmount(()=>{
  emitter.off('login-success',handleLogin);
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
