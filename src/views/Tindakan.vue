<template>
    <div style="width: 100%;">
        
        <v-col cols="12" sm="12" md="12">
            <v-alert
                :value="alertSukses"
                dense
                text
                type="success"
                transition="scale-transition"
            >
                <strong>Sukses</strong>, Nama Tindakan berhasil di input!
            </v-alert>            
            <v-card
                style="padding: 1em;"
                class="mx-auto"
                outlined            
            >
                <v-text-field
                    v-model="namaTindakan"
                    label="Masukan Nama Tindakan Baru"
                    placeholder="Masukan nama tindakan baru disini..."
                    outlined
                ></v-text-field>
                <v-btn v-if="isUpdate == false" v-on:click="btnSubmit" color="primary" large>Submit Tindakan</v-btn>                
                <v-btn style="margin-left: 1em;" v-if="isUpdate == false" v-on:click="btnClearInput" color="default" large>Reset</v-btn>                
                <v-btn v-if="isUpdate == true" v-on:click="btnUpdate" color="success" outlined large>Update Tindakan</v-btn>                
            </v-card>
        </v-col>        
        <v-card-title>
        Daftar Tindakan <v-btn v-on:click="btnRefresh" style="margin-left: 1em;" outlined small><v-icon>mdi-refresh</v-icon></v-btn>
        <v-spacer></v-spacer>
        <v-text-field
            outlined
            v-model="search"
            append-icon="mdi-magnify"
            label="Pencarian nama tindakan..."
            single-line
            hide-details
        ></v-text-field>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="dataRow"
            :search="search"
        >
        <template v-slot:item.actions="{ item }">
            <v-icon
                small
                style="color: blue;"
                class="mr-2"
                @click="editItem(item)"
            >
                mdi-pencil
            </v-icon>
            <v-icon
                style="color: red;"
                small
                @click="deleteItem(item)"
            >
                mdi-delete
            </v-icon>
        </template>        
        </v-data-table>
        <v-snackbar
            :timeout="timeout"
            v-bind:right="true"
            v-bind:top="true"
            v-model="snackbar"
        >
         Sedang memperbaharui halaman...
        </v-snackbar> 

        <v-dialog
        v-model="dialog"
        max-width="500"
        >
        <v-card>
            <v-card-title style="text-align: center;" class="headline">Edit Tindakan - {{namaTindakan}}</v-card-title>

            <center>
                <v-card-text>
                    <v-btn @click="editNamaTindakan()" small color="primary">Edit</v-btn>
                    <v-btn @click="editInputTarif()" style="margin-left: 1em;" small color="success">Input Tarif</v-btn>
                </v-card-text>
            </center>

        </v-card>
        </v-dialog>     


    <v-dialog v-model="dialogInputTarif" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialogInputTarif = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title><strong>Input Tarif</strong>  {{namaTindakan}} [{{idTindakan}}]</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn color="red" v-if="dataExists == true" dark text @click="hapusTarifKelas">Hapus Data</v-btn>         
            <v-btn dark text @click="inputTarifKelas">{{textSimpan}}</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list style="margin-top: 2em;" three-line subheader fixed-header>          
            <v-simple-table dense>
                <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">Kelas</th>
                        <th class="text-left">Administrasi</th>
                        <th class="text-left">Sarana</th>
                        <th class="text-left">B H P</th>
                        <th class="text-left">Dokter Operator</th>
                        <th class="text-left">Dokter Anastesi</th>
                        <th class="text-left">Dokter Lainnya</th>
                        <th class="text-left">Penata Anastesi</th>
                        <th class="text-left">Paramedis</th>
                        <th class="text-left">Non Medis</th>
                        <th class="text-left">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in dataListKelas" :key="item.ID">
                        <td style="width: 100px;">{{item.DESKRIPSI}} {{item.ID}}</td>
                        <td><v-text-field solo v-model="formAdmin[item.ID]" dense outlined></v-text-field></td>
                        <td><v-text-field v-model="formSarana[item.ID]" solo dense outlined></v-text-field></td>
                        <td><v-text-field v-model="formBHP[item.ID]" dense solo outlined></v-text-field></td>
                        <td><v-text-field v-model="formDokterOperator[item.ID]" dense solo outlined></v-text-field></td>
                        <td><v-text-field v-model="formDokterAnastesis[item.ID]" dense solo outlined></v-text-field></td>
                        <td><v-text-field v-model="formDokterLainnya[item.ID]" dense solo outlined></v-text-field></td>
                        <td><v-text-field v-model="formPenataAnastesis[item.ID]" dense solo outlined></v-text-field></td>
                        <td><v-text-field v-model="formParamedis[item.ID]" dense solo outlined></v-text-field></td>
                        <td><v-text-field v-model="formNonMedis[item.ID]" dense solo outlined></v-text-field></td>
                        <td><v-text-field v-model="formTotal[item.ID]" disabled dense solo outlined></v-text-field></td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
        </v-list>
      </v-card>
    </v-dialog>

    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    </div>

