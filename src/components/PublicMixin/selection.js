import { indexModel } from '@/api/model'
import { indexEmployee } from '@/api/employee'

export default {
  data() {
    return {
      selection: {
        model: null,
        programType: ['配置项测试', '定型测试', '回归测试'],
        classification: ['机密', '秘密', '内部'],
        programStage: ['方案', '初样', '试样', '定型'],
        devType: ['1类', '2类', '3类', '4类'],
        programSource: ['12所', '外所软件'],
        managers: [],
        type: ['运载', '战术', '战略', '空军', '海军'],

        softwareType: ['A级', 'B级', 'C级', 'D级'],
        softwareUsage: ['弹上', '地面'],
        codeLangu: ['C', 'FPGA', 'PLC'],
        complier: ['神舟IDE', 'IED2', 'IED3'],
        runtime: ['RUNTIME A', 'RUNTIME B'],
        softwareCate: ['嵌入', '非嵌', 'FPGA', 'PLC'],
        softwareSubCate: ['飞控', '信息处理', '组合导航', 'CPLD', 'PLC', '伺服', '综合控制'],
        cpuType: ['cpu1', 'cpu2', 'cpu3', 'cpu4'],
        size: ['大', '中', '小'],

        role: ['型号负责人', '项目组长', '项目组员', '监督人员', '配置管理员', '质量保证员', '项目创建人']
      }
    }
  },
  created() {
    // 获取所有的model
    var model = null
    var listQuery = {
      isAll: true
    }
    indexModel(listQuery).then(response => {
      var data = response.data
      if (data.total != 0) {
        this.selection.model = Object.values(data.items)
      }
    })
    // 获取所有的manager
    var listQuery = {
      checkPM: true
    }
    indexEmployee(listQuery).then(response => {
      var data = response.data
      this.selection.managers = data.items
    })
  }
}
