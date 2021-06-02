<template>
  <div class="main-content">
    <q-scroll-area
      ref="scrollArea"
      :thumb-style="thumbStyle"
      :visible="false"
      style="height: 100%"
    >
      <slot />
    </q-scroll-area>
  </div>
</template>

<script lang="ts">
import { thumbStyle } from './ThumbStyle';
import {
  defineComponent,
  onMounted,
  ref,
  onUnmounted,
  onDeactivated,
  onActivated,
} from 'vue';
import { useRoute } from 'vue-router';
import type { QScrollArea } from 'quasar';
export default defineComponent({
  name: 'BaseContent',
  props: ['position'],
  setup() {
    const $route = useRoute();
    // 标记当前 BaseContent 所在路由的页面
    let BasePath = '';
    const scrollArea = ref<QScrollArea | null>(null);
    // 滚动
    function ScrollToPosition({ top, left }) {
      scrollArea.value!.setScrollPosition('vertical', top, 300);
      scrollArea.value!.setScrollPosition('horizontal', left, 300);
    }
    // 获取位置，在使用前请做好节流或防抖处理
    function getPosition() {
      return scrollArea.value!.getScrollPosition();
    }
    onMounted(() => {
      BasePath = $route.path;
      Object.freeze(BasePath);
      const t = window.sessionStorage.getItem($route.path);
      if (t) {
        const toPosition = JSON.parse(t);
        ScrollToPosition(toPosition.listScrollTop);
      }
    });
    onActivated(() => {
      const t = window.sessionStorage.getItem($route.path);
      if (t) {
        const toPosition = JSON.parse(t);
        ScrollToPosition(toPosition.listScrollTop);
      }
    });
    onDeactivated(() => {
      window.sessionStorage.setItem(
        BasePath,
        JSON.stringify({ listScrollTop: getPosition() })
      );
    });
    onUnmounted(() => {
      sessionStorage.removeItem(BasePath);
    });
    return {
      thumbStyle,
      scrollArea,
    };
  },
});
</script>
