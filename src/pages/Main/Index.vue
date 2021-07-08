<template><base-content>Main</base-content></template>
<script lang="ts">
import { defineComponent } from 'vue';
import BaseContent from 'components/BaseContent/BaseContent.vue';

export default defineComponent({
  components: { BaseContent },
  name: 'main',
  setup() {
    return {};
  },
});
</script>
