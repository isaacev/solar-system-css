<template>
  <div id="app">
    <header>
      <h1>solar-system.css</h1>
      <!-- <solar-system-viewer :structure="bodies" /> -->
    </header>
    <main>
      <div class="buttons">
        <shadow-button label="Refresh"    @click="refresh()" />
        <shadow-button label="Export"     @click="download()" />
        <shadow-button label="Add Planet" @click="add()" />
      </div>
      <row
        v-for="(b, i) in bodies"
        key="i"
        @remove="remove(i)"
        :body="b"
        :all="bodies"
      />
    </main>
  </div>
</template>

<script>
  import Row from './Row'
  import ShadowButton from './ShadowButton'
  import SolarSystemViewer from './SolarSystemViewer'
  import convert from './convert'
  import { debounce, addSystemStyles } from './util'

  export default {
    name: 'app',
    components: {
      Row,
      ShadowButton,
      SolarSystemViewer
    },

    data () {
      return {
        markup: '<em>hello world</em>',
        bodies: [
          {
            name    : { value: 'earth', valid: true },
            texture : { value: 'blue',  valid: true },
            size    : { value: 48,      valid: true },
            orbit   : { value: 100,     valid: true },
            speed   : { value: 3,       valid: true },
            focus   : { value: 'moon',  valid: true }
          },
          {
            name    : { value: 'moon',  valid: true },
            texture : { value: 'gray',  valid: true },
            size    : { value: 10,      valid: true },
            orbit   : { value: 100,     valid: true },
            speed   : { value: 10,      valid: true },
            focus   : { value: 'earth', valid: true }
          }
        ]
      }
    },

    created () {
      this.validateBodies()
    },

    watch: {
      'bodies': {
        deep: true,
        handler: function (newVal, oldVal) {
          console.log(JSON.stringify(oldVal[0], null, '  '), JSON.stringify(newVal[0], null, '  '))
          let checkValidity = false

          // Only re-check validity the number of bodies has changed or a body
          // attribute value has changed.
          if (newVal.length === oldVal.length) {
            for (let i = 0; i < newVal.length; i++) {
              checkValidity = (newVal[i].name.value !== oldVal[i].name.value) || checkValidity
              checkValidity = (newVal[i].texture.value !== oldVal[i].texture.value) || checkValidity
              checkValidity = (newVal[i].size.value !== oldVal[i].size.value) || checkValidity
              checkValidity = (newVal[i].orbit.value !== oldVal[i].orbit.value) || checkValidity
              checkValidity = (newVal[i].speed.value !== oldVal[i].speed.value) || checkValidity
              checkValidity = (newVal[i].focus.value !== oldVal[i].focus.value) || checkValidity
            }
          } else {
            checkValidity = true
          }

          if (checkValidity) {
            console.log('check')
            this.validateBodies()
          }
        }
      }
    },

    methods: {
      remove: function (i) {
        this.bodies.splice(i, 1)
      },
      add: function () {
        this.bodies.unshift({
          name    : { value: null, valid: false},
          texture : { value: null, valid: false},
          size    : { value: null, valid: false},
          orbit   : { value: null, valid: false},
          speed   : { value: null, valid: false},
          focus   : { value: null, valid: false}
        })
      },
      refresh: function () {
        console.log('generate markup')
        console.log('generate stylesheet')
        console.log('embed markup')
        console.log('embed stylesheet')
      },
      download: function () {
        // TODO
      },

      validateBodies: function () {
        /**
         * Format validations:
         * - Checks that each attribute is the correct type
         * - Checks that each attribute conforms to some basic value
         *   constraints (ex: positive number, non-empty string)
         */

        // Check that each body.name is a non-empty string.
        this.bodies
          .map(body => body.name)
          .forEach(name => name.valid = (typeof name.value === 'string' && name.value.length > 0))

        this.bodies
          .map(body => body.texture)
          .forEach(texture => texture.valid = (typeof texture.value === 'string' && texture.value.length > 0))

        // Check that each body.size is a positive number.
        this.bodies
          .map(body => body.size)
          .forEach(size => size.valid = (typeof size.value === 'number' && size.value >= 0))

        // Check that each body.orbit is a positive number.
        this.bodies
          .map(body => body.orbit)
          .forEach(orbit => orbit.valid = (typeof orbit.value === 'number' && orbit.value >= 0))

        // Check that each body.speed is a positive number.
        this.bodies
          .map(body => body.speed)
          .forEach(speed => speed.valid = (typeof speed.value === 'number' && speed.value >= 0))

        // Check that each body.focus is NULL or a non-empty string.
        this.bodies
          .map(body => body.focus)
          .forEach(focus => focus.valid = focus.value === null || (typeof focus.value === 'string' && focus.value.length > 0))

        /**
         * Relation validations:
         * - Checks that body names are unique
         * - Checks that orbital relationships contain no orbital cycles
         */

        // Check that each body.name (if not-invalid) is unique.
        this.bodies
          .map(body => body.name)
          .filter(name => name.valid)
          .forEach(name => {
            const bodiesWithName = this.bodies.reduce((count, body) => {
              if (body.name.value === name.value) {
                return count + 1
              } else {
                return count
              }
            }, 0)

            if (bodiesWithName > 1) {
              name.valid = false
            }
          })

        // Check that each body.focus (if not already invalid) references a body:
        // - That exists
        // - That itself has a valid focus reference
        // - That the chain of focus references does not contain a reference to
        //   this body (an orbital cycle)
        this.bodies
          .map(body => body.focus)
          .filter(focus => focus.valid)
          .map(focus => {
            if (focus.value === null) {
              return focus
            }

            // If the following search finds more than one other body with
            // a name that matches this focus, mark this focus as invalid.
            // If the search finds no other bodies with a name that matches
            // this focus, make this focus as invalid.
            const deref = this.bodies.reduce((deref, body) => {
              if (body.name.value === focus.value) {
                if (deref === null) {
                  return body
                } else {
                  focus.valid = false
                  return deref
                }
              } else {
                return deref
              }
            }, null)

            if (deref === null) {
              focus.valid = false
            }

            return focus
          })
          .filter(focus => focus.valid)
          .map(focus => {
            // Any focus reference at this point can be assumed to reference:
            // - A uniquely named body

            // - Dereference current focus
            // - If deref is null, current focus is valid
            // - If deref is invalid, current focus is invalid
            // - If deref is valid,
            focus.valid = this.dereference(focus, [])
          })
      },

      dereference: function recurse (focus, seen) {
        if (focus.valid === false) {
          return false
        } else if (focus.value === null) {
          return true
        } else if (seen.indexOf(focus.value) > -1) {
          return false
        }

        // Find body with name same as focus.value
        const ref = this.bodies.reduce((ref, body) => {
          if (body.name.value === focus.value) {
            return body
          } else {
            return ref
          }
        }, null)

        if (ref === null) {
          return false
        } else {
          return recurse.call(this, ref.focus, seen.concat(ref.name.value))
        }
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
