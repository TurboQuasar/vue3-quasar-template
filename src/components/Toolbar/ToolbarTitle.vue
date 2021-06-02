<template>
  <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
    <q-toolbar-title shrink class="text-weight-bold">
      {{ $projectName }}
    </q-toolbar-title>
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
