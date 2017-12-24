<template>
  <div
    class="cell cell-text"
    v-bind:class="{
      'error'    : !valid,
      'focused'  : isFocused,
      'disabled' : isDisabled
    }">

    <label>{{ label }}</label>
    <input
      type="text"
      v-model="internal"
      @focus="onFocus"
      @blur="onBlur" />

  </div>
</template>

<script>
  export default {
    props: [
      'value',
      'label',
      'valid'
    ],
    data () {
      return {
        internal   : '',
        isFocused  : false,
        isDisabled : false
      }
    },
    created () {
      if (typeof this.value === 'string') {
        this.internal = this.value
      } else {
        this.internal = ''
      }
    },
    watch: {
      'value': function (newVal) {
        if (typeof newVal === 'string') {
          this.internal = newVal
        } else {
          this.internal = ''
        }
      },
      'internal': function (newVal) {
        this.$emit('input', this.internal)
      }
    },
    methods: {
      onFocus: function () { this.isFocused = true  },
      onBlur: function  () { this.isFocused = false }
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
      color: #344c4b;

      &:focus {
        outline: none;
      }
    }
  }
</style>
