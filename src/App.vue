<template>
  <div id="app">
    <div id="logo">
      <img alt="Logo" src="./assets/bc-logo.svg" width="device-width" style="max-width: 600px">
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
  margin-top: 40px;
  margin-bottom: 40px;
}
</style>
