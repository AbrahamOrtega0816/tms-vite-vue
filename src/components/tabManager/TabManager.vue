<template>
  <n-tabs
    v-model:value="name"
    addable
    animated
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
      v-for="panel in panels"
      :key="panel"
      :tab="panel.toString()"
      :name="panel"
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
    v-if="showModal"
    :openModal="showModal"
    @on-change-open-modal="(open) => showModal = open"
    @on-click-type-module="(type) => onAddNewTab(type)"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  ArrowBack as ArrowBackcon,
  ArrowForward as ArrowForwardIcon,
} from "@vicons/ionicons5";
import ModalConfirm from "./components/ModalConfirm.vue";

export default defineComponent({
  setup() {
    const nameRef = ref(1);
    const panelsRef = ref([1]);
    const showModal = ref(false);
    const handleClose = (name: number) => {
      const { value: panels } = panelsRef;
      const index = panels.findIndex((v) => name === v);
      panels.splice(index, 1);
      if (nameRef.value === name) {
        nameRef.value = panels[index];
      }
    };
    const handleAdd = () => {
      //   const newValue = panelsRef.value.length
      //     ? Math.max(...panelsRef.value) + 1
      //     : 1;
      //   panelsRef.value.push(newValue);
      //   nameRef.value = newValue;
      showModal.value = true;
    };
    const onClickNextTab = () => {
      if (nameRef.value < Math.max(...panelsRef.value))
        nameRef.value = nameRef.value + 1;
    };
    const onClickPreviousTab = () => {
      if (nameRef.value > Math.min(...panelsRef.value))
        nameRef.value = nameRef.value - 1;
    };

    const onAddNewTab = (type : number)=>{
      console.log(type);
    }

    return {
      ArrowForwardIcon,
      ArrowBackcon,
      showModal,
      panels: panelsRef,
      name: nameRef,
      handleClose,
      handleAdd,
      onClickNextTab,
      onClickPreviousTab,
      onAddNewTab,
    };
  },
  components: { ModalConfirm },
});
</script>
