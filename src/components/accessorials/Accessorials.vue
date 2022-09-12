<template>
  <n-dynamic-tags v-model:value="tags" @create="onCreate">
    <template #input="{ submit, deactivate }">
      <n-select
        ref="selectInstRef"
        v-model:value="inputValue"
        size="small"
        placeholder="Accessorial"
        filterable
        :options="options"
        :on-update:value="submit"
        @blur="deactivate"
      />
    </template>
    <template #trigger="{ activate, disabled }">
      <n-button
        size="small"
        type="primary"
        dashed
        :disabled="disabled"
        @click="activate()"
      >
        <template #icon>
          <n-icon>
            <Add />
          </n-icon>
        </template>
        New Accessorial
      </n-button>
    </template>
  </n-dynamic-tags>
</template>

<script lang="ts">
import { defineComponent, ref, watch, nextTick } from "vue";
import { SelectInst, SelectOption } from "naive-ui";
import Add from "@vicons/ionicons5/Add";
import { find } from "lodash";
import { useField } from "vee-validate";

export default defineComponent({
  components: {
    Add,
  },
  setup() {
    const selectInstRef = ref<SelectInst  | null>(null);
    const { value } = useField('accessorials');
    watch(selectInstRef, (value) => {
      if (value) nextTick(() => value.focus());
    });
    const inputValueRef = ref("");
    const options : Array<SelectOption> =  [
        {
          label: "Everybody's Got Something to Hide Except Me and My Monkey",
          value: 'song0',
          disabled: true
        },
        {
          label: 'Drive My Car',
          value: 'song1'
        },
        {
          label: 'Norwegian Wood',
          value: 'song2'
        },
        {
          label: "You Won't See",
          value: 'song3',
          disabled: true
        },
        {
          label: 'Nowhere Man',
          value: 'song4'
        },
        {
          label: 'Think For Yourself',
          value: 'song5'
        },
        {
          label: 'The Word',
          value: 'song6'
        },
        {
          label: 'Michelle',
          value: 'song7',
          disabled: true
        },
        {
          label: 'What goes on',
          value: 'song8'
        },
        {
          label: 'Girl',
          value: 'song9'
        },
        {
          label: "I'm looking through you",
          value: 'song10'
        },
        {
          label: 'In My Life',
          value: 'song11'
        },
        {
          label: 'Wait',
          value: 'song12'
        }
    ]
    return {
      selectInstRef,
      tags: ref(value),
      onCreate: (id: string | number) => {
        const { label , value } = find(options as any, ['value', id]);
        return {
          label,
          value
        }
      },
      inputValue: inputValueRef,
      options
    };
  },
});
</script>
