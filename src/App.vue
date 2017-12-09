<template>
  <div id="app">
    <header>
      <h2>solar-system.css</h2>
      <div id="dynamic-solar-system" v-html="output.cache.markup.content"></div>
    </header>
    <main>
      <row v-for="(b, i) in bodies" key="i" v-on:remove="remove(i)" :body="b"></row>
      <div class="outputs">
        <output-channel
          v-for="(c, j) in output.channels"
          key="j"
          :label="c.label"
          :output="getOutput(c.name)"></output-channel>
      </div>
    </main>
  </div>
</template>

<script>
  import Row from './Row'
  import OutputChannel from './OutputChannel'
  import convert from './convert'
  import { debounce, addSystemStyles } from './util'

  export default {
    name: 'app',
    components: {
      Row,
      OutputChannel
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
        ],
        output: {
          cache: {
            stylesheet: {
              pending: true,
              content: ''
            },
            markup: {
              pending: true,
              content: ''
            }
          },
          channels: [
            {
              label: 'Stylesheet',
              name: 'stylesheet'
            },
            {
              label: 'Markup',
              name: 'markup'
            }
          ]
        }
      }
    },
    watch: {
      bodies: {
        deep: true,
        handler: debounce(function (newVal, oldVal) {
          this.recompile()
        }, 500)
      }
    },
    methods: {
      remove: function (i) {
        this.bodies.splice(i, 1)
      },
      toSCSS: function (bodies, cb) {
        const scss = convert.toSCSS('system', 400, bodies)
        window.sass.compile(scss, (result) => {
          if (result.status === 0) {
            cb(null, result.text)
          } else {
            cb(result.formatted, '')
          }
        })
        return ''
      },
      toHTML: function (bodies, cb) {
        cb(null, convert.toHTML('system', bodies))
      },
      updateStylesheet: function () {
        const bodies = this.bodies.slice()
        bodies.unshift({
          name: 'sun',
          texture: 'yellow',
          size: 96,
          orbit: 0,
          speed: 0,
          satellites: this.bodies
        })
        this.output.cache.stylesheet.pending = true
        this.toSCSS(bodies, (err, css) => {
          this.writeCache('stylesheet', css)
          addSystemStyles(css)
          this.output.cache.stylesheet.pending = false
        })
      },
      updateMarkup: function () {
        const bodies = [{
          name: 'sun',
          texture: 'yellow',
          size: 96,
          orbit: 0,
          speed: 0,
          satellites: this.bodies
        }]
        this.output.cache.markup.pending = true
        this.toHTML(bodies, (err, html) => {
          this.writeCache('markup', html)
          this.output.cache.markup.pending = false
        })
      },
      recompile: function () {
        console.log('recompile')
        this.updateStylesheet()
        this.updateMarkup()
      },
      readCache: function (channel) {
        if (this.output.cache[channel].pending) {
          return ''
        } else if (this.output.cache[channel].content) {
          return this.output.cache[channel].content
        } else {
          console.log(this.output.cache[channel])
          throw 'cache miss'
        }
      },
      writeCache: function (channel, newVal) {
        this.output.cache[channel].content = newVal
      },
      getOutput: function (channel) {
        return this.readCache(channel)
      }
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }

  header {
    text-align: center;

    .solar-system {
      margin: 0 auto;
    }
  }

  h1, h2 {
    font-weight: normal;
  }

  a {
    color: #42b983;
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
