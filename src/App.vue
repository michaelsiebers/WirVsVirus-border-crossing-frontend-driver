<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <LandingPage/>
  </div>
</template>

<script>
import LandingPage from './components/LandingPage.vue'
import FormPage from './components/FormPage'

export default {
  name: 'App',
  components: {
    LandingPage,
    FormPage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
