<template>
    <v-row no-gutters>
        <v-col cols="12" sm="12" md="12">
            <h1>Dashboard BPJS <v-icon @click="resetDisplay()" size="32" color="blue">mdi-refresh</v-icon></h1>
            <v-row no-gutters>
                <v-col cols="12" sm="12" md="12">
                    <v-alert
                        text
                        dense
                        color="teal"
                        icon="mdi-clock-fast"
                        border="left">
                        Silahkan klik pada nama ruangan untuk dapat memberi warna
                    </v-alert>                    
                </v-col>
            </v-row>
            <v-row style="margin-bottom: 1em;" v-if="clickPilihWarna" no-gutters>
                <v-col cols="12" sm="12" md="12">
                    Pilih Warna Untuk <span style="font-weight: bold;">
                        {{selectedItem.namaruang}} : </span>
                    <v-btn @click="setWarna('#01AFF1')" color="#01AFF1" style="margin-left: 5px;" elevation="2">V I P</v-btn>         
                    <v-btn @click="setWarna('#92D14F')" color="#92D14F" style="margin-left: 1em;" elevation="2">KELAS 1</v-btn>   
                    <v-btn @click="setWarna('#FEC000')" color="#FEC000" style="margin-left: 1em;" elevation="2">KELAS 2</v-btn>   
                    <v-btn @click="setWarna('#FE32CA')" color="#FE32CA" style="margin-left: 1em;" elevation="2">KELAS 3</v-btn>   
                </v-col>
            </v-row>      
            <v-row id="dashboard" no-gutters>
                <v-col cols="3">
                    <v-row v-for="(item, index) in itemSatu" :key="`satu-${index}`" style="border: 1px solid black;" class="mt-1 ml-1" no-gutters>
                        <v-col @click="pilihWarna(item, index, 'itemSatu')" md="8" :style="{ backgroundColor: itemWarna[item.koderuang], textAlign: 'center', fontSize: '1.7em', cursor: 'pointer' }" class="text-center">{{item.namaruang}}</v-col>
                        <v-col md="4" style="background-color: #5C5859; text-align: center; font-size: 1.7em; color: white;">{{item.tersedia}}</v-col>
                    </v-row>
                </v-col>
                <v-col cols="3">
                    <v-row v-for="(item, index) in itemDua" :key="`dua-${index}`" style="border: 1px solid black;" class="mt-1 ml-1" no-gutters>
                        <v-col @click="pilihWarna(item, index, 'itemDua')" md="8" :style="{ backgroundColor: itemWarna[item.koderuang], textAlign: 'center', fontSize: '1.7em', cursor: 'pointer' }">{{item.namaruang}}</v-col>
                        <v-col md="4" style="background-color: #5C5859; text-align: center; font-size: 1.7em; color: white;">{{item.tersedia}}</v-col>
                    </v-row>
                </v-col>
                <v-col cols="3">
                    <v-row v-for="(item, index) in itemTiga" :key="`dua-${index}`" style="border: 1px solid black;" class="mt-1 ml-1" no-gutters>
                        <v-col @click="pilihWarna(item, index, 'itemTiga')" md="8" :style="{ backgroundColor: itemWarna[item.koderuang], textAlign: 'center', fontSize: '1.7em', cursor: 'pointer' }">{{item.namaruang}}</v-col>
                        <v-col md="4" style="background-color: #5C5859; text-align: center; font-size: 1.7em; color: white;">{{item.tersedia}}</v-col>
                    </v-row>
                </v-col>
                <v-col cols="3" class="justify-content-space-between">
                    <v-row v-for="(item, index) in itemEmpat" :key="`dua-${index}`" style="border: 1px solid black;" class="mt-1 ml-1" no-gutters>
                        <v-col @click="pilihWarna(item, index, 'itemEmpat')" md="8" :style="{ backgroundColor: itemWarna[item.koderuang], textAlign: 'center', fontSize: '1.7em', cursor: 'pointer' }">{{item.namaruang}}</v-col>
                        <v-col md="4" style="background-color: #5C5859; text-align: center; font-size: 1.3em; color: white;">{{item.tersedia}}</v-col>
                    </v-row>
                </v-col>
            </v-row>
<!--             <v-row no-gutters>
                <v-col cols="12" sm="12" md="12">
                    <v-btn @click="simpanWarna()" style="margin-top: 1em;" elevation="2" color="light-blue darken-2" block>
                        <v-icon color="white">mdi-refresh</v-icon> Simpan Warna</v-btn>
                </v-col>
            </v-row> -->
            <v-row class="mt-5" no-gutters>
                <v-col md="12" style="background-color: #FFF; border: 1px solid #5C5859; text-align: center; font-size: 2em;">
                    Jam <digital-clock :blink="true" :displaySeconds="true" /> | Tanggal : {{tanggal}}
                </v-col>
            </v-row>            
        </v-col>
        <v-snackbar
            :timeout="timeout"
            v-bind:right="true"
            v-bind:top="true"
            v-model="snackbar"
        >
         Sedang memperbaharui halaman...
        </v-snackbar>                 
    </v-row>
