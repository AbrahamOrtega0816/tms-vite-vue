<template>
  <n-gradient-text :size="15" type="warning" class="mr-3 is-uppercase">
    hinck 
  </n-gradient-text>
  <n-popover placement="bottom" trigger="hover">
    <template #trigger>
      <n-avatar class="mr-5" round> HK </n-avatar>
    </template>
    <n-grid :x-gap="12" :cols="2" class="is-align-items-center">
      <n-grid-item>
        <n-button
          @click="onClickSingOut"
          text
          type="primary"
          class="is-uppercase"
        >
          <template #icon>
            <n-icon :component="Exitcon" />
          </template>
          sign out
        </n-button>
      </n-grid-item>
    </n-grid>
  </n-popover>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ExitOutline as Exitcon } from "@vicons/ionicons5";
import { useStore } from "@/stores";
import route from "@/router";

export default defineComponent({
  setup() {
    const store = useStore();

    const onClickSingOut = async () => {
      await store.singOut();
      route.push("/login");
    };

    return {
      onClickSingOut,
      Exitcon,
    };
  },
});
</script>

<style scoped></style>
