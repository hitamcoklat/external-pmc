<template>
    <div style="width: 100%;">
        <loading :active.sync="isLoading" 
        :can-cancel="false" 
        :loader="`bars`"
        :color="`#007BFF`"
        :height="130"
        :width="128"
        :is-full-page="true"></loading>        
        <h2 style="margin: 10px;">Laporan Inventori Obat</h2>
        <v-col cols="12" sm="12" md="12">
         
            <v-card
                style="padding: 1em;"
                class="mx-auto"
                outlined            
            >
                <!-- <v-col cols="12" sm="12">
                    <date-range-picker 
                        @update="updateValues"
                        v-model="dateRange"></date-range-picker>                   
                    <v-btn v-on:click="btnPilihTanggal" style="margin-left: 10px;" color="primary" medium>Pilih Tanggal</v-btn>                
                </v-col> -->
                <v-col cols="12" sm="12">
                    <v-select
                        v-model="selectedItem"
                        @change="pilihKategori"
                        style="width: 250px; float: left; margin-right: 10px;"
                        :items="items"
                        label="Pilih Kategori"
                        outlined
                    ></v-select>
<!--                     <v-btn style="margin-left: 0px;" v-on:click="btnTampilSemua" color="success" large>Tampil Semua</v-btn>   -->              
                    <v-btn style="margin-left: 10px; background-color: #E65D37; color: white;" v-on:click="btnExportPdf" x-large>Export PDF</v-btn>                     
                    <v-btn style="margin-left: 10px; background-color: #E5F8E7; color: black;" v-on:click="btnExportExcell" x-large>Export Excell</v-btn>                     
                </v-col>           
            </v-card>
      
        </v-col>
        <v-list style="margin-top: 2em;" three-line subheader fixed-header>          
            <vue-excel-editor v-model="dataRow" :page=100 autocomplete filter-row ref="grid">
                <vue-excel-column field="ID"   label="Kode Barang" />
                <vue-excel-column field="NAMA"   label="Nama Barang" />
                <vue-excel-column field="KATEGORI"  label="Kelompok Barang" />
                <!-- <vue-excel-column field="NAMA" label="Stok Minimum" /> -->
                <vue-excel-column field="STOK"    label="Jml. Stok" />
                <vue-excel-column field="SATUAN"  label="Satuan Jual Terkecil" />
                <vue-excel-column field="HARGA_BELI"  label="Harga Beli" />
                <vue-excel-column field="PERSEDIAAN"  label="Persediaan" />
            </vue-excel-editor>
        </v-list>  
        <v-snackbar
            :timeout="timeout"
            v-bind:right="true"
            v-bind:top="true"
            v-model="snackbar"
        >
         Sedang memperbaharui halaman...
        </v-snackbar>                       
    </div>    
</template>
<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import DateRangePicker from 'vue2-daterange-picker'
//you need to import the CSS manually (in case you want to override it)
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

export default {
    components: { 
        DateRangePicker,
        Loading 
    },
    data: () => ({
        timeout: 0,
        isLoading: false,
        snackbar: true,
        dateRange: {
          startDate: '2019-12-26',
          endDate: '2019-12-28',
        },
        items: ['GUDANG APOTEK', 'APOTEK RAWAT JALAN', 'APOTEK RAWAT INAP', 'TAMPILKAN SEMUA'],
        selectedItem: '',
        headers: [
          { text: 'Kode Barang', value: 'ID' },
          { text: 'Nama Barang', value: 'NAMA' },
          { text: 'Kelompok Barang', value: 'KATEGORI' },
          { text: 'Stok Minimum', value: 'NAMA' },
          { text: 'Jml. Stok', value: 'STOK' },
          { text: 'Satuan Jual Terkecil', value: 'SATUAN' },
          { text: 'Harga Beli', value: 'HARGA_BELI' },
          { text: 'Persediaan', value: 'PERSEDIAAN' },
        ],
        dataRow: [],
        search: '',        
    }),  
    methods: {
        btnPilihTanggal: function() {
            console.log(this.dateRange)
            this.snackbar = true;
            this.$http.get(this.$apiUrl + '/get_all_obat_by_date.php?startDate=' + this.dateRange.startDate + '&endDate=' + this.dateRange.endDate)
                .then((response) => {
                    this.snackbar = false;
                    this.dataRow = response.data.data
                })               
        },
        updateValues: function(e) {
            console.log(e)
        },
        btnTampilSemua: function() {
            this.fetchData()  
        },
        fetchData: function() {
            this.snackbar = true;
            this.$http.get(this.$apiUrl + '/get_all_obat.php')
                .then((response) => {
                    this.snackbar = false;
                    this.dataRow = response.data.data
                })             
        },
        pilihKategori: function() {
            console.log(this.selectedItem)
            if(this.selectedItem == 'TAMPILKAN SEMUA') {
                return this.fetchData();
            }
            this.isLoading = true;
            this.$http.get(this.$apiUrl + '/filter_obat.php?category=' + this.selectedItem)
                .then((response) => {
                    this.isLoading = false;
                    this.dataRow = response.data.data
                })               
        },
        btnExportExcell: function () {
            this.$refs.grid.exportTable('excell')
        },
        btnExportPdf: function() {
            const doc = new jsPDF()
            
            doc.autoTable({
                columnStyles: { europe: { halign: 'center' } }, // European countries centered
                body: this.dataRow,
                columns: [
                    { header: 'Kode Barang', dataKey: 'ID' },
                    { header: 'Nama Barang', dataKey: 'NAMA' },
                    { header: 'Kelompok Barang', dataKey: 'KATEGORI' },
                    { header: 'Jml. Stok', dataKey: 'STOK' },
                    { header: 'Sat. Jual Terkecil', dataKey: 'SATUAN' },
                    { header: 'Harga Beli', dataKey: 'HARGA_BELI' },
                    { header: 'Persediaan', dataKey: 'PERSEDIAAN' },
                ],
            })              

            doc.save('table.pdf')
        }
    },
    filters: {
      date(val) {
        return val ? val.toLocaleString() : ''
      }
    },
    created() {
        this.fetchData()
        // console.log(this.dataRow)
    }   
}
</script>