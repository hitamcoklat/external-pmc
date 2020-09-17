<template>
    <div style="width: 100%;">
        
        <v-card-title>
        Daftar Dokter <v-btn v-on:click="btnRefresh" style="margin-left: 1em;" outlined small><v-icon>mdi-refresh</v-icon></v-btn>
        <v-spacer></v-spacer>
        <v-text-field
            outlined
            v-model="search"
            append-icon="mdi-magnify"
            label="Pencarian nama dokter..."
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
                style="color: blue; border: 1px solid #CCC; border-radius: 5px; padding: 5px;"
                class="mr-2"
                @click="editItem(item)"
            >
                mdi-pencil
            </v-icon>
            <v-icon
                style="color: red; border: 1px solid #CCC; border-radius: 5px; padding: 5px;"
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
    

    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-dialog v-model="dialogRuangan" scrollable max-width="400px">
      <v-card>
        <v-card-title>Pilih Ruangan</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-treeview
                v-model="selection"
                :items="dataRuangan"
                :selection-type="selectionType"
                selectable
                return-object
                open-all
            >
                <template v-slot:label="{ item }">
                    {{ item.DESKRIPSI }}
                </template>
            </v-treeview>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="dialogRuangan = false">Tutup</v-btn>
          <v-btn color="blue darken-1" text @click="pilihRuangan">Pilih</v-btn>
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
        timeout: 0,
        overlay: false,
        search: '',
        coupon: 0,
        selection: [],
        selectionType: 'independent',
        dialogRuangan: false,
        headers: [
          { text: 'ID', value: 'ID' },
          { text: 'NIP', value: 'NIP' },
          { text: 'Nama Lengkap', value: 'NAMA' },
          { text: 'Jenis Kelamin', value: 'JENIS_KELAMIN' },
          { text: 'Alamat', value: 'ALAMAT' },
          { text: 'Profesi', value: 'PROFESI' },
          { text: 'Status', value: 'STATUS' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        dataListKelas: [],
        inputTarifKelasData: {},
        form: [],
        dataRow: [],
        dataRuangan: [],
        cariRuangan: '',
        snackbar: false,
      }
    },
    methods: {

        initialData() {
            this.formTotal = [];     
        },

        updateNamaRuangan() {
            if(this.cariRuangan.length > 3) {
                this.fetchRuanganByNama(this.cariRuangan)
            } else {
                this.fetchRuangan();
            }
        },

        pilihRuangan() {
            console.log(this.selection)
        },
        
        fetchData() {
            this.snackbar = true;
            // cek rekam medis exist
            this.$http.get(this.$apiUrl + '/dokter/get-all-dokter.php')
                .then((response) => {
                    if(response.data.status == true) {
                        this.snackbar = false;
                        this.dataRow = response.data.data;
                    } else {
                        alert('Terjadi kesalahan!');
                    }
                })        
        },

        fetchRuanganByNama(nama) {
            this.$http.get(this.$apiUrl + '/ruangan/search-ruangan.php?q=' + nama)
                .then((response) => {
                    this.snackbar = false;
                    if(response.data.status == true) {
                        this.dataRuangan = response.data.data;
                    } 
                })             
        },

        fetchRuangan() {
            this.snackbar = true;
            // cek rekam medis exist
            this.$http.get(this.$apiUrl + '/ruangan/get-all-ruangan.php')
                .then((response) => {
                    this.snackbar = false;
                    if(response.data.status == true) {
                        this.dataRuangan = response.data.data;
                    }
                })        
        },

        editItem() {
            this.dialogRuangan = true
            this.fetchRuangan()
        },

        btnClearInput() {
        },

        clickSamakanTarif: function() {
            this.isSamakanTarif = !this.isSamakanTarif
        },

        btnRefresh() {
            this.fetchData();
        },

    },
    created() {
        this.fetchData();
    }
  }
</script>