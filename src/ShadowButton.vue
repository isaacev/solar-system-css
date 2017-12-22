<template>
  <div class="shadow-button-wrapper">
    <button class="shadow-button" @click="click()" v-bind:disabled="disabled">{{ label }}</button>
  </div>
</template>

<script>
  export default {
    name: 'shadow-button',
    props: [
      'label',
      'disabled'
    ],
    methods: {
      click: function () {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss" scoped>
  div.shadow-button-wrapper {
    display: inline-block;
    position: relative;

    & + div.shadow-button-wrapper {
      margin-left: 16px;
    }

    button.shadow-button {
      -webkit-appearance: none;
      color: #344c4c;
      border: 1px solid #787f80;
      background: none;
      border-radius: 0;
      font-family: inherit;
      color: inherit;
      font-size: 1rem;
      padding: 12px 36px;
      cursor: pointer;
      position: relative;
      background: #edefed;
      z-index: 2;
      transition: top 0.2s;
      transition: left 0.2s;

      &[disabled] {
        border-color: #787f80;
        color: #787f80;
        background: darken(#edefed, 5%);
        top: 2px;
        left: 2px;
        cursor: default;
      }

      &:hover {
        background: darken(#edefed, 5%);
      }

      &:focus {
        outline: none;
      }

      &:hover:active {
        top: 2px;
        left: 2px;
      }
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
</style>
