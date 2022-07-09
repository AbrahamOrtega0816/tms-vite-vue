<template>
  <form>
    <n-grid :x-gap="12" :cols="2">
      <n-grid-item>
        <CountrySelector />
      </n-grid-item>
    </n-grid>
  </form>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";

export default defineComponent({
  components: {
    CountrySelector: defineAsyncComponent(
      () => import("@/components/countrySelector/CountrySelector.vue")
    ),
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
