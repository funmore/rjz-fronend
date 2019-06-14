import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
/**
*   statistic         统计
        programs       项目进度分析
        employees       人力分析
    management      管理
        programs       项目管理
        empleyee       用户管理
        contract       合同管理
    setting         设置
    contact         站内信
*
*
*
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    //  hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  //统计
  {
    path: '/statistic',
    component: Layout,
    redirect: '/statistic/programs',
    name: 'statistic',
    meta:{title:'统计',icon:'example'},
    children:[
      {
        path: 'programs',
        name: 'programs',
        component: () => import('@/views/statistic/programs/index'),
        meta: { title: '项目进度分析', icon: 'table' }
      },
      {
        path: 'people',
        name: 'people',
        component: () => import('@/views/statistic/people/peopleTable'),
        meta: { title: '人力分析', icon: 'table' }
      },
      //edit
      {
        path: 'people/view/:id(\\d+)',
        name: 'viewPeople',
        component: () => import('@/views/management/programs/edit'),
        meta: { title: '编辑项目', icon: 'table' },
        hidden:true
      },
    ]
  },
    //管理
  {
    path: '/management',
    component: Layout,
    redirect: '/management/programs',
    name: 'management',
    meta:{title:'管理',icon:'nested'},
    children:[
      //list
      {
        path: 'programs',
        name: 'programs',
        component: () => import('@/views/management/programs/programsTable'),
        meta: { title: '项目管理', icon: 'table' }
      },
      //edit
      {
        path: 'programs/edit/:id(\\d+)',
        name: 'editProgram',
        component: () => import('@/views/management/programs/edit'),
        meta: { title: '编辑项目', icon: 'table' },
        hidden:true
      },


      {
        path: 'preprograms',
        name: 'preprograms',
        component: () => import('@/views/management/preprograms/programsTable'),
        meta: { title: '预备项目', icon: 'table' }
      },
      //employees
      {
        path: 'employees',
        name: 'employees',
        component: () => import('@/views/management/employees/employeesTable'),
        meta: { title: '用户管理', icon: 'table' }
      },



      //contract
      //list
      {
        path: 'contract',
        name: 'contract',
        component: () => import('@/views/management/contracts/contractsTable'),
        meta: { title: '合同管理', icon: 'table' }
      },
      //edit
      {
        path: 'contracts/edit/:id(\\d+)',
        name: 'editContract',
        component: () => import('@/views/management/contracts/edit'),
        meta: { title: '编辑合同', icon: 'table' },
        hidden:true
      },
    ]
  },
  //设置
  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/personal',
    name: 'setting',
    meta:{title:'设置',icon:'example'},
    children:[
      {
        path: 'personal',
        name: 'personal',
        component: () => import('@/views/editor/index'),
        meta: { title: '个人设置', icon: 'table' }
      },
      {
        path: 'poll',
        name: 'poll',
        component: () => import('@/views/poll/poll'),
        meta: { title: '投票', icon: 'table' }
      },
      {
        path: 'poll/imports',
        name: 'imports',
        component: () => import('@/views/poll/imports'),
        meta: { title: 'EXCEL创建', icon: 'table' },
        hidden:true
      },
      {
        path: 'poll/property',
        name: 'property',
        component: () => import('@/views/poll/property'),
        meta: { title: 'EXCEL创建', icon: 'table' },
        hidden:true
      },
      {
        path: 'poll/fill/:id(\\d+)',
        name: 'fill',
        component: () => import('@/views/poll/fill'),
        meta: { title: '填写', icon: 'table' },
        hidden:true
      },
      {
        path: 'poll/show/:id(\\d+)',
        name: 'show',
        component: () => import('@/views/poll/show'),
        meta: { title: '查看', icon: 'table' },
        hidden:true
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    redirect: '/test/index',
    name: 'test',
    meta:{title:'设置',icon:'example'},
    children:[
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/test/index'),
        meta: { title: '试验页面', icon: 'table' }
      }
    ]
  },
  // {
  //   path: '/train',
  //   component: Layout,
  //   redirect: '/gettrain/index',
  //   name: 'test',
  //   meta:{title:'设置',icon:'example'},
  //   children:[
  //     {
  //       path: 'train',
  //       name: 'index',
  //       component: () => import('@/views/gettrain/index'),
  //       meta: { title: '火车票', icon: 'table' }
  //     }
  //   ]
  // },
  
  // //项目输入信息
  // {
  //   path: '/program-input',
  //   component: Layout,
  //   redirect: '/program-input/require-doc',
  //   name: 'program-input',
  //   meta:{title:'项目输入信息',icon:'example'},
  //   children:[
  //     {
  //       path: 'require-doc',
  //       name: 'require-doc',
  //       component: () => import('@/views/editor/index'),
  //       meta: { title: '测评需求', icon: 'table' }
  //     },
  //     {
  //       path: 'requirefile',
  //       name: 'requirefile',
  //       component: () => import('@/views/editor/index'),
  //       meta: { title: '引用文件', icon: 'table' }
  //     },
  //     {
  //       path: 'software-overview',
  //       name: 'software-overview',
  //       component: () => import('@/views/editor/index'),
  //       meta: { title: '软件概述', icon: 'table' }
  //     }
  //   ]
  // },
  //   //related-info
  //   {
  //   path: '/related-info',
  //   component: Layout,
  //   redirect: '/related-info/schema',
  //   name: 'related-info',
  //   meta:{title:'测试策略资源与进度',icon:'example'},
  //   children:[
  //     {
  //       path: 'schema',
  //       name: 'schema',
  //       component: () => import('@/views/editor/index'),
  //       meta: { title: '测试策略', icon: 'table' }
  //     },
  //     {
  //       path: 'test-tech',
  //       name: 'test-tech',
  //       component: () => import('@/views/editor/test-tech.vue'),
  //       meta: { title: '测试技术和方法', icon: 'table' }
  //     },
  //     {
  //       path: 'res-require',
  //       name: 'res-require',
  //       component: () => import('@/views/tab-res-require'),
  //       meta: { title: '资源需求', icon: 'table' }
  //     },
  //     {
  //       path: 'test-progress-test',
  //       name: 'test-progress-test',
  //       component: () => import('@/views/table/inlineEditTable'),
  //       meta: { title: '测试进度test', icon: 'table' }
  //     },
  //     {
  //       path: 'test-progress',
  //       name: 'test-progress',
  //       component: () => import('@/views/table/complexTable'),
  //       meta: { title: '测试进度', icon: 'table' }
  //     }
  //   ]
  // },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },
  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'nested',
  //   meta: {
  //     title: 'nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'menu1',
  //       meta: { title: 'menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'menu1-1',
  //           meta: { title: 'menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'menu1-2',
  //           meta: { title: 'menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'menu1-2-1',
  //               meta: { title: 'menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'menu1-2-2',
  //               meta: { title: 'menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'menu1-3',
  //           meta: { title: 'menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

