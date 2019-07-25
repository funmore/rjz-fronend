<template>
  <div class="app-container">



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
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleProgramCreate" type="primary" icon="el-icon-edit">新增</el-button>

    </div>

    <el-table :key='list.id' :data="list" v-loading="listLoading" border fit highlight-current-row
      style="width: 100%;min-height:1000px;">
      <el-table-column  label="序号"
                  type="index"
                  width="50">
      </el-table-column>

      <el-table-column width="80px" align="center" label="项目名称">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column width="80px" align="center" label="项目标识">
        <template slot-scope="scope">
          <span>{{scope.row.program_identity}}</span>
        </template>
      </el-table-column>


      <el-table-column width="100px" align="center" label="密级">
        <template slot-scope="scope">
          <span>{{scope.row.classification}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" label="测试类型">
        <template slot-scope="scope">
          <span>{{scope.row.program_type}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" label="所属型号">
        <template slot-scope="scope">
          <span>{{selection.model.find(x=>x.id==scope.row.model_id)==null?null:selection.model.find(x=>x.id==scope.row.model_id).model_name}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" label="型号负责人">
        <template slot-scope="scope">
          <span>{{scope.row.manager.name}}</span>
        </template>
      </el-table-column>



      <el-table-column width="140px" align="center" label="计划开始时间">
        <template slot-scope="scope">
          <span>{{scope.row.plan_start_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>

      <el-table-column width="140px" align="center" label="计划结束时间">
        <template slot-scope="scope">
          <span>{{scope.row.plan_start_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>


      <el-table-column align="center" label="操作" width="330px" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            width="200px"
            trigger="hover" 
            @show="handleCheckedChange(scope.row.create_step,scope.row)"
            >
              <div style="text-align: left; margin: 0">
                   <el-checkbox-group v-model="scope.row.create_step" @change="handleCheckedChange(scope.row.create_step,scope.row)">
                    <el-checkbox label="项目的信息"></el-checkbox>
                    <el-checkbox label="联系人配置"></el-checkbox>
                    <el-checkbox label="被测件信息"></el-checkbox>
                    <el-checkbox label="工作流配置"></el-checkbox>
                    <el-checkbox label="项目组配置"></el-checkbox>
                    
                  </el-checkbox-group>
                  <el-button type="warning" @click="handleProgramUpdate(scope.row)">确认</el-button>
              </div>
            <el-button type="danger" slot="reference">配置</el-button>
          </el-popover>
          <el-button type="primary"  :loading="onProgramStarting" @click="onProgramStart(scope.row)">项目启动</el-button>
        </template>
      </el-table-column>

    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>




  <pre-program  :propVisible="previsible" @pre-completed="onPreCompleted"></pre-program>
  <pre-program-edit :propStep="program_step" :propDialogStatus="dialogStatus" :propProgram="temp" :propVisible="visible" :propSelection="selection" @close-dia="onCloseDia" @update-list="onUpdateList"></pre-program-edit>

  </div>
</template>

<script>
import { indexModel} from '@/api/model'
import { indexPreProgram, showPreProgram, storePreProgram, updatePreProgram,
         destroyPreProgram } from '@/api/preprogram'
import { indexProgram, showProgram, storeProgram, updateProgram,
         destroyProgram } from '@/api/program'
import { indexEmployee } from '@/api/employee'

import WorkflowItem from '@/components/Workflow'
import SoftwareInfo from '@/components/SoftwareInfo'
import Contact from '@/components/Contact'
import ProgramTeamRole from '@/components/ProgramTeamRole'
import PreProgramEdit from '@/components/PreProgramEdit'
import PreProgram from './components/TableCom/PreProgram.vue'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils/index.js'


export default {
  name: 'complexTable',
  components: { WorkflowItem, ProgramTeamRole,SoftwareInfo,Contact,PreProgramEdit,PreProgram },
  directives: {
    waves
  },
  data() {
    return {
      
      selection:{
        model:['model1','model2','model3'],
        programType:['配置项测试','定型测试','回归测试'],
        classification: ['机密','秘密','内部'],
        programStage:['方案','初样','试样','定型'],
        devType:['1类','2类','3类','4类'],
        programSource:['12所','外所软件'],
        managers:[],
        type:['运载','战术','战略','空军','海军'],

        softwareType:['A级','B级','C级','D级'],
        softwareUsage: ['弹上','地面'],
        codeLangu:['C','FPGA','PLC'],
        complier: ['神舟IDE','IED2','IED3'],
        runtime: ['RUNTIME A','RUNTIME B'],
        softwareCate: ['嵌入','非嵌','FPGA','PLC'],
        softwareSubCate: ['飞控','信息处理','组合导航','CPLD','PLC','伺服','综合控制'],
        cpuType: ['cpu1','cpu2','cpu3','cpu4'],
        size: ['大','中','小']
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
        title: undefined
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
            manager:null
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
          {role:'质量保证员',employee_id:null,plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false}
        ]

      },

      dialogStatus: '',
      textMap: {
        update: '更新',
        create: '创建'
      },  

      downloadLoading: false,
      onProgramStarting:false,
    }
  },
  filters: {
    parseTime

  },
  created() {
    this.getList()
    this.getEmployeeMananger()
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
    getEmployeeMananger(){
        var listQuery={
          checkPM:true
        }
        indexEmployee(listQuery).then(response => {
        var data=response.data
        this.selection.managers = data.items
      })
    },
    getList() {

      this.listLoading = true;
      indexPreProgram(this.listQuery).then(response => {
        var data=response.data
        this.list = Object.values(data.items)
        this.total = data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
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
    resetTemp(id){
      this.temp= {
        programBasic:{
          id:id,
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
          manager:Object.assign({}, this.selection.managers[0])
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
          {role:'项目组长',employee_id:new Number(),plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false},
          {role:'项目组员',employee_id:new Number(),plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false},
          {role:'监督人员',employee_id:new Number(),plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false},
          {role:'配置管理员',employee_id:new Number(),plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false},
          {role:'质量保证员',employee_id:new Number(),plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false}
        ],

        step:0,
      }
    },
    handleProgramCreate() {
      this.previsible=true;
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
      }else if(cstepid>1&&cstepid<4){
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
      }else if(cstepid>1&&cstepid<4){      
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
                  
      }else{
                  this.temp.step=this.temp.step+1;
                  this.invisible= this.invisible.map((eachName,step)=>{
                  if(step==this.temp.step){
                    return true;
                    }else{
                    return false;
                  }
                  });
      }
      
    },

    handleProgramUpdate(row) {
      this.resetTemp(row.id);
      this.visible=true;
      this.dialogStatus = 'update'

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
      this.resetTemp()
      this.previsible=false;
      this.visible=true
      this.dialogStatus = 'create'
      this.program_step=args
    },
    onUpdateList(args){
      if(args.type=='store'){

            if(this.list==undefined) this.list=[];
            var data=args.data;
            this.list.unshift(data);
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
      }else if(args.type=='update'){

            if(this.list==undefined) this.list=[];
              var data=args.data;

             for (const v of this.list) {
              if (v.id === data.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, data)
                break
              }
            }
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
      }
    },

    handleCheckedChange(value,row) {
      if(value.includes('项目组配置')){
        row.create_step=['项目的信息','联系人配置','被测件信息','工作流配置','项目组配置']
        this.program_step=[true,true,true,true,true]
      }else if(value.includes('工作流配置')){
        row.create_step=['项目的信息','联系人配置','被测件信息','工作流配置']
        this.program_step=[true,true,true,true,false]
      }else if(value.includes('被测件信息')){
        row.create_step=['项目的信息','联系人配置','被测件信息']
        this.program_step=[true,true,true,false,false]
      }else{
        this.program_step=[true,true,false,false,false]
      }
    },
    onProgramStart(row){
        this.onProgramStarting=true;
        row.state="项目进行中";
        let data=row;
        updateProgram(data).then(response => {
        if(response.data.isOkay==true){
          for (const v of this.list) {
                  if (v.id === row.id) {
                    const index = this.list.indexOf(v)
                    this.list.splice(index, 1)
                    break
                  }
                }
                this.$notify({
                  title: '项目已启动',
                  message: '请在项目中查看此项目',
                  type: 'success',
                  duration: 2000
                })
        }
        this.onProgramStarting=false;
      })
    }
  }
}
</script>
