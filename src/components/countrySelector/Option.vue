<template>
  <n-grid :x-gap="2" :cols="2">
    <n-grid-item>
      <flag :iso="iso" />
    </n-grid-item>
    <n-grid-item>
      {{ label }}
    </n-grid-item>
  </n-grid>
</template>

<script lang="ts">
import { listCountryOptions } from "@/common/constants/countryOptions";
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    value: String,
  },
  setup(props) {

    const option = ref(
      listCountryOptions.find(
        (opt) => opt.value === props.value || (props.value as any).value
      )
    );

    const iso = ref(option?.value?.iso);
    const label = ref(option?.value?.label);

    return {
      option,
      iso,
      label,
    };
  },
});
</script>
