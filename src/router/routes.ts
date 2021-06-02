import { AppRouteModule, AppRouteRecordRaw } from 'router/types';
import Layout from 'components/Layout/Layout.vue';

export const asyncRoutesChildren: AppRouteModule[] = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: '主页',
      icon: 'home',
      keepAlive: true,
    },
    component: () => import('pages/Home/Home.vue'),
  },
  {
    path: '/table-detail',
    name: 'tableDetail',
    meta: {
      title: 'Treats 详情',
      icon: 'blur_linear',
      isHidden: true,
    },
    component: () => import('pages/Home/TableDetail.vue'),
  },
  {
    path: '/start',
    name: 'Start',
    meta: {
      title: '快速起步',
      icon: 'design_services',
      keepAlive: true,
    },
    component: Layout,
    children: [
      {
        path: 'getting-started',
        name: 'GettingStarted',
        meta: {
          title: '基础配置',
          icon: 'tune',
          keepAlive: true,
        },
        component: () => import('pages/Router/GettingStarted.vue'),
      },
    ],
  },
  {
    path: '/component',
    name: 'Component',
    component: Layout,
    meta: {
      title: '组件说明',
      icon: 'apps',
      isOpen: true,
      isHidden: false,
    },
    children: [
      {
        path: 'keepalive-doc',
        name: 'KeepaliveDoc',
        meta: {
          title: 'keep-alive 缓存',
          icon: 'select_all',
          keepAlive: true,
        },
        component: () => import('pages/Components/KeepaliveDoc.vue'),
      },
      {
        path: 'icon',
        name: 'Icon',
        meta: {
          title: 'icon 集合',
          icon: 'grain',
          keepAlive: true,
        },
        component: () => import('pages/Components/Icon.vue'),
      },
      {
        path: 'ts-markdown',
        name: 'TsMarkdown',
        meta: {
          title: 'ts markdown 使用',
          icon: 'grain',
          keepAlive: true,
        },
        component: () => import('pages/Components/TsMarkdown.vue'),
      },
    ],
  },
];
export const asyncRoutes: AppRouteModule[] = [
  {
    path: '/',
    name: 'Index',
    meta: {
      title: '',
      icon: '',
    },
    redirect: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: asyncRoutesChildren,
  },
];

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'login',
  component: () => import('pages/Login.vue'),
  meta: {
    title: '',
  },
};
// Always leave this as last one,
// but you can also remove it
export const ErrorRoute: AppRouteRecordRaw = {
  path: '/:catchAll(.*)*',
  component: () => import('pages/Error404.vue'),
  name: '',
  meta: {
    title: '',
  },
};
export const constantRoutes: AppRouteRecordRaw[] = [LoginRoute, ErrorRoute];
