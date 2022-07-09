<template>
  <form class="pb-5">
    <n-grid :x-gap="2" :cols="5" item-responsive>
      <n-grid-item span="5 500:5 600:5 800:2" class="is-flex gap-20 py-3">
        <n-grid
          item-responsive
          :x-gap="20"
          :y-gap="20"
          :cols="6"
          class="is-flex is-align-items-center"
        >
          <n-grid-item span="2 500:2 600:1 800:1">
            <CountrySelector />
          </n-grid-item>
          <n-grid-item span="1 500:2 600:1 800:1">
            <n-tooltip v-once placement="bottom" trigger="hover">
              <template #trigger>
                <n-icon
                  class="mt-1"
                  size="25"
                  color="#F2C97DFF"
                  :component="ArrowForwardCircleOutlineIconn"
                />
              </template>
              To!
            </n-tooltip>
          </n-grid-item>
          <n-grid-item span="2 500:2 600:1 800:1">
            <CountrySelector destination />
          </n-grid-item>
        </n-grid>
      </n-grid-item>

      <n-grid-item span="5 500:5 600:5 800:3" class="is-flex gap-20 py-3">
        <n-grid :x-gap="20" :y-gap="20" :cols="3" item-responsive>
          <n-grid-item span="3 500:3 600:1 800:1">
            <ZipCode />
          </n-grid-item>
          <n-grid-item span="3 500:3 600:1 800:1">
            <ZipCode destination />
          </n-grid-item>
          <n-grid-item span="3 500:3 600:1 800:1">
            <PickupDate />
          </n-grid-item>
        </n-grid>
      </n-grid-item>
      <n-grid-item span="5 500:5 600:5 800:5" class="mb-6">
        <Items />
      </n-grid-item>
      <n-grid-item span="5 500:5 600:5 800:5" class="quote-actions">
        <QuoteActions />
      </n-grid-item>
    </n-grid>
  </form>
</template>

<script lang="ts">
import {
  defineAsyncComponent,
  defineComponent,
  onMounted,
  reactive,
  watch,
} from "vue";
import { useForm } from "vee-validate";
import {
  QuoteForm,
  validationSchema,
  quoteInitialValues,
} from "@/common/models/quoteModel";
import { useStore } from "@/stores/tabsStores";
import { ArrowForwardCircleOutline as ArrowForwardCircleOutlineIconn } from "@vicons/ionicons5";
import { storeToRefs } from "pinia";
import { cloneDeep } from "lodash";

export default defineComponent({
  components: {
    CountrySelector: defineAsyncComponent(
      () => import("@/components/countrySelector/CountrySelector.vue")
    ),
    ZipCode: defineAsyncComponent(
      () => import("@/components/zipCode/ZipCode.vue")
    ),
    PickupDate: defineAsyncComponent(
      () => import("@/components/pickupDate/pickupDate.vue")
    ),
    Items: defineAsyncComponent(() => import("@/components/items/items.vue")),
    QuoteActions: defineAsyncComponent(
      () => import("./components/QuoteActions.vue")
    ),
  },
  setup() {
    const store = useStore();

    const { tabIndex } = storeToRefs(store);

    const initialValues: QuoteForm = {
      ...quoteInitialValues,
      ...store.getCurrentDataInTab(tabIndex.value),
    };

    const form = reactive(
      useForm<QuoteForm>({
        initialValues,
        validationSchema,
      })
    );

    onMounted(() => {
      form.resetForm({
        values: {
          ...quoteInitialValues,
          ...store.getCurrentDataInTab(tabIndex.value),
        },
      });

      watch(
        () => form.values,
        (values: QuoteForm) => {
          store.setCurrentDataInTab(tabIndex.value, cloneDeep(values));
        },
        { deep: true }
      );
    });

    return {
      ArrowForwardCircleOutlineIconn,
    };
  },
});
</script>

<style scoped lang="scss">
.quote-actions {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
