<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="项目名称(支持模糊查询)" v-model="listQuery.title">
      </el-input>
      <el-select clearable style="width: 130px" class="filter-item" v-model="listQuery.state" placeholder="按生命周期">
        <el-option v-for="(item, index) in ['意向项目','预备项目','正式项目','完结项目','全部项目']" :key="index" :label="item" :value="item">
        </el-option>
      </el-select>
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
      
      <select-program-property  class="multi-select" :propValue="columnSelect.values" :propList="selectList" :propSeparator="separator" @rangeChange="OnRangeChange"></select-program-property>
      <favor propType="custom"    :propColumnSelect="columnSelect" @favorChange="onFavorChange"></favor>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">导出EXCEL</el-button>

    </div>





    <el-table :key='list.id' :data="list" v-loading="listLoading" border fit highlight-current-row
      style="width: 100%;min-height:1000px;" @selection-change="handleSelectionChange">
      <el-table-column type="selection" align="center"></el-table-column>

      <el-table-column   width="50px" align="center" label="序号"  type="index" :index="indexMethod">
      </el-table-column>

      <el-table-column 
          sortable
          width="80px" align="center"
          v-for="(item,index) in columnConfig.items" 
          :key="item.name"  
          :label="item.name"   >
        <template slot-scope="{row}">
          <!-- <span>{{row|valueComputed(index,columnConfig,separator)}}</span> -->
          <span>{{valueComputed(row,index)}}</span>
        </template>
      </el-table-column>

     <el-table-column align="center" label="信息维护" width="330px"  >
        <template slot-scope="scope">
         <el-row> <el-button :type="scope.row.is_exist.ProgramBasic?'success':'warning'" size="mini"  :icon="scope.row.is_exist.ProgramBasic?'el-icon-edit':'el-icon-circle-plus-outline'"  @click="handleConfigure(scope.row,'ProgramBasic')">{{scope.row.is_exist.ProgramBasic|State}}基本信息</el-button></el-row>
         <el-row> <el-button :type="scope.row.is_exist.Contact?'success':'warning'" size="mini"  :icon="scope.row.is_exist.Contact?'el-icon-edit':'el-icon-circle-plus-outline'"  @click="handleConfigure(scope.row,'Contact')">{{scope.row.is_exist.Contact|State}}联系人员</el-button></el-row>
         <el-row> <el-button :type="scope.row.is_exist.SoftwareInfo?'success':'warning'" size="mini"  :icon="scope.row.is_exist.SoftwareInfo?'el-icon-edit':'el-icon-circle-plus-outline'"  @click="handleConfigure(scope.row,'SoftwareInfo')">{{scope.row.is_exist.SoftwareInfo|State}}软件信息</el-button></el-row>
         <el-row> <el-button :type="scope.row.is_exist.Workflow?'success':'warning'" size="mini"  :icon="scope.row.is_exist.Workflow?'el-icon-edit':'el-icon-circle-plus-outline'"  @click="handleConfigure(scope.row,'Workflow')">{{scope.row.is_exist.Workflow|State}}流程信息</el-button></el-row>
         <el-row> <el-button :type="scope.row.is_exist.ProgramTeamRole?'success':'warning'" size="mini"  :icon="scope.row.is_exist.ProgramTeamRole?'el-icon-edit':'el-icon-circle-plus-outline'"  @click="handleConfigure(scope.row,'ProgramTeamRole')">{{scope.row.is_exist.ProgramTeamRole|State}}人员信息</el-button></el-row>
        </template>
      </el-table-column>
       <el-table-column align="center" label="操作" width="330px">
        <template slot-scope="scope">
           <span >切换项目状态为</span>
            <el-select v-model="scope.row.programBasic.state" placeholder="项目状态">
                  <el-option
                    v-for="(item,index) in ['意向项目','预备项目','正式项目','完结项目']"
                    :key="index"
                    :label="item"
                    :value="item"
                     >
                  </el-option>
            </el-select>
            <span><el-button type="primary"  @click="onProgramStart(scope.row)">确认</el-button></span>
            
          <el-button type="danger" size="small" icon="el-icon-edit" :loading="onDeleting" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>

      <!-- <el-table-column align="center" label="操作" width="330px" class-name="small-padding fixed-width operation">
        <template slot-scope="scope">
          <el-button type="primary" size="small"  :loading="onProgramStarting" @click="onProgramStart(scope.row)">转正式项目</el-button>
          <el-button type="danger" size="small" icon="el-icon-edit" :loading="onDeleting" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column> -->


    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <aaa :propProgramBasicId="programBasicId" :propIsExist="is_exist" :propSelection="selection"  :propVisible="visibleCol.ProgramBasic" @close="handleClose"></aaa>
    <bbb :propProgramBasicId="programBasicId" :propIsExist="is_exist"                             :propVisible="visibleCol.Contact" @close="handleClose"></bbb>
    <ccc :propProgramBasicId="programBasicId" :propIsExist="is_exist" :propSelection="selection"  :propVisible="visibleCol.SoftwareInfo" @close="handleClose"></ccc>
    <ddd :propProgramBasicId="programBasicId" :propIsExist="is_exist"                             :propVisible="visibleCol.Workflow" @close="handleClose"></ddd>
    <eee :propProgramBasicId="programBasicId" :propIsExist="is_exist"                             :propVisible="visibleCol.ProgramTeamRole" @close="handleClose"></eee>





  </div>
