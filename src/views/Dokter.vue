<template>
    <div style="width: 100%;">
        
        <v-card-title>
        Daftar Dokter 
        <v-btn v-on:click="btnRefresh" style="margin-left: 1em;" outlined small><v-icon>mdi-refresh</v-icon></v-btn>
        <v-btn v-on:click="popUpAddDokter()" style="margin-left: 1em; background-color: #5EBA7D; color: white;" outlined small><v-icon>mdi-account-multiple-plus</v-icon></v-btn>
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
                @click="disablePegawai(item)"
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
                selection-type="independent"
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
    <v-dialog v-model="dialogAddDokter" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Input Pegawai</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="nip" label="*NIP" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="gelarDepan" label="Gelar Depan" hint="Masukan Gelar Depan"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="nama"
                  label="Nama"
                  hint="Masukan Nama Tanpa Gelar"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="gelarBelakang"
                  label="Nama Belakang"
                  hint="Masukan Gelar Belakang"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  item-text="DESKRIPSI"
                  item-value="ID"
                  v-model="modelJenisKelamin"
                  :items="itemJenisKelamin"
                  label="Jenis Kelamin"
                >                 
                </v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      label="Tanggal Lahir"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col> 
              <v-col cols="12" sm="6" md="4">
                <v-autocomplete
                  item-text="DESKRIPSI"
                  item-value="DESKRIPSI"                
                  v-model="modelTempatLahir"
                  :items="itemTempatLahir"
                  label="Tempat Lahir"
                ></v-autocomplete>
              </v-col>                          
              <v-col cols="12" sm="6" md="4">
                <v-select
                  item-text="DESKRIPSI"
                  item-value="ID"                
                  v-model="modelAgama"
                  :items="itemAgama"
                  label="Agama"
                >                 
                </v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  item-text="DESKRIPSI"
                  item-value="ID"                
                  v-model="modelProfesi"
                  :items="itemProfesi"
                  label="Jenis Profesi"
                >                 
                </v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  item-text="DESKRIPSI"
                  item-value="ID"                
                  v-model="modelSMF"
                  :items="itemSMF"
                  label="Pilih SMF"
                >                 
                </v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogAddDokter = false">Tutup</v-btn>
          <v-btn color="blue darken-1" text @click="simpanPegawai">Simpan</v-btn>
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
        dialogAddDokter: false,
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
        selectedRuangan: [],
        selectedPegawai: [],
        cariRuangan: '',
        snackbar: false,
        itemJenisKelamin: [],
        modelJenisKelamin: [],
        date: new Date().toISOString().substr(0, 7),
        menu: false,
        itemTempatLahir: [],
        modelTempatLahir: [],
        itemAgama: [],
        modelAgama: [],
        itemProfesi: [],
        modelProfesi: [],
        itemSMF: [],
        modelSMF: [],
        gelarDepan: '',
        nama: '',
        gelarBelakang: '',
        nip: ''
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

            var idRuangan = []
            this.selection.forEach(element => {
                idRuangan.push(element.ID)
            });

            var dataKirim = {
                ID_RUANGAN: idRuangan,
                DATA_DOKTER: this.selectedPegawai
            }

            // update Ruangan Dokter
            this.$http.post(this.$apiUrl + '/dokter/input-dokter-ruangan.php', dataKirim)
                .then((response) => {
                    console.log(response)
                })

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

        editItem(item) {
            this.selectedPegawai = item;
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

        popUpAddDokter() {
          this.dialogAddDokter = true;
          this.fetchJenisKelamin();
          this.fetchTempatLahir();
          this.fetchAgama();
          this.fetchProfesi();
          this.fetchSMF();
        },

        disablePegawai(item) {
          console.log(item)
          this.$swal({
            title: 'Apakah anda yakin ingin me-non aktifkan pegawai ini?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Ya`,
            denyButtonText: `Tidak`,
          }).then((result) => {
            if(result.isConfirmed) {
              this.$http.post(this.$apiUrl + '/pegawai/disable-pegawai.php', {id: item.ID})
                .then((response) => {
                  console.log(response)
                })
              this.$swal('Updated!', '', 'success')
            }
          })
          this.fetchData()
        },

        simpanPegawai() {

          let dataKirim = {
            TEMPAT_LAHIR: this.modelTempatLahir,
            TGL_LAHIR: this.date,
            JENIS_KELAMIN: this.modelJenisKelamin,
            AGAMA: this.modelAgama,
            PROFESI: this.modelProfesi,
            SMF: this.modelSMF,
            NAMA: this.nama,
            GELAR_DEPAN: this.gelarDepan,
            GELAR_BLKNG: this.gelarBelakang,
            NIP: this.nip
          }

          this.$http.post(this.$apiUrl + '/pegawai/input-pegawai.php', dataKirim)
              .then((response) => {
                this.dialogAddDokter = false
                if(response.data.status == true) {
                  this.$swal({
                    icon: 'success',
                    text: 'Pegawai berhasil di input!',
                  });
                } else {
                  this.$swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Terjadi kesalahan!',
                  });                  
                }
              })
          
        },

        fetchTempatLahir() {
          this.$http.get(this.$apiUrl + '/wilayah/get-all-wilayah.php')
              .then((response) => {
                this.itemTempatLahir = response.data.data
              })
        },

        fetchAgama() {
          this.$http.get(this.$apiUrl + '/get-referensi.php?jenis=1')
              .then((response) => {
                this.itemAgama = response.data.data
              })
        },

        fetchSMF() {
          this.$http.get(this.$apiUrl + '/get-referensi.php?jenis=26')
              .then((response) => {
                this.itemSMF = response.data.data
              })
        },

        fetchProfesi() {
          this.$http.get(this.$apiUrl + '/get-referensi.php?jenis=36')
              .then((response) => {
                this.itemProfesi = response.data.data
              })
        },
        
        fetchJenisKelamin() {
          this.$http.get(this.$apiUrl + '/get-referensi.php?jenis=2')
              .then((response) => {
                this.itemJenisKelamin = response.data.data
              })             
        }

    },
    created() {
        this.fetchData();
    }
  }
</script>