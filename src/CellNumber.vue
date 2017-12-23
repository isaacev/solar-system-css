<template>
  <div
    class="cell cell-number"
    v-bind:class="{
      'error'    : !isValid,
      'focused'  : isFocused,
      'disabled' : isDisabled
    }">

    <label>{{ label }}</label>
    <input
      type="number"
      min="0"
      max="1000"
      v-model="internal"
      @focus="onFocus"
      @blur="onBlur" />

    <p
      class="units"
      v-if="internal.length > 0">
      <span class="offset">{{ internal }}</span>
      <span class="units">{{ units }}</span>
    </p>

  </div>
</template>

<script>
  export default {
    props: [
      'value',
      'label',
      'units',
      'valid'
    ],
    data () {
      return {
        internal   : '',
        parsed     : null,
        isValid    : true,
        isFocused  : false,
        isDisabled : false
      }
    },
    created () {
      if (typeof this.value === 'number' && !isNaN(this.value)) {
        this.internal = this.value.toString()
        this.parsed = this.value
      } else {
        this.internal = ''
        this.parsed = null
      }

      this.updateValidity()
    },
    watch: {
      'value': function (newVal) {
        if (typeof newVal === 'number' && !isNaN(this.value)) {
          this.internal = this.value.toString()
        } else if (typeof newVal === 'string') {
          const maybe = parseInt(newVal, 10)
          if (isNaN(maybe)) {
            this.internal = ''
          } else {
            this.internal = maybe.toString()
          }
        } else {
          this.internal = ''
        }
      },
      'internal': function (newVal) {
        const maybe = parseInt(newVal, 10)
        if (isNaN(maybe)) {
          this.parsed = null
        } else {
          this.parsed = maybe
        }

        this.$emit('input', this.parsed)
        this.updateValidity()
      },
      'valid': function (newVal, oldVal) {
        this.updateValidity()
      }
    },
    methods: {
      onFocus: function () { this.isFocused = true  },
      onBlur: function  () { this.isFocused = false },
      checkParentValidation: function () {
        if (typeof this.valid === 'boolean') {
          return this.valid
        }

        return true
      },
      updateValidity: function () {
        this.isValid = this.checkParentValidation()
      }
    }
  }
</script>

<style lang="scss" scoped>
  div.cell {
    display: block;
    position: relative;
    padding: 12px;
    margin: 0 8px;
    border-bottom: 1px dashed #787f80;
    box-sizing: border-box;
    text-align: left;
    overflow-x: hidden;

    &.error {
      background: transparentize(red, 0.95);
      border-bottom-color: red;
    }

    &.focused {
      background: transparentize(#4501ef, 0.95);
      border-bottom-color: #4501ef;
    }

    label {
      height: 16px;
      display: block;
      margin-bottom: 6px;
      font-size: 0.9rem;
      color: #787f80;
    }

    input {
      width: 100%;
      display: block;
      margin: 0;
      padding: 0;
      border-style: none;
      background: none;
      font-size: 1.5rem;
      font-family: inherit;
      position: relative;
      z-index: 100;
      color: #344c4b;

      &:focus {
        outline: none;
      }
    }

    p.units {
      position: absolute;
      top: 34px;
      left: 12px;
      margin: 0;
      padding: 0;
      font-size: 1.5rem;

      span.offset {
        visibility: hidden;
      }

      span.units {
        color: #787f80;
      }
    }
  }
</style>
