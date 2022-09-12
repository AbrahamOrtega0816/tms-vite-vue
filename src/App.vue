<template>
  <n-config-provider :theme="darkTheme" :theme-overrides="themeOverrides">
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <component :is="resolveLayout" />
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script lang="ts">
import { computed, defineAsyncComponent, defineComponent } from "vue";
import { darkTheme } from "naive-ui";
import { useRouter } from "./utils";
import { GlobalThemeOverrides } from "naive-ui";

export default defineComponent({
  components: {
    LayoutBlank: defineAsyncComponent(() => import("@/layout/Blank.vue")),
    LayoutContent: defineAsyncComponent(() => import("@/layout/Content.vue")),
  },
  setup() {
    const { route } = useRouter();

    const resolveLayout = computed(() => {
      // Handles initial route
      if (route?.value?.name === null) return null;

      if (route?.value?.meta.layout === "blank") return "layout-blank";

      return "layout-content";
    });

    const themeOverrides: GlobalThemeOverrides = {
      common: {
        primaryColor: "#F2C97DFF",
        primaryColorHover: "#F5D599FF",
        primaryColorPressed: "#E6C260FF",
        primaryColorSuppl: "rgb(240, 138, 0)",
      },
    };

    return {
      resolveLayout,
      darkTheme,
      themeOverrides,
    };
  },
});
</script>

<style scoped>
  @import "@/assets/main.scss";
</style>
