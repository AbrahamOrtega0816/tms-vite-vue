<template>
  <div class="pt-4 is-flex is-flex-direction-column gap-20">
    <div class="is-flex is-justify-content-space-between pr-4">
      <n-tooltip placement="right" trigger="hover" v-once>
        <template #trigger>
          <n-icon size="25" color="#70C0E8FF" :component="Info28RegularIcon" />
        </template>
        You can add items more easily with
        <span class="has-text-info">SHIFT + SPACE</span> and to remove the last
        item with <span class="has-text-info">SHIFT + DELETE</span> !
      </n-tooltip>
      <n-tooltip placement="left" trigger="hover" v-once>
        <template #trigger>
          <n-button
            @click="push(itemsInitialValues)"
            size="small"
            strong
            secondary
            circle
            type="primary"
            :disabled="disabledAdd"
          >
            <template #icon>
              <n-icon size="18" :component="AppsAddIn28RegularIcon" />
            </template>
          </n-button>
        </template>
        Add Item!
      </n-tooltip>
    </div>
    <div>
      <n-scrollbar x-scrollable>
        <n-table size="small" single-column>
          <thead class="has-text-centered">
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Weight(Lb)</th>
              <th>Length(In)</th>
              <th>Width(In)</th>
              <th>Height(In)</th>
              <th>Declared Value($)</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="item.key">
              <ItemsRow
                :key="index"
                :itemProp="item"
                :indexProp="index"
                @on-click-remove-item="
                  (idx) => {
                    if (items.length !== 1) remove(idx);
                  }
                "
              />
            </tr>
          </tbody>
        </n-table>
      </n-scrollbar>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, defineAsyncComponent } from "vue";
import {
  AppsAddIn28Regular as AppsAddIn28RegularIcon,
  Info28Regular as Info28RegularIcon,
} from "@vicons/fluent";
import { itemsInitialValues } from "@/common/models/quoteModel";
import { useFieldArray } from "vee-validate";
import hotkeys from "hotkeys-js";

export default defineComponent({
  components: {
    ItemsRow :  defineAsyncComponent(() => import("./components/itemRow/ItemsRow.vue")),
  },
  setup() {
    const { push, fields: items, remove } = useFieldArray("items");

    const disabledAdd = computed<boolean>(() => items.value.length === 10);

    hotkeys("shift+space,shift+backspace", (_, handler) => {
      switch (handler.key) {
        case "shift+space":
          if (items.value.length < 10) push(itemsInitialValues);
          break;
        case "shift+backspace":
          if (items.value.length !== 1) remove(items.value.length - 1);
          break;
      }
    });

    return {
      disabledAdd,
      items,
      push,
      remove,
      AppsAddIn28RegularIcon,
      Info28RegularIcon,
      itemsInitialValues,
    };
  },
});
</script>
