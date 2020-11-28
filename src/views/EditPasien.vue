<template>
<div>
    <v-row style="margin-bottom: 1em;">
        <v-btn @click="$router.push('pendaftaran')" depressed color="primary">Kembali</v-btn>            
        <v-btn @click="submit()" style="margin-left: 1em;" depressed color="success">Update Data</v-btn>            
    </v-row>
    <v-row v-if="statusUpdateBerhasil">
        <v-alert
        dense
        text
        type="success"
        >
        <strong>Pasien</strong> berhasil di edit.
        </v-alert>          
    </v-row>  
    <v-row>
        <v-col md="4" sm="4">
            <v-row>
                <v-text-field
                    v-model="norm"
                    label="Nomor Rekam Medis"
                    outlined
                    dense
                    required
                ></v-text-field>                
            </v-row> 
            <v-row>
                <v-text-field
                    v-model="nama"
                    label="Nama Pasien"
                    outlined
                    dense
                    required
                ></v-text-field>                
            </v-row> 
            <v-row>
                <v-text-field
                    v-model="panggilan"
                    label="Panggilan"
                    outlined
                    dense
                    required
                ></v-text-field>                
            </v-row> 
            <v-row>
                <v-text-field
                    v-model="gelarDepan"
                    label="Gelar Depan"
                    outlined
                    dense
                    required
                ></v-text-field>                
            </v-row>             
            <v-row>
                <v-text-field
                    v-model="gelarBelakang"
                    label="Gelar Belakang"
                    outlined
                    dense
                    required
                ></v-text-field>                
            </v-row>   
            <v-row>
                <v-text-field
                    v-model="tempatLahir"
                    label="Tempat lahir"
                    outlined
                    dense
                    required
                ></v-text-field>                
            </v-row>                   
            <v-row>
                <v-text-field
                    v-model="tanggalLahir"
                    label="Tanggal Lahir"
                    outlined
                    dense
                    required
                ></v-text-field>                
            </v-row>                 
            <v-row>
                <v-text-field
                    v-model="jenisKelamin"
                    label="Jenis Kelamin"
                    outlined
                    dense
                    required
                ></v-text-field>                
            </v-row>             
            <v-row>
                <v-text-field
                    v-model="alamat"
                    label="Alamat"
                    outlined
                    dense
                    required
                ></v-text-field>                
            </v-row>             
            <v-row>
                <v-text-field
                    v-model="rt"
                    label="RT"
                    outlined
                    dense
                    required
                ></v-text-field>                
            </v-row>             
            <v-row>
                <v-text-field
                    v-model="rw"
                    label="RW"
                    outlined
                    dense
                    required
                ></v-text-field>                
            </v-row>             
        </v-col>
        <v-col style="margin-left: 2em;" md="4" sm="4">
            <v-row>
                <v-text-field
                    v-model="kodePos"
                    label="Kode Pos"
                    outlined
                    dense
                    required
                ></v-text-field>                
            </v-row>
            <v-row>
                <v-text-field
                    v-model="wilayah"
                    label="Wilayah"
                    outlined
                    dense
                    required
                ></v-text-field>                
            </v-row>            
            <v-row>
                <v-text-field
                    v-model="agama"
                    label="Agama"
                    outlined
                    dense
                    required
                ></v-text-field>                
            </v-row>
            <v-row>
                <v-text-field
                    v-model="pendidikan"
                    label="Pendidikan"
                    outlined
                    dense
                    required
                ></v-text-field>                
            </v-row>
            <v-row>
                <v-text-field
                    v-model="pekerjaan"
                    label="Pekerjaan"
                    outlined
                    dense
                    required
                ></v-text-field>                
            </v-row>
            <v-row>
                <v-text-field
                    v-model="statusPerkawinan"
                    label="Status Perkawinan"
                    outlined
                    dense
                    required
                ></v-text-field>                
            </v-row>
            <v-row>
                <v-text-field
                    v-model="golonganDarah"
                    label="Golongan Darah"
                    outlined
                    dense
                    required
                ></v-text-field>                
            </v-row>
            <v-row>
                <v-text-field
                    v-model="kewarganegaraan"
                    label="Kewarganegaraan"
                    outlined
                    dense
                    required
                ></v-text-field>                
            </v-row>
            <v-row>
                <v-text-field
                    v-model="suku"
                    label="Suku"
                    outlined
                    dense
                    required
                ></v-text-field>                
            </v-row>
        </v-col>
    </v-row>
    <v-dialog v-model="dialogGantiRM" width="500">

      <v-card>
        <v-card-title class="headline orange lighten-2">
          Info
        </v-card-title>

        <v-card-text style="padding-top: 1em;">
            Apakah anda yakin ingin mengganti No Rekam Medis? Dengan melakukan pergantian Rekam Medis, maka data pasien rekam medis sebelumnya akan dihilangkan.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            outlined
            @click="updateData();"
          >
            Saya Yakin!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>    
