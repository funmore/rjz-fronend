<template>
  <div class="app-container">


    <el-row class="tac">
  <el-col :span="2" id="rolemenu">
    <h5>项目担任角色</h5>
    <el-menu
      default-active="leader"
      class="el-menu-vertical-demo"
      @select="handleMenuSelect"
      >
      <el-menu-item index="leader">
        <i class="el-icon-s-custom"></i>
        <span slot="title">项目组长</span>
      </el-menu-item>
      <el-menu-item index="member">
        <i class="el-icon-s-custom"></i>
        <span slot="title">项目组员</span>
      </el-menu-item>
      <el-menu-item index="supervisor">
        <i class="el-icon-s-custom"></i>
        <span slot="title">监督人员</span>
      </el-menu-item>
      <el-menu-item index="cm">
        <i class="el-icon-s-custom"></i>
        <span slot="title">配置管理员</span>
      </el-menu-item>
      <el-menu-item index="qa" >
        <i class="el-icon-s-custom"></i>
        <span slot="title">质量保证员</span>
      </el-menu-item>
      <el-menu-item index="creator" >
        <i class="el-icon-s-custom"></i>
        <span slot="title">项目创建人</span>
      </el-menu-item>
    </el-menu>
  </el-col>
 <el-col :span="22" >
      <div class="filter-container">
        <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="项目名称(支持模糊查询)" v-model="listQuery.title">
        </el-input>
        <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.model_id" placeholder="按型号" @keyup.enter.native="handleFilter">
          <el-option v-for="(item, index) in selection.model" :key="index" :label="item.model_name" :value="item.id">
          </el-option>
        </el-select>

        <el-select clearable style="width: 130px" class="filter-item" v-model="listQuery.manager" placeholder="按型号负责人">
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

        <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>

        <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">导出EXCEL</el-button>
      </div>

      <el-table :key='list.id' :data="list" v-loading="listLoading" border fit highlight-current-row
        style="width: 100%;min-height:1000px;">
        <el-table-column  width="50px" align="center" label="序号"  type="index">
        </el-table-column>

        <el-table-column width="80px" align="center" label="项目名称">
          <template slot-scope="{row}">
            <span>{{row.name}}</span>
          </template>
        </el-table-column>

        <el-table-column width="80px" align="center" label="项目标识">
          <template slot-scope="{row}">
            <span>{{row.program_identity}}</span>
          </template>
        </el-table-column>

        <el-table-column width="80px" align="center" label="项目状态">
          <template slot-scope="{row}">
            <span>{{row.state}}</span>
          </template>
        </el-table-column>

        <el-table-column width="100px" align="center" label="待解决问题">
          <template slot-scope="{row}">
            <span>{{row.issue}}</span>
          </template>
        </el-table-column>

        <el-table-column width="100px" align="center" label="密级">
          <template slot-scope="{row}">
            <span>{{row.classification}}</span>
          </template>
        </el-table-column>

        <el-table-column width="100px" align="center" label="测试类型">
          <template slot-scope="{row}">
            <span>{{row.program_type}}</span>
          </template>
        </el-table-column>

        <el-table-column width="100px" align="center" label="所属型号">
          <template slot-scope="{row}">
            <span>{{selection.model.find(x=>x.id==row.model_id).model_name}}</span>
          </template>
        </el-table-column>

        <el-table-column width="100px" align="center" label="型号负责人">
          <template slot-scope="{row}">
            <span>{{row.manager.name}}</span>
          </template>
        </el-table-column>

        <el-table-column width="100px" align="center" label="项目组长">
          <template slot-scope="{row}">
            <span>{{row.program_leader}}</span>
          </template>
        </el-table-column>

        <el-table-column width="130px" align="center" label="项目组员">
          <template slot-scope="{row}">
            <span>{{row.program_team_strict}}</span>
          </template>
        </el-table-column>


        <el-table-column width="140px" align="center" label="计划开始时间">
          <template slot-scope="{row}">
            <span>{{row.plan_start_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
          </template>
        </el-table-column>

        <el-table-column width="140px" align="center" label="计划结束时间">
          <template slot-scope="{row}">
            <span>{{row.plan_start_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
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
  </el-col>
    </el-row>
  </div>
</template>

<script>
  import { indexModel} from '@/api/model'
import { indexEmployee } from '@/api/employee'

import { indexManagementProgram, showManagementProgram, storeManagementProgram, updateManagementProgram,
         destroyManagementProgram } from '@/api/management-program'
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
  components: { WorkflowItem, ProgramTeamRole,SoftwareInfo,Contact },
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
      program_step:[true,true,true,true,true],

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
        type:'leader'
      },


      temp: {
        programBasic:{
            id:undefined,
            program_source:"",
            type:"",
            ref:"",
            state:"",
            name:"",
            model:"",
            program_type:'',
            program_identity:'',
            classification:'',
            program_stage:'',
            dev_type:'',
            plan_start_time:new Date(),  
            plan_end_time :new Date(),
            manager_id:''
          },

        contact:[
          {is_12s:'是',organ:'12所',type:'计划',name:'',tele:'',isEdit:true},
          {is_12s:'是',organ:'12所',type:'质量',name:'',tele:'',isEdit:true},
          {is_12s:'是',organ:'12所',type:'设计',name:'',tele:'',isEdit:true}
        ],
        softwareInfo:[{
          name:'',
          version_id:new Number(),
          size:'',
          reduced_code_size:'',
          reduced_reason:'',
          software_type:'',
          software_usage:'',
          code_langu:'',
          complier:'',
          runtime:'',
          cpu_type:'',
          software_cate:'',
          software_sub_cate:''
        }],
        workflow:{
          workflow_name:'测试工作流',
          active:2,
          workflowArray:[
            {name:'建项',plan_day:'',type:'建项'},
            {name:'被测件出库',plan_day:'',type:'测试执行'},
            {name:'静态问题提交',plan_day:'',type:'报告'},
            {name:'大纲/用例初版入库',plan_day:'',type:'建项'},
            {name:'测试就绪',plan_day:'',type:'建项'},
            {name:'首轮执行结束(提交动态问题单)',plan_day:'',type:'建项'},
            {name:'回归版本入库',plan_day:'',type:'建项'},
            {name:'回归测试结束(提交动态问题单)',plan_day:'',type:'建项'},
            {name:'报告编写完成(问题单闭环)',plan_day:'',type:'建项'},
            {name:'工作产品入库',plan_day:'',type:'建项'}
          ],
          isError:false
        },
        programTeamRole:[
          {role:'项目组长',employee_id:null,plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false},
          {role:'项目组员',employee_id:null,plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false},
          {role:'监督人员',employee_id:null,plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false},
          {role:'配置管理员',employee_id:null,plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false},
          {role:'质量保证员',employee_id:null,plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false}
        ]

      },

      dialogStatus: '',
      textMap: {
        update: '更新',
        create: '创建'
      },  

      downloadLoading: false,
      check:{
          checkAll: false,
           checkedCities: ['上海', '北京'],
           cities: ['上海', '北京', '广州', '深圳'],
           isIndeterminate: true
         }
    }
  },
  filters: {
    parseTime,
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }

  },
  created() {
    this.getList()
    this.getEmployeePrincal()
    this.getModel()
  },
  methods: {
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
      indexManagementProgram(this.listQuery).then(response => {
        var data=response.data
        this.list = Object.values(data.items)
        this.total = data.total

        // Just to simulate the time of the request
        this.listLoading = false
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
    handleMenuSelect(key, keyPath) {
      this.listQuery.type=key
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
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    resetTemp(){
      this.temp= {
        programBasic:{
          id:undefined,
          program_source:"",
          type:"",
          ref:"",
          state:"",

          name:"",
          model:"",
          program_type:'',
          program_identity:'',
          classification:'',
          program_stage:'',
          dev_type:'',
          plan_start_time:new Date(),  
          plan_end_time :new Date(),
          manager_id:''
        },
        contact:[
          {is_12s:'是',organ:'',type:'计划',name:'',tele:'',isEdit:true},
          {is_12s:'是',organ:'',type:'质量',name:'',tele:'',isEdit:true},
          {is_12s:'是',organ:'',type:'设计',name:'',tele:'',isEdit:true}
        ],
        softwareInfo:[{
          name:'',
          version_id:new Number(),
          size:'',
          reduced_code_size:'',
          reduced_reason:'',
          software_type:'',
          software_usage:'',
          code_langu:'',
          complier:'',
          runtime:'',
          cpu_type:'',
          software_cate:'',
          software_sub_cate:''
        }],
        workflow:{
          workflow_name:'测试工作流',
          active:2,
          workflowArray:[
            {name:'建项',plan_day:'',type:'建项'},
            {name:'被测件出库',plan_day:'',type:'测试执行'},
            {name:'静态问题提交',plan_day:'',type:'报告'},
            {name:'大纲/用例初版入库',plan_day:'',type:'建项'},
            {name:'测试就绪',plan_day:'',type:'建项'},
            {name:'首轮执行结束(提交动态问题单)',plan_day:'',type:'建项'},
            {name:'回归版本入库',plan_day:'',type:'建项'},
            {name:'回归测试结束(提交动态问题单)',plan_day:'',type:'建项'},
            {name:'报告编写完成(问题单闭环)',plan_day:'',type:'建项'},
            {name:'工作产品入库',plan_day:'',type:'建项'}
          ]
        },
        programTeamRole:[
          {role:'项目组长',employee_id:new Number(),plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false},
          {role:'项目组员',employee_id:new Number(),plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false},
          {role:'监督人员',employee_id:new Number(),plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false},
          {role:'配置管理员',employee_id:new Number(),plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false},
          {role:'质量保证员',employee_id:new Number(),plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false}
        ],

        step:0 
      }
    },
    handleProgramCreate() {
      this.previsible=true;
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
    },
    createProgramPeople(){
      var index=this.temp.programTeamRole.length-4;
      this.temp.programTeamRole.splice(index,0,{role:'项目组员',employee_id:null,plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false});
    },
    onCloseDia(){
      this.visible=false;
    },
    onPreCompleted(args){
      this.previsible=false;
      this.visible=true
      this.resetTemp()
      this.dialogStatus = 'create'
      this.program_step=args
    },
     handleCheckAllChange(val) {
        this.check.checkedCities = val ? this.check.cities : [];
        this.check.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.check.checkAll = checkedCount === this.check.cities.length;
        this.check.isIndeterminate = checkedCount > 0 && checkedCount < this.check.cities.length;
      }
  }
}
</script>
