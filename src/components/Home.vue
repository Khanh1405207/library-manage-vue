<script setup>
import { inject } from 'vue';

    const user=inject('user');
    const isAdmin=inject('isAdmin');
</script>
<template>
    Home
    <p v-if="isAdmin">ADMIN</p>
</template>