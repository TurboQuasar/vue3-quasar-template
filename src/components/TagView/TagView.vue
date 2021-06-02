<template>
  <div
    class="row"
    :style="{ margin: !$q.screen.gt.sm ? '' : '0px 15px 0px 15px' }"
  >
    <q-tabs
      align="left"
      active-color="primary"
      class="bg-white col-12"
      dense
      swipeable
      inline-label
      indicator-color="transparent"
      :outside-arrows="!!$q.platform.is.electron"
      :breakpoint="0"
    >
      <q-route-tab
        class="tagView"
        to="/"
        no-caps
        content-class="tagView-q-router-tab"
        :style="isWeChart ? ' line-height: normal' : ''"
      >
        <template v-slot:default>
          <q-icon size="1.3rem" name="home" />
          <div class="line-limit-length" style="margin: 0px 5px 0px 5px">
            主页
          </div>
        </template>
      </q-route-tab>

      <q-route-tab
        class="tagView"
        v-for="(v, i) in tagView"
        :key="v.fullPath + i"
        :to="v.fullPath"
        no-caps
        content-class="tagView-q-router-tab"
        :style="isWeChart ? ' line-height: normal' : ''"
      >
        <template v-slot:default>
          <q-icon size="1.3rem" v-if="v.icon" :name="v.icon" />
          <div class="line-limit-length">{{ v.title }}</div>
          <q-icon
            class="tagView-remove-icon"
            style="display: inline-flex"
            name="close"
            @click.prevent.stop="removeTagView(i)"
          />
          <q-menu touch-position context-menu>
            <q-list dense>
              <q-item clickable v-close-popup>
                <q-item-section @click="removeOthersTagView(i)">
                  关闭其他
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section @click="removeRightTagView(i)">
                  关闭右侧
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section @click="removeLeftTagView(i)">
                  关闭左侧
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section @click="removeAllTagView">
                  关闭所有
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </template>
      </q-route-tab>
    </q-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'TagView',
  setup() {
    const $store = useStore();

    /**
     * 如果是微信浏览器，则添加 line-height: normal 样式
     */
    const isWeChart = computed(
      () => navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
    );

    let tagView = computed(() => $store.getters['auth/getTagView']);

    function removeAllTagView() {
      $store.dispatch('auth/removeTagView');
    }

    function removeTagView(i) {
      $store.dispatch('auth/removeTagView', i);
    }

    function removeLeftTagView(i) {
      $store.dispatch('auth/removeTagView', { side: 'left', index: i });
    }

    function removeRightTagView(i) {
      $store.dispatch('auth/removeTagView', { side: 'right', index: i });
    }

    function removeOthersTagView(i) {
      $store.dispatch('auth/removeTagView', { side: 'others', index: i });
    }
    return {
      tagView,
      isWeChart,
      removeAllTagView,
      removeTagView,
      removeLeftTagView,
      removeRightTagView,
      removeOthersTagView,
    };
  },
});
</script>
<style lang="scss">
/* 重置 quasar 内部 tab 样式 */
.tagView-q-router-tab {
  min-width: 40px !important;
}
</style>
<style lang="css" scoped>
.tagView {
  margin: 1.5px 3px 0 3px;
  min-height: 20px;
  padding: 0 8px;
  background: white;
  transition: all 0.5s;
  border-radius: 0;
  height: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tagView-remove-icon {
  font-size: 1rem;
  border-radius: 0.2rem;
  opacity: 0.58;
  transition: all 0.3s;
}

.tagView-remove-icon:hover {
  opacity: 1;
}

.line-limit-length {
  margin: 0px 5px 0px 7px;
  overflow: hidden;
  max-width: 180px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
