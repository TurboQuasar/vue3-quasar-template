<template>
  <base-content>
    <h5>{{ msg }}</h5>
  </base-content>
</template>

<script lang="ts">
import BaseContent from 'components/BaseContent/BaseContent.vue';
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'tableDetail',
  components: { BaseContent },
  setup() {
    const $route = useRoute();
    return {
      msg: ref($route.query),
    };
  },
});
</script>
