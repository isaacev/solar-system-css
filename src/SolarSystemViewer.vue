<template>
  <div
    class="solar-system-viewer"
    v-bind:class="{
      'disabled': disabled
    }"
    v-html="html" />
</template>

<script>
  import { debounce } from './util'
  import { toSCSS, toHTML, toCSS } from './convert'

  export default {
    name: 'solar-system-viewer',
    props: [
      'structure',
      'disabled'
    ],

    data () {
      return {
        html: '',
        scss: '',
        css: ''
      }
    },

    created: function () {
      this.update()
      this.debouncedUpdate = debounce(this.update.bind(this), 200)
    },

    watch: {
      structure: {
        deep: true,
        handler: function (newVal, oldVal) {
          if (this.disabled === false) {
            try {
              this.debouncedUpdate()
            } catch (err) {
              if (err !== 'invalid') {
                throw err
              } else {
                console.error('tried to render invalid structure')
              }
            }
          }
        }
      }
    },

    methods: {
      update: function () {
        /**
         * (Assumes that structure has already been determined to be legal)
         *
         * 1. Convert flat structure to nested structure
         * 2. Convert nested structure to HTML
         * 3. Convert nested structure to SCSS
         * 4. Convert SCSS to CSS
         * 5. Load HTML into view
         * 6. Load CSS into global stylesheet
         */

        // 1. Convert flat structure to nested structure by:
        const diam = 400
        const simple = simplifyBodies(this.structure)
        const nested = simple.reduce((roots, body, _, bodies) => {
          if (body.focus === null) {
            roots.push(body)
            return roots
          }

          // Find whatever body this body orbits around.
          for (let other of bodies) {
            if (other.name === body.focus) {
              if (other.hasOwnProperty('satellites') === false) {
                other.satellites = []
              }

              other.satellites.push(body)
              return roots
            }
          }

          throw 'invalid'
        }, [])

        const html = toHTML(nested)
        const scss = toSCSS(simple, diam)

        toCSS(simple, diam, (err, css) => {
          if (err !== null) {
            console.log(scss)
            console.error(err)
          } else {
            this.html = html
            this.scss = scss
            this.css = css

            const sheet = document.querySelector('style#solar-system-styles')
            sheet.innerHTML = css
          }
        })
      }
    }
  }

  function simplifyBodies (bodies) {
    /**
     * Removes `valid` flags from body properties. If a property is invalid,
     * throw an error.
     */
    return bodies.map(original => {
      const simple = {}
      let isValid = true

      simple.name    = original.name.valid    ? original.name.value    : (isValid = false)
      simple.texture = original.texture.valid ? original.texture.value : (isValid = false)
      simple.size    = original.size.valid    ? original.size.value    : (isValid = false)
      simple.orbit   = original.orbit.valid   ? original.orbit.value   : (isValid = false)
      simple.speed   = original.speed.valid   ? original.speed.value   : (isValid = false)
      simple.focus   = original.focus.valid   ? original.focus.value   : (isValid = false)

      if (isValid === false) {
        throw 'invalid'
      }

      return simple
    })
  }
</script>

<style lang="scss">
  div.solar-system-viewer {
    width: 600px;
    height: 600px;
    margin: 0 auto;
  }
</style>
