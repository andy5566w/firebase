<template>
  <label>{{ label }}</label>
  <select
    v-bind="{
      ...$attrs,
      onChange: (e) => $emit('update:modelValue', e.target.value),
    }"
    :value="modelValue"
  >
    <option
      v-for="option in items"
      :value="option"
      :key="option"
      :selected="option === modelValue"
    >
      {{ option }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'BaseSelect',
  props: {
    label: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default: () => [],
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
  },
}
</script>

<style scoped></style>
