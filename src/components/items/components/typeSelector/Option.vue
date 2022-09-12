<template>
  <n-grid :x-gap="2" :cols="2" class="is-flex is-align-self-center">
    <n-grid-item>
      <n-icon :component="icon" class="mt-1 mr-1" />
    </n-grid-item>
    <n-grid-item>
      {{ label }}
    </n-grid-item>
  </n-grid>
</template>

<script lang="ts">
import { DocumentScannerOutlined as DocumentScannerOutlinedIcon } from "@vicons/material";
import { Box24Regular as Box24RegularIcon } from "@vicons/fluent";
import { defineComponent, ref } from "vue";
import { typesItem } from "../../../../common/constants/itemList";

export default defineComponent({
  props: {
    value: Number,
  },
  setup({ value }) {
    const option = ref(
      typesItem.find((opt) => opt.value === value || (value as any).value)
    );

    const label = ref(option?.value?.label);

    const icon =
      option?.value?.value === 1
        ? DocumentScannerOutlinedIcon
        : option?.value?.value === 2
        ? Box24RegularIcon
        : Box24RegularIcon;

    return {
      icon,
      value,
      option,
      label,
    };
  },
});
</script>
