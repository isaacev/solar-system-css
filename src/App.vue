<template>
  <div id="app">
    <header>
      <h1>solar-system.css</h1>
    </header>
    <main>
      <row v-for="(b, i) in bodies" key="i" v-on:remove="remove(i)" :body="b"></row>
      </div>
    </main>
  </div>
</template>

<script>
  import Row from './Row'
  import convert from './convert'
  import { debounce, addSystemStyles } from './util'

  export default {
    name: 'app',
    components: {
      Row,
    },

    data () {
      return {
        bodies: [
          {
            name: 'earth',
            texture: 'blue',
            size: 48,
            orbit: 100,
            speed: 50
          },
          {
            name: 'venus',
            texture: 'orange',
            size: 45,
            orbit: 200,
            speed: 60
          },
          {
            name: 'mars',
            texture: 'red',
            size: 35,
            orbit: 300,
            speed: 100
          }
        ]
      }
    },
    methods: {
      remove: function (i) {
        this.bodies.splice(i, 1)
      }
    }
  }
</script>

<style lang="scss">
  html, body {
    background: #edefed;
  }

  #app {
    font-family: 'Space Mono', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  header {
    height: 600px;
    text-align: center;
    background-color: #131f2a;

    h1 {
      text-align: center;
      font-family: 'Roboto Mono', monospace;
      color: white;
      font-weight: normal;
      margin: 0;
      padding: 2rem 0;
    }

    .solar-system {
      margin: 0 auto;
    }
  }

  main {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;

    div.outputs {
      margin-top: 48px;
      display: flex;
    }
  }
</style>
