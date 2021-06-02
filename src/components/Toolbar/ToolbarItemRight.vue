<template>
  <div class="q-gutter-sm row items-center no-wrap">
    <q-input
      dense
      outlined
      v-model="search"
      style="min-width: 60px"
      input-class="text-right"
      class="q-ml-md"
    >
      <template v-slot:append>
        <q-icon v-if="search === ''" name="search" />
        <q-icon
          v-else
          name="clear"
          class="cursor-pointer"
          @click="search = ''"
        />
      </template>
    </q-input>
    <q-btn
      round
      dense
      flat
      :icon="this.$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
      v-if="$q.screen.gt.sm"
      @click="fullScreen"
    >
      <q-tooltip v-if="!this.$q.fullscreen.isActive">全屏</q-tooltip>
      <q-tooltip v-if="this.$q.fullscreen.isActive">退出全屏</q-tooltip>
    </q-btn>
    <q-btn round dense flat icon="video_call" v-if="$q.screen.gt.sm">
      <q-tooltip>创建</q-tooltip>
    </q-btn>
    <q-btn round dense flat icon="apps" v-if="$q.screen.gt.sm">
      <q-tooltip>应用</q-tooltip>
    </q-btn>
    <q-btn round dense flat icon="message" v-if="$q.screen.gt.sm">
      <q-tooltip>消息</q-tooltip>
    </q-btn>
    <q-btn round dense flat icon="notifications">
      <q-badge color="red" text-color="" floating> 2 </q-badge>
      <q-tooltip>通知</q-tooltip>
    </q-btn>
    <q-btn round flat>
      <q-menu>
        <div class="row no-wrap q-pa-md">
          <div class="column items-center">
            <q-avatar size="72px">
              <img :src="$PUBLIC_PATH + 'data/avatar.jpg'" />
            </q-avatar>

            <div class="text-subtitle1 q-mt-md q-mb-xs">Hi！ {{ role }}</div>

            <q-btn
              color="primary"
              label="Logout"
              size="sm"
              v-close-popup
              @click="logout"
            />
          </div>
        </div>
      </q-menu>
      <q-avatar size="26px">
        <img :src="$PUBLIC_PATH + 'data/avatar.jpg'" />
      </q-avatar>
      <q-tooltip>账号</q-tooltip>
    </q-btn>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'ToolbarItemRight',
  setup() {
    const $store = useStore();
    const $router = useRouter();
    const $q = useQuasar();

    function fullScreen() {
      if ($q.fullscreen.isActive) {
        // 退出全屏模式：
        $q.fullscreen
          .exit()
          .then(() => {
            // v1.5.0+
            // success!
          })
          // eslint-disable-next-line handle-callback-err
          .catch((err) => {
            // v1.5.0+
            // oh, no!!!
          });
      } else {
        // 请求全屏模式：
        $q.fullscreen
          .request()
          .then(() => {
            // v1.5.0+
            // success!
          })
          // eslint-disable-next-line handle-callback-err
          .catch((err) => {
            // v1.5.0+
            // oh, no!!!
          });
      }
    }

    function logout() {
      $store.commit('auth/LOGOUT');
      void $router.push('/login');
    }
    return {
      search: ref(''),
      role: computed(() => $store.getters['auth/getRole']),
      fullScreen,
      logout,
    };
  },
});
</script>
