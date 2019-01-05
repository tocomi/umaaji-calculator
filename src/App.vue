<template>
  <div id="app">
    <Header />
    <Index msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Index from './views/Index.vue'

export default {
  name: 'app',
  components: {
    Header,
    Index,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
