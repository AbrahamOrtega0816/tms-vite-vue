<template>
  <n-layout-header bordered>
    <n-grid :x-gap="12" :cols="2" class="is-align-items-center">
      <n-grid-item class="is-flex is-align-items-center">
        <n-image width="70" :src="logo" />
        <div class="wrapper">
          <div class="bg">logistics</div>
          <div class="fg">logistics</div>
        </div>
      </n-grid-item>
      <n-grid-item
        class="is-flex is-justify-content-flex-end is-align-items-center gap-20"
      >
        <div>
          <Search />
        </div>
        <div class="is-flex is-align-items-center">
          <Profile />
        </div>
      </n-grid-item>
    </n-grid>
  </n-layout-header>
</template>

<script lang="ts">
import logo from "@/assets/logos/logo.png";
import { defineComponent } from "vue";
import Profile from "./components/Profile.vue";
import Search from "./components/Search.vue";

export default defineComponent({
  components: {
    Profile,
    Search,
  },
  setup() {
    return {
      logo,
    };
  },
});
</script>

<style scoped>
.wrapper {
  background: radial-gradient(#272727, #1b1b1b);
  display: grid;
  grid-template-areas: "overlap";
  place-content: center;
  text-transform: uppercase;
}
.wrapper > div {
  background-clip: text;
  -webkit-background-clip: text;
  color: #363833;
  font-family: "Poppins", sans-serif;
  font-weight: 900;
  grid-area: overlap;
  letter-spacing: 1px;
  -webkit-text-stroke: 4px transparent;
}
div.bg {
  background-image: repeating-linear-gradient(
    105deg,
    #ffb338 0%,
    #77571d 5%,
    #ffb338 12%
  );
  color: transparent;
  filter: drop-shadow(5px 15px 15px black);
  transform: scaleY(1.05);
  transform-origin: top;
}
div.fg {
  background-image: repeating-linear-gradient(
    5deg,
    #ffb338 0%,
    #77571d 23%,
    #ffb338 31%
  );
  color: #1e2127;
  transform: scale(1);
}
.gap-20 {
  gap: 20px;
}
</style>
