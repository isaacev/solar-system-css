<template>
  <div
    class="solar-system-viewer"
    v-bind:class="{
      'disabled': disabled
    }" />
</template>

<script>
  export default {
    name: 'solar-system-viewer',
    props: [
      'structure',
      'disabled'
    ],
    watch: {
      structure: {
        deep: true,
        handler: function (newVal, oldVal) {
          // console.log('CHANGED')
        }
      }
    },
    created () {
      const struct = deepCopy(this.structure)
      const nested = attachSatellites(struct)

      console.log(JSON.stringify(nested, null, '  '))
    }
  }

  function deepCopy (obj) {
    return JSON.parse(JSON.stringify(obj))
  }

  function attachSatellites (bodies) {
    const mapping = bodies.reduce((mapping, b) => {
      mapping[b.name] = b
      b.satellites = []
      return mapping
    }, {})

    bodies.forEach((b) => {
      if (b.focus !== null) {
        mapping[b.focus].satellites.push(b)
      }
    })

    return bodies
  }

  function hasLegalStructure (struct, parent={name: null}, seen=[]) {
    if (Array.isArray(struct) === false) {
      return false
    }

    try {
      struct.forEach((body) => {
        if (seen.indexOf(body) > -1) {
          throw 'illegal'
        } else {
          seen.push(body)
        }

        if (typeof body.name    !== 'string') { throw 'illegal' }
        if (typeof body.texture !== 'string') { throw 'illegal' }
        if (typeof body.size    !== 'number') { throw 'illegal' }
        if (typeof body.orbit   !== 'number') { throw 'illegal' }
        if (typeof body.speed   !== 'number') { throw 'illegal' }

        if (Array.isArray(body.satellites)) {
          if (hasLegalStructure(body.satellites, body, seen) === false) {
            throw 'illegal'
          }
        }
      })
    } catch (err) {
      if (err === 'illegal') {
        return false
      } else {
        throw err
      }
    }

    return true
  }
</script>

<style lang="scss">
  div.solar-system-viewer {
    width: 600px;
    height: 600px;
    margin: 0 auto;
  }
</style>
