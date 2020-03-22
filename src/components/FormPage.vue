<template>
    <div>
        <h3>Form</h3>
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">General Information</h5>
                <div class="form-check">
                    <div class="form-group" v-for="(field, index) in sFields[0]" :key="field.id">
                        <div v-if="field.type!=='checkbox'">
                            <label :for="index">{{field.name}}</label>
                            <input :type="field.type" class="form-control" :id="index">
                        </div>

                        <div v-if="field.type==='checkbox'">
                            <input :type="field.type" class="form-check-input" :id="index">
                            <label :for="index" class="form-check-label">{{field.name}}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card" v-for="(fields, index) in sFields" :key="index">
            <div class="card-body">
                <h5 class="card-title">Information for {{index === sFields.length - 1 ? countries.find(c => c.id === destination).name : countries.find(c => c.id === transits[index]).name}}</h5>
                <div class="form-check">
                    <div class="form-group" v-for="(field, index) in fields" :key="field.id">
                        <div v-if="field.type!=='checkbox'">
                            <label :for="index">{{field.name}}</label>
                            <input :type="field.type" class="form-control" :id="index">
                        </div>

                        <div v-if="field.type==='checkbox'">
                            <input :type="field.type" class="form-check-input" :id="index">
                            <label :for="index" class="form-check-label">{{field.name}}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "FormPage",
        props: {
            countries: Array,
            start: String,
            destination: String,
            transits: Array,
            gFields: Array,
            sFields: Array,
        },
        data: function() {
            return {

            }
        },
        mounted: function() {
            this.output();
        },
        methods: {
            output() {
                console.log(this.destination);
                console.log(' ');
                console.log(this.gFields);
                console.log(' ');
                for (var i = 0; i < this.sFields.length; i++) {
                    console.log(this.sFields[i]);
                    console.log(' ');
                }
            },
        }
    }
</script>

<style scoped>

</style>