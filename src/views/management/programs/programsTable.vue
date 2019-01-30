<template>
  <div class="app-container">



    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入项目名称" v-model="listQuery.title">
      </el-input>
      <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.model" placeholder="按型号">
        <el-option v-for="item in model" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      </el-select>
      <el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.sort">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">新增</el-button>
      <el-checkbox v-model="listQuery.checked" @change='handleFilter'>只看我创建的项目</el-checkbox>
      <el-checkbox v-model="listQuery.checked" @change='handleFilter'>只看我任项目组长的项目</el-checkbox>
      <el-checkbox v-model="listQuery.checked" @change='handleFilter'>只看我任项目组员的项目</el-checkbox>

      <!-- <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">导出EXCEL</el-button> -->
    </div>
  <!-- row 字段
        id:             序号
        name:           项目名称
        model:         型号
        xmType:         项目类型
        state:          测试阶段
        planStartTime:  计划开始时间
        planEndTime :   计划结束时间
        teamMembers:        参加人员
        notes:          备注 -->

    <el-table :key='tableKey' :data="list" v-loading="listLoading" border fit highlight-current-row
      style="width: 100%;min-height:1000px;">
      <el-table-column align="center" label="序号" width="65">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="项目名称">
        <template slot-scope="scope">
          <span @click="handleDialogUpdate(scope.row)">{{scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="所属型号">
        <template slot-scope="scope">
          <span @click="handleDialogUpdate(scope.row)">{{scope.row.model}}</span>
        </template>
      </el-table-column>


      <el-table-column width="150px" align="center" label="项目状态">
        <template slot-scope="scope">
          <span @click="handleDialogUpdate(scope.row)">{{scope.row.state}}</span>
        </template>
      </el-table-column>


      <el-table-column width="150px" align="center" label="计划开始时间">
        <template slot-scope="scope">
          <span @click="handleDialogUpdate(scope.row)">{{scope.row.plan_start_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="计划结束时间">
        <template slot-scope="scope">
          <span @click="handleDialogUpdate(scope.row)">{{scope.row.plan_start_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>


      <el-table-column align="center" label="打开" width="230" class-name="small-padding fixed-width">
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
              v-for="item in model"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="项目名称- name" prop="name">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.name">
          </el-input>
        </el-form-item>

        <el-form-item label="项目标识- program_identity" prop="program_identity">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.program_identity">
          </el-input>
        </el-form-item>

        <el-form-item label="测试类型-program_type" prop="program_type">
          <el-select v-model="temp.program_type" filterable placeholder="请选择">
            <el-option
              v-for="item in programType"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="密级- classification">
          <el-select v-model="temp.classification" filterable placeholder="请选择">
            <el-option
              v-for="item in classification"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="研制类型- dev_type">
          <el-select v-model="temp.dev_type" filterable placeholder="请选择">
            <el-option
              v-for="item in devType"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="项目阶段- program_stage">
          <el-select v-model="temp.program_stage" filterable placeholder="请选择">
            <el-option
              v-for="item in programStage"
              :key="item"
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







      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelStep()">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="nextStep(temp.step)">下一步</el-button>
        <el-button v-else type="primary" @click="updateDialogData">确认</el-button>
      </div>
    </el-dialog>






   <el-dialog title="配置被测件信息" :visible.sync="invisible[1]">
      <el-form :rules="rules1" :ref="dataformMap[1]" :model="temp.softwareInfo" label123456781-position="left" label-width="200px" style='width: 600px; margin-left:50px;'>

        <el-form-item label="软件名称- name">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.softwareInfo.name">
          </el-input>
        </el-form-item>

        <el-form-item label="版本号- version_id">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.softwareInfo.version_id">
          </el-input>
        </el-form-item>


        <el-form-item label="代码量- size">
          <el-select v-model="temp.softwareInfo.size" filterable placeholder="请选择">
            <el-option
              v-for="item in size"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="折算后代码量- reduced_code_size">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.softwareInfo.reduced_code_size">
          </el-input>
        </el-form-item>


        <el-form-item label="折算原因- reduced_reason">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.softwareInfo.reduced_reason">
          </el-input>
        </el-form-item>

        <el-form-item label="编译器- complier">
          <el-select v-model="temp.softwareInfo.complier" filterable placeholder="请选择">
            <el-option
              v-for="item in complier"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="编程语言- code_langu">
          <el-select v-model="temp.softwareInfo.code_langu" filterable placeholder="请选择">
            <el-option
              v-for="item in codeLangu"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="运行环境- runtime">
          <el-select v-model="temp.softwareInfo.runtime" filterable placeholder="请选择">
            <el-option
              v-for="item in runtime"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="CPU类型- cpu_type">
          <el-select v-model="temp.softwareInfo.cpu_type" filterable placeholder="请选择">
            <el-option
              v-for="item in cpuType"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="软件级别- software_type">
          <el-select v-model="temp.softwareInfo.software_type" filterable placeholder="请选择">
            <el-option
              v-for="item in classification"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="软件类型- software_usage">
          <el-select v-model="temp.softwareInfo.software_usage" filterable placeholder="请选择">
            <el-option
              v-for="item in softwareUsage"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="被测软件类型- software_cate">
          <el-select v-model="temp.softwareInfo.software_cate" filterable placeholder="请选择">
            <el-option
              v-for="item in softwareCate"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="被测软件子类- software_sub_cate">
          <el-select v-model="temp.softwareInfo.software_sub_cate" filterable placeholder="请选择">
            <el-option
              v-for="item in softwareSubCate"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelStep()">取消</el-button>
        <el-button type="primary" @click="previousStep(temp.step)">上一步</el-button>
        <el-button type="primary" @click="nextStep(temp.step)">下一步</el-button>
     </div>
    </el-dialog>



    <el-dialog title="配置工作流信息" :visible.sync="invisible[2]">
      <el-form :rules="rules2" :ref="dataformMap[2]" :model="temp.softwareInfo" label123456781-position="left" label-width="200px" style='width: 600px; margin-left:50px;'>




      </el-form>
      <workflow-item :workflow="temp.workflow" position="left" width="200px" ></workflow-item>
      <!--  -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelStep()">取消</el-button>
        <el-button type="primary" @click="previousStep(temp.step)">上一步</el-button>
        <el-button type="primary" @click="createProgram(temp.step)">创建</el-button>
     </div>
    </el-dialog>

  </div>
</template>

<script>
import { indexManagementProgram, showManagementProgram, storeManagementProgram, updateManagementProgram,
         destroyManagementProgram } from '@/api/management-program'
import WorkflowItem from '@/components/Workflow'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils/index.js'

const constModel = ['model1','model2','model3']
const constProgramType = ['配置项测试','定型测试','回归测试']
const constClassification = ['机密','秘密','内部']
const constProgramStage = ['方案','初样','试样','定型']
const constDevType = ['1类','2类','3类','4类']

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
  components: { WorkflowItem },
  directives: {
    waves
  },
  data() {
    return {

      model:constModel,
      programType:constProgramType,
      classification:constClassification,
      programStage:constProgramStage,
      devType:constDevType,

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
        title: undefined,
        sort: '+id',
        checked:false
      },
      sortOptions: [{ label: 'ID 升序', key: '+id' }, { label: 'ID 降序', key: '-id' }],


      temp: {
        id:undefined, 
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
          software_sub_cate:'',
        },
        workflow:{
          workflow_name:'test workflow',
          active:2,
          workflowArray:[
            {name:'stepA',type:1},
            {name:'stepB',type:2},
            {name:'stepC',type:3}
          ]
        },
        // programTeamRole:[
        //   '项目组长':[employee_id:0,plan_workload_per:0,actual_workload_per:0],
        //   '项目组员':employee_id:0,plan_workload_per:0,actual_workload_per:0],
        //   '监督人员':employee_id:0,plan_workload_per:0,actual_workload_per:0],
        //   '配置管理员':,employee_id:0,plan_workload_per:0,actual_workload_per:0],
        //   '质量保证人员':employee_id:0,plan_workload_per:0,actual_workload_per:0]
        // },

        step:0 
      },
      invisible:new Array(true,false,false),


      dialogStatus: '',
      textMap: {
        update: '更新',
        create: '创建'
      },
      dataformMap:['dataForm0','dataForm1','dataForm2'],
  

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

      }
      //downloadLoading: false
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
  },
  methods: {
    getList() {
      this.listLoading = true;
      //this.listQuery.XDEBUG_SESSION_START='PHPSTORM'
      indexManagementProgram(this.listQuery).then(response => {
        var data=response.data
        this.list = data.items
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
    // resetTemp() {
    //   this.temp = {
    //     id:undefined, 
    //     state:"",

    //     name:"",
    //     model:"",
    //     program_type:'',
    //     program_identity:'',
    //     classification:'',
    //     program_stage:'',
    //     dev_type:'',
    //     plan_start_time:new Date(),  
    //     plan_end_time :new Date(),

    //     softwareInfo:{
    //       name:'',
    //       version_id:new Number(),
    //       size:'',
    //       reduced_code_size:'',
    //       reduced_reason:'',
    //       software_type:'',
    //       software_usage:'',
    //       code_langu:'',
    //       complier:'',
    //       runtime:'',
    //       cpu_type:'',
    //       software_cate:'',
    //       software_sub_cate:''
    //     },
    //     workflow:{
    //       workflow_name:'test',
    //       active:2,
    //       workflowArray:[
    //         {name:'stepA',type:1},
    //         {name:'stepB',type:2},
    //         {name:'stepC',type:3}
    //       ]
    //     },
    //     programTeamRole:{
    //       p_leader:{

    //       }

    //     }

    //     step:0 
    //   }
    // },
    handleCreate() {
      //this.resetTemp()
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

    },
    nextStep(cstepid){
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
      
    },
    createProgram(cstepid) {
      this.$refs[this.dataformMap[cstepid]].validate((valid) => {
        if (valid) {
          //关闭所有窗口
          this.invisible[cstepid]=false;
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          storeManagementProgram(this.temp).then(() => {
            if(this.list==undefined) this.list=[];
            this.list.unshift(this.temp);
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
        }
      )}
    })
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

    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
