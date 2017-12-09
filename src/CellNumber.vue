<template>
  <div class="cell cell-number" v-bind:class="{ error: !isValid(), focus: isFocused }">
    <label>{{ label }}</label>
    <input
      type="number"
      min="0"
      max="1000"
      v-model="internal"
      @focus="onFocus"
      @blur="onBlur" />
    <p class="units" v-if="internal.length > 0">
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
      'units'
    ],
    data () {
      return {
        internal: '',
        isFocused: false
      }
    },
    created () {
      this.internal = this.value.toString()
    },
    watch: {
      'value': function (newVal) {
        this.internal = newVal.toString()
      },
      'internal': function (newVal) {
        this.$emit('input', this.internal)
      }
    },
    methods: {
      onFocus: function () {
        this.isFocused = true
      },
      onBlur: function () {
        this.isFocused = false
      },
      isValid: function () {
        return (typeof this.internal === 'string' && this.internal.length > 0)
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
    border-bottom: 2px solid #eee;
    box-sizing: border-box;
    text-align: left;
    overflow-x: hidden;

    &.error {
      background: transparentize(red, 0.95);
      border-bottom-color: red;
    }

    &.focus {
      background: transparentize(blue, 0.95);
      border-bottom-color: blue;
    }

    label {
      height: 16px;
      display: block;
      margin-bottom: 6px;
      font-size: 0.9rem;
      color: gray;
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

      &:focus {
        outline: none;
      }
    }

    p.units {
      position: absolute;
      top: 34px;
      left: 12px;
      z-index: -1;
      margin: 0;
      padding: 0;
      font-size: 1.5rem;

      span.offset {
        visibility: hidden;
      }

      span.units {
        color: silver;
      }
    }
  }
</style>
