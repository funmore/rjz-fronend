
export const constantSteps = [
  {
    element: '.hamburger-container',
    popover: {
      title: '边栏开关',
      description: '点击推拉边栏',
      position: 'bottom'
    }
  },
  {
    element: '.notification',
    popover: {
      title: '通知栏',
      description: '你可以在此查看个人消息和系统消息',
      position: 'bottom'
    }
  },
  {
    element: '.avatar-container',
    popover: {
      title: '欢迎栏',
      description: '你可以在此注销或退出账户',
      position: 'bottom'
    }
  }
]

export const asyncSteps = [
  {
    name: 'programDetail',
    step: [
      {
        element: '#workflow',
        popover: {
          title: '工作流信息',
          description: '你可以在此编辑项目流程信息',
          position: 'bottom'
        }
      },
      {
        element: '#programBasic',
        popover: {
          title: '项目基本信息',
          description: '你可以在此编辑项目基本信息',
          position: 'bottom'
        }
      },
      {
        element: '#programTeamRole',
        popover: {
          title: '项目组信息',
          description: '你可以在编辑项目组信息，创建项目任务',
          position: 'bottom'
        }
      },
      {
        element: '#softwareInfo',
        popover: {
          title: '软件信息',
          description: '你可以在此编辑和查看软件信息',
          position: 'bottom'
        }
      },
      {
        element: '#inputFile',
        popover: {
          title: '项目输入文件',
          description: '项目输入文件在此',
          position: 'bottom'
        }
      },
      {
        element: '#outputFile',
        popover: {
          title: '项目输出文件',
          description: '项目输出文件在此',
          position: 'bottom'
        }
      }
    ]
  },
  {
    name: 'personprogram',
    step: [
      {
        element: '#rolemenu',
        popover: {
          title: '筛选边栏',
          description: '你可以在此根据角色查看项目',
          position: 'bottom'
        }
      },
      {
        element: '.filter-container',
        popover: {
          title: '过滤器',
          description: '你可以在此筛选项目',
          position: 'bottom'
        }
      }
    ]
  },
  {
    name: 'programs',
    step: [
      {
        element: '.filter-container',
        popover: {
          title: '过滤器',
          description: '你可以在此筛选项目',
          position: 'bottom'
        }
      },
      {
        element: '.state',
        popover: {
          title: '项目状态',
          description: '你可以在此查看项目总状态',
          position: 'bottom'
        }
      },
      {
        element: '.workflow_state',
        popover: {
          title: '流程状态',
          description: '你可以在此查看流程状态',
          position: 'bottom'
        }
      },
      {
        element: '.issue',
        popover: {
          title: '流程节点问题',
          description: '你可以在此查看当前流程节点的问题',
          position: 'bottom'
        }
      },
      {
        element: '.operation',
        popover: {
          title: '操作',
          description: '你可以在此打开项目详情或者删除（需要权限）',
          position: 'bottom'
        }
      },
      {
        element: '.pagination-container',
        popover: {
          title: '底栏',
          description: '你可以在选择你想要单页显示的最大项目数量',
          position: 'bottom'
        }
      }

    ]
  },
  {
    name: 'preprograms',
    step: [
      {
        element: '.filter-container',
        popover: {
          title: '过滤器',
          description: '你可以在此筛选项目',
          position: 'bottom'
        }
      },
      {
        element: '.new',
        popover: {
          title: '新增项目入口',
          description: '你可以在此新增项目，项目申请单将会创建预备项目，项目创建单会创建正式项目',
          position: 'bottom'
        }
      },
      {
        element: '.note',
        popover: {
          title: '项目备注',
          description: '你可以在此备注查看项目信息,单击打开项目备注编辑页面',
          position: 'bottom'
        }
      },
      {
        element: '.operation',
        popover: {
          title: '操作',
          description: '你可以在此 1.继续配置启动正式项目必须的信息 2.在项目信息不完全的情况下强制启动项目 3.删除项目（需要权限）',
          position: 'bottom'
        }
      },
      {
        element: '.pagination-container',
        popover: {
          title: '底栏',
          description: '你可以在选择你想要单页显示的最大项目数量',
          position: 'bottom'
        }
      }
    ]
  },
  {
    name: 'customprogram',
    step: [
      {
        element: '.filter-container',
        popover: {
          title: '过滤器',
          description: '你可以在此筛选项目',
          position: 'bottom'
        }
      },
      {
        element: '.multi-select',
        popover: {
          title: '项目属性选择器',
          description: '你可以在此选择你关注的项目属性，项目属性分成1.项目基本信息 2.项目联系人 3.软件基本信息 4.流程信息 5.项目信息',
          position: 'bottom'
        }
      },
      {
        element: '.operation',
        popover: {
          title: '操作',
          description: '你可以在此 1.继续配置启动正式项目必须的信息 2.在项目信息不完全的情况下强制启动项目 3.删除项目（需要权限）',
          position: 'bottom'
        }
      },
      {
        element: '.pagination-container',
        popover: {
          title: '底栏',
          description: '你可以在选择你想要单页显示的最大项目数量',
          position: 'bottom'
        }
      }
    ]
  },
  {
    name: 'people',
    step: [
      {
        element: '.filter-container',
        popover: {
          title: '过滤器',
          description: '你可以在此筛选项目',
          position: 'bottom'
        }
      },
      {
        element: '.arrow',
        popover: {
          title: '任务链接',
          description: '你可以在此点此打开当前员工的项目任务信息',
          position: 'bottom'
        }
      },
      {
        element: '.info',
        popover: {
          title: '任务统计表',
          description: '你可以在此查看选中员工的项目任务信息',
          position: 'bottom'
        }
      },
      {
        element: '.pagination-container',
        popover: {
          title: '底栏',
          description: '你可以在选择你想要单页显示的最大项目数量',
          position: 'bottom'
        }
      }
    ]
  },
  {
    name: 'import',
    step: [
      {
        element: '.upload-demo',
        popover: {
          title: '上传文件',
          description: '你可以在上传cmtools的压缩文件解压后的TestNotify.txt文件，解压密码为123cmtool!456',
          position: 'bottom'
        }
      }
    ]
  }

]
