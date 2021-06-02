<template>
  <base-content> home </base-content>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseContent from 'components/BaseContent/BaseContent.vue';

export default defineComponent({
  name: 'Home',
  components: {
    BaseContent,
  },
});
</script>
