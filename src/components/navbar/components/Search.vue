<template>
  <n-auto-complete 
  v-model:value="value" :options="options">
    <template
      #default="{ handleInput, handleBlur, handleFocus, value: slotValue }"
    >
      <n-input

        round 
        type="text"
        :value="slotValue"
        placeholder="Search"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      >
      <template #suffix>
        <n-icon :component="SearchIcon" />
      </template>
      </n-input>
    </template>
  </n-auto-complete>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { SearchOutline as SearchIcon } from "@vicons/ionicons5";

export default defineComponent({
  setup () {
    const valueRef = ref('')
    return {
      value: valueRef,
      SearchIcon,
      options: computed(() => {
        return ['@gmail.com', '@163.com', '@qq.com'].map((suffix) => {
          const prefix = valueRef.value.split('@')[0]
          return {
            label: prefix + suffix,
            value: prefix + suffix
          }
        })
      })
    }
  }
})
</script>

<style scoped>
</style>