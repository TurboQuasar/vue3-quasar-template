<template>
  <q-breadcrumbs
    class="flex items-center"
    active-color="none"
    style="transform: translateX(10px)"
  >
    <transition-group name="breadcrumb">
      <template v-for="(v, i) in breadcrumbs">
        <q-breadcrumbs-el
          v-if="v.title"
          class="items-center"
          style="vertical-align: middle"
          :label="translateTitle(v.title)"
          :icon="v.icon === '' ? undefined : v.icon"
          :key="i + v.title"
        >
          <template v-slot:default>
            <div
              v-if="breadcrumbs.length !== i + 1"
              style="margin: 0 8px 0 8px"
            >
              /
            </div>
          </template>
        </q-breadcrumbs-el>
      </template>
    </transition-group>
  </q-breadcrumbs>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, watch } from 'vue';
import { useStore } from 'vuex';
import { translateTitle } from 'utils/TranslateUtil';

export default defineComponent({
  name: 'Breadcrumbs',
  setup() {
    const $store = useStore();
    const breadcrumbs = computed(() => $store.getters['auth/getBreadcrumbs']);
    return {
      breadcrumbs,
      translateTitle,
    };
  },
});
</script>
