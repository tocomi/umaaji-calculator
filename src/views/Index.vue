<template lang="pug">
  div.index
    button(@click="readJson")
</template>

<script>
export default {
  name: 'Index',
  methods: {
    readJson() {
      this.$store.dispatch('readJson')
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