</div>
</template>

<script>

  export default {

    data: () => ({
      itemPasien: [],
      norm: '',
      oldNorm: '',
      nama: '',
      panggilan: '',
      gelarDepan: '',
      gelarBelakang: '',
      tempatLahir: '',
      tanggalLahir: '',
      jenisKelamin: '',
      alamat: '',
      rt: '',
      rw: '',
      kodePos: '',
      wilayah: '',
      agama: '',
      pendidikan: '',
      pekerjaan: '',
      statusPerkawinan: '',
      golonganDarah: '',
      kewarganegaraan: '',
      suku: '',
      tanggal: '',
      oleh: '',
      status: '',
      statusUpdateBerhasil: false,
      dialogGantiRM: false
    }),

    computed: {

    },

    methods: {

        submit: function() {
            if(this.norm != this.oldNorm ) {
                console.log('Edit Rekam Medis')
                this.dialogGantiRM = true
            } else {
                console.log('Edit Biodata')
                this.updateData()
            }
        },

        updateData: function() {
            
            let dataKirim = {
                norm : this.norm,
                oldNorm: this.oldNorm,
                nama : this.nama,
                panggilan : this.panggilan,
                gelarDepan : this.gelarDepan,
                gelarBelakang : this.gelarBelakang,
                tempatLahir : this.tempatLahir,
                tanggalLahir : this.tanggalLahir,
                jenisKelamin : this.jenisKelamin,
                alamat : this.alamat,
                rt : this.rt,
                rw : this.rw,
                kodePos : this.kodePos,
                wilayah : this.wilayah,
                agama : this.agama,
                pendidikan : this.pendidikan,
                pekerjaan : this.pekerjaan,
                statusPerkawinan : this.statusPerkawinan,
                golonganDarah : this.golonganDarah,
                kewarganegaraan : this.kewarganegaraan,
                suku : this.suku                  
            }

            this.$http.post(this.ipAddress + '/pasien/update-pasien.php', dataKirim)
                .then((response) => {
                    if(response.data.status == true) {
                        this.statusUpdateBerhasil = true
                        setTimeout(() => {
                            this.statusUpdateBerhasil = false
                        }, 2000);
                    } else {
                        // alert('Terjadi kesalahan!')
                    }
                })            

        }

    },

    created() {
        this.ipAddress = 'http://' + localStorage.getItem("ip_address")
        let item = this.$route.params.item
        console.log(item)
        this.norm = item.NORM
        this.oldNorm = item.NORM
        this.nama = item.NAMA
        this.panggilan = item.PANGGILAN,
        this.gelarDepan = item.GELAR_DEPAN,
        this.gelarBelakang = item.GELAR_BELAKANG,
        this.tempatLahir = item.TEMPAT_LAHIR,
        this.tanggalLahir = item.TANGGAL_LAHIR,
        this.jenisKelamin = item.JENIS_KELAMIN,
        this.alamat = item.ALAMAT,
        this.rt = item.RT,
        this.rw = item.RW,
        this.kodePos = item.KODEPOS,
        this.wilayah = item.WILAYAH,
        this.agama = item.AGAMA,
        this.pendidikan = item.PENDIDIKAN,
        this.pekerjaan = item.PEKERJAAN,
        this.statusPerkawinan = item.STATUS_PERKAWINAN,
        this.golonganDarah = item.GOLONGAN_DARAH,
        this.kewarganegaraan = item.KEWARGANEGARAAN,
        this.suku = item.SUKU        
    }
  }
</script>
