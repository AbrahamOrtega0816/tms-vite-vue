<template>
  <n-layout>
    <Navbar />
    <n-layout has-sider class="h-100">
      <Sidebar />
      <n-layout-content
        content-style="padding: 24px;"
        :native-scrollbar="false"
      >
        <TabManager >
          <router-view></router-view>
        </TabManager>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "@/components/navbar/Navbar.vue";
import Sidebar from "@/components/sidebar/Sidebar.vue";
import TabManager from "@/components/tabManager/TabManager.vue";

const menuOptions = [
  {
    label: "Hear the Wind Sing",
    key: "hear-the-wind-sing",
  },
  {
    label: "Pinball 1973",
    key: "pinball-1973",
    disabled: true,
    children: [
      {
        label: "Rat",
        key: "rat",
      },
    ],
  },
  {
    label: "A Wild Sheep Chase",
    key: "a-wild-sheep-chase",
    disabled: true,
  },
  {
    label: "Dance Dance Dance",
    key: "Dance Dance Dance",
    children: [
      {
        type: "group",
        label: "People",
        key: "people",
        children: [
          {
            label: "Narrator",
            key: "narrator",
          },
          {
            label: "Sheep Man",
            key: "sheep-man",
          },
        ],
      },
      {
        label: "Beverage",
        key: "beverage",
        children: [
          {
            label: "Whisky",
            key: "whisky",
          },
        ],
      },
      {
        label: "Food",
        key: "food",
        children: [
          {
            label: "Sandwich",
            key: "sandwich",
          },
        ],
      },
      {
        label: "The past increases. The future recedes.",
        key: "the-past-increases-the-future-recedes",
      },
    ],
  },
];

export default defineComponent({
  components: {
    Navbar,
    Sidebar,
    TabManager
},
  setup() {
    return {
      menuOptions,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
