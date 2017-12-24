<template>
  <div
    class="cell cell-dropdown"
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
      @blur="onBlur"
      placeholder="none" />

    <ol class="options">
      <li
        v-for="(o, i) in options"
        key="i"
        @mousedown="choose(o)">
        <span>{{ o.label }}</span>
      </li>
    </ol>

  </div>
</template>

<script>
  export default {
    props: [
      'value',
      'options',
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
        this.$emit('input', (this.internal === '') ? null : this.internal)
      }
    },
    methods: {
      onFocus: function () { this.isFocused = true  },
      onBlur: function  () { this.isFocused = false },
      choose: function (choice) {
        this.internal = choice.value
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

    &.error {
      background: transparentize(red, 0.95);
      border-bottom-color: red;
    }

    &.focused {
      background: transparentize(#4501ef, 0.95);
      border-bottom-color: #4501ef;
    }

    &.disabled {
      opacity: 0.5;
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
      height: 36px;
      display: block;
      margin: 0;
      padding: 0;
      border-style: none;
      border-radius: 0;
      background: none;
      font-size: 1.5rem;
      font-family: inherit;
      position: relative;
      z-index: 10;
      color: #344c4b;

      &:focus {
        outline: none;
      }

      &::placeholder {
        color: lighten(#787f80, 20%);
      }

      option {
        font-size: 11px;
      }
    }

    input:focus + ol.options {
      display: block;
    }

    ol.options {
      width: 192px;
      margin: 0;
      padding: 0;
      display: none;
      position: absolute;
      top: 70px + 12px;
      left: 0;
      z-index: 20;
      border: 1px solid #787f80;
      cursor: pointer;

      li {
        margin: 0;
        padding: 6px 12px;
        list-style: none;
        background: #edefed;
        position: relative;
        z-index: 2;

        &:hover {
          background-color: darken(#edefed, 5%);
        }
      }

      &:before {
        $size: 10px;

        content: "";
        display: block;
        width: $size - 2px;
        height: $size - 2px;
        border: 1px solid #787f80;
        position: absolute;
        top: -($size / 2);
        left: 6px;
        background: #edefed;
        transform: rotate(45deg);
      }

      &:after {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 0;
        top: 4px;
        left: 4px;
        z-index: 1;
        background-image: url('data:image/svg+xml;utf8,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg" version="1.1"><defs><pattern id="Pattern2" patternUnits="userSpaceOnUse" width="5" height="5"><path d="M 0,5 l 5,-5 M -1,1 l 2.5,-2.5 M 4,6 l 2.5,-2.5" stroke-width="1" shape-rendering="auto" stroke="#788080" stroke-linecap="square"></path></pattern></defs><rect fill="url(#Pattern2)" x="0" y="0" width="100" height="100"/></svg>');
      }
    }
  }
</style>
