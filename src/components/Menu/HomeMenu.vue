<template>
  <q-list class="row align-center full-height">
    <home-menu-item
      :my-router="HomeRoute.children"
      :init-level="0"
      :bg-color="bgColor"
      :duration="300"
      :bg-color-level="1"
      :base-path="HomeRoute.path"
      class="row align-center full-height"
    />
  </q-list>
</template>

<script lang="ts">
import { thumbStyleOfMenu } from 'components/BaseContent/ThumbStyle';
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { HomeRoute } from 'router/routes';
import HomeMenuItem from 'components/Menu/HomeMenuItem.vue';
export default defineComponent({
  name: 'homeMenu',
  components: { HomeMenuItem },
  setup() {
    const $store = useStore();
    return {
      HomeRoute,
      bgColor: 'bg-white',
      thumbStyleOfMenu,
    };
  },
});
</script>
