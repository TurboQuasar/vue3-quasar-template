import { AppRouteModule, AppRouteRecordRaw } from 'router/types';
import Layout from 'components/Layout/Layout.vue';

export const asyncRoutesChildren: AppRouteModule[] = [
  {
    path: '/main',
    name: 'main',
    meta: {
      title: '主页',
      icon: '',
      keepAlive: false,
    },
    component: () => import('pages/Main/Index.vue'),
  },
  {
    path: '/contract',
    name: 'contract',
    meta: {
      title: '合同管理',
      icon: '',
      keepAlive: false,
      hideChildrenInMenu: true,
    },
    component: Layout,
    children: [
      {
        path: '',
        name: 'contract',
        meta: {
          title: '合同管理',
          icon: '',
        },
        component: () => import('pages/Contract/Index.vue'),
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
    redirect: '/main',
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
export const HomeRoute: AppRouteRecordRaw = {
  path: '/home',
  name: 'home',
  meta: {
    title: '首页',
    icon: '',
    keepAlive: false,
    isHidden: true,
  },
  redirect: '/home/index',
  component: () => import('layouts/HomeLayout.vue'),
  children: [
    {
      path: 'index',
      name: 'home',
      meta: {
        title: '首页',
        icon: '',
        keepAlive: true,
      },
      component: () => import('pages/Home/Index.vue'),
    },
    {
      path: 'solution',
      name: 'solution',
      meta: {
        title: '解决方案',
        icon: '',
        keepAlive: true,
      },
      component: () => import('pages/Solution/Index.vue'),
    },
    {
      path: 'check',
      name: 'check',
      meta: {
        title: '合同查验',
        icon: '',
        keepAlive: true,
      },
      component: () => import('pages/Check/Index.vue'),
    },
    {
      path: 'developer',
      name: 'developer',
      meta: {
        title: '开发者',
        icon: '',
        keepAlive: true,
      },
      component: () => import('pages/Developer/Index.vue'),
    },
    {
      path: 'help',
      name: 'help',
      meta: {
        title: '帮助中心',
        icon: '',
        keepAlive: true,
        isOpen: false,
      },
      component: Layout,
      children: [
        {
          path: 'problem',
          name: 'problem',
          meta: {
            title: '常见问题',
            icon: '',
            keepAlive: true,
          },
          component: () => import('pages/Problem/Index.vue'),
        },
        {
          path: 'newer',
          name: 'newer',
          meta: {
            title: '新手上路',
            icon: '',
            keepAlive: true,
          },
          component: () => import('pages/Newer/Index.vue'),
        },
        {
          path: 'protocol',
          name: 'protocol',
          meta: {
            title: '用户协议',
            icon: '',
            keepAlive: true,
          },
          component: () => import('pages/Protocol/Index.vue'),
        },
        {
          path: 'privacy',
          name: 'privacy',
          meta: {
            title: '隐私政策',
            icon: '',
            keepAlive: true,
          },
          component: () => import('pages/Privacy/Index.vue'),
        },
      ],
    },
    {
      path: 'download',
      name: 'download',
      meta: {
        title: '下载中心',
        icon: '',
        keepAlive: true,
      },
      component: () => import('pages/Download/Index.vue'),
    },
  ],
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
export const constantRoutes: AppRouteRecordRaw[] = [
  LoginRoute,
  HomeRoute,
  ErrorRoute,
];
