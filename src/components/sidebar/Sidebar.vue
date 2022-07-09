<template>
  <n-layout-sider
    v-once
    collapse-mode="width"
    :collapsed-width="84"
    :width="220"
    show-trigger="bar"
    content-style="padding: 10px;"
    bordered
  >
    <n-menu
      v-once
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions"
      v-model:value="currentRoute"
    />
  </n-layout-sider>
</template>

<script lang="ts">
import { Component, computed, defineComponent, h } from "vue";
import { useRouter } from "vue-router";
import { NIcon } from "naive-ui";
import { HomeOutline as HomeIcon } from "@vicons/ionicons5";

const renderIcon = (icon: Component) => {
  return () => h(NIcon, null, { default: () => h(icon) });
};

const menuOptions = [
  {
    label: "Home",
    key: "home",
    icon: renderIcon(HomeIcon),
  },
];

export default defineComponent({
  setup() {
    const currentRoute = computed(() => {
      return useRouter().currentRoute.value.name;
    });

    return {
      currentRoute,
      menuOptions,
    };
  },
});
</script>

<style scoped></style>
