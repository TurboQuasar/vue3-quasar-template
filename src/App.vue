<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';
const myIcons = {
  'app:logo': 'img:/icons/logo.svg',
};
export default defineComponent({
  name: 'App',
  setup() {
    const $q = useQuasar();
    //添加iconfont图标映射
    $q.iconMapFn = (iconName) => {
      if (iconName.startsWith('icon')) {
        // we strip the "app:" part
        return {
          cls: 'icon iconfont ' + iconName,
        };
      }
      const icon = myIcons[iconName];
      if (icon !== void 0) {
        return { icon: icon };
      }
    };
  },
});
</script>
