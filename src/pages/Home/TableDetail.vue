<template>
  <base-content>
    <h5>{{ msg }}</h5>
  </base-content>
</template>

<script lang="ts">
import BaseContent from 'components/BaseContent/BaseContent'
import {defineComponent, ref} from "vue";

export default defineComponent({
  name: 'tableDetail',
  components: { BaseContent },
  setup() {
    return {
      msg: ref(this.$route.query)
    }
  }
})
</script>
