<template>
    <div>
        <h3 id="headline">Please Fill Out the Following Information</h3>
        <div class="card" v-for="(category, index) in gFields" :key="index">
            <div class="card-body">
                <h5 class="card-title">{{category.name}} Information</h5>
                <div class="form-check">
                    <div class="form-group" v-for="(field, index) in category.fields" :key="field.name">
                        <label :for="index">{{field.name}}</label>
                        <input v-model="sendObject[category.name][field.name]" :type="field.datatype" class="form-control" :id="index">
                    </div>
                </div>
            </div>
        </div>

        <div id="upload">
            <p style="color: red" v-if="!valid">Please fill out every field correctly</p>
            <button @click.stop="upload" class="btn btn-primary">Generate QR-Code</button>
        </div>
        <div id="qr" v-if="generated">
            <p>Use this code to identify at the border</p>
            <qrcode-vue id="cnv" :value="codeId" size="300"></qrcode-vue>
            <button @click.stop="downloadQR" class="btn btn-primary">Download</button>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import QrcodeVue from 'qrcode.vue'

    export default {
        name: "FormPage",
        props: {
            countries: Array,
            start: Object,
            destination: Object,
            transits: Array,
            gFields: Array,
            sendObject: Object,
        },
        components: {
            QrcodeVue,
        },
        data: function() {
            return {
                codeId: '',
                generated: false,
                valid: true,
            }
        },
        mounted: function() {
        },
        methods: {
            validate() {
                let valid = this.validateIterate(this.sendObject);
                this.valid = valid;
                return valid;
            },
            validateIterate(obj) {
                for (let key of Object.keys(obj)) {
                    if (typeof obj[key] === 'object') {
                        return this.validateIterate(obj[key]);
                    } else {
                        if (obj[key] === '') {
                            return false;
                        }
                    }
                }
                return true;
            },
            upload() {
                if (!this.validate()) {
                    return;
                }
                this.prepareObject();
                this.uploadObject();
            },
            prepareObject() {
                this.sendObject['Tour'] = [];
                var tourArray = [];
                tourArray.push(this.start);
                tourArray = tourArray.concat(this.transits);
                tourArray.push(this.destination);
                var i = 0;
                var j = 1;
                for (i, j; i < tourArray.length - 1; i++) {
                    let rideFrom = tourArray[i].country;
                    let rideTo = tourArray[j].country;
                    let date = tourArray[j].date;
                    this.sendObject.Tour.push({ridefrom: rideFrom, rideto: rideTo, date: date});
                    j++;
                }
            },
            uploadObject() {
                const me = this;
                axios.post(process.env.VUE_APP_BACKEND + 'api/border/cross/add', {
                    body: me.sendObject
                })
                    .then(response => {
                        if (response.success === 'true') {
                            this.codeId = response.tour;
                            this.generated = true;
                        } else {
                            alert("Something went wrong. Please reload the page");
                        }
                    })
                    .catch(e => {
                        //TODO  Remove wrong error handling
                        console.log(e);
                        this.generated = true;
                        alert("Something went wrong. Please reload the page");
                    });
            },
            downloadQR() {
                var canvas = document.getElementById('cnv').firstChild;
                var lnk = document.createElement('a'), e;
                lnk.download = 'QRCode';
                lnk.href = canvas.toDataURL("image/png;base64");
                if (document.createEvent) {
                    e = document.createEvent("MouseEvents");
                    e.initMouseEvent("click", true, true, window,
                        0, 0, 0, 0, 0, false, false, false,
                        false, 0, null);

                    lnk.dispatchEvent(e);
                } else if (lnk.fireEvent) {
                    lnk.fireEvent("onclick");
                }
            }
        }
    }
</script>

<style scoped>
    #qr {
        text-align: center;
        margin-top: 30px;
        margin-bottom: 30px;
    }
    #upload {
        text-align: center;
        margin-top: 30px;
        margin-bottom: 30px;
    }
    #headline {
        text-align: center;
    }
</style>