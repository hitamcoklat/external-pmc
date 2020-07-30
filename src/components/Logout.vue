<script>
    import router from '@/router'
    import store from '@/store'
    export default {
        name: 'logout',
        mounted () {
            localStorage.removeItem('token')
            localStorage.removeItem('vuex')
            this.$store.clear
            store.commit('LOGOUT_USER')
            router.push('/')
        }
    }
</script>