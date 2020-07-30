<template>
<div>
  <form>
    <v-text-field
      v-model="norm"
      label="Nomor Rekam Medis Maksimal 11 Digit (00000000000)"
      required
      outlined
      style="width: 40%; margin-top: 20px;"
    ></v-text-field>
    <v-text-field
      v-model="name"
      class="ma-0 pa-0"
      label="Nama Lengkap"
      required
      single-line
      solo
    ></v-text-field>
    <v-text-field
      v-model="alamat"
      label="Masukan alamat..."
      required
      single-line
      solo
    ></v-text-field>    

    <v-btn class="mr-4" color="success" dark @click="submit">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
  <v-dialog
    v-model="dialog"
    max-width="290"
  >
    <v-card>
      <v-card-title class="headline">Info Sukses</v-card-title>

      <v-card-text>
        Pasien berhasil di input.
      </v-card-text>

    </v-card>
  </v-dialog>  
  <v-dialog
    v-model="dialogError"
    max-width="290"
  >
    <v-card>
      <v-card-title class="headline">Info</v-card-title>

      <v-card-text>
        Mohon isi semua kolom.
      </v-card-text>

    </v-card>
  </v-dialog>    
  <v-dialog
    v-model="alertRMExist"
    max-width="290"
  >
    <v-card>
      <v-card-title class="headline">Info</v-card-title>

      <v-card-text>
        Nomor Rekam ini medis telah digunakan!!!
      </v-card-text>

    </v-card>
  </v-dialog>      
    </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    validations: {
      name: { required, maxLength: maxLength(10) },
      norm: { required },
    },

    data: () => ({
      norm: '',
      name: '',
      alamat: '',
      alertRMExist: false,
      dialog: false,
      dialogError: false,
      events: ['dblclick', 'click'],
      // Note: The default value is true, but in case you want to activate / deactivate
      //       this directive dynamically use this attribute.
      isActive: true      
    }),

    computed: {
    },

    methods: {
      submit() {
        console.log(this.norm)
        // cek rekam medis exist
        this.$http.get(this.$apiUrl + '/cek-rekam-medis.php?norm=' + this.norm)
            .then((response) => {
              console.log(response)
              if(response.data.status == true) {
                this.alertRMExist = true;
                return false;
              } else {
                this.submitKirim();
                // return true;
              }
            })        
      },      
      submitKirim () {
        console.log('submit ditekan')
        if(this.norm == '' || this.name == '' || this.alamat == '') {
          this.dialogError = true;
          return false;
        }

        let data = {
            NORM: this.norm,
            NAMA: this.name,
            ALAMAT: this.alamat
        }
        
        this.$http.post(this.$apiUrl + '/insert-pasien.php', data)
            .then((response) => {
              console.log(response)
              if(response.data.status == true) {
                this.dialog = true;
                this.clear();
              }
            })
      },
      
      clear () {
        this.norm = ''
        this.name = ''
        this.alamat = ''
      },
    },
  }
</script>
