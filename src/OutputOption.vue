<template>
  <p class="output-option">
    <label v-for="(c, i) in option.choices"><input
      type="radio"
      v-model="selected"
      :value="c"
      :name="option.group"
      v-bind:checked="c == option.selected" /><span>{{ c }}</span></label>
  </p>
</template>

<script>
  export default {
    props: [
      'value',
      'option'
    ],
    data: function () {
      return {
        selected: this.value
      }
    },
    watch: {
      value: function (newVal) {
        this.selected = newVal
      },
      selected: function (newVal, oldVal) {
        this.$emit('input', this.selected)
      }
    }
  }
</script>

<style lang="scss" scoped>
  p.output-option {
    height: 24px;
    margin: 0;
    padding: 12px 0;
    display: inline-block;

    & + p.output-option {
      margin-left: 24px;
    }
  }

  label {
    padding: 4px 6px 3px;
    border: 1px solid #aaa;
    border-radius: 3px;
    font-weight: bold;
    font-size: 0.7rem;
    text-transform: uppercase;
    color: #aaa;
    cursor: pointer;

    &:hover span {
      color: #666;
    }

    & + label {
      margin-left: 6px;
    }

    input {
      display: none;
    }

    input:checked + span {
      color: #222;
    }
  }
</style>
