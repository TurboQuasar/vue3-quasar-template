<template>
  <q-layout :view="viewStyle" class="full-height main-layout">
    <!-- HEADER START -->
    <q-header
      class="bg-white text-333333 row align-center"
      :class="{ 'bg-232323 text-white': isDark }"
    >
      <!-- 状态栏 -->
      <q-toolbar>
        <!-- toolbar - title -->
        <toolbar-title />
        <q-space />
        <home-menu />
        <q-space />
        <q-btn
          class="login-register-btn"
          @click="handleClickLoginRegisterBtn"
          >{{ loginRegisterBtnName }}</q-btn
        >
      </q-toolbar>
    </q-header>
    <!-- HEADER END -->
    <q-footer>
      <q-toolbar>
        <q-toolbar-title>Footer</q-toolbar-title>
      </q-toolbar>
    </q-footer>
    <!-- container START -->
    <!--    why not  keepAlive && suspense ?-->
    <!--    https://github.com/vuejs/vue-next/issues/3652-->
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <q-page-container class="app-main full-height">
          <keep-alive :max="Max_keepAlive" :include="keepAliveList">
            <component :is="Component" :key="$route.fullPath" />
          </keep-alive>
        </q-page-container>
      </transition>
    </router-view>
    <!-- container END -->
  </q-layout>
</template>

<script lang="ts">
import BaseMenu from 'components/Menu/BaseMenu.vue';
import TagView from 'components/TagView/TagView.vue';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs.vue';
import ToolbarTitle from 'components/Toolbar/ToolbarTitle.vue';
import ToolbarItemRight from 'components/Toolbar/ToolbarItemRight.vue';
import { config } from 'src/config';
import { useStore } from 'vuex';
import { computed, ref, onErrorCaptured, provide } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HomeMenu from 'components/Menu/HomeMenu.vue';

export default {
  name: 'MainLayout',
  components: {
    HomeMenu,
    ToolbarItemRight,
    ToolbarTitle,
    Breadcrumbs,
    TagView,
    BaseMenu,
  },
  setup() {
    const $store = useStore();
    const $route = useRoute();
    const isDark = computed(() => {
      return ['home', 'loginRegister'].includes($route.name);
    });
    provide('is-dark', isDark);
    return {
      viewStyle: config.$SideBar,
      Max_keepAlive: config.$Max_KeepAlive,
      keepAliveList: computed(() => $store.getters['auth/getKeepAliveList']),
      key: computed(() => $route.fullPath),
      loginRegisterBtnName: '登录/注册',
      handleClickLoginRegisterBtn: () => {
        // $route.push()
      },
      isDark,
    };
  },
};
</script>
<style lang="scss">
.main-layout {
  .q-drawer {
    box-shadow: 0 2px 6px 0 #f2f8ff;
    background-color: #ffffff;
  }
  .q-header {
    height: 60px;
    box-shadow: 0 2px 6px 0 #f2f8ff;
  }
  .login-register-btn {
    width: 103px;
    height: 30px;
    background: $yellow-;
    border-radius: 15px;
    color: #ffffff;
  }
  .bg-232323 {
    background-color: #232323 !important;
  }
  .text-333333 {
    color: $gray-400;
  }
}
</style>
