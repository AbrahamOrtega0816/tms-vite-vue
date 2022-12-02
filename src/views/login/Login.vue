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
          <n-image lazy width="400" :src="logo" key="login_logo" />
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
                    placeholder="user"
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
                    <n-icon
                      v-if="!loader"
                      size="18"
                      color="#F2C97DFF"
                      :component="ArrowNext24RegularIcon"
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
import {
  defineComponent,
  markRaw,
  reactive,
  ref,
  defineAsyncComponent
} from "vue";
import logo from "@/assets/logos/logo.png";
import { useLoadingBar, useMessage } from "naive-ui";
import { Field, useForm } from "vee-validate";
import * as yup from "yup";
import route from "@/router";
import { ArrowNext24Regular as ArrowNext24RegularIcon } from "@vicons/fluent";
import { LoginForm } from "@/common/models/globalModel";
import { authService } from "@/services";
import { StatusCodes } from "http-status-codes";
import CryptoJS from 'crypto-js';

const validationSchema = markRaw(
  yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })
);

const AsyncField = defineAsyncComponent({
  loader: async () => Field,
  loadingComponent: () => import("@/components/loaderField/LoaderField.vue"),
});

export default defineComponent({
  components: {
    Field: AsyncField,
  },
  setup() {
    const loadingBar = useLoadingBar();
    const message = useMessage();

    const form = reactive(
      useForm<LoginForm>({
        initialValues: {
          email: "",
          password: "",
        },
        validationSchema,
      })
    );

    const loader = ref(false);

    const handleSubmit = async () => {
      const {
        meta: { valid },
        values,
      } = form;

      if (valid) {
        loader.value = true;
        loadingBar.start();

        const params = {
          ...values
        }

        params.password = 
        CryptoJS.AES.encrypt(params.password, import.meta.env.VITE_APP_SECRET_KEY).toString();

        await authService
          .login(params)
          .then(async (res) => {
            if (res.status === StatusCodes.OK) {
               route.push("/");
            } else {
              message.error(`${message}`);
            }
          })
          .catch((err) => {
            message.error(`${err.errors || "Error"}`);
          })
          .finally(() => {
            loadingBar.finish();
            loader.value = false;
          });
      } else {
        message.warning(`Please valid your information`);
      }
    };

    return {
      ArrowNext24RegularIcon,
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
