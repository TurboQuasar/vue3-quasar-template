<template>
  <q-btn @click="clickFn">点击上报埋点</q-btn>
  <q-btn @click="getReportData">获取上报数据</q-btn>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { axios } from 'boot/axios';
import { Notify } from 'quasar';
export default defineComponent({
  name: 'GIO',
  setup() {
    return {
      clickFn: function () {
        window.gio('track', 'testEvent');
      },
      // 收费
      getReportData: function () {
        axios
          .get(
            '/gio/v2/insights/day/custom_event/b311885b8a4a8079/20210623.json',
            {
              headers: {
                'X-Client-Id': '57f4cbaa2c7648ddbf5af3d69163486d',
                Authorization:
                  '4vxvVUTilAQW89CUcOcMqP3QSSvLIb7RxKo5bTDqyp21sByPu71BLdtwXR53mIgZ',
              },
              params: {
                minutes: 5,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch(() => {
            Notify.create({
              message: '未知错误',
              icon: 'warning',
              color: 'warning',
              position: 'top',
              timeout: 1500,
            });
          });
      },
    };
  },
});
</script>
