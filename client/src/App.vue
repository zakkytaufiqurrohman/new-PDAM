<template>
  <div id="app">
    <notifications></notifications>
    <router-view/>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('getCurrentUser')
    
  }
}
</script>