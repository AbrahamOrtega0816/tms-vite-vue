<template>
  <n-config-provider :theme="darkTheme" :theme-overrides="themeOverrides">
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider :placement="placement" :duration="duration">
            <component :is="resolveLayout" />
            <VueQueryDevTools />
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script lang="ts">
import {
  computed,
  defineAsyncComponent,
  defineComponent,
  ref,
} from "vue";
import { darkTheme, MessageProviderProps } from "naive-ui";
import { useRouter } from "./utils";
import { GlobalThemeOverrides } from "naive-ui";
import { VueQueryDevTools } from "vue-query/devtools";

export default defineComponent({
  components: {
    LayoutBlank: defineAsyncComponent(() => import("@/layout/Blank.vue")),
    LayoutContent: defineAsyncComponent(() => import("@/layout/Content.vue")),
    VueQueryDevTools
  },
  setup() {
    const { route } = useRouter();
    const placement = ref<MessageProviderProps['placement']>('top-right')
    const duration = ref<MessageProviderProps['duration']>(5000)
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
      duration,
      placement,
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