</template>

<script>



import { indexModel} from '@/api/model'
import { indexEmployee } from '@/api/employee'
import SelectEmployee from '@/components/SelectEmployee/index.vue'
import { indexFavor, showFavor, storeFavor, updateFavor,
         destroyFavor } from '@/api/favor'
import { indexProgram, showProgram, storeProgram, updateProgram,
         destroyProgram } from '@/api/program'
import { indexProgramEdit,indexCustomProgram, showProgramEdit, storeProgramEdit, updateProgramEdit,
         destroyProgramEdit } from '@/api/programedit'
import SelectProgramProperty from '@/components/SelectProgramProperty/index.vue'
import WorkflowItem from '@/components/Workflow'
import SoftwareInfo from '@/components/SoftwareInfo'
import Contact from '@/components/Contact'
import ProgramTeamRole from '@/components/ProgramTeamRole'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils/index.js'
import Favor from '@/components/Favor.vue'

import aaa from '@/components/PreProgramCom/ProgramBasic.vue'
import bbb from '@/components/PreProgramCom/Contact.vue'
import ccc from '@/components/PreProgramCom/SoftwareInfo.vue'
import ddd from '@/components/PreProgramCom/Workflow.vue'
import eee from '@/components/PreProgramCom/ProgramTeamRole.vue'


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
  components: { WorkflowItem, ProgramTeamRole,SoftwareInfo,Contact,SelectProgramProperty,SelectEmployee,Favor,aaa,bbb,ccc,ddd,eee},
  directives: {
    waves
  },
  data() {
    return {
      onDeleting:false,
      visibleCol:{
        ProgramBasic:false,
        Contact:false,
        SoftwareInfo:false,
        Workflow:false,
        ProgramTeamRole:false
      },
      is_exist:false,
      programBasicId:new Number(),

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

      separator:'.',
      listQuery:{
        model:[],
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
        state:'正式项目',
        model_id:undefined,   //型号
        program_type:undefined,
        manager:undefined,
        classification:undefined,
        title: undefined
      },
      columnSelect:{values:[],items:[]},  //保存多选多选出的原生数据
      columnConfig:{values:[],items:[]},  //监视columnSelect 把根节点去除后的数据
  

      dialogStatus: '',
      textMap: {
        update: '更新',
        create: '创建'
      },  

      downloadLoading: false,
      selectList: [
        {
          key:'programBasic',
          name:'项目基本信息',
          children:[
            {
              key:'program_source',
              name:'项目来源',
              children:null
            },
            {
              key:'type',
              name:'类型',
              children:null
            },
            {
              key:'ref',
              name:'参考基线',
              children:null
            },
            {
              key:'state',
              name:'项目状态',
              children:null
            },
            {
              key:'classification',
              name:'密级',
              children:null
            },
            {
              key:'name',
              name:'项目名称',
              children:null
            },
            {
              key:'model_name',
              name:'型号名称',
              children:null
            },
            {
              key:'program_type',
              name:'测试类型',
              children:null
            },
            {
              key:'program_identity',
              name:'项目标识',
              children:null
            },
            {
              key:'program_stage',
              name:'项目阶段',
              children:null
            },
            {
              key:'dev_type',
              name:'研制类型',
              children:null
            },
            {
              key:'plan_start_time',
              name:'计划开始时间',
              children:null
            },
            {
              key:'plan_end_time',
              name:'计划结束时间',
              children:null
            },
            {
              key:'actual_start_time',
              name:'实际开始时间',
              children:null
            },
            {
              key:'actual_end_time',
              name:'实际结束时间',
              children:null
            },
            {
              key:'manager_name',
              name:'型号负责人',
              children:null
            }
          ]
        },
        {
          key:'contact',
          name:'联系人',
          children:[
            {
              key:'plan',
              name:'计划',
              children:null
            },
            {
              key:'quality',
              name:'质量',
              children:null
            },
            {
              key:'code',
              name:'设计',
              children:null
            }
            ]
        },
         {
          key:'softwareInfoCol',
          name:'软件信息',
          children:[
            {
              key:'software_name',
              name:'软件名称',
              children:null
            },
            {
              key:'version_id',
              name:'版本号',
              children:null
            },
            {
              key:'reduced_code_size',
              name:'折算后代码',
              children:null
            },
            {
              key:'reduced_reason',
              name:'折算原因',
              children:null
            },
            {
              key:'software_type',
              name:'软件类型',
              children:null
            },
            {
              key:'software_usage',
              name:'软件用途',
              children:null
            },
            {
              key:'code_langu',
              name:'编程语言',
              children:null
            },
            {
              key:'complier',
              name:'编译器',
              children:null
            },
            {
              key:'runtime',
              name:'运行环境',
              children:null
            },
            {
              key:'cpu_type',
              name:'CPU类型',
              children:null
            },
             {
              key:'software_cate',
              name:'被测软件类型',
              children:null
            },
            {
              key:'software_sub_cate',
              name:'被测软件子类',
              children:null
            }
          ]
        },
        {
          key:'workflow',
          name:'流程信息',
          children:[
            {
              key:'workflow_state',
              name:'流程状态',
              children:null
            },
            {
              key:'workflow_issue',
              name:'流程节点问题',
              children:null
            }
          ]
        },
        {
          key:'programTeamRole',
          name:'项目组信息',
          children:[
            {
              key:'program_leader',
              name:'项目组长',
              children:null
            },
            {
              key:'program_team_strict',
              name:'项目组员',
              children:null
            }
          ]
        }
        ],
        multipleSelection: [],
        onProgramStarting:false

    }
  },
  filters: {
    State(is_exist){
      if(is_exist){
        return '更新'
      }else{
        return '创建'
      }
    }
    // valueComputed(row,index,columnConfig,separator){
    //         var ret=null;
    //         var father=null;
    //         let keyPath=columnConfig.values[index];
    //         let fatherProperty=keyPath.slice(0,keyPath.indexOf(separator))
    //         let childProperty=keyPath.slice(keyPath.indexOf(separator)+1)
    //         if(fatherProperty=='softwareInfoCol'){
    //             father=row[fatherProperty][0]
    //         }else{
    //             father=row[fatherProperty]
    //         }
    //         if(father==null){
    //           return '尚未配置'
    //         }else{
    //           return father[childProperty]
    //         }
    //     }
  },
  computed:{
      valueComputed(){
          return (row,index)=>{
            var ret=null;
            var father=null;
            let keyPath=this.columnConfig.values[index];
            let fatherProperty=keyPath.slice(0,keyPath.indexOf(this.separator))
            let childProperty=keyPath.slice(keyPath.indexOf(this.separator)+1)
            if(fatherProperty=='softwareInfoCol'){
                father=row[fatherProperty][0]
            }else{
                father=row[fatherProperty]
            }
            if(father==null){
              return '尚未配置'
            }else{
              return father[childProperty]
            }
        }
      }
  },
  created() {
    this.getList()
    this.getEmployeePrincal()
    this.getModel()
    this.columnSelect2Config();

  },
  watch:{
    columnSelect:function(newVa,oldVa){
      this.columnSelect2Config();
    }
  },
  methods: {
     onProgramStart(row){
        if(row.programBasic.state=='正式项目'||row.programBasic.state=='完结项目'&&row.is_exist.ProgramTeamRole!=true){
            this.$confirm('转正式项目/完结项目的前置条件是具备项目人员', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              return
            }).catch(()=>{})
            return
        }
        this.onProgramStarting=true;
        let data=row.programBasic;
        updateProgram(data).then(response => {
        if(response.data.isOkay==true){
          for (const v of this.list) {
                  if (v.programBasic.id === row.programBasic.id) {
                    const index = this.list.indexOf(v)
                    this.list.splice(index, 1,row)
                    break
                  }
                }
                this.$notify({
                  title: '项目状态已更新',
                  message: '请在项目中查看此项目',
                  type: 'success',
                  duration: 2000
                })
        }
        this.onProgramStarting=false;
      })
    },
    handleDelete(row){
        this.$confirm('此操作将永久删除此项目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.onDeleting=true;
          destroyProgramEdit(row.programBasic.id).then(response => {
            var data=response.data
            if(data.is_okay==true){
              for (const v of this.list) {
                  if (v.programBasic.id === row.programBasic.id) {
                    const index = this.list.indexOf(v)
                    this.list.splice(index, 1)
                    break
                  }
                }
                this.$notify({
                  title: '成功',
                  message: '删除成功',
                  type: 'success',
                  duration: 2000
                })
              }else{
                this.$notify({
                  title: '删除失败',
                  message: data.note,
                  type: 'success',
                  duration: 2000
                })
              }
              this.onDeleting=false;

          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
      },
    handleConfigure(row,type){
      this.programBasicId=row.programBasic.id
      this.visibleCol[type]=true
      this.is_exist=row.is_exist[type]
    },
    handleClose(args){
      this.visibleCol[args.type]=false
      if("isUpdate" in args&&args.isUpdate==true){
        var item=this.list.find(x=>x.programBasic.id==args.programId)
        if(item!=null){
          item.is_exist[args.type]=true
        }
      }
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    indexMethod(index){
      return index+(this.listQuery.page-1)*this.listQuery.limit+1;
    },
    columnSelect2Config(){
      let trim_values=this.columnSelect.values.filter(x=>x.includes(this.separator))
      let trim_items =this.columnSelect.items.filter(x=>(x.key!='programBasic')
                                        &&(x.key!='contact')
                                        &&(x.key!='softwareInfoCol')
                                        &&(x.key!='workflow')
                                        &&(x.key!='programTeamRole'))
      this.columnConfig={values:trim_values,items:trim_items}
    },
    OnRangeChange(args){
       this.columnSelect=args;
    },
    onFavorChange(args){
       this.columnSelect=args;
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
        var tHeader = this.columnConfig.items.map(x=>x.name);
        tHeader.unshift('序号');
        const data = this.formatJson(this.columnConfig.values, this.multipleSelection)
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
    formatJson(values, list) {
      var id=1;
      return list.map(row => {
          var ret=values.map(keyPath => {
            var ret=null;
            var father=null;
            let fatherProperty=keyPath.slice(0,keyPath.indexOf(this.separator))
            let childProperty=keyPath.slice(keyPath.indexOf(this.separator)+1)
            if(fatherProperty=='softwareInfoCol'){
                father=row[fatherProperty][0]
            }else{
                father=row[fatherProperty]
            }
            if(father==null){
              return '尚未配置'
            }else{
              return father[childProperty]
            }
          }
        )
        ret.unshift(id);
        id++;
        return ret;
        }
      )
    }
  }
}
</script>
