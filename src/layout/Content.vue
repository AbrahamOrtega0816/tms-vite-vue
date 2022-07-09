<template>
  <n-layout>
    <Navbar />
    <n-layout has-sider class="h-100" embedded>
      <Sidebar />
      <n-layout-content 
        content-style="padding: 24px;padding-bottom:90px;"
        :native-scrollbar="false"
      >
        <TabManager>
          <loading v-if="isLoading" :is-full-page="false"
          v-model:active="isLoading" color="#F2C97DFF" />
          <router-view></router-view>
        </TabManager>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script lang="ts">
import { computed, defineAsyncComponent, defineComponent } from "vue";
import instance from "@/services/axiosManager";
import { useLoadingBar } from "naive-ui";
import { useStore } from "@/stores";

export default defineComponent({
  components: {
    Navbar: defineAsyncComponent(
      () => import("@/components/navbar/Navbar.vue")
    ),
    Sidebar: defineAsyncComponent(
      () => import("@/components/sidebar/Sidebar.vue")
    ),
    TabManager: defineAsyncComponent(
      () => import("@/components/tabManager/TabManager.vue")
    ),
    Loading: defineAsyncComponent(() => import("vue-loading-overlay")),
  },
  setup() {
    const loadingBar = useLoadingBar();

    const store = useStore()

    const isLoading = computed(()=> store.loading)

    instance.interceptors.request.use(
      (config) => {
        loadingBar.start();
        return config;
      },
      (error) => {
        loadingBar.error();
        Promise.reject(error);
      }
    );

    instance.interceptors.response.use(
      (response) => {
        loadingBar.finish();
        const res = response.data;
        return res;
      },
      (error) => {
        loadingBar.error();
        if (error.response.status === 401) {
          console.log("Unauthorized Request");
        }
        return Promise.reject(error?.response?.data || error);
      }
    );

    return {
      isLoading
    };
  },
});
</script>

<style lang="scss" scoped></style>
