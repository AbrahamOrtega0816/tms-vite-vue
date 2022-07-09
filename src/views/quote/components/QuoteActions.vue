<template>
    <n-button 
    :loading="loading"
    :disabled="loading"
    @click="onClickGetQuote()"
    strong secondary round type="warning">
      <template #icon>
        <n-icon
          size="18"
          color="#F2C97DFF"
          :component="VehicleTruckCube24RegularIcon"
        />
      </template>
      GET QUOTE
    </n-button>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { VehicleTruckCube24Regular as VehicleTruckCube24RegularIcon } from "@vicons/fluent";

export default defineComponent({
  setup() {
    const loading = ref(false);
    const onClickGetQuote = ()=>{
      
    }
    return { 
      onClickGetQuote,
      loading,
      VehicleTruckCube24RegularIcon 
    };
  },
});
</script>

