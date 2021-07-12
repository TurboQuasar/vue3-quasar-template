<template>
  <div class="lr-comp">
    <div class="lr-shadow"></div>
    <div
      class="lr-form lr-form-lr"
      v-if="tabActiveIndex === TabEnum.PHONE_SETTING"
    >
      <div class="lr-header"></div>
      <div class="lr-tab">
        <div class="lr-tab-title lr-tab-title--active">手机</div>
        <div
          class="lr-tab-title"
          @click="handleSwitchTabTo(TabEnum.EMAIL_SETTING)"
        >
          邮箱
        </div>
      </div>
      <div class="lr-inputs">
        <q-input
          v-model="form.phone"
          placeholder="请输入手机号"
          class="lr-input"
        >
          <template v-slot:prepend>
            <span class="phone-prefix">+86</span>
          </template>
        </q-input>
        <q-input
          v-model="form.phone_code"
          placeholder="请输入验证码"
          class="lr-input"
          v-if="actionActiveIndex === ActionEnum.CODE_LOGIN"
        >
          <template v-slot:append>
            <span class="code-get"> 获取验证码 </span>
          </template>
        </q-input>
        <q-input
          v-if="actionActiveIndex === ActionEnum.PWD_LOGIN"
          v-model="form.phone_pwd"
          placeholder="请输入密码"
          class="lr-input"
        >
        </q-input>
        <div
          v-if="actionActiveIndex === ActionEnum.PWD_LOGIN"
          class="lr-pwd-related"
        >
          <q-checkbox v-model="form.is_phone_pwd_remember" label="记住密码" />
          <q-btn flat @click="handleSwitchTabTo(TabEnum.PHONE_PWD_RETRIEVE)"
            >忘记密码</q-btn
          >
        </div>
      </div>
      <div class="lr-action">
        <q-btn class="full-width lr-action-btn">注册/登录</q-btn>
      </div>
      <div class="lr-pwd">
        <q-btn
          class="full-width lr-pwd-btn"
          flat
          @click="handleSwitchActionTo"
          >{{ switchName }}</q-btn
        >
      </div>
      <div class="lr-pwd-set-wrap">
        <div class="lr-pwd-set-tip">您还没有设置登录密码，无法使用密码登录</div>
        <div class="lr-pwd-set">
          <q-btn
            class="full-width lr-pwd-set-btn"
            flat
            @click="handleSwitchTabTo(TabEnum.PHONE_PWD_SETTING)"
            >设置登录密码</q-btn
          >
        </div>
      </div>
    </div>

    <div
      class="lr-form lr-form-lr"
      v-if="tabActiveIndex === TabEnum.EMAIL_SETTING"
    >
      <div class="lr-header"></div>
      <div class="lr-tab">
        <div
          class="lr-tab-title"
          @click="handleSwitchTabTo(TabEnum.PHONE_SETTING)"
        >
          手机
        </div>
        <div class="lr-tab-title--active">邮箱</div>
      </div>
      <div class="lr-inputs">
        <q-input v-model="form.email" placeholder="请输入邮箱" class="lr-input">
        </q-input>
        <q-input
          v-if="actionActiveIndex === ActionEnum.CODE_LOGIN"
          v-model="form.email_code"
          placeholder="请输入验证码"
          class="lr-input"
        >
          <template v-slot:append>
            <span class="code-get"> 获取验证码 </span>
          </template>
        </q-input>
        <q-input
          v-if="actionActiveIndex === ActionEnum.PWD_LOGIN"
          v-model="form.phone_pwd"
          placeholder="请输入密码"
          class="lr-input"
        >
        </q-input>
        <div
          v-if="actionActiveIndex === ActionEnum.PWD_LOGIN"
          class="lr-pwd-related"
        >
          <q-checkbox v-model="form.is_phone_pwd_remember" label="记住密码" />
          <q-btn flat @click="handleSwitchTabTo(TabEnum.EMAIL_PWD_RETRIEVE)"
            >忘记密码</q-btn
          >
        </div>
      </div>
      <div class="lr-action">
        <q-btn class="full-width lr-action-btn">注册/登录</q-btn>
      </div>
      <div class="lr-pwd">
        <q-btn
          class="full-width lr-pwd-btn"
          flat
          @click="handleSwitchActionTo"
          >{{ switchName }}</q-btn
        >
      </div>
      <div class="lr-pwd-set-wrap">
        <div class="lr-pwd-set-tip">您还没有设置登录密码，无法使用密码登录</div>
        <div class="lr-pwd-set">
          <q-btn
            class="full-width lr-pwd-set-btn"
            flat
            @click="handleSwitchTabTo(TabEnum.EMAIL_PWD_SETTING)"
            >设置登录密码</q-btn
          >
        </div>
      </div>
    </div>
    <div
      class="lr-form lr-form-pwd-setting"
      v-if="tabActiveIndex === TabEnum.PHONE_PWD_SETTING"
    >
      <div class="lr-header"></div>
      <div class="lr-tab">
        <div class="lr-tab-title lr-tab-title--active">设置密码</div>
      </div>
      <div class="lr-phone-send">
        {{ `验证码已发送至+86${protectPhone(form.phone)}` }}
      </div>
      <div class="lr-inputs">
        <q-input
          v-model="form.phone_code"
          placeholder="请输入验证码"
          class="lr-input"
        >
          <template v-slot:append>
            <span class="code-get"> 获取验证码 </span>
          </template>
        </q-input>
        <q-input
          v-model="form.phone_pwd"
          type="password"
          placeholder="请设置新密码（6-30个字符）"
          class="lr-input"
        >
        </q-input>
      </div>
      <div class="lr-btns flex">
        <q-btn
          class="lr-btn lr-btn-return"
          @click="handleClickPhonePwdSettingReturnBtn"
          >返回</q-btn
        >
        <q-btn
          class="lr-btn lr-btn-confirm"
          @click="handleClickPhonePwdSettingConfirmBtn"
          >确定</q-btn
        >
      </div>
    </div>
    <div
      class="lr-form lr-form-pwd-setting"
      v-if="tabActiveIndex === TabEnum.EMAIL_PWD_SETTING"
    >
      <div class="lr-header"></div>
      <div class="lr-tab">
        <div class="lr-tab-title lr-tab-title--active">设置密码</div>
      </div>
      <div class="lr-phone-send">
        {{ `验证码已发送至${form.email}` }}
      </div>
      <div class="lr-inputs">
        <q-input
          v-model="form.email"
          placeholder="请输入验证码"
          class="lr-input"
        >
          <template v-slot:append>
            <span class="code-get"> 获取验证码 </span>
          </template>
        </q-input>
        <q-input
          v-model="form.email_pwd"
          type="password"
          placeholder="请设置新密码（6-30个字符）"
          class="lr-input"
        >
        </q-input>
      </div>
      <div class="lr-btns flex">
        <q-btn
          class="lr-btn lr-btn-return"
          @click="handleClickEmailPwdSettingReturnBtn"
          >返回</q-btn
        >
        <q-btn
          class="lr-btn lr-btn-confirm"
          @click="handleClickEmailPwdSettingConfirmBtn"
          >确定</q-btn
        >
      </div>
    </div>
    <div
      class="lr-form lr-form-pwd-setting"
      v-if="tabActiveIndex === TabEnum.PHONE_PWD_RETRIEVE"
    >
      <div class="lr-header"></div>
      <div class="lr-tab">
        <div class="lr-tab-title lr-tab-title--active">手机找回密码</div>
        <div class="lr-tab-title lr-tab-title">邮箱找回密码</div>
      </div>
      <div class="lr-inputs">
        <q-input
          v-model="form.phone"
          placeholder="请输入手机号"
          class="lr-input"
        >
          <template v-slot:prepend>
            <span class="phone-prefix">+86</span>
          </template>
        </q-input>
        <q-input
          v-model="form.phone_code"
          placeholder="请输入验证码"
          class="lr-input"
        >
          <template v-slot:append>
            <span class="code-get"> 获取验证码 </span>
          </template>
        </q-input>
        <q-input
          v-model="form.phone_pwd"
          type="password"
          placeholder="请设置新密码（6-30个字符）"
          class="lr-input"
        >
        </q-input>
      </div>
      <div class="lr-btns flex">
        <q-btn
          class="lr-btn lr-btn-return"
          @click="handleClickPhoneRetrieveReturnBtn"
          >返回</q-btn
        >
        <q-btn
          class="lr-btn lr-btn-confirm"
          @click="handleClickPhoneRetrieveConfirmBtn"
          >确定</q-btn
        >
      </div>
    </div>
    <div
      class="lr-form lr-form-pwd-setting"
      v-if="tabActiveIndex === TabEnum.EMAIL_PWD_RETRIEVE"
    >
      <div class="lr-header"></div>
      <div class="lr-tab">
        <div class="lr-tab-title lr-tab-title">手机找回密码</div>
        <div class="lr-tab-title lr-tab-title--active">邮箱找回密码</div>
      </div>
      <div class="lr-inputs">
        <q-input
          v-model="form.email"
          placeholder="请输入手机号"
          class="lr-input"
        >
        </q-input>
        <q-input
          v-model="form.email_code"
          placeholder="请输入验证码"
          class="lr-input"
        >
          <template v-slot:append>
            <span class="code-get"> 获取验证码 </span>
          </template>
        </q-input>
        <q-input
          v-model="form.email_pwd"
          type="password"
          placeholder="请设置新密码（6-30个字符）"
          class="lr-input"
        >
        </q-input>
      </div>
      <div class="lr-btns flex">
        <q-btn
          class="lr-btn lr-btn-return"
          @click="handleClickEmailRetrieveReturnBtn"
          >返回</q-btn
        >
        <q-btn
          class="lr-btn lr-btn-confirm"
          @click="handleClickEmailRetrieveConfirmBtn"
          >确定</q-btn
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
enum TabEnum {
  PHONE_SETTING,
  EMAIL_SETTING,
  PHONE_PWD_SETTING,
  EMAIL_PWD_SETTING,
  PHONE_PWD_RETRIEVE,
  EMAIL_PWD_RETRIEVE,
}
enum ActionEnum {
  CODE_LOGIN,
  PWD_LOGIN,
}
export default defineComponent({
  setup() {
    const tabActivePre = ref<TabEnum>(TabEnum.PHONE_SETTING);
    const tabActiveIndex = ref<TabEnum>(TabEnum.PHONE_SETTING);
    const actionActiveIndex = ref<ActionEnum>(ActionEnum.CODE_LOGIN);
    const switchName = computed(() => {
      return {
        [ActionEnum.CODE_LOGIN]: '密码登录',
        [ActionEnum.PWD_LOGIN]: '验证码登录',
      }[actionActiveIndex.value];
    });
    const isCodeGetting = ref(false);
    return {
      form: reactive({
        phone: '18896781024',
        phone_pwd: '',
        phone_code: '',
        is_phone_pwd_remember: ref(false),
        email: '',
        email_pwd: '',
        email_code: '',
        is_email_pwd_remember: ref(false),
      }),
      tabActiveIndex,
      actionActiveIndex,
      switchName,
      isCodeGetting,
      TabEnum,
      ActionEnum,
      handleSwitchActionTo: () => {
        if (actionActiveIndex.value === ActionEnum.PWD_LOGIN) {
          actionActiveIndex.value = ActionEnum.CODE_LOGIN;
        } else if (actionActiveIndex.value === ActionEnum.CODE_LOGIN) {
          actionActiveIndex.value = ActionEnum.PWD_LOGIN;
        }
      },

      handleSwitchTabTo: (tab: TabEnum) => {
        tabActivePre.value = tabActiveIndex.value;
        tabActiveIndex.value = tab;
      },
      protectPhone: (phone: string) => {
        return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
      },
      handleClickPhonePwdSettingReturnBtn: () => {
        tabActiveIndex.value = tabActivePre.value;
      },
      handleClickPhonePwdSettingConfirmBtn: () => {
        // todo confirm request
        tabActiveIndex.value = tabActivePre.value;
      },
      handleClickEmailPwdSettingReturnBtn: () => {
        tabActiveIndex.value = tabActivePre.value;
      },
      handleClickEmailPwdSettingConfirmBtn: () => {
        // todo confirm request
        tabActiveIndex.value = tabActivePre.value;
      },
      handleClickPhoneRetrieveReturnBtn: () => {
        tabActiveIndex.value = tabActivePre.value;
      },
      handleClickPhoneRetrieveConfirmBtn: () => {
        // todo confirm request
        tabActiveIndex.value = tabActivePre.value;
      },
      handleClickEmailRetrieveReturnBtn: () => {
        tabActiveIndex.value = tabActivePre.value;
      },
      handleClickEmailRetrieveConfirmBtn: () => {
        // todo confirm request
        tabActiveIndex.value = tabActivePre.value;
      },
    };
  },
});
</script>
<style lang="scss">
$MAX_WIDTH: 280px;
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
      display: flex;
      justify-content: center;
      gap: 20px;
      .lr-tab-title {
        font-weight: 600;
        color: #808080;
        font-size: 14px;
        cursor: pointer;
        &--active {
          color: #429cf8;
          position: relative;
          &:before {
            content: '';
            position: absolute;
            width: 20px;
            height: 2px;
            background: #429cf8;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }

      margin: 25px auto auto;
    }
    .lr-inputs {
      margin-top: 25px;
      .lr-input {
        width: $MAX_WIDTH;
        background-color: rgba(#429cf8, 0.1);
        margin: auto;
        &:not(:first-child) {
          margin-top: 20px;
        }
        input {
          text-align: center;
          color: #8a97a5;
          font-size: 14px;
          line-height: 20px;
        }
      }
    }
  }
  .lr-form-lr {
    .lr-action {
      width: $MAX_WIDTH;
      margin: 20px auto 0;
      .lr-action-btn {
        background-color: $yellow_;
        color: #ffffff;
        font-size: 14px;
        font-weight: 400;
      }
    }
    .lr-pwd {
      width: $MAX_WIDTH;
      margin: 20px auto 0;
      .lr-pwd-btn {
        color: $yellow_;
      }
    }
    .lr-pwd-set-wrap {
      border-top: 1px solid $gray-100;
      padding: 20px 0;
      margin-top: 20px;
      .lr-pwd-set-tip {
        text-align: center;
      }
      .lr-pwd-set-btn {
        color: $yellow_;
      }
    }
    .lr-pwd-related {
      width: $MAX_WIDTH;
      margin: 20px auto 0;
      display: flex;
      justify-content: space-between;
    }
  }
  .lr-form-pwd-setting {
    .lr-phone-send {
      text-align: center;
      margin-top: 20px;
      color: #808080;
    }
    .lr-btns {
      margin: 20px auto 20px;
      width: $MAX_WIDTH;
      .lr-btn {
        flex: 1;
      }
      .lr-btn-return {
      }
      .lr-btn-confirm {
        background-color: #429cf8;
        color: #ffffff;
      }
      gap: 10px;
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
