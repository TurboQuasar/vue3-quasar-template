<template>
  <q-scroll-area :visible="false" class="fit" :thumb-style="thumbStyleOfMenu">
    <div>
      <!-- 动态菜单 -->
      <q-list>
        <base-menu-item
          :my-router="menuList"
          :init-level="0"
          :bg-color="bgColor"
          :duration="300"
          :bg-color-level="1"
        />
      </q-list>
    </div>
  </q-scroll-area>
</template>

<script lang="ts">
import { thumbStyleOfMenu } from 'components/BaseContent/ThumbStyle';
import BaseMenuItem from './BaseMenuItem.vue';
import BottomLink from './BottomLink.vue';
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
export default defineComponent({
  name: 'base-menu',
  components: { BaseMenuItem, BottomLink },
  setup() {
    const $store = useStore();
    return {
      menuList: $store.getters['auth/getRoutes'][0].children,
      bgColor: 'bg-white',
      thumbStyleOfMenu,
    };
  },
});
</script>
