<template>
  <div>
    <h3 style="text-align: center">Please select Start-, Destination- and Transit-Countries</h3>
    <form>
      <div class="form-group row">
        <div class="col">
          <label for="startSelect">Start Country</label>
          <select class="form-control" id="startSelect" v-model="start">
            <option disabled selected>--Please Select--</option>
            <option :disabled="!countriesFiltered.includes(country)" v-for="country in countries" :key="country.id" v-bind:value="country.id">{{country.name}}</option>
          </select>
        </div>
        <div class="col">
          <label for="startDate">Date of Arrival</label>
          <input type="date" class="form-control" id="startDate">
        </div>
      </div>

      <div v-for="n in transits.length" :key="transits[n-1]" class="form-group row">
        <div class="col">
          <label :for="n">Transit Country</label>
          <select class="form-control" :id="n" v-model="transits[n - 1]">
            <option @click.stop="removeTransit" :id="transits[n - 1]">--Remove--</option>
            <option :disabled="!countriesFiltered.includes(country)" v-for="country in countries" :key="country.id" v-bind:value="country.id" >{{country.name}}</option>
          </select>
        </div>
        <div class="col">
          <label for="n+'transitDate'">Date of Arrival</label>
          <input type="date" class="form-control" :id="n+'transitDate'">
        </div>
      </div>

      <div>
        <button style="margin-bottom: 10px;" @click.stop="addTransit" type="button" class="btn btn-primary">Add Transit</button>
      </div>

      <div class="form-group row">
        <div class="col">
          <label for="destinationSelect">Destination Country</label>
          <select class="form-control" id="destinationSelect" v-model="destination">
            <option disabled selected>--Please Select--</option>
            <option :disabled="!countriesFiltered.includes(country)" v-for="country in countries" :key="country.id" v-bind:value="country.id">{{country.name}}</option>
          </select>
        </div>
        <div class="col">
          <label for="destinationDate">Date of Arrival</label>
          <input type="date" class="form-control" id="destinationDate">
        </div>
      </div>
    </form>

    <div style="text-align: center; margin-top: 30px">
      <button @click.stop="output" type="button" class="btn btn-primary">Start</button>
    </div>


  </div>
</template>

<script>
export default {
  name: 'Home',
  data: function() {
    return {
      countries: [],
      countriesFiltered: [],
      transits: [],
      start: null,
      destination: null,
    }
  },
  mounted: function() {
    this.loadCountries();
    this.filterCountries();
  },
  methods: {
    output() {
      console.log(this.start);
      console.log(this.destination);
      console.log(this.transits);
      console.log(' ');
      console.log(this.countries);
      console.log('_');
      console.log(this.countriesFiltered);
    },
    addTransit() {
      if(this.countriesFiltered.length > 0) {
        this.transits.push(this.countriesFiltered[0].id);
      } else {
        alert("No more transits possible");
      }
    },
    removeTransit(event) {
      const transit = event.target.id;
      this.transits.splice(this.transits.findIndex(t => t === transit), 1);
    },
    loadCountries() {
      //TODO REST Call um Länder zu bekommen
      this.countries.push({id: '0', name: 'Germany'});
      this.countries.push({id: '1', name: 'France'});
      this.countries.push({id: '2', name: 'Poland'});
    },
    filterCountries() {
      this.countriesFiltered = [].concat(this.countries);
      this.countriesFiltered.splice(this.countriesFiltered.findIndex(c => c.id === this.start), 1);
      this.countriesFiltered.splice(this.countriesFiltered.findIndex(c => c.id === this.destination), 1);
      for (var i = 0; i < this.transits.length; i++)
        this.countriesFiltered.splice(this.countriesFiltered.findIndex(c => c.id === this.transits[i]), 1);
    },
    loadForm() {
      //TODO Validation
      var sFields = [];

      //TODO GET general fields
      let gFields = [{id: '0', name: 'name', type: 'text'}, {id: '1', name: 'sick', type: 'checkbox'}, {id: '2', name: 'age', type: 'number'}, {id: '3', name: 'date of birth', type: 'date'}, {id: '4', name: 'Email', type: 'email'}];

      for (let transit in this.transits) {
        console.log(transit);
        //TODO GET Fields for this transit
        let tFields = [{id: '5', name: 'name', type: 'text'}, {id: '6', name: 'sick', type: 'checkbox'}, {id: '7', name: 'age', type: 'number'}, {id: '8', name: 'date of birth', type: 'date'}, {id: '9', name: 'Email', type: 'email'}];
        sFields.push(tFields);
      }

      //TODO GET Fields for destination
      let dFields = [{id: '10', name: 'name', type: 'text'}, {id: '11', name: 'sick', type: 'checkbox'}, {id: '12', name: 'age', type: 'number'}, {id: '13', name: 'date of birth', type: 'date'}, {id: '14', name: 'Email', type: 'email'}];
      sFields.push(dFields);

      this.routeToForm(this.countries, this.start, this.destination, this.transits, gFields, sFields);
    },
    routeToForm(countries, start, destination, transits, gFields, sFields) {
      this.$router.push({ name: 'formPage', params: { countries, start, destination, transits, gFields, sFields } })
    },
  },
  watch: {
    start: function() {
      this.filterCountries();
    },
    destination: function() {
      this.filterCountries();
    },
    transits: function() {
        this.filterCountries();
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
