<template>
  <base-content>
    <div>
      <q-tabs
        v-model="tab"
        dense
        align="left"
        :breakpoint="0"
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        narrow-indicator
      >
        <q-tab name="material Icons" label="material design 图标集" />
        <q-tab name="fontawesome-v5" label="fontawesome-v5 图标集" />
        <q-tab name="iconfont" label="iconfont 图标集" />
        <q-tab name="htu" label="如何使用图标集合中的图标" />
      </q-tabs>
      <q-tab-panels v-model="tab" animated style="overflow-y: visible">
        <q-tab-panel name="material Icons" id="mdtext"></q-tab-panel>

        <q-tab-panel name="fontawesome-v5" id="fatext"></q-tab-panel>
        <q-tab-panel name="iconfont" id="icontext"></q-tab-panel>

        <q-tab-panel name="htu">
          <div class="base-markdown-content">
            <v-md-editor v-model="content" mode="preview"> </v-md-editor>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </base-content>
</template>

<script lang="ts">
import BaseContent from 'components/BaseContent/BaseContent.vue';
import * as materialIconsSet from '@quasar/extras/material-icons';
import * as fontawesomeSet from '@quasar/extras/fontawesome-v5';
import { copyToClipboard, useQuasar } from 'quasar';
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  nextTick,
  onUnmounted,
  watch,
} from 'vue';
import { api, axios, mockApi } from 'boot/axios';
import { config } from 'src/config';
import Iconfont from 'css/iconfont/iconfont.json';
export default defineComponent({
  name: 'Icon',
  components: { BaseContent },
  setup() {
    const $q = useQuasar();
    const tab = ref('material Icons');
    const content = ref('');
    const materialIcons_key: string[] = [];
    const fontawesome_key: string[] = [];

    const iconfont_key = Iconfont.glyphs.map(
      (_) => `${Iconfont.css_prefix_text}${_.font_class}`
    );

    // 驼峰转下划线
    function toLowerLine(str): string {
      let t = '';
      if (str.substr(0, 3) === 'mat') {
        t = str
          .replace(/([A-Z]|\d+)/g, (a, l) => `_${l.toLowerCase()}`)
          .substring(4);
        switch (t) {
          case 'crop_32':
            t = 'crop_3_2';
            break;
          case 'crop_169':
            t = 'crop_16_9';
            break;
          case 'crop_54':
            t = 'crop_5_4';
            break;
          case 'crop_75':
            t = 'crop_7_5';
            break;
          default:
            break;
        }
      }
      if (str.substr(0, 2) === 'fa') {
        t = str
          .replace(/([A-Z])/g, (a, l) => `-${l.toLowerCase()}`)
          .replace(/-/, ' fa-');
        switch (t) {
          case 'fab500px':
            t = 'fab fa-500px';
            break;
          case 'fas fa-stopwatch20':
            t = 'fas fa-stopwatch-20';
            break;
          case 'fab fa-font-awesome-logo-full':
            t = 'fas fa-stopwatch-20';
            break;
          case 'far fa-font-awesome-logo-full':
            t = 'fas fa-stopwatch-20';
            break;
          default:
            break;
        }
      }
      return t;
    }

    function RenderMDIcon() {
      const fragment = document.createDocumentFragment();
      for (let j = 0; j < materialIcons_key.length; j++) {
        const li = document.createElement('li');
        li.innerText = materialIcons_key[j];
        li.setAttribute('class', 'myIcon material-icons q-icon notranslate');
        li.setAttribute(
          'onclick',
          'window.copyIcon(' + "'" + materialIcons_key[j] + "'" + ')'
        );
        fragment.appendChild(li);
      }
      document.getElementById('mdtext')!.appendChild(fragment);
    }

    // materialIcons 图标集合初始化
    function initMaterial() {
      // 获取图标 materialIcons 下划线格式命名集合
      for (const i in materialIconsSet) {
        materialIcons_key.push(toLowerLine(i));
      }
      nextTick(() => {
        RenderMDIcon();
      });
    }

    function RenderIconfontIcon() {
      const fragment = document.createDocumentFragment();
      for (let j = 0; j < iconfont_key.length; j++) {
        const li = document.createElement('li');
        li.setAttribute(
          'class',
          'myIcon icon iconfont ' + iconfont_key[j] + ' q-icon notranslate'
        );
        li.setAttribute(
          'onclick',
          'window.copyIcon(' + "'" + iconfont_key[j] + "'" + ')'
        );
        fragment.appendChild(li);
      }
      document.getElementById('icontext')!.appendChild(fragment);
    }
    // iconfont图标集初始化
    function initIconfont() {
      nextTick(() => {
        RenderIconfontIcon();
      });
    }

    function RenderFAIcon() {
      const fragment = document.createDocumentFragment();
      for (let j = 0; j < fontawesome_key.length; j++) {
        const li = document.createElement('li');
        li.setAttribute(
          'class',
          'myIcon ' + fontawesome_key[j] + ' q-icon notranslate'
        );
        li.setAttribute(
          'onclick',
          'window.copyIcon(' + "'" + fontawesome_key[j] + "'" + ')'
        );
        fragment.appendChild(li);
      }
      document.getElementById('fatext')!.appendChild(fragment);
    }

    // fontawesome图标集合初始化
    function initFontawesome() {
      // 获取图标 fontawesomeSet 下划线格式命名集合
      for (const i in fontawesomeSet) {
        fontawesome_key.push(toLowerLine(i));
      }
      nextTick(() => {
        RenderFAIcon();
      });
    }

    // 复制成功
    function copy(e) {
      copyToClipboard(e)
        .then(() => {
          $q.notify({
            message: '成功复制到剪切板',
            color: 'green',
            position: 'top',
            timeout: 1500,
          });
        })
        .catch(() => {
          // 不支持复制
          $q.notify({
            message: '复制到剪切板失败',
            color: 'warming',
            position: 'top',
            timeout: 1500,
          });
        });
    }

    onMounted(() => {
      initMaterial();
      (window as any).copyIcon = copy;
    });
    onUnmounted(() => {
      (window as any).copyIcon = null;
    });
    watch(tab, function (n, o) {
      if (n === 'material Icons') {
        initMaterial();
      }
      if (n === 'fontawesome-v5') {
        initFontawesome();
      }
      if (n === 'iconfont') {
        initIconfont();
      }
    });
    async function getMsg() {
      const res = await axios.get('/data/iconData.md', {
        responseType: 'text',
      });
      content.value = res.data;
    }
    getMsg();
    return {
      content,
      tab,
    };
  },
});
</script>
<style lang="css">
.myIcon {
  padding: 15px;
  font-size: 35px;
  color: #363f45;
  cursor: pointer;
}
.myIcon:hover {
  background: #edecec;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
