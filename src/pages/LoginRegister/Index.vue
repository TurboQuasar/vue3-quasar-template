<template>
  <base-content class="bg-232323 login-register">
    <div class="full-width full-height row flex justify-center">
      <q-icon name="app:login-register" class="icon-login-register" />
      <l-r />
    </div>
  </base-content>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import BaseContent from 'components/BaseContent/BaseContent.vue';
import LR from './LR.vue';

export default defineComponent({
  components: { LR, BaseContent },
  name: 'login-register',
  setup() {
    return {};
  },
});
</script>
<style lang="scss">
.login-register {
  .icon-login-register {
    width: 673px;
    height: 421px;
  }
}
</style>
