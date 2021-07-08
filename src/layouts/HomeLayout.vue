<template>
  <q-layout :view="viewStyle" class="full-height main-layout">
    <!-- HEADER START -->
    <q-header class="bg-white text-grey-8 row align-center">
      <!-- 状态栏 -->
      <q-toolbar>
        <!-- toolbar - title -->
        <toolbar-title />
        <q-space />
        <home-menu />
        <q-space />
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
import { computed, ref, onErrorCaptured } from 'vue';
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
    return {
      viewStyle: config.$SideBar,
      Max_keepAlive: config.$Max_KeepAlive,
      keepAliveList: computed(() => $store.getters['auth/getKeepAliveList']),
      key: computed(() => $route.fullPath),
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
}
</style>
