<template>
  <div
    class="flex justify-center items-center q-electron-drag"
    style="height: 100%"
  >
    <div
      class="row base-card-shadow electron-hide"
      style="width: 60vw; min-width: 300px"
    >
      <div
        class="col-6 flex justify-center items-center"
        v-show="$q.screen.gt.sm"
      >
        <q-skeleton type="text" height="70%" width="50%" v-if="!isLottieF" />
      </div>
      <q-separator vertical inset v-if="$q.screen.gt.sm" />
      <div class="col flex justify-center items-center">
        <q-card
          square
          style="min-width: 290px; height: 100%; width: 60%"
          class="no-shadow"
        >
          <q-card-section align="center">
            <h3 class="text-uppercase">{{ $projectName }}</h3>
            <!-- 用户名 -->
            <q-input
              class="login-input"
              clearable
              standout="bg-cyan text-white"
              bottom-slots
              v-model="username"
              label="账号"
            >
              <template v-slot:prepend>
                <q-icon name="account_circle" />
              </template>
            </q-input>
            <!-- 密码 -->
            <q-input
              class="login-input"
              standout="bg-cyan text-white"
              bottom-slots
              v-model="password"
              :label="$t('password')"
              :type="isPwd ? 'password' : 'text'"
              hint=""
            >
              <template v-slot:prepend>
                <q-icon name="vpn_key" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>

            <!-- 登录按钮 -->
            <q-btn
              :loading="loading"
              class="login-btn bg-login-card-input"
              text-color="white"
              unelevated
              label=""
              style="font-size: large"
              @click="login"
              >登 录 系 统
            </q-btn>
            <div class="row justify-between" style="margin-bottom: 20px">
              <q-btn flat label="忘记密码" />
              <q-btn outline label="我要注册" />
            </div>
            <p class="text-grey" align="left">
              账号2 ：test &nbsp;&nbsp;&nbsp;&nbsp;密码均为空
            </p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'login',
  setup() {
    const isPwd = ref(true);
    const username = ref('admin');
    const password = ref('');
    const loading = ref(false);
    const percentage = ref(0);
    const isLottieF = ref(false);

    const $router = useRouter();
    const $store = useStore();
    const $q = useQuasar();
    function login() {
      loading.value = !loading.value;
      $store
        .dispatch('auth/login', {
          username: username.value,
          password: password.value,
        })
        .then(() => {
          $router.push('/').then((e) => {
            $q.notify({
              icon: 'insert_emoticon',
              message: `hi，${username.value} 欢迎回来`,
              color: 'green',
              position: 'top',
              timeout: 1500,
            });
            loading.value = !loading.value;
          });
        })
        .catch((err) => {
          console.error(err);
          loading.value = !loading.value;
          $q.notify({
            icon: 'announcement',
            message: '账号错误',
            color: 'red',
            position: 'top',
            timeout: 1500,
          });
        });
    }
    return {
      login,
      isPwd,
      username,
      password,
      loading,
      percentage,
      isLottieF,
    };
  },
});
</script>

<style scoped>
.login-btn {
  font-size: large;
  margin-top: 0;
  margin-bottom: 20px;
  width: 100%;
}

.bg-login-card-input {
  background: linear-gradient(to right, #36d1dc 1%, #5b86e5 99%);
  transition: all 0.3s ease-in-out;
  background-size: 200% auto;
}

.bg-login-card-input:hover {
  background-position: right center;
  box-shadow: 0 12px 20px -11px #5b86e5;
}
</style>
