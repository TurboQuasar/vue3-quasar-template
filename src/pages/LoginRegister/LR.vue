<template>
  <div class="lr-comp">
    <div class="lr-shadow"></div>
    <div class="lr-form">
      <div class="lr-header">{{ title }}</div>
      <div class="lr-tab">
        <div class="lr-tab-title" v-for="tab in tabList" :key="tab">
          {{ tab.tabName }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      title: '登录/注册',
      tabList: [
        {
          tabName: '手机',
          isActive: true,
          username: '',
          password: '',
        },
        {
          tabName: '邮箱',
          isActive: false,
          username: '',
          password: '',
        },
      ],
    };
  },
});
</script>
<style lang="scss">
.lr-comp {
  width: 481px;
  height: 508px;
  position: relative;
  .lr-shadow {
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #72464a 0%, #215282 100%);
    filter: blur(20px);
  }
  .lr-form {
    width: 450px;
    height: 388px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    background: #ffffff;
    border-radius: 10px;
    .lr-header {
      margin-top: 15px;
      text-align: center;
      color: #808080;
      font-size: 18px;
      font-weight: 600;
    }
  }
}
</style>
