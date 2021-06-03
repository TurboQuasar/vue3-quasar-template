<template>
  <q-btn @click="clickFn">点击上报埋点</q-btn>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { axios } from 'boot/axios';
export default defineComponent({
  name: 'GIO',
  setup() {
    return {
      clickFn: function () {
        const ai = 'b311885b8a4a8079';
        const sendingTime = +new Date();
        const data = [
          {
            cs1: '9128391',
            tm: +new Date(),
            t: 'cstm',
            n: 'BuyProduct',
            var: {
              product_name: '苹果',
              product_classify: '水果',
              product_price: 14,
            },
          },
        ];
        axios.post(
          `https://api.growingio.com/v3/${ai}/s2s/cstm?stm=${sendingTime}`,
          data
        );
      },
    };
  },
});
</script>
