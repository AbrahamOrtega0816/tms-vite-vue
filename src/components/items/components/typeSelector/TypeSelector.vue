<template>
  <Field 
  :name="`items[${index}].type`" v-slot="{ handleChange, field }">
    <n-select
      :on-update:value="handleChange"
      :default-value="field.value"
      :key="field.value"
      :options="options"
      :render-label="renderLabel"
      placeholder="Type"
      class="field"
    />
  </Field>
</template>

<script lang="ts">
import { SelectOption, SelectRenderLabel } from "naive-ui";
import { Field } from "vee-validate";
import { defineAsyncComponent, defineComponent, h, ref } from "vue";
import { typesItem } from "../../../../common/constants/itemList";
import Option from './Option.vue'

const AsyncField = defineAsyncComponent({
  loader: async () => Field,
  loadingComponent: () => import("../../../loaderField/LoaderField.vue"),
});

export default defineComponent({
  components: {
    Field: AsyncField,
},
  props: {
    index: Number,
  },
  setup({ index }) {
    const options = ref<Array<SelectOption>>(typesItem);

    const renderLabel: SelectRenderLabel = (option) => h(Option as any, { value: option.value as string });

    return {
      index,
      options,
      renderLabel,
    };
  },
});
</script>

<style lang="scss">
.field > .n-base-selection {
  min-height: 28px !important;
  > .n-base-selection-label{
    height: 28px !important;
  }
}
</style>