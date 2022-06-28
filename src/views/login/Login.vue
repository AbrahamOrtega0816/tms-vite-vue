<template>
  <n-grid
    v-on:keyup.enter="handleSubmit"
    :x-gap="1"
    :cols="1"
    class="is-flex is-justify-content-flex-start h-100 bg-login"
  >
    <n-grid-item class="is-flex is-align-self-flex-start ml-3">
      <n-grid :x-gap="2" :cols="1">
        <n-grid-item class="has-text-centered">
          <n-image width="400" :src="logo" />
        </n-grid-item>
        <n-grid-item>
          <n-card>
            <n-grid :x-gap="12" :y-gap="1" :cols="1">
              <n-grid-item
                class="is-flex is-justify-content-center has-text-centered"
              >
                <form class="login-form">
                  <Field
                    name="email"
                    type="email"
                    as="n-input"
                    autofocus
                    placeholder="User"
                  />
                  <Field
                    name="password"
                    type="password"
                    as="n-input"
                   show-password-on="mousedown"
                    placeholder="password"
                  />

                  <n-button
                    :disabled="loader"
                    type="warning"
                    dashed
                    @click="handleSubmit"
                  >
                    <font-awesome-icon
                      v-if="!loader"
                      :icon="['fa', 'arrow-right-to-bracket']"
                    />
                    <n-spin v-else size="small" />
                  </n-button>
                </form>
              </n-grid-item>
            </n-grid>
          </n-card>
        </n-grid-item>
      </n-grid>
    </n-grid-item>
  </n-grid>
</template>

<script lang="ts">
import { defineComponent, markRaw, reactive, ref } from "vue";
import logo from "@/assets/logos/logo.png";
import { useLoadingBar, useNotification } from "naive-ui";
import { Field, useForm, useField } from "vee-validate";
import * as yup from "yup";
import route from "@/router";
import { useStore } from "@/stores";

interface LoginForm {
  email: string;
  password: string;
}

const validationSchema = markRaw(
  yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  })
);

export default defineComponent({
  props: {},
  components: {
    Field,
  },
  setup() {
    const store = useStore();
    const loadingBar = useLoadingBar();
    const notification = useNotification();

    const form = reactive(
      useForm<LoginForm>({
        initialValues: {
          email: "",
          password: "",
        },
        validationSchema,
      })
    );

    const field = reactive(useField(""));

    const loader = ref(false);

    const handleSubmit = async () => {
      loader.value = true;
      loadingBar.start();

      const {
        meta: { valid },
        values,
      } = form;

      if (valid) {
        store.setToken(values.email);
        loadingBar.finish();
        loader.value = false;
        route.push("/");
      } else {
        notification.warning({
          title: "What to say?",
        });
      }

      setTimeout(() => {
        loader.value = false;
        loadingBar.finish();
      }, 1000);
    };

    return {
      field,
      form,
      handleSubmit,
      logo,
      loader,
    };
  },
});
</script>

<style scoped>
.n-card {
  max-width: 500px;
}
.login-form {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
.bg-login {
  background: linear-gradient(rgb(0 0 0 / 50%), rgb(0 0 0 / 50%)),
    url("@/assets/img/bg-login-2.jpg");
  background-size: cover;
}
</style>

function useRoute() { throw new Error("Function not implemented."); }
