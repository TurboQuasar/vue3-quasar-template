<template>
  <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
    <q-icon :name="iconName" class="app-logo" />
  </q-btn>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue';

export default defineComponent({
  name: 'ToolbarTitle',
  props: {
    isDark: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    return {
      iconName: computed(() => {
        return toRefs(props).isDark.value ? 'app:logo-white' : 'app:logo';
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