</template>
<style scoped>
</style>
<script>
import DigitalClock from "vue-digital-clock";

export default {
    data() {
        return {
            snackbar: false,
            timeout: 0,            
            itemData: [],
            itemReferensi: [],
            itemSatu: [],
            itemDua: [],
            itemTiga: [],
            itemEmpat: [],
            time: '',
            tanggal: '',
            warnaBox: [],
            selectedItem: [],
            itemBlock: '',
            indexItem: 0,
            clickPilihWarna: false,
            itemWarna: {}
        }
    },
    components: {
        DigitalClock
    },    
    watch: {
        getItemSatu() {
            this.fetchData()
        }
    },
    methods: {

        getDate: function() {
            var week = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
            var bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
            let cd = new Date();
            this.tanggal =  week[cd.getDay()] + ' ' +  this.zeroPadding(cd.getDate(), 2) + ' ' + bulan[cd.getMonth()] + ' ' + this.zeroPadding(cd.getFullYear(), 4);
        },

        zeroPadding: function(num, digit) {
            var zero = '';
            for(var i = 0; i < digit; i++) {
                zero += '0';
            }
            return (zero + num).slice(-digit);            
        },

        simpanWarna: function() {
            let finalData = JSON.parse(JSON.stringify(this.itemWarna));
            localStorage.setItem("dataItem", JSON.stringify(finalData))

            // read data Item
            let dataLocal = JSON.parse(localStorage.getItem("dataItem"))
        },

        pilihWarna: function(item, index, itemBlock) {
            this.clickPilihWarna = true
            this.selectedItem = item
            this.itemBlock = itemBlock
            this.indexItem = index
        },

        resetDisplay: function() {
            this.itemWarna = {}
            this.itemSatu = []
            this.itemDua = []
            this.itemTiga = []
            this.itemEmpat = []
            localStorage.removeItem("dataItem");
            this.fetchData()
        },

        setWarna: function(warna) {
            this.itemWarna[this.selectedItem.koderuang] = warna
            this.simpanWarna()
            this.getDataFromLocal()
        },

        getDataFromLocal: function() {
            let dataLocal = JSON.parse(localStorage.getItem("dataItem"))
            this.itemWarna = dataLocal
            console.log(this.itemWarna)
        },

        fetchData: function() {
            let data = []
            this.snackbar = true
            this.$http.get(this.ipAddress + '/bpjs/get-ketersediaan-kamar-rs.php')
                .then((response) => {
                    this.snackbar = false
                    if(response.data.metadata.message == "OK") {
                        data = response.data.response.list
                        this.itemData = response.data.response.list

                        data.map((item, index) => {
                            if(index <= 10) {
                                this.itemSatu.push(item)
                            }
                            if(index >= 11 && index <= 21) {
                                this.itemDua.push(item)
                            }
                            if(index >= 22 && index <= 28) {
                                this.itemTiga.push(item)
                            }
                            if(index >= 29 && index <= 35) {
                                this.itemEmpat.push(item)
                            }
                        })

                        this.itemEmpat.push(
                            {
                                namaruang: '-',
                                koderuang: 'INFO-',
                                warna: '#FFF',
                                tersedia: '-'
                            },
                            {
                                namaruang: 'VIP',
                                koderuang: 'INFOVIP',
                                warna: '#01AFF1',
                                tersedia: 'VIP'
                            },
                            {
                                namaruang: 'KELAS1',
                                koderuang: 'INFOKELAS1',
                                warna: '#92D14F',
                                tersedia: 'KELAS 1'
                            },
                            {
                                namaruang: 'KELAS2',
                                koderuang: 'INFOKELAS2',
                                warna: '#FEC000',
                                tersedia: 'KELAS 2'
                            },
                            {
                                namaruang: 'KELAS3',
                                koderuang: 'INFOKELAS3',
                                warna: '#FE32CA',
                                tersedia: 'KELAS 3'
                            },
                        )         
                        this.itemWarna['INFO-'] = '#FFF'                 
                        this.itemWarna['INFOVIP'] = '#01AFF1'                 
                        this.itemWarna['INFOKELAS1'] = '#92D14F'                 
                        this.itemWarna['INFOKELAS2'] = '#FEC000'                 
                        this.itemWarna['INFOKELAS3'] = '#FE32CA'                        

                    } else {
                        alert("Tidak ada data!")
                    }
                })
                
            console.log(this.itemWarna)
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
        },        

    },
    created() {
        this.ipAddress = 'http://' + localStorage.getItem("ip_address")
        if(localStorage.getItem("dataItem") !== null) {
            this.getDataFromLocal()
            this.fetchData();
        } else {
            this.fetchData();
        }
        this.getReferensiKamar();
        this.getDate();
        setInterval(() => { 
            try {
                this.itemSatu = []
                this.itemDua = []
                this.itemTiga = []
                this.itemEmpat = []                
                this.fetchData()                
            } catch (error) {
                throw error
            }
        }, 30000); // setiap 30 detik
    },
    beforeCreate() {
    }    
}
</script>