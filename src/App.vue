<template>
  <div id="app">
    <div id="logo">
      <img alt="Logo" src="./assets/bc-logo.svg" width="250">
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
#logo {
  text-align: center;
  margin-top: 60px;
  margin-bottom: 60px;
}
</style>