</template>
<style scoped>
    tbody tr td, thead tr th {
        margin-top: 0 !important;
        padding-bottom: 0 !important;
        text-align: center;
    }
</style>
<script>
  export default {
    data () {
      return {
        timeout: 0,
        overlay: false,
        dialog: false,
        dialogInputTarif: false,
        notifications: false,
        sound: true,
        widgets: false,        
        alertSukses: false,
        snackbar: true,
        namaTindakan: "",
        idTindakan: "",
        textSimpan: "SIMPAN",
        search: '',
        coupon: 0,
        headers: [
          { text: 'ID', value: 'ID' },
          { text: 'NAMA TINDAKAN', value: 'NAMA' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        dataListKelas: [],
        inputTarifKelasData: {},
        form: [],
        formAdmin: [],
        formSarana: [],
        formBHP: [],
        formDokterOperator: [],
        formDokterAnastesis: [],
        formDokterLainnya: [],
        formPenataAnastesis: [],
        formParamedis: [],
        formNonMedis: [],
        formTglSK: [],
        formNoSK: [],
        formTotal: [],
        dataRow: [],
        isUpdate: false,
        dataExists: false,
        isSamakanTarif: false
      }
    },
    methods: {

        initialData() {
            this.formAdmin = [];
            this.formSarana = [];
            this.formBHP = [];
            this.formDokterOperator = [];
            this.formDokterAnastesis = [];
            this.formParamedis = [];
            this.formNonMedis = [];
            this.formDokterLainnya = [];
            this.formPenataAnastesis = [];
            this.formTotal = [];
            // this.formTglSK = [];
            // this.formNoSK = [];            
        },
        
      fetchData() {
        this.snackbar = true;
        // cek rekam medis exist
        this.$http.get(this.$apiUrl + '/get-tindakan.php')
            .then((response) => {
                if(response.data.status == true) {
                    this.snackbar = false;
                    this.dataRow = response.data.data;
                } else {
                    alert('Terjadi kesalahan!');
                }
            })        
      },

      btnClearInput() {
          this.namaTindakan = "";
      },

      onChangeHandle: function() {
          let dataKelas = this.dataListKelas;

        //   if(this.isSamakanTarif == true) {
              dataKelas.forEach((item, index) => {
              this.formAdmin[item.ID] = this.formAdmin[0]
            })              
        //   }
      },

      clickSamakanTarif: function() {
          this.isSamakanTarif = !this.isSamakanTarif
      },

      fetchDataKelas() {
        console.log(this.dataExists)
        this.overlay = true;
        this.$http.get(this.$apiUrl + '/get-list-kelas-tindakan.php')
            .then((response) => {
                if(response.data.status == true) {
                    this.overlay = false;
                    this.dataListKelas = response.data.data;
                    console.log(this.dataListKelas)
                    if(this.dataExists == false) {
                        this.dataListKelas.forEach((item, index) => {
                            this.formAdmin[item.ID] = 0;
                            this.formSarana[item.ID] = 0;
                            this.formBHP[item.ID] = 0;
                            this.formDokterOperator[item.ID] = 0;
                            this.formDokterAnastesis[item.ID] = 0;
                            this.formParamedis[item.ID] = 0;
                            this.formNonMedis[item.ID] = 0;
                            this.formDokterLainnya[item.ID] = 0;
                            this.formPenataAnastesis[item.ID] = 0;
                            this.formTotal[item.ID] = 0;                                                       
                        })
                    }
                }
            }) 
      },

      editInputTarif() {
          this.dialog = false;
          this.dialogInputTarif = true;
          this.initialData();
          this.fetchTarifTindakanByIdTindakan(this.idTindakan);
          this.fetchDataKelas();
      },

      inputTarifKelas() {
          
          let arrayListKelas = this.dataListKelas;

            let data = {
                ADMINISTRASI: this.formAdmin,
                SARANA: this.formSarana,
                BHP: this.formBHP,
                DOKTER_OPERATOR: this.formDokterOperator,
                DOKTER_ANASTESIS: this.formDokterAnastesis,
                DOKTER_LAINNYA: this.formDokterLainnya,
                PENATA_ANASTESIS: this.formPenataAnastesis,
                PARAMEDIS: this.formParamedis,
                NON_MEDIS: this.formNonMedis
            }

            this.$http.post(this.$apiUrl + '/input-tarif-kelas-tindakan.php?id_tindakan=' + this.idTindakan, data)
                .then((response) => {
                    if(response.data.jmlData > 0) {
                        alert('Data berhasil ditambahkan');
                        this.fetchTarifTindakanByIdTindakan(this.idTindakan)
                    }
                })

      },

      hapusTarifKelas() {
          if(confirm('Apakah anda yakin ingin menghapus data?')) {
            this.$http.get(this.$apiUrl + '/input-tarif-kelas-tindakan.php?remove=true&id=' + this.idTindakan)
                .then((response) => {
                    this.fetchTarifTindakanByIdTindakan(this.idTindakan)
                }) 
          }
      },

      fetchTarifTindakanByIdTindakan(id) {
        this.$http.get(this.$apiUrl + '/read-tarif-tindakan.php?id_tindakan=' + id)
            .then((response) => {
                if(response.data.status == true) {
                    let { data } = response.data;
                    this.formAdmin = data.formAdmin;
                    this.formSarana = data.formSarana;
                    this.formBHP = data.formBHP;
                    this.formDokterOperator = data.formDokterOperator;
                    this.formDokterAnastesis = data.formDokterAnastesis;
                    this.formParamedis = data.formParamedis;
                    this.formNonMedis = data.formNonMedis;
                    this.formDokterLainnya = data.formDokterLainnya;
                    this.formPenataAnastesis = data.formPenataAnastesis;
                    this.formTotal = data.formTotal;
                    this.dataExists = true;
                } else {
                    this.dataExists = false;
                    this.fetchDataKelas();
                    // this.initialData();
                }
            }) 
      },
      
      btnRefresh() {
          this.fetchData();
      },

      btnSubmit() {
        if(this.namaTindakan == '') {
            alert("Nama tindakan belum diisi!");
            return false;
        }

        let data = {
            NAMA: this.namaTindakan,
        }    
        
        this.$http.post(this.$apiUrl + '/insert-tindakan.php', data)
            .then((response) => {
              if(response.data.status == true) {
                this.alertSukses = true,
                setTimeout(() => {
                    this.alertSukses = false;
                    this.namaTindakan = "";
                    this.fetchData();
                }, 2000);                
              }
            })
      },

      btnUpdate() {
        let data = {
            NAMA: this.namaTindakan,
            ID: this.idTindakan
        }    
        
        this.$http.post(this.$apiUrl + '/insert-tindakan.php?update=true', data)
            .then((response) => {
              if(response.data.status == true) {
                this.alertSukses = true,
                setTimeout(() => {
                    this.alertSukses = false;
                    this.namaTindakan = "";
                    this.isUpdate = false;
                    this.fetchData();
                }, 2000);                
              }
            })          
      },

      editItem(item) {
          this.namaTindakan = item.NAMA;
          this.idTindakan = item.ID;
          this.dialog = true;
      },

      editNamaTindakan() {
          window.scrollTo(0,0);
          this.dialog = false;
          this.isUpdate = true;
          console.log('masuk ke edit')
      },

      deleteItem (item) {
        if(confirm('Apakah anda yakin ingin menghapus tindakan ini?')) {
            this.$http.get(this.$apiUrl + '/insert-tindakan.php?remove=true&id=' + item.ID)
                .then((response) => {                
                    this.fetchData();
                })
        }           
      },

    },
    created() {
        this.fetchData();
    }
  }
</script>