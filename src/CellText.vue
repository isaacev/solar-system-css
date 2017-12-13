<template>
  <div class="cell cell-text" v-bind:class="{ error: !isValid(), focus: isFocused }">
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
      'label'
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
    border-bottom: 1px dashed #787f80;
    box-sizing: border-box;
    text-align: left;
    overflow-x: hidden;

    &.error {
      background: transparentize(red, 0.95);
      border-bottom-color: red;
    }

    &.focus {
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
