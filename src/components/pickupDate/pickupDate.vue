<template>
  <Field name="pickupDate" v-slot="{ handleChange, field : { value } }">
    <n-date-picker
      :on-update:value="handleChange"
      :default-value="value"
      placeholder="Pickup Date"
      clearable
      class="w-100"
    />
  </Field>
</template>

<script lang="ts">
import { defineComponent , defineAsyncComponent } from "vue";
import { Field } from "vee-validate";

const AsyncField = defineAsyncComponent({
  loader: async () => Field,
  loadingComponent: () => import('../loaderField/LoaderField.vue'),
})

export default defineComponent({
  components: {
    Field :  AsyncField,
  },
  setup() {
    return {
    };
  },
});
</script>



