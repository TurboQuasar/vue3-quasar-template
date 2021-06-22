<template>
  <q-layout :view="viewStyle" class="full-height">
    <!-- HEADER START -->
    <q-header
      class="q-py-xs bg-white text-grey-8"
      height-hint="48"
      style="
        box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
        padding-bottom: 2px;
      "
    >
      <!-- 状态栏 -->
      <q-toolbar style="margin-top: -4px" class="q-electron-drag">
        <q-btn
          flat
          dense
          round
          aria-label="Menu"
          :icon="miniState === true ? 'menu_open' : 'menu'"
          @click="miniState = !miniState"
        />
        <!-- toolbar - title -->
        <toolbar-title />
        <!-- 面包屑 -->
        <breadcrumbs v-if="$q.screen.gt.sm" />
        <q-space />
        <!-- 右侧元素 -->
        <toolbar-item-right />
      </q-toolbar>

      <q-separator color="grey-3" />

      <!-- TAGVIEW -->
      <tag-view />
    </q-header>
    <!-- HEADER END -->

    <!-- slideBar START -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      content-class="bg-white"
      :width="240"
      :breakpoint="500"
      bordered
    >
      <base-menu />
    </q-drawer>
    <!-- slideBar END -->

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

export default {
  name: 'MainLayout',
  components: {
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
      leftDrawerOpen: ref(false),
      miniState: ref(true),
    };
  },
};
</script>
