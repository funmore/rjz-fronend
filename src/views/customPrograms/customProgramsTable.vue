<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="项目名称(支持模糊查询)" v-model="listQuery.title">
      </el-input>
      <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.model_id" placeholder="按型号" @keyup.enter.native="handleFilter">
        <el-option v-for="(item, index) in selection.model" :key="index" :label="item.model_name" :value="item.id">
        </el-option>
      </el-select>

      <el-select clearable style="width: 130px" class="filter-item" v-model="listQuery.manager" placeholder="按型号负责人" >
        <el-option v-for="(item, index) in selection.managers" :key="index" :label="item.name" :value="item.id">
        </el-option>
      </el-select>

      <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.classification" placeholder="按密级">
        <el-option v-for="(item, index) in selection.classification" :key="index" :label="item" :value="item">
        </el-option>
      </el-select>

      <el-select clearable style="width: 130px" class="filter-item" v-model="listQuery.program_type" placeholder="按测试类型">
        <el-option v-for="(item, index) in selection.programType" :key="index" :label="item" :value="item">
        </el-option>
      </el-select>
      <select-program-property propLabel="信息集合"  @rangeChange="OnRangeChange"></select-program-property>

      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">导出EXCEL</el-button>
    </div>

    <el-table :key='list.id' :data="list" v-loading="listLoading" border fit highlight-current-row
      style="width: 100%;min-height:1000px;">
      <el-table-column  width="50px" align="center" label="序号"  type="index">
      </el-table-column>

      <el-table-column width="80px" align="center" label="项目名称" v-if="listQuery.request_data.includes('program_name')">
        <template slot-scope="{row}">
          <span>{{row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column width="80px" align="center" label="项目标识" v-if="listQuery.request_data.includes('program_identity')">
        <template slot-scope="{row}">
          <span>{{row.program_identity}}</span>
        </template>
      </el-table-column>

      <el-table-column width="80px" align="center" label="项目状态" v-if="listQuery.request_data.includes('state')">
        <template slot-scope="{row}">
          <span>{{row.state}}</span>
        </template>
      </el-table-column>
    

      <el-table-column width="100px" align="center" label="密级" v-if="listQuery.request_data.includes('classification')">
        <template slot-scope="{row}">
          <span>{{row.classification}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" label="测试类型" v-if="listQuery.request_data.includes('program_type')">
        <template slot-scope="{row}">
          <span>{{row.program_type}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" label="所属型号" v-if="listQuery.request_data.includes('model_name')">
        <template slot-scope="{row}">
          <span>{{selection.model.find(x=>x.id==row.model_id).model_name}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" label="型号负责人" v-if="listQuery.request_data.includes('manager')">
        <template slot-scope="{row}">
          <span>{{row.manager.name}}</span>
        </template>
      </el-table-column>

      <el-table-column width="85px" align="center" label="计划联系人" v-if="listQuery.request_data.includes('plan')">
        <template slot-scope="scope">
          <span>{{scope.row.contact.plan}}</span>
        </template>
      </el-table-column>

      <el-table-column width="85px" align="center" label="质量联系人" v-if="listQuery.request_data.includes('quality')">
        <template slot-scope="scope">
          <span>{{scope.row.contact.quality}}</span>
        </template>
      </el-table-column>

      <el-table-column width="85px" align="center" label="设计联系人" v-if="listQuery.request_data.includes('code')">
        <template slot-scope="scope">
          <span>{{scope.row.contact.code}}</span>
        </template>
      </el-table-column>

      


      <el-table-column width="140px" align="center" label="计划开始时间" v-if="listQuery.request_data.includes('plan_start_time')">
        <template slot-scope="{row}">
          <span>{{row.plan_start_time }}</span>
        </template>
      </el-table-column>

      <el-table-column width="140px" align="center" label="计划结束时间" v-if="listQuery.request_data.includes('plan_start_time')">
        <template slot-scope="{row}">
          <span>{{row.plan_start_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>

      <el-table-column width="140px" align="center" label="实际开始时间" v-if="listQuery.request_data.includes('actual_start_time')">
        <template slot-scope="{row}">
          <span>{{row.actual_start_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>

      <el-table-column width="140px" align="center" label="实际结束时间" v-if="listQuery.request_data.includes('actual_start_time')">
        <template slot-scope="{row}">
          <span>{{row.actual_start_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>



      <el-table-column width="85px" align="center" label="软件名称" v-if="listQuery.request_data.includes('software_name')">
        <template slot-scope="scope">
          <span>{{scope.row.softwareInfoCol[0].name}}</span>
        </template>
      </el-table-column>

      <el-table-column width="85px" align="center" label="版本号" v-if="listQuery.request_data.includes('version_id')">
        <template slot-scope="scope">
          <span>{{scope.row.softwareInfoCol[0].version_id}}</span>
        </template>
      </el-table-column>

      <el-table-column width="85px" align="center" label="编译器"  v-if="listQuery.request_data.includes('complier')">
        <template slot-scope="scope">
          <span>{{scope.row.softwareInfoCol[0].complier}}</span>
        </template>
      </el-table-column>

      <el-table-column width="85px" align="center" label="运行环境" v-if="listQuery.request_data.includes('runtime')">
        <template slot-scope="scope">
          <span>{{scope.row.softwareInfoCol[0].runtime}}</span>
        </template>
      </el-table-column>
      

      <el-table-column width="85px" align="center" label="折算后代码行" v-if="listQuery.request_data.includes('reduced_code_size')">
        <template slot-scope="scope">
          <span>{{scope.row.softwareInfoCol[0].reduced_code_size}}</span>
        </template>
      </el-table-column>

      <el-table-column width="85px" align="center" label="折算原因" v-if="listQuery.request_data.includes('reduced_reason')">
        <template slot-scope="scope">
          <span>{{scope.row.softwareInfoCol[0].reduced_reason}}</span>
        </template>
      </el-table-column>

      <el-table-column width="85px" align="center" label="软件类型" v-if="listQuery.request_data.includes('software_cate')">
        <template slot-scope="scope">
          <span>{{scope.row.softwareInfoCol[0].software_cate}}</span>
        </template>
      </el-table-column>

      <el-table-column width="85px" align="center" label="软件子类型" v-if="listQuery.request_data.includes('software_sub_cate')">
        <template slot-scope="scope">
          <span>{{scope.row.softwareInfoCol[0].software_sub_cate}}</span>
        </template>
      </el-table-column>

      <el-table-column width="85px" align="center" label="CPU类型" v-if="listQuery.request_data.includes('cpu_type')">
        <template slot-scope="scope">
          <span>{{scope.row.softwareInfoCol[0].cpu_type}}</span>
        </template>
      </el-table-column>

      <el-table-column width="85px" align="center" label="编程语言" v-if="listQuery.request_data.includes('code_langu')">
        <template slot-scope="scope">
          <span>{{scope.row.softwareInfoCol[0].code_langu}}</span>
        </template>
      </el-table-column>

      <el-table-column width="85px" align="center" label="软件用途" v-if="listQuery.request_data.includes('software_usage')">
        <template slot-scope="scope">
          <span>{{scope.row.softwareInfoCol[0].software_usage}}</span>
        </template>
      </el-table-column>

      <el-table-column width="85px" align="center" label="软件类型" v-if="listQuery.request_data.includes('software_type')">
        <template slot-scope="scope">
          <span>{{scope.row.softwareInfoCol[0].software_type}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" label="流程节点" v-if="listQuery.request_data.includes('workflow_state')">
        <template slot-scope="{row}">
          <span>{{row.workflow_state}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" label="当前节点问题" v-if="listQuery.request_data.includes('issue')">
        <template slot-scope="{row}">
          <span>{{row.issue}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" label="项目组长" v-if="listQuery.request_data.includes('program_leader')">
        <template slot-scope="{row}">
          <span>{{row.program_leader}}</span>
        </template>
      </el-table-column>

      <el-table-column width="130px" align="center" label="项目组员" v-if="listQuery.request_data.includes('program_team_strict')">
        <template slot-scope="{row}">
          <span>{{row.program_team_strict}}</span>
        </template>
      </el-table-column>



      <el-table-column align="center" label="操作" width="130px" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
            <router-link :to="'/management/programs/edit/'+row.id"> 
            <el-button type="primary" size="small" icon="el-icon-edit">打开</el-button>
          </router-link>
        </template>
      </el-table-column>

    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>





  </div>
</template>

<script>
  import { indexModel} from '@/api/model'
import { indexEmployee } from '@/api/employee'
import SelectEmployee from '@/components/SelectEmployee/index.vue'


import { indexManagementProgram,indexCustomProgram, showManagementProgram, storeManagementProgram, updateManagementProgram,
         destroyManagementProgram } from '@/api/management-program'
import SelectProgramProperty from '@/components/SelectProgramProperty/index.vue'
import WorkflowItem from '@/components/Workflow'
import SoftwareInfo from '@/components/SoftwareInfo'
import Contact from '@/components/Contact'
import ProgramTeamRole from '@/components/ProgramTeamRole'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils/index.js'

const constModel = ['model1','model2','model3']
const constProgramType = ['配置项测试','定型测试','回归测试']
const constClassification = ['机密','秘密','内部']
const constProgramStage = ['方案','初样','试样','定型']
const constDevType = ['1类','2类','3类','4类']
const constProgramSource = ['12所','外所软件']

const constSoftwareType = ['A级','B级','C级','D级']
const constSoftwareUsage = ['弹上','地面']
const constCodeLangu = ['C','FPGA','PLC']
const constComplier = ['神舟IDE','IED2','IED3']
const constRuntime = ['RUNTIME A','RUNTIME B']
const constSoftwareCate = ['嵌入','非嵌','FPGA','PLC']
const constSoftwareSubCate = ['飞控','信息处理','组合导航','CPLD','PLC','伺服','综合控制']
const constCpuType = ['cpu1','cpu2','cpu3','cpu4']
const constSize = ['大','中','小']



export default {
  name: 'complexTable',
  components: { WorkflowItem, ProgramTeamRole,SoftwareInfo,Contact,SelectProgramProperty,SelectEmployee},
  directives: {
    waves
  },
  data() {
    return {
      
      selection:{
        model:constModel,
        programType:constProgramType,
        classification:constClassification,
        programStage:constProgramStage,
        programSource:constProgramSource,
        devType:constDevType,
        managers:undefined,
        type:['运载','战术','战略','空军','海军'],

        softwareType:constSoftwareType,
        softwareUsage:constSoftwareUsage,
        codeLangu:constCodeLangu,
        complier:constComplier,
        runtime:constRuntime,
        softwareCate:constSoftwareCate,
        softwareSubCate:constSoftwareSubCate,
        cpuType:constCpuType,
        size:constSize
      },
      listLoading: true,
      visible:false,
      previsible:false,
      program_type:'',

      tableKey: 0,

      list: [],
      total: new Number(),

      listQuery: {
        page: 1,
        limit: 20,
        model_id:undefined,   //型号
        program_type:undefined,
        manager:undefined,
        classification:undefined,
        title: undefined,
        request_data:[]
      },

      dialogStatus: '',
      textMap: {
        update: '更新',
        create: '创建'
      },  

      downloadLoading: false,
      

    }
  },
  filters: {
    parseTime
  },
  created() {
    this.getList()
    this.getEmployeePrincal()
    this.getModel()
  },
  methods: {
    OnRangeChange(args){
        this.listQuery.request_data=args;
    },
    getModel(){
      var listQuery={
          isAll:true
        };
        indexModel(listQuery).then(response => {
        var data=response.data
        if(data.total!=0){
          this.selection.model = Object.values(data.items)
        }
      })
    },
    getList() {

      this.listLoading = true;
      indexCustomProgram(this.listQuery).then(response => {
        var data=response.data
        this.list = Object.values(data.items)
        this.total = data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    getEmployeePrincal(){
        var listQuery={
          checkPM:true
        }
        indexEmployee(listQuery).then(response => {
        var data=response.data
        this.selection.managers = data.items
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },

 
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['序号', '软件名称','项目成员', '当前状态','待解决问题','预计完成时间']
        const filterVal = ['id', 'name', 'program_team_strict', 'state', 'issue','plan_end_time']
        const data = this.formatJson(filterVal, this.list)
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '项目信息'+dateTime
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === '') {
          return '';//parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
