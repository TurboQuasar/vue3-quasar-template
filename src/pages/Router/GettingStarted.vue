<template>
  <base-content>
    <div class="base-markdown-content">
      <v-md-editor v-model="content" mode="preview" />
    </div>
  </base-content>
</template>

<script lang="ts">
import BaseContent from 'components/BaseContent/BaseContent.vue';
import SkeletonDemo from 'components/Skeleton/SkeletonDemo.vue';
import { defineComponent, onMounted, ref } from 'vue';
import { axios } from 'boot/axios';

export default defineComponent({
  name: 'GettingStarted',
  components: { SkeletonDemo, BaseContent },
  setup() {
    const content = ref('');

    async function getMsg() {
      const res = await axios.get('/data/startData.md', {
        responseType: 'text',
      });
      content.value = res.data;
    }
    getMsg();
    return {
      content,
    };
  },
});
</script>
