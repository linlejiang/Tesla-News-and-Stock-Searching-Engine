<template>
  <div id="app">
    <Navbar />
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  name: 'App',
  components: {
    Navbar
  },
  created() {
    this.$root.log = function log() {
        for (let i = 0; i < arguments.length; i += 1) {
          if (typeof (arguments[i]) === 'object') {
            try {
              arguments[i] = JSON.parse(JSON.stringify(arguments[i]));
            } catch (e) {
              console.error(e);
            }
          }
        }
        console.log(...arguments);
    };
  }
}
</script>