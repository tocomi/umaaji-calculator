<template>
  <div id="app">
    <Header/>
    <Index/>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Index from './views/Index.vue';

export default {
  name: 'app',
  components: {
    Header,
    Index,
  },
};
</script>

<style>
#app {
  font-family: 'Noto Sans', 'Noto Sans JP', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
