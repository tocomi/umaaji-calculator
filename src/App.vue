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
  created() {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.userChoice.then((choice) => {
        if (choice.outcome === 'accepted') {
          // eslint-disable-next-line no-undef
          gtag('event', 'install', {
            event_category: 'A2HS',
            event_label: 'accept',
          });
        } else {
          // eslint-disable-next-line no-undef
          gtag('event', 'install', {
            event_category: 'A2HS',
            event_label: 'cancel',
          });
        }
      });
    });
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
