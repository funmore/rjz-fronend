<template>
  <div class="app-container">



    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="项目名称(支持模糊查询)" v-model="listQuery.title">
      </el-input>
      <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.model" placeholder="按型号" @keyup.enter.native="handleFilter">
        <el-option v-for="(item, index) in model" :key="index" :label="item" :value="item">
        </el-option>
      </el-select>

      <el-select clearable style="width: 130px" class="filter-item" v-model="listQuery.manager" placeholder="按型号负责人">
        <el-option v-for="(item, index) in managers" :key="index" :label="item.name" :value="item.id">
        </el-option>
      </el-select>

      <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.classification" placeholder="按密级">
        <el-option v-for="(item, index) in classification" :key="index" :label="item" :value="item">
        </el-option>
      </el-select>

      <el-select clearable style="width: 130px" class="filter-item" v-model="listQuery.program_type" placeholder="按测试类型">
        <el-option v-for="(item, index) in programType" :key="index" :label="item" :value="item">
        </el-option>
      </el-select>


      <el-checkbox v-model="listQuery.isMeCreated" @change='handleFilter'>我创建的项目</el-checkbox>
      <el-checkbox v-model="listQuery.isMeLeader" @change='handleFilter'>我任项目组长的项目</el-checkbox>
      <el-checkbox v-model="listQuery.isMeMember" @change='handleFilter'>我任项目组员的项目</el-checkbox>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">新增</el-button>

      <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">导出EXCEL</el-button>
    </div>

    <el-table :key='list.id' :data="list" v-loading="listLoading" border fit highlight-current-row
      style="width: 100%;min-height:1000px;">
      <el-table-column  label="序号"
                  type="index"
                  width="50">
      </el-table-column>

      <el-table-column width="130px" align="center" label="项目名称">
        <template slot-scope="scope">
          <span @click="handleDialogUpdate(scope.row)">{{scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column width="130px" align="center" label="项目标识">
        <template slot-scope="scope">
          <span @click="handleDialogUpdate(scope.row)">{{scope.row.program_identity}}</span>
        </template>
      </el-table-column>

      <el-table-column width="130px" align="center" label="项目状态">
        <template slot-scope="scope">
          <span @click="handleDialogUpdate(scope.row)">{{scope.row.state}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" label="待解决问题">
        <template slot-scope="scope">
          <span @click="handleDialogUpdate(scope.row)">{{scope.row.issue}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" label="密级">
        <template slot-scope="scope">
          <span @click="handleDialogUpdate(scope.row)">{{scope.row.classification}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" label="测试类型">
        <template slot-scope="scope">
          <span @click="handleDialogUpdate(scope.row)">{{scope.row.program_type}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" label="所属型号">
        <template slot-scope="scope">
          <span @click="handleDialogUpdate(scope.row)">{{scope.row.model}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" label="型号负责人">
        <template slot-scope="scope">
          <span @click="handleDialogUpdate(scope.row)">{{scope.row.manager_name}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" label="项目组长">
        <template slot-scope="scope">
          <span @click="handleDialogUpdate(scope.row)">{{scope.row.program_leader}}</span>
        </template>
      </el-table-column>

      <el-table-column width="130px" align="center" label="项目组员">
        <template slot-scope="scope">
          <span @click="handleDialogUpdate(scope.row)">{{scope.row.program_team_strict}}</span>
        </template>
      </el-table-column>


      <el-table-column width="140px" align="center" label="计划开始时间">
        <template slot-scope="scope">
          <span @click="handleDialogUpdate(scope.row)">{{scope.row.plan_start_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>

      <el-table-column width="140px" align="center" label="计划结束时间">
        <template slot-scope="scope">
          <span @click="handleDialogUpdate(scope.row)">{{scope.row.plan_start_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>




      <el-table-column align="center" label="操作" width="130px" class-name="small-padding fixed-width">
        <template slot-scope="scope">
            <router-link :to="'/management/programs/edit/'+scope.row.id"> 
            <el-button type="primary" size="small" icon="el-icon-edit">打开</el-button>
          </router-link>
        </template>
      </el-table-column>

    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>







   <el-dialog :title="textMap[dialogStatus] + '项目'" :visible.sync="invisible[0]">
      <el-form :rules="rules0" :ref="dataformMap[0]" :model="temp" label123456781-position="left" label-width="200px" style='width: 600px; margin-left:50px;'>
          <el-form-item label="所属型号" prop="model">
          <el-select v-model="temp.model" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in model"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="项目名称" prop="name">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.name">
          </el-input>
        </el-form-item>

        <el-form-item label="项目标识" prop="program_identity">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.program_identity">
          </el-input>
        </el-form-item>

        <el-form-item label="类型" prop="type">
          <el-select v-model="temp.type" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in type"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="参考基线" prop="ref">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.ref">
          </el-input>
        </el-form-item>

        <el-form-item label="项目来源" prop="program_source">
          <el-select v-model="temp.program_source" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in programSource"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>




        <el-form-item label="测试类型" prop="program_type">
          <el-select v-model="temp.program_type" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in programType"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="密级">
          <el-select v-model="temp.classification" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in classification"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="研制类型">
          <el-select v-model="temp.dev_type" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in devType"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="项目阶段">
          <el-select v-model="temp.program_stage" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in programStage"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="计划开始时间" prop="actualStartTime">
          <el-date-picker v-model="temp.plan_start_time" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="Please pick a date">
          </el-date-picker>
        </el-form-item>


        <el-form-item label="计划结束时间" prop="actualEndTime">
          <el-date-picker v-model="temp.plan_end_time" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"  placeholder="Please pick a date">
          </el-date-picker>
        </el-form-item>



       <el-form-item label="型号负责人">
        <template slot-scope="scope">
            <el-select v-model="temp.manager_id" placeholder="请选择" @keyup.enter.native="scope.row.isEdit=!scope.row.isEdit">
            <el-option
              v-for="(item,index) in managers"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select> 
        </template>
        </el-form-item>







      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelStep()">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="nextStep(temp.step)">下一步</el-button>
        <el-button v-else type="primary" @click="updateDialogData">确认</el-button>
      </div>
    </el-dialog>






   <el-dialog title="配置被测件信息" :visible.sync="invisible[1]">

        <software-info :propSoftwareInfo="temp.softwareInfo" :propRef="dataformMap[1]" :ref="dataformMap[1]"></software-info>

        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelStep()">取消</el-button>
          <el-button type="primary" @click="previousStep(temp.step)">上一步</el-button>
          <el-button type="primary" @click="nextStep(temp.step)">下一步</el-button>
       </div>
    </el-dialog>



    <el-dialog title="配置工作流信息" :visible.sync="invisible[2]">
        
        <workflow-item :workflow="temp.workflow" :propRef="dataformMap[2]" :ref="dataformMap[2]" position="left" width="200px" ></workflow-item>
        
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelStep()">取消</el-button>
          <el-button type="primary" @click="previousStep(temp.step)">上一步</el-button>
          <el-button type="primary" @click="nextStep(temp.step)">下一步</el-button>
       </div>
    </el-dialog>

    <el-dialog title="配置项目组员" :visible.sync="invisible[3]">
      <el-button  style="margin-left: 10px;" @click="createProgramPeople" type="primary" icon="el-icon-edit">新增项目组员</el-button>

      <program-team-role :programTeamRole="temp.programTeamRole" :ref="dataformMap[3]" :isAllEdit="false"></program-team-role>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelStep()">取消</el-button>
        <el-button type="primary" @click="previousStep(temp.step)">上一步</el-button>
        <el-button type="primary" @click="createProgram(temp.step)">创建</el-button>
     </div>
    </el-dialog>

  </div>
</template>

<script>
import { indexEmployee } from '@/api/employee'

import { indexManagementProgram, showManagementProgram, storeManagementProgram, updateManagementProgram,
         destroyManagementProgram } from '@/api/management-program'
import WorkflowItem from '@/components/Workflow'
import SoftwareInfo from '@/components/SoftwareInfo'
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
  components: { WorkflowItem, ProgramTeamRole,SoftwareInfo },
  directives: {
    waves
  },
  data() {
    return {

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
      size:constSize,

      listLoading: true,


      tableKey: 0,

      list: [],
      total: new Number(),

      listQuery: {
        page: 1,
        limit: 20,
        model:undefined,   //型号
        program_type:undefined,
        manager:undefined,
        classification:undefined,
        title: undefined,
        isMeCreated:true,
        isMeLeader:false,
        isMeMember:true
      },


      temp: {
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
        manager_id:'',


        softwareInfo:{
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
        },
        workflow:{
          workflow_name:'测试工作流',
          active:2,
          workflowArray:[
            {name:'建项',plan_day:'',type:'建项'},
            {name:'被测软件接受',plan_day:'',type:'测试执行'},
            {name:'静态问题提交',plan_day:'',type:'报告'},
            {name:'测试环境就绪情况',plan_day:'',type:'建项'},
            {name:'测试工作产品编写',plan_day:'',type:'建项'},
            {name:'入库归档状态',plan_day:'',type:'建项'},
            {name:'测试工作产品内部评审',plan_day:'',type:'建项'},
            {name:'评审问题闭合',plan_day:'',type:'建项'},
            {name:'需求(大纲)正式评审',plan_day:'',type:'建项'},
            {name:'评审问题闭合',plan_day:'',type:'建项'},
            {name:'入库归档状态',plan_day:'',type:'建项'},
            {name:'首轮测试',plan_day:'',type:'建项'},
            {name:'软件问题单闭合',plan_day:'',type:'建项'},
            {name:'报告评审',plan_day:'',type:'建项'},
            {name:'入库归档状态',plan_day:'',type:'建项'}
          ],
          isError:false
        },
        programTeamRole:[
          {role:'项目组长',employee_id:null,plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false},
          {role:'项目组员',employee_id:null,plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false},
          {role:'监督人员',employee_id:null,plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false},
          {role:'配置管理员',employee_id:null,plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false},
          {role:'质量保证人员',employee_id:null,plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false}
        ],

        step:0 
      },
      invisible:new Array(false,false,false,false),


      dialogStatus: '',
      textMap: {
        update: '更新',
        create: '创建'
      },
      dataformMap:['dataForm0','dataForm1','dataForm2','dataForm3'],
  

      rules0: {
        // name: [ { required: true, message: '请输入项目名称', trigger: 'blur' } ],
        // program_identity: [ { required: true, message: '请输入项目标识', trigger: 'blur' } ],
        // program_type: [ { required: true, message: '请输入测试类型', trigger: 'blur' } ],
        // timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }]
      },
      rules1: {
        //timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }]
      },
      rules2:{

      },
      rules3:{

      },
      downloadLoading: false
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
    // typeFilter(type) {
    //   return calendarTypeKeyValue[type]
    // }
  },
  created() {
    this.getList()
    this.getEmployeePrincal()
  },
  methods: {
    getList() {

      this.listLoading = true;
      indexManagementProgram(this.listQuery).then(response => {
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
        this.managers = data.items
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
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    resetTemp(){
      this.temp= {
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
        manager_id:'',

        softwareInfo:{
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
        },
        workflow:{
          workflow_name:'测试工作流',
          active:2,
          workflowArray:[
            {name:'建项',plan_day:'',type:'建项'},
            {name:'被测软件接受',plan_day:'',type:'测试执行'},
            {name:'静态问题提交',plan_day:'',type:'报告'},
            {name:'测试环境就绪情况',plan_day:'',type:'建项'},
            {name:'测试工作产品编写',plan_day:'',type:'建项'},
            {name:'入库归档状态',plan_day:'',type:'建项'},
            {name:'测试工作产品内部评审',plan_day:'',type:'建项'},
            {name:'评审问题闭合',plan_day:'',type:'建项'},
            {name:'需求(大纲)正式评审',plan_day:'',type:'建项'},
            {name:'评审问题闭合',plan_day:'',type:'建项'},
            {name:'入库归档状态',plan_day:'',type:'建项'},
            {name:'首轮测试',plan_day:'',type:'建项'},
            {name:'软件问题单闭合',plan_day:'',type:'建项'},
            {name:'报告评审',plan_day:'',type:'建项'},
            {name:'入库归档状态',plan_day:'',type:'建项'}
          ]
        },
        programTeamRole:[
          {role:'项目组长',employee_id:null,plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false},
          {role:'项目组员',employee_id:null,plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false},
          {role:'监督人员',employee_id:null,plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false},
          {role:'配置管理员',employee_id:null,plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false},
          {role:'质量保证人员',employee_id:null,plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false}
        ],

        step:0 
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.invisible[0]=true;
      //this.projectDialogFromInvisiable = true
      this.$nextTick(() => {
        this.$refs['dataForm0'].clearValidate()
      })
    },
    cancelStep(){
        this.invisible=this.invisible.map(()=>false);
    },
    previousStep(cstepid){
      if(cstepid<1){
        this.$refs[this.dataformMap[cstepid]].validate((valid)=>{
          if(valid){
                  this.temp.step=this.temp.step-1;
                  this.invisible=this.invisible.map((eachName,step)=>{
                      if(step==this.temp.step){
                      return true;
                    }else{
                      return false;
                    }
                  });
          }
        })
      }else if(cstepid>0&&cstepid<3){
        this.$refs[this.dataformMap[cstepid]].$refs[this.dataformMap[cstepid]].validate((valid)=>{
          if(valid){
              this.temp.step=this.temp.step-1;
                      this.invisible=this.invisible.map((eachName,step)=>{
                          if(step==this.temp.step){
                          return true;
                        }else{
                          return false;
                        }
                      });
                }
        })
      }else{
        this.temp.step=this.temp.step-1;
                      this.invisible=this.invisible.map((eachName,step)=>{
                          if(step==this.temp.step){
                          return true;
                        }else{
                          return false;
                        }
                      });
      }

    },
    nextStep(cstepid){
      if(cstepid<1){
        this.$refs[this.dataformMap[cstepid]].validate((valid)=>{
          if(valid){
                  this.temp.step=this.temp.step+1;
                  this.invisible= this.invisible.map((eachName,step)=>{
                  if(step==this.temp.step){
                    return true;
                    }else{
                    return false;
                  }
                  });
          }
        });
      }else{      
        this.$refs[this.dataformMap[cstepid]].$refs[this.dataformMap[cstepid]].validate((valid)=>{
          if(valid){
                  this.temp.step=this.temp.step+1;
                  this.invisible= this.invisible.map((eachName,step)=>{
                  if(step==this.temp.step){
                    return true;
                    }else{
                    return false;
                  }
                  });
          }
                  
        })
                  
      }
      
    },
    createProgram(cstepid) {
          //关闭所有窗口
          this.invisible[cstepid]=false;
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          storeManagementProgram(this.temp).then((response) => {
            if(this.list==undefined) this.list=[];
            this.temp.id = response.data.id
            this.list.unshift(this.temp);
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
        })
    //   this.$refs[this.dataformMap[cstepid]].validate((valid) => {
    //     if (valid) {
    //       //关闭所有窗口
    //       this.invisible[cstepid]=false;
    //       this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
    //       storeManagementProgram(this.temp).then(() => {
    //         if(this.list==undefined) this.list=[];
    //         this.list.unshift(this.temp);
    //         this.$notify({
    //           title: '成功',
    //           message: '创建成功',
    //           type: 'success',
    //           duration: 2000
    //         })
    //     })
    //     }
    // })
    },
    handleDialogUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.projectDialogFromInvisiable = true
      this.$nextTick(() => {
        this.$refs['dataForm0'].clearValidate()
      })

    },
    updateDialogData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.projectDialogFromInvisiable = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })



      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)   //deep copy this.temp
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)   //将list中的原有的条目找到，并替换为新的条目
                break
              }
            }
            this.projectDialogFromInvisiable = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
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
    }
  }
}
</script>
