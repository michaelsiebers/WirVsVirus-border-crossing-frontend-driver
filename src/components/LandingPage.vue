<template>
  <div>
    <h1> LogIn </h1>
    <div class="form-group">
      <label for="UUID">UUID</label>
      <input type="text" class="form-control" id="UUID" placeholder="UUID">
    </div>
    <button @click.stop="logIn" type="button" class="btn btn-primary">Log In</button>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  data: function() {
    return {
      fields: ['Name', 'Telefonnummer', 'Last Name'],
    }
  },
  mounted: function() {

  },
  methods: {
    logIn() {
      var fields = this.fields;
      this.$router.push({ name: 'formPage', params: { fields } })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
