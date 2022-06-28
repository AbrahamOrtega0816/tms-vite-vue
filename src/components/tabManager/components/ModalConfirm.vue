<template>
  <n-modal v-model:show="open" preset="dialog" title="Dialog">
    <template #header>
      <div>Chose Your Module</div>
    </template>
    <div class="is-flex mt-5 is-justify-content-center">
      <n-button-group>
        <n-button round class="w-125" @click="onClickChoseModule(typeModules.quote)">
          <template #icon>
            <n-icon :component="CreateOutlineIcon" />
          </template>
          QUOTE
        </n-button>
        <n-button round @click="onClickChoseModule(typeModules.shipment)">
          <template #icon>
            <n-icon :component="ReceiptOutlineIcon" />
          </template>
          SHIPMENT
        </n-button>
      </n-button-group>
    </div>
  </n-modal>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import { CreateOutline as CreateOutlineIcon , ReceiptOutline as ReceiptOutlineIcon } from "@vicons/ionicons5";
import { typeModules } from '@/common/constants/typeModule'

export default defineComponent({
  props: {
    openModal: Boolean,
  },
  emits: ["onChangeOpenModal","onClickTypeModule"],
  setup(props, { emit }) {

    const open = ref(props.openModal);

    watchEffect(() => emit("onChangeOpenModal", open.value));

    const onClickChoseModule = (module:number) =>{
      emit("onClickTypeModule", module);
      open.value = false;
    }

    return {
      ReceiptOutlineIcon,
      CreateOutlineIcon,
      open,
      typeModules,
      onClickChoseModule
    };
  },
});
</script>

<style scoped>
.w-125{
  width: 125px;
}
</style>
