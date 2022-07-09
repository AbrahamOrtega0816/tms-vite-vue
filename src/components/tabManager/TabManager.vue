<template>
  <n-back-top :right="100" />
  <n-tabs
    animated
    v-model:value="currentTabIndex"
    addable
    type="card"
    closable
    tab-style="min-width: 80px;"
    @close="handleClose"
    @add="handleAdd"
  >
    <template #prefix>
      <n-button text type="primary" @click="onClickPreviousTab">
        <template #icon>
          <n-icon :component="ArrowBackcon" />
        </template>
      </n-button>
    </template>
    <n-tab-pane
      v-for="tab in tabs"
      v-memo="[tab]"
      :key="tab.id"
      :tab="tab.name"
      :name="tab.id"
      class="min-height"
    >
      <slot></slot>
    </n-tab-pane>
    <template #suffix>
      <n-button text type="primary" @click="onClickNextTab">
        <template #icon>
          <n-icon :component="ArrowForwardIcon" />
        </template>
      </n-button>
    </template>
  </n-tabs>
  <ModalConfirm
    v-memo="[showModal]"
    v-if="showModal"
    :openModal="showModal"
    @on-change-open-modal="(open) => (showModal = open)"
    @on-click-type-module="(type) => onAddNewTab(type)"
  />
</template>

<script lang="ts">
import {
  computed,
  defineAsyncComponent,
  defineComponent,
  ref,
  watchEffect,
} from "vue";
import {
  ArrowBack as ArrowBackcon,
  ArrowForward as ArrowForwardIcon,
} from "@vicons/ionicons5";
import { useStore } from "@/stores/tabsStores";
import { Imodule } from "@/common/constants/typeModule";

export default defineComponent({
  components: {
    ModalConfirm: defineAsyncComponent(
      () => import("./components/ModalConfirm.vue")
    ),
  },
  setup() {
    const store = useStore();

    const currentTabIndex = computed({
      // getter
      get() {
        return store.getCurrentTabIndex;
      },
      // setter
      set(newCurrentIndex: number) {
        store.setCurrentIndex(newCurrentIndex);
      },
    });

    const tabs = ref(store.getTabs);

    const showModal = ref(false);

    const handleClose = (id: number) => {
      store.removeTab(id);
    };

    const handleAdd = () => {
      showModal.value = true;
    };

    const onClickNextTab = () => {
      if (currentTabIndex.value < Math.max(...tabs.value.map((tab) => tab.id)))
        currentTabIndex.value = currentTabIndex.value + 1;
    };

    const onClickPreviousTab = () => {
      if (currentTabIndex.value > Math.min(...tabs.value.map((tab) => tab.id)))
        currentTabIndex.value = currentTabIndex.value - 1;
    };

    const onAddNewTab = (type: Imodule) => {
      store.addTab(type);
    };

    watchEffect(() => {
      if (tabs.value.length > 0) store.changeCurrentTab(currentTabIndex.value);
    });

    return {
      ArrowForwardIcon,
      ArrowBackcon,
      showModal,
      tabs,
      currentTabIndex,
      handleClose,
      handleAdd,
      onClickNextTab,
      onClickPreviousTab,
      onAddNewTab,
    };
  },
});
</script>

<style lang="scss" scoped>
  .min-height{
        min-height: calc(100vh - 160px);
  }
</style>
