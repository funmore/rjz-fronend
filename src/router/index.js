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
   //个人
   {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/personprogram',
    name: 'dashboard',
    meta:{title:'控制台',icon:'dashboard'},
    children:[
      {
        path: 'personprogram',
        name: 'personprogram',
        component: () => import('@/views/personprograms/personProgramsTable'),
        meta: { 
          title: '个人项目', 
          icon: 'theme' }
      },
      {
        path: 'info',
        name: 'info',
        component: () => import('@/views/dashboard/index'),
        meta: { 
          title: '个人信息', 
          icon: 'dashboard' }
      },
      {
        path: 'setting',
        name: 'setting',
        component: () => import('@/views/editor/index'),
        meta: { 
          title: '个人设置', 
          icon: 'theme' }
      },
      {
        path: 'notestwork',
        name: 'notestwork',
        component: () => import('@/views/notestwork/notestwork'),
        meta: { 
          title: '非测试工作统计', 
          icon: 'documentation' }
      },
      //poll start
      {
        path: 'poll',
        name: 'poll',
        component: () => import('@/views/poll/poll'),
        meta: { 
          title: '投票', 
          icon: 'international' }
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
      //poll end
    ]
  }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})


export const asyncRouterMap = [
    //统计
    {
      path: '/statistic',
      component: Layout,
      redirect: '/statistic/programs',
      name: 'statistic',
      meta:{
        title:'统计',
        roles: ['管理员','主任','副主任','测试人员','主任设计师','副主任设计师','项目组长','型号负责人'],
        icon:'example'},
      children:[
        {
          path: 'customprogram',
          name: 'customprogram',
          component: () => import('@/views/customPrograms/customProgramsTable.vue'),
          meta: { 
            title: '订制项目信息', 
            roles: ['管理员','主任','副主任','测试人员','主任设计师','副主任设计师','项目组长','型号负责人'],
            icon: 'guide' }
        },

        {
          path: 'people',
          name: 'people',
          component: () => import('@/views/statistic/people/peopleTable'),
          meta: { 
            title: '人力分析', 
            roles: ['管理员','主任','副主任','主任设计师','副主任设计师','项目组长','型号负责人'],
            icon: 'peoples' }
        }
      ]
    },
      //管理
    {
      path: '/management',
      component: Layout,
      redirect: '/management/functionTable',
      name: 'management',
      meta:{
        title:'管理',
        roles: ['管理员','主任','副主任','主任设计师','副主任设计师','项目组长','型号负责人','质量保证员','配置管理人员','市场人员','测试人员'],
        icon:'nested'},
      children:[
        {
          path: 'functionTable',
          name: 'functionTable',
          component: () => import('@/views/customPrograms/functionTable.vue'),
          meta: { 
            title: '项目管理', 
            roles: ['管理员','主任','副主任','测试人员','主任设计师','副主任设计师','项目组长','型号负责人'],
            icon: 'guide' }
        },
        //list
        {
          path: 'programs',
          name: 'programs',
          component: () => import('@/views/management/programs/programsTable'),
          meta: { 
            title: '正式项目',
            roles: ['管理员','主任','副主任','主任设计师','副主任设计师','项目组长','型号负责人','质量保证员','配置管理人员','市场人员','测试人员'], 
            icon: 'form' }
        },
        //edit
        {
          path: 'programs/edit/:id(\\d+)',
          name: 'programDetail',
          component: () => import('@/views/management/programs/components/ProgramDetail'),
          meta: { 
            title: '编辑项目', 
            roles: ['管理员','主任','副主任','主任设计师','副主任设计师','项目组长','型号负责人','质量保证员','配置管理人员','市场人员','测试人员'],
            icon: 'table' },
          hidden:true
        },
  
  
        {
          path: 'preprograms',
          name: 'preprograms',
          component: () => import('@/views/management/preprograms/preProgramsTable'),
          meta: { 
            title: '预备项目', 
            roles: ['管理员','主任','副主任','主任设计师','副主任设计师','项目组长','型号负责人','质量保证员','配置管理人员','市场人员'],
            icon: 'form' }
        },
        {
          path: 'intentprograms',
          name: 'intentprograms',
          component: () => import('@/views/management/preprograms/intentProgramsTable'),
          meta: { 
            title: '意向项目', 
            roles: ['管理员','主任','副主任','主任设计师','副主任设计师','项目组长','型号负责人','质量保证员','配置管理人员','市场人员'],
            icon: 'form' }
        },
        {
          path: 'batchimport',
          name: 'batchimport',
          component: () => import('@/views/management/batchimport/importTable'),
          meta: { 
            title: '批量导入', 
            roles: ['管理员'],
            icon: 'excel' }
        },
        {
          path: 'import',
          name: 'import',
          component: () => import('@/views/management/import/importProgram'),
          meta: { 
            title: '项目任务单导入', 
            roles: ['管理员','主任','副主任','主任设计师','副主任设计师','项目组长','型号负责人','配置管理人员','市场人员'],
            icon: 'email' }
        },
        //employees
        {
          path: 'employees',
          name: 'employees',
          component: () => import('@/views/management/employees/employeesTable'),
          meta: { 
            title: '用户管理', 
            roles: ['管理员','主任','副主任'],
            icon: 'people' }
        },
        {
          path: 'model',
          name: 'model',
          component: () => import('@/views/model/model'),
          meta: { 
            title: '型号名称管理', 
            roles: ['管理员','主任','副主任','主任设计师','副主任设计师','项目组长','型号负责人','质量保证员','配置管理人员'],
            icon: 'tab' }
        },
  
  
  
        //contract
        //list
        {
          path: 'contract',
          name: 'contract',
          component: () => import('@/views/management/contracts/contractsTable'),
          meta: { 
            title: '合同管理', 
            roles: ['管理员','市场人员'],
            icon: 'table' }
        },
        //edit
        {
          path: 'contracts/edit/:id(\\d+)',
          name: 'editContract',
          component: () => import('@/views/management/contracts/edit'),
          meta: { 
            title: '编辑合同', 
            roles: ['管理员','市场人员'],
            icon: 'table' },
          hidden:true
        },
      ]
    },
   
    {
      path: '/test',
      component: Layout,
      redirect: '/test/index',
      name: 'test',
      meta:{
        title:'设置',
        icon:'example',
        roles: ['管理员']},
      children:[
        {
          path: 'index',
          name: 'index',
          component: () => import('@/views/test/index'),
          meta: { 
          title: '试验页面',
          icon: 'table',
          roles: ['管理员']}
        }
      ]
    },  
    { path: '*', redirect: '/404', hidden: true }

]
