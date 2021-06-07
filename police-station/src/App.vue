<template>
  <div id="app">
    <Activities/>
  </div>
</template>

<script>
import Activities from './components/Activities.vue'

export default {
  name: 'App',
  components: {
    Activities
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
