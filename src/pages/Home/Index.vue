<template><base-content>Home</base-content></template>
<script lang="ts">
import { defineComponent } from 'vue';
import BaseContent from 'components/BaseContent/BaseContent.vue';

export default defineComponent({
  components: { BaseContent },
  name: 'home',
  setup() {
    return {};
  },
});
</script>
