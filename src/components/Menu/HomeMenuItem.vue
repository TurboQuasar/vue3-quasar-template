<!--
   动态菜单 item 递归实现
   myRouter ： 菜单列表
   initLevel ： 菜单初始化缩进等级
   bgColorLevel ：菜单背景色
   basePath : 上级菜单
-->
<template>
  <div class="base-menu-item">
    <template v-for="(item, index) in myRouter">
      <template v-if="item.meta.isHidden !== true">
        <q-item-label
          v-if="item.meta.itemLabel"
          header
          class="text-weight-bold text-uppercase"
          :key="item.meta.itemLabel"
        >
          {{ item.meta.itemLabel }}
        </q-item-label>

        <!-- 没有可显示孩子或者隐藏子菜单 -->
        <q-item
          v-if="!item.children || item.meta.hideChildrenInMenu"
          clickable
          v-ripple
          :key="index"
          :class="baseItemClass"
          :inset-level="initLevel"
          :style="isWeChart ? ' line-height: normal' : ''"
          active-class="base-item-active"
          :to="handleLink(basePath, item.path)"
          @click="externalLink(basePath, item.path)"
        >
          <q-item-section>
            {{ item.meta.title }}
          </q-item-section>
        </q-item>
        <q-btn v-else round flat>
          <q-menu
            style="min-width: 140px; transform: translate3d(-10px, 12px, 0)"
            v-model="showMenu"
          >
            <q-list>
              <q-item
                clickable
                v-ripple
                :class="baseItemClass"
                :inset-level="initLevel"
                :style="isWeChart ? ' line-height: normal' : ''"
                active-class="sub-item-active"
                class="text-center"
                :to="handleLink(basePath + '/' + item.path, i.path)"
                @click="externalLink(basePath + '/' + item.path, i.path)"
                v-for="i in item.children"
                :key="i.name"
              >
                <q-item-section>
                  {{ i.meta.title }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
          <q-item
            v-ripple
            :active="$route.path.startsWith(basePath + '/' + item.path)"
            :class="baseItemClass"
            :inset-level="initLevel"
            :style="isWeChart ? ' line-height: normal' : ''"
            active-class="base-item-active"
          >
            <q-item-section>
              {{ item.meta.title }}
            </q-item-section>
          </q-item>
        </q-btn>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'homeMenuItem',
  props: [
    'myRouter',
    'initLevel',
    'bgColor',
    'bgColorLevel',
    'duration',
    'basePath',
  ],
  setup(props, context) {
    /**
     * 处理内部链接
     * @param basePath
     * @param itemPath
     */
    function handleLink(basePath, itemPath) {
      const link =
        basePath === undefined ? itemPath : basePath + '/' + itemPath;
      if (link.indexOf('http') !== -1) {
        return '#';
      }
      return link;
    }

    /**
     * 处理外部链接
     * @param basePath
     * @param itemPath
     * @returns {boolean}
     */
    function externalLink(basePath, itemPath) {
      const link =
        basePath === undefined ? itemPath : basePath + '/' + itemPath;
      const i = link.indexOf('http');
      if (i !== -1) {
        const a = document.createElement('a');
        a.setAttribute('href', link.slice(i));
        a.setAttribute('target', '_blank');
        a.click();
        return false;
      }
    }
    const $route = useRoute();
    const baseItemClass =
      props.bgColor + '-' + props.bgColorLevel + ' base-item-class';
    /**
     * 处理子菜单被激活的样式，同时修改父菜单样式
     */
    const baseItemClassWithNoChildren = computed(() => {
      return (path) => {
        return $route.fullPath.startsWith(path)
          ? 'baseRootItemActive base-item-class' + baseItemClass
          : baseItemClass;
      };
    });
    /**
     * 如果是微信浏览器，则添加 line-height: normal 样式
     * @returns {boolean}
     */
    const isWeChart = computed(() => {
      return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1;
    });
    return {
      handleLink,
      externalLink,
      baseItemClassWithNoChildren,
      isWeChart,
      baseItemClass,
      showMenu: ref(false),
    };
  },
});
</script>
<style lang="scss">
/* item 颜色 */
$ITEM_COLOR: #2c3e50;

/* item 激活时颜色 */
$ACTIVE_COLOR: $yellow-;
$ACTIVE_BACKGROUND: #ffffff;

.base-item-class {
  color: $ITEM_COLOR !important;
}
/* item 被激活时父菜单的样式 */
.baseRootItemActive {
  color: $ACTIVE_COLOR !important;
}
/* item 被激活时的样式 */
.base-item-active {
  color: $ACTIVE_COLOR !important;
  background: $ACTIVE_BACKGROUND;
  transition: all 0.618s;
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background: $ACTIVE_COLOR !important;
    top: 100%;
    left: 0;
  }
}

.sub-item-active {
  color: $ACTIVE_COLOR !important;
  background: $ACTIVE_BACKGROUND;
}
.base-menu-item {
  .q-item__section {
    text-align: center;
  }
}
</style>
