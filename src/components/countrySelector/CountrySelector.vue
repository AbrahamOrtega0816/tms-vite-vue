<template>
  <Field
    :name="name"
    v-slot="{ handleChange,field }"
  >
    <n-select
      :on-update:value="handleChange"
      :default-value="field.value"
      :key="field.value"
      :options="options"
      :render-label="renderLabel"
      placeholder="Country"
    />
  </Field>
</template>

<script lang="ts">
import { listCountryOptions } from "@/common/constants/countryOptions";
import { SelectOption, SelectRenderLabel } from "naive-ui";
import { Field } from "vee-validate";
import { defineAsyncComponent, defineComponent, h, ref } from "vue";
import Option from "./Option.vue";

const AsyncField = defineAsyncComponent({
  loader: async () => Field,
  loadingComponent: () => import('../loaderField/LoaderField.vue'),
})

export default defineComponent({
  components: {
    Field : AsyncField,
  },
  props: {
    destination: Boolean,
  },
  setup(props) {

    const options = ref<Array<SelectOption>>(listCountryOptions);

    const name = props.destination ? 'destinationCountry' : 'originCountry' ;

    const renderLabel: SelectRenderLabel = (option) =>
      h(Option, { value: option.value as string });

    return {
      name,
      options,
      renderLabel
    };
  },
});
</script>

