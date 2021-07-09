<template>
  <div class="lr-comp">
    <div class="lr-shadow"></div>
    <div class="lr-form">
      <div class="lr-header">{{ title }}</div>
      <div class="lr-tab flex row justify-between">
        <div
          class="lr-tab-title"
          v-for="(tab, i) in tabList"
          :key="tab"
          :class="{ 'text-429CF8': selectedIndex === i }"
        >
          {{ tab.tabName }}
        </div>
      </div>
      <div>
        <q-input
          v-model="tabList[0].username"
          placeholder="请输入手机号"
          class="lr-input"
        >
          <template v-slot:prepend>
            <span class="phone-prefix">+86</span>
          </template>
        </q-input>
        <q-input
          v-model="tabList[0].password"
          type="password"
          placeholder="请输入验证码"
          class="lr-input"
        >
          <template v-slot:append>
            <span class="code-get"> 获取验证码 </span>
          </template>
        </q-input>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      title: '登录/注册',
      tabList: reactive([
        {
          tabName: '手机',
          username: '',
          password: '',
        },
        {
          tabName: '邮箱',
          username: '',
          password: '',
        },
      ]),
      selectedIndex: ref(0),
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
    .lr-tab {
      .lr-tab-title {
        font-weight: 600;
        color: #808080;
        font-size: 14px;
      }
      padding: 0 155px;
      margin-top: 25px;
    }
    .lr-input {
      width: 280px;
      background-color: rgba(#429cf8, 0.1);
      margin: auto;
      input {
        text-align: center;
        color: #8a97a5;
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
  .text-429CF8 {
    color: #429cf8 !important;
  }
  .phone-prefix {
    color: #808080;
    font-size: 14px;
    line-height: 20px;
    padding: 0 20px;
  }
  .code-get {
    color: #469bfa;
    font-size: 14px;
    line-height: 20px;
    padding: 0 20px;
  }
}
</style>
