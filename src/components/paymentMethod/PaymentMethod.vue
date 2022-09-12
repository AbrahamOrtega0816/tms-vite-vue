<template>
  <Field name="paymentMethod" v-slot="{ field: { value }, handleChange }">
    <n-radio-group
      :on-update:value="handleChange"
      :default-value="value"
      name="radiogroup"
    >
      <n-space>
        <n-radio
          v-for="paymentMethod in paymentMethods"
          :key="paymentMethod.value"
          :value="paymentMethod.value"
          :label="paymentMethod.label"
        />
      </n-space>
    </n-radio-group>
  </Field>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";
import { Field } from "vee-validate";
import { paymentMethods } from "@/common/constants/paymentMethods";

const AsyncField = defineAsyncComponent({
  loader: async () => Field,
  loadingComponent: () => import("../loaderField/LoaderField.vue"),
});

export default defineComponent({
  components: {
    Field: AsyncField,
  },
  setup() {
    return {
      paymentMethods,
    };
  },
});
</script>
