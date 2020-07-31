<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
     :logo ="getImage('img/logo', logo.logo)"
    >
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Dashboard',
            icon: 'ni ni-tv-2 text-primary',
            path: '/dashboard'
          }"
        />
        <sidebar-item
          :link="{
            name: 'Pelanggan',
            icon: 'ni ni-single-02 text-success',
            path: '/customers'
          }"
        />
        <sidebar-item
          :link="{
            name: 'User',
            icon: 'ni ni-circle-08 text-default',
            path: '/users'
          }"
        />
        <sidebar-item
          :link="{
            name: 'Transaksi',
            icon: 'ni ni-chart-bar-32 text-danger',
            path: '/transactions'
          }"
        />
        <sidebar-item
          :link="{
            name: 'Pengeluaran',
            icon: 'ni ni-send',
            path: '/spending'
          }"
        />
         <sidebar-item
          :link="{
            name: 'Laporan',
            icon: 'ni ni-badge',
            path: '/spending'
          }"
        />
         <sidebar-item
          :link="{
            name: 'setting',
            icon: 'ni ni-settings-gear-65',
            path: '/setting'
          }"
        />
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
  import DashboardNavbar from './DashboardNavbar.vue';
  import ContentFooter from './ContentFooter.vue';
  import { FadeTransition } from 'vue2-transitions';
import { mapGetters } from 'vuex';

  export default {
    components: {
      DashboardNavbar,
      ContentFooter,
      FadeTransition
    },
    data() {
      return {
        sidebarBackground: 'vue', //vue|blue|orange|green|red|primary
      };
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      }
    },
    mounted() {
      this.$store.dispatch('getCurrentUser')
      this.$store.dispatch('fetchData', 'setting')
    },
    computed: {
      ...mapGetters({
        logo : 'setting'
      })
    }
  };
</script>
<style lang="scss">
</style>
