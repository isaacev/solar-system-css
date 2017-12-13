<template>
  <div id="app">
    <header>
      <h1>solar-system.css</h1>
    </header>
    <main>
      <row v-for="(b, i) in bodies" key="i" v-on:remove="remove(i)" :body="b"></row>
      <div class="buttons">
        <shadow-button label="Refresh"></shadow-button>
        <shadow-button label="Export"></shadow-button>
      </div>
      <div class="buttons">
        <shadow-button label="Add Planet" v-on:click="add()"></shadow-button>
      </div>
    </main>
  </div>
</template>

<script>
  import Row from './Row'
  import ShadowButton from './ShadowButton'
  import convert from './convert'
  import { debounce, addSystemStyles } from './util'

  export default {
    name: 'app',
    components: {
      Row,
      ShadowButton
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
    margin: 0 auto 128px;

    div.outputs {
      margin-top: 48px;
      display: flex;
    }

    div.buttons {
      margin-top: 32px;
      text-align: center;
      cursor: default;
    }
  }
</style>
