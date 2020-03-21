<template>
    <div>
        <h1> Form </h1>
        <div class="form-group" v-for="field in $route.params.fields" :key="field">
            <label :for="field">{{field}}</label>
            <input type="text" class="form-control" :id="field" :placeholder="field">
        </div>
    </div>
</template>

<script>
    export default {
        name: "FormPage",
    }
</script>

<style scoped>

</style>