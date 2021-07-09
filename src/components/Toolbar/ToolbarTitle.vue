<template>
  <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
    <q-icon :name="iconName" class="app-logo" />
  </q-btn>
</template>

<script lang="ts">
import { computed, defineComponent, inject, toRefs } from 'vue';

export default defineComponent({
  name: 'ToolbarTitle',
  setup(props) {
    const isDark = inject('is-dark')
    return {
      iconName: computed(() => {
        return isDark ? 'app:logo-white' : 'app:logo';
      }),
    };
  },
});
</script>
<style scoped>
.app-logo {
  width: 114px;
  height: 39px;
}
</style>
