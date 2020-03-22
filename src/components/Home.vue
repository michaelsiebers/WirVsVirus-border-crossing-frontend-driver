<template>
  <div>
    <h3 id="headline">Please select Countries</h3>

    <form id="form">
      <div class="form-group row">
        <div class="col">
          <label for="startSelect">Start Country</label>
          <select class="form-control" id="startSelect" v-model="start.country">
            <option disabled selected>--Please Select--</option>
            <option :disabled="!countriesFiltered.includes(country)" v-for="country in countries" :key="country.id" v-bind:value="country.id">{{country.name}}</option>
          </select>
        </div>
        <div class="col">
          <label for="startDate">Date of Start</label>
          <input v-model="start.date" type="date" class="form-control" id="startDate">
        </div>
      </div>

      <div id="transits" v-for="n in transits.length" :key="transits[n-1].country" class="form-group row">
        <div class="col">
          <label :for="n">Transit Country</label>
          <select class="form-control" :id="n" v-model="transits[n - 1].country">
            <option :disabled="!countriesFiltered.includes(country)" v-for="country in countries" :key="country.id" v-bind:value="country.id" >{{country.name}}</option>
          </select>
        </div>
        <div id="removebtn">
          <button class="btn btn-danger" @click.stop="removeTransit" :id="transits[n - 1].country">-</button>
        </div>
        <div class="col">
          <label for="n+'transitDate'">Date of Arrival</label>
          <input v-model="transits[n - 1].date" type="date" class="form-control" :id="n+'transitDate'">
        </div>
      </div>
      <div id="addbtn">
        <button @click.stop="addTransit" type="button" class="btn btn-secondary">Add Transit</button>
      </div>

      <div class="form-group row">
        <div class="col">
          <label for="destinationSelect">Destination Country</label>
          <select class="form-control" id="destinationSelect" v-model="destination.country">
            <option disabled selected>--Please Select--</option>
            <option :disabled="!countriesFiltered.includes(country)" v-for="country in countries" :key="country.id" v-bind:value="country.id">{{country.name}}</option>
          </select>
        </div>
        <div class="col">
          <label for="destinationDate">Date of Arrival</label>
          <input v-model="destination.date" type="date" class="form-control" id="destinationDate">
        </div>
      </div>
    </form>

    <div id="start">
      <p id="red" v-if="!valid">Please fill out every field correctly</p>
      <button @click.stop="loadForm" type="button" class="btn btn-primary">Start</button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'Home',
    data: function() {
      return {
        countries: [],
        countriesFiltered: [],
        transits: [],
        start: {},
        destination: {},
        valid: true,
        apiurl: 'https://api.esp-test.de/',
      }
    },
    mounted: function() {
      this.loadCountries();
    },
    methods: {
      addTransit() {
        if(this.countriesFiltered.length > 0) {
          this.transits.push({country: this.countriesFiltered[0].id, date: null});
        } else {
          alert("No more transits possible");
        }
      },
      removeTransit(event) {
        const country = event.target.id;
        this.transits.splice(this.transits.findIndex(t => t.country === country), 1);
      },
      loadCountries() {
        const URL = this.apiurl + 'api/country/list';
        axios.get(URL)
                .then(response => {
                  response.data.forEach(c => this.countries.push({id: c.pkey, name: c.countryname}))
                  this.filterCountries();
                })
                .catch(e => {
                  console.log(e);
                  alert("An error occured. Please reload the page.");
                });
      },
      filterCountries() {
        this.countriesFiltered = [].concat(this.countries);
        if (this.start.country !== undefined) {
          this.countriesFiltered.splice(this.countriesFiltered.findIndex(c => c.id === this.start.country), 1);
        }
        if (this.destination.country !== undefined) {
          this.countriesFiltered.splice(this.countriesFiltered.findIndex(c => c.id === this.destination.country), 1);
        }
        for (var i = 0; i < this.transits.length; i++)
          this.countriesFiltered.splice(this.countriesFiltered.findIndex(c => c.id === this.transits[i].country), 1);
      },
      validate() {
        if (this.start.country === undefined || this.start.country === null || this.start.country === '') {
          this.valid = false;
          return false;
        }
        if (this.start.date === undefined || this.start.date === null || this.start.date === '') {
          this.valid = false;
          return false;
        }
        if (this.destination.country === undefined || this.destination.country === null || this.destination.country === '') {
          this.valid = false;
          return false;
        }
        if (this.destination.date === undefined || this.destination.date === null || this.destination.date === '') {
          this.valid = false;
          return false;
        }
        for (let transit of this.transits) {
          if (transit.country === undefined || transit.country === null || transit.country === '') {
            this.valid = false;
            return false;
          }
          if (transit.date === undefined || transit.date === null || transit.date === '') {
            this.valid = false;
            return false;
          }
        }
        this.valid = true;
        return true;
      },
      loadForm() {
        if (!this.validate()) {
          return;
        }
        var me = this;
        this.getFields(this.start.country,function(data) {
          var gFields = me.mapFieldResponse(data);
          var sendObject = me.prepareSendObject(gFields);
          me.routeToForm(me.countries, me.start, me.destination, me.transits, gFields, sendObject);
        }, function() {
          alert("An error occured. Please reload the page.");
        });
      },
      getFields(country, success, failure) {
        axios.post(this.apiurl + 'api/form/field/list', {
          body: { "uuid" : country }
        })
                .then(response => {
                  success(response.data);
                })
                .catch(e => {
                  console.log(e);
                  failure();
                });
      },
      mapFieldResponse(data) {
        var company = data.filter(f => f.forEntity === 'Company');
        company.forEach(f => delete f.forEntity);
        company.forEach(f => delete f.country);
        company.forEach(f => (f.datatype === 'integer' ? f.datatype = 'number' : f.datatype = 'text'));
        var driver = data.filter(f => f.forEntity === 'Driver');
        driver.forEach(f => delete f.forEntity);
        driver.forEach(f => delete f.country);
        driver.forEach(f => (f.datatype === 'integer' ? f.datatype = 'number' : f.datatype = 'text'));
        var car = data.filter(f => f.forEntity === 'Carregistration');
        car.forEach(f => delete f.forEntity);
        car.forEach(f => delete f.country);
        car.forEach(f => (f.datatype === 'integer' ? f.datatype = 'number' : f.datatype = 'text'));
        var gFields = [{name: 'Driver', fields: driver}, {name: 'Company', fields: company}, {name: 'Car', fields: car}];
        return gFields;
      },
      prepareSendObject(fields) {
        var sendObject = {};
        for (let category of fields ) {
          sendObject[category.name] = {};
          for (let field of category.fields) {
            sendObject[category.name][field.name] = '';
          }
        }
        return sendObject;
      },
      routeToForm(countries, start, destination, transits, gFields, sendObject) {
        this.$router.push({ name: 'formPage', params: { countries, start, destination, transits, gFields, sendObject } })
      },
    },
    watch: {
      start: {
        deep: true,
        handler: function() {
          this.filterCountries();
        },
      },
      destination: {
        deep: true,
        handler: function() {
          this.filterCountries();
        },
      },
      transits: {
        deep: true,
        handler: function() {
          this.filterCountries();
        }
      },
    },
  }
</script>

<style scoped>
  #headline {
    text-align: center;
    margin-bottom: 30px;
  }

  #form {
    margin-left: 30px;
    margin-right: 40px;
  }
  #transits {
    display: flex;
    height: 100%;
  }
  #removebtn {
    height: 50%;
    display: inline-block;
    align-self: flex-end;
  }
  #addbtn {
    margin-bottom: 10px;
    text-align: center;
  }
  #start {
    text-align: center; margin-top: 30px; margin-bottom: 50px
  }
  #red {
    color: red;
  }
</style>
