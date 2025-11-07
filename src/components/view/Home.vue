<script setup>
import { inject } from 'vue';

    const user=inject('user');
    const isAdmin=inject('isAdmin');
</script>
<template>
   <div class="container">
        Home
        <p v-if="isAdmin">ADMIN</p>
   </div>
</template>
<style scoped>
    .container{
        width: 1080px;
    }
</style>