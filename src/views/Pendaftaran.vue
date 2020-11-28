<template>
<div>
  <v-row no-gutters>
    <v-col md="4" sm="4">
      <form>
        <v-text-field
          v-model="norm"
          label="Nomor Rekam Medis Maksimal 11 Digit (00000000000)"
          required
          outlined
          dense
          style="width: 60%; margin-top: 20px;"
        ></v-text-field>
        <v-text-field
          v-model="name"
          class="ma-0 pa-0"
          label="Nama Lengkap"
          required
          single-line
          outlined
          dense
        ></v-text-field>
        <v-text-field
          v-model="alamat"
          label="Masukan alamat..."
          required
          dense
          outlined
        ></v-text-field>    

        <v-btn class="mr-4" color="success" dark @click="submit">submit</v-btn>
        <v-btn @click="clear">clear</v-btn>
      </form>      
    </v-col>
    <v-col style="padding: 1em;" md="6" sm="6">    
      <v-data-table
            :headers="headers"
            :items="itemPasien"
            item-key="name"
            class="elevation-1"
            :search="search"
            :loading="progressLoading"
            loading-text="Loading... Please wait"            
          >
        <template v-slot:top>
          <v-text-field
            v-model="search"
            label="Pencarian pasien..."
            class="mx-4"
          ></v-text-field>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon
                small
                style="color: blue; border: 1px solid #CCC; border-radius: 5px; padding: 5px;"
                class="mr-2"
                @click="editItem(item)"
            >
                mdi-pencil
            </v-icon>
            <v-icon
                style="color: red; border: 1px solid #CCC; border-radius: 5px; padding: 5px;"
                small
                @click="hapusPasien(item)"
            >
                mdi-delete
            </v-icon>
        </template>          
      </v-data-table>      
    </v-col>    
  </v-row>
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
      isActive: true,   
      progressLoading: false,   
      search: '',
      calories: '',
      itemPasien: [],
      headers: [
        { text: 'ID', value: 'NORM' },
        { text: 'NAMA LENGKAP', value: 'NAMA' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],      
    }),

    computed: {

    },

    methods: {
      submit() {
        console.log(this.norm)
        // cek rekam medis exist
        this.$http.get(this.ipAddress + '/cek-rekam-medis.php?norm=' + this.norm)
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

      editItem: function(item) {
        this.$router.push({ name: 'EditPasien', params: { item: item } })
      },

      hapusPasien: function(item) {
        console.log(item)
        if(confirm('Apakah anda yakin ingin menghapus pasien ini?')) {
          this.$http.get(this.ipAddress + '/pasien/remove-pasien.php?norm=' + item.NORM)
              .then((response) => {
                if(response.data.status == true) {
                  alert('Pasien berhasil dihapus!')
                  this.getAllPasien()
                } else {
                  alert('Terjadi kesalahan!')
                }
              })          
        }
      },

      getAllPasien: function() {
        this.progressLoading = true
        this.$http.get(this.ipAddress + '/pasien/get-all-pasien.php')
            .then((response) => {
              console.log(response)
              this.itemPasien = response.data.data
            })
            .then(() => {
              this.progressLoading = false
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
        
        this.$http.post(this.ipAddress + '/insert-pasien.php', data)
            .then((response) => {
              console.log(response)
              if(response.data.status == true) {
                this.dialog = true;
                this.clear();
              }
            })

        setTimeout(() => {
          this.getAllPasien()
        }, 1500);
      },
      
      clear () {
        this.norm = ''
        this.name = ''
        this.alamat = ''
      },
    },
    created() {
      this.ipAddress = 'http://' + localStorage.getItem("ip_address")
      this.getAllPasien()
    }
  }
</script>
