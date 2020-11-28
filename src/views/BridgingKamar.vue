<template>
    <div style="width: 100%;">
        
        <v-card-title>
        Data Kamar : Bridging BPJS
        <v-btn v-on:click="btnRefresh" style="margin-left: 1em;" outlined small><v-icon>mdi-refresh</v-icon></v-btn>
        <v-btn v-on:click="popUpKamar()" style="margin-left: 1em; background-color: #5EBA7D; color: white;" outlined small><v-icon>mdi-account-multiple-plus</v-icon></v-btn>
        <v-spacer></v-spacer>
        <v-text-field
            outlined
            v-model="search"
            append-icon="mdi-magnify"
            label="Pencarian nama kamar/ruangan..."
            single-line
            hide-details
        ></v-text-field>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="itemData"
            :search="search"
        >
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
                @click="removeRuangan(item)"
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
            persistent
            max-width="600px"
        >
            <v-card>
                <v-card-title>
                <span class="headline">Tambah Data Ruangan</span>
                </v-card-title>
                <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-select
                                v-model="form.namaKelas"
                                dense
                                :flat="true"
                                :items="itemReferensi"
                                item-text="namakelas"
                                item-value="kodekelas"
                                outlined
                                label="Nama Kelas"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field
                            v-model="form.kodeRuang"
                            label="Kode Ruang"
                            required
                            dense
                            outlined
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field
                            v-model="form.namaRuang"
                            label="Nama Ruang"
                            required
                            dense
                            outlined
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field
                            type="number"
                            v-model="form.kapasitas"
                            label="Kapasitas"
                            required
                            dense
                            outlined
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field
                            type="number"
                            v-model="form.tersedia"
                            label="Tersedia"
                            required
                            dense
                            outlined
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field
                            type="number"
                            v-model="form.tersediaPria"
                            label="Tersedia Pria"
                            required
                            dense
                            outlined
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field
                            type="number"
                            v-model="form.tersediaWania"
                            label="Tersedia Wanita"
                            required
                            dense
                            outlined
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field
                            v-model="form.tersediaPriaWanita"
                            type="number"
                            label="Tersedia Pria & Wanita"
                            required
                            dense
                            outlined
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="dialog = false"
                >
                    Tutup
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="simpan()"
                >
                    Simpan
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>        
    
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
        snackbar: false,
        timeout: 0,
        search: '',
        dialog: false,
        headers: [
          { text: 'Nama Kelas', value: 'namakelas' },
          { text: 'Nama Ruang', value: 'namaruang' },
          { text: 'Kapasitas', value: 'kapasitas' },
          { text: 'Tersedia', value: 'tersedia' },
          { text: 'Tersedia Pria', value: 'tersediapria' },
          { text: 'Tersedia Wanita', value: 'tersediawanita' },
          { text: 'Updated', value: 'lastupdate' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        itemData: [],
        itemReferensi: [],
        form: [],
        isUpdate: false
      }
    },
    methods: {

        simpan: function() {

            let dataKirim = {
                "kodekelas": this.form.namaKelas,
                "koderuang": this.form.kodeRuang, 
                "namaruang": this.form.namaRuang, 
                "kapasitas": this.form.kapasitas, 
                "tersedia": this.form.tersedia,
                "tersediapria": this.form.tersediaPria, 
                "tersediawanita": this.form.tersediaWanita, 
                "tersediapriawanita": this.form.tersediaPriaWanita
            }

            let url = (this.isUpdate == true) ? '/bpjs/update-ruangan.php' : '/bpjs/create-ruangan.php';

            this.$http.post(this.ipAddress + url, dataKirim)
                .then((response) => {
                    if(response.data.metadata.code == 1) {
                        this.dialog = false
                        this.fetchData()
                    } else {
                        alert("Terjadi kesalahan!")
                    }
                    this.isUpdate = false
                })
        },

        removeRuangan: function(item) {
            if(confirm('Apakah anda yakin ingin menghapus data ini?')) {
                let dataKirim = {
                    "kodekelas": item.kodekelas,
                    "koderuang": item.koderuang
                }
                this.$http.post(this.ipAddress + '/bpjs/remove-ruangan.php', dataKirim)
                    .then((response) => {
                        if(response.data.metadata.code == 1) {
                            alert(response.data.metadata.message)
                        } else {
                            alert("Terjadi kesalahan!")
                        }
                        this.fetchData()
                    })                 
            }
        },

        editItem: function(item) {
            this.dialog = true
            this.isUpdate = true
            this.form = {
                "namaKelas": item.kodekelas,
                "kodeRuang": item.koderuang, 
                "namaRuang": item.namaruang, 
                "kapasitas": item.kapasitas, 
                "tersedia": item.tersedia,
                "tersediaPria": item.tersediapria, 
                "tersediaWanita": item.tersediawanita, 
                "tersediaPriaWanita": item.tersediapriawanita 
            }
        },

        btnRefresh: function() {
            this.fetchData()
        },

        popUpKamar: function() {
            this.dialog = true
        },

        fetchData: function() {
            this.snackbar = true
            this.$http.get(this.ipAddress + '/bpjs/get-ketersediaan-kamar-rs.php')
                .then((response) => {
                    this.snackbar = false
                    if(response.data.metadata.message == "OK") {
                        this.itemData = response.data.response.list
                    } else {
                        alert("Tidak ada data!")
                    }
                })            
        },

        getReferensiKamar: function() {
            this.snackbar = true
            this.$http.get(this.ipAddress + '/bpjs/referensi-kamar.php')
                .then((response) => {
                    this.snackbar = false
                    if(response.data.metadata.message == "OK") {
                        this.itemReferensi = response.data.response.list
                    } else {
                        alert("Tidak ada data!")
                    }
                })             
        }

    },
    created() {
        this.ipAddress = 'http://' + localStorage.getItem("ip_address")
        this.fetchData();
        this.getReferensiKamar();
    },
    beforeCreate() {
    }
  }
</script>