<template>
  <Field :name="name.toLowerCase()" v-slot="{ field }">
    <n-auto-complete :options="options" :default-value="field.value">
      <template
        #default="{ handleInput, handleBlur, handleFocus, value: slotValue }"
      >
        <n-input
          v-bind="field"
          :value="slotValue"
          :placeholder="name"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          clearable
          type="text"
        >
          <template #suffix>
            <n-icon :component="icon" />
          </template>
        </n-input>
      </template>
    </n-auto-complete>
  </Field>
</template>

<script lang="ts">
import { computed, defineComponent, defineAsyncComponent,ref, watch } from "vue";
import { LocationOutline as LocationOutlineIcon } from "@vicons/ionicons5";
import { LocateOutline as LocateOutlineIcon } from "@vicons/ionicons5";
import { Field, useField } from "vee-validate";
import { Item, Location } from "@/common/models/locationModel";
import { hereMapsService } from "@/services";
import { AxiosResponse } from "axios";

const AsyncField = defineAsyncComponent({
  loader: async () => Field,
  loadingComponent: () => import('../loaderField/LoaderField.vue'),
})

export default defineComponent({
  components: {
    Field: AsyncField,
  },
  props: {
    destination: Boolean,
  },
  setup(props) {
    const icon = props.destination ? LocationOutlineIcon : LocateOutlineIcon;

    const name = props.destination ? "Destination" : "Origin";
    const countryName = props.destination
      ? "destinationCountry"
      : "originCountry";

    const response = ref<Array<Item>>([]);

    const options = computed(() => {
        return [...response.value].map((opt) => {
          return {
            label: opt.address.label,
            value: opt.id
          }
        })
      })

    const { value: city } = useField(name.toLowerCase());
    const { value: country } = useField(countryName);

    watch([city, country], async ([newCity, newCountry]) => {
      response.value = [];
      if ((newCity as string).length > 2) {
        const params = {
          apiKey: import.meta.env.VITE_APP_BASE_HEREMAPS_APIKEY,
          in:`countryCode:${newCountry as string}`,
          q: newCity as string | number,
          types:"city",
        };
        await hereMapsService
          .getAutocompleteLocation(params)
          .then((res: AxiosResponse<Location>) => {
            response.value = [...res.data.items]
          });
      }
    });

    return {
      icon,
      options,
      name,
    };
  },
});
</script>
