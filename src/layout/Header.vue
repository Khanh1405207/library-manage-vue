<script setup>

</script>
<template>
    <nav class="container">
        <RouterLink class="router-header" to="/">Home</RouterLink>
        <RouterLink class="router-header" to="/books">Books</RouterLink>
    </nav>
</template>
<style scoped>
    .container{
        display: flex;
        background-color: darkcyan;
        width: 1080px;
        height: 40px;
        justify-content: center;
        align-items: center;
    }
    .router-header{
        color: white;
    }
</style>