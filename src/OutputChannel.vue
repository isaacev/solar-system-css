<template>
  <div class="output-channel">
    <h3>{{ label }}</h3>
    <textarea ref="textarea" @focus="onFocus" readonly>{{ output }}</textarea>
  </div>
</template>

<script>
  export default {
    props: [
      'label',
      'output'
    ],
    methods: {
      onFocus: function () {
        this.$refs.textarea.select()
      }
    }
  }
</script>

<style lang="scss" scoped>
  div.output-channel {
    width: 100%;
    padding: 0 8px;

    h3 {
      margin: 0;
      padding: 6px 12px;
    }

    textarea {
      width: 100%;
      height: 128px;
      display: block;
      padding: 12px;
      box-sizing: border-box;
      border: 1px solid #eee;
      border-radius: 3px;
      background: #fafafa;
      font: 0.5rem 'Roboto Mono', monospace;
      color: #222;
      resize: none;

      &:focus {
        border-color: #aaa;
        outline: none;
        background: white;
      }
    }

    div.options {
      padding: 0;
      text-align: right;

      p.copy {
        height: 24px;
        display: inline-block;
        margin: 0;
        padding: 12px 0;
        float: left;
        cursor: pointer;
        color: #aaa;

        &:hover {
          color: #666;
        }

        &:active {
          color: #222;
        }
      }
    }
  }
</style>
