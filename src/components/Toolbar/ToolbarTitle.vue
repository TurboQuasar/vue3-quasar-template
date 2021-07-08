<template>
  <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
    <q-icon name="app:logo" class="app-logo" />
    <!--    <q-toolbar-title shrink class="text-weight-bold">-->
    <!--      {{ $projectName }}-->
    <!--    </q-toolbar-title>-->
  </q-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ToolbarTitle',
  setup() {
    return {};
  },
});
</script>
<style scoped>
.app-logo {
  width: 114px;
  height: 39px;
}
</style>
