<template>
  <td>
    <div class="is-flex is-align-items-center is-justify-content-center pt-1">
      <n-icon
        size="18"
        color="#F2C97DFF"
        :component="Box24RegularIcon"
        class="mr-2"
      />
      {{ Number(index) + 1 }}
    </div>
  </td>
  <td>
   <TypeSelector :index="index" />
  </td>
  <td>
    <Field :name="`items[${index}].quantity`" v-slot="{ handleChange, field }">
      <n-input
        type="text"
        :on-update:value="handleChange"
        :default-value="field.value"
        size="small"
        clearable
        @keypress="onlyAllowNumber"
        placeholder="Quantity"
      />
    </Field>
  </td>
  <td>
    <Field :name="`items[${index}].weight`" v-slot="{ handleChange, field }">
      <n-input
        type="text"
        :on-update:value="handleChange"
        :default-value="field.value"
        size="small"
        clearable
        @keypress="onlyAllowNumber"
        placeholder="Weight"
      />
    </Field>
  </td>
  <td>
    <Field :name="`items[${index}].length`" v-slot="{ handleChange, field }">
      <n-input
        type="text"
        :on-update:value="handleChange"
        :default-value="field.value"
        size="small"
        clearable
        @keypress="onlyAllowNumber"
        placeholder="Length"
      />
    </Field>
  </td>
  <td>
    <Field :name="`items[${index}].width`" v-slot="{ handleChange, field }">
      <n-input
        type="text"
        :on-update:value="handleChange"
        :default-value="field.value"
        size="small"
        clearable
        @keypress="onlyAllowNumber"
        placeholder="Width"
      />
    </Field>
  </td>
  <td>
    <Field :name="`items[${index}].height`" v-slot="{ handleChange, field }">
      <n-input
        type="text"
        :on-update:value="handleChange"
        :default-value="field.value"
        size="small"
        clearable
        @keypress="onlyAllowNumber"
        placeholder="Height"
      />
    </Field>
  </td>
  <td>
    <Field
      :name="`items[${index}].declaredValue`"
      v-slot="{ handleChange, field }"
    >
      <n-input
        type="text"
        :on-update:value="handleChange"
        :default-value="field.value"
        size="small"
        clearable
        @keypress="onlyAllowNumber"
        placeholder="Declared value"
      >
        <template #prefix>
          <n-icon
            color="#F2C97DFF"
            :component="AttachMoneyRoundIcon"
          />
        </template>
      </n-input>
    </Field>
  </td>
  <td>
    <Field
      :name="`items[${index}].description`"
      v-slot="{ handleChange, field }"
    >
      <n-input
        type="textarea"
        :on-update:value="handleChange"
        :default-value="field.value"
        size="small"
        clearable
        placeholder="Description"
        rows="1"
      />
    </Field>
  </td>
  <td class="has-text-centered">
    <n-button
      size="small"
      strong
      secondary
      circle
      type="error"
      @click="remove(index)"
    >
      <template #icon>
        <n-icon size="18" :component="Delete20RegularIcon" />
      </template>
    </n-button>
  </td>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, computed, ref } from "vue";
import {
  Box24Regular as Box24RegularIcon,
  Delete20Regular as Delete20RegularIcon,
} from "@vicons/fluent";
import {
  AttachMoneyRound as AttachMoneyRoundIcon,
} from "@vicons/material";
import { Field } from "vee-validate";

const AsyncField = defineAsyncComponent({
  loader: async () => Field,
  loadingComponent: () => import("../../../loaderField/LoaderField.vue"),
});

export default defineComponent({
  components: {
    Field: AsyncField,
    TypeSelector : defineAsyncComponent(() => import("../typeSelector/TypeSelector.vue")),
  },
  props: {
    itemProp: Object,
    indexProp: Number,
  },
  setup({ itemProp, indexProp }, { emit }) {
    const onlyAllowNumber = (e: KeyboardEvent) => {
      if (!/\d/.test(e.key) && e.key !== ".") return e.preventDefault();
    };

    const item = computed(() => itemProp);
    const index = ref<number | undefined>(indexProp);

    const remove = (idx: number | undefined) => {
      emit("onClickRemoveItem", idx);
    };

    return {
      index,
      item,
      onlyAllowNumber,
      remove,
      Box24RegularIcon,
      Delete20RegularIcon,
      AttachMoneyRoundIcon
    };
  },
});
</script>
