<template>
  <div class="createPost-container">
    <el-row>
      <el-card class="box-card" v-if="items.workflow!=null">
        <div slot="header" class="clearfix">
          <span>{{items.workflow.workflow_name}}</span>
        </div>
        <div style="margin-bottom:50px;">
          <workflow-edit ref="WorkflowEdit" :propWorkflow="items.workflow" :propRole="program_role" v-on:doChangeWorkflow="onChangeWorkflow($event)"></workflow-edit>
        </div>
      </el-card>
      <el-card class="box-card" v-else>
        <div slot="header" class="clearfix">
          <span>流程尚未配置</span>
        </div>
        <div style="margin-bottom:50px;">
          <el-button type="primary" @click="onConfigure('workflow','create')">点击配置</el-button>
        </div>
      </el-card>
    </el-row>

    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>项目基本信息</span>
        </div>
        <div style="margin-bottom:50px;">
          <program-basic :propProgramBasic="items.programBasic"  :key="updatedKey.programBasic" v-on:dochange="onConfigure('programBasic','update')"></program-basic>
        </div>
      </el-card>
    </el-row>

    <el-row>
      <el-card class="box-card" v-if="items.programTeamRole!=null">
        <div slot="header" class="clearfix">
          <span>项目组信息</span>
        </div>
        <div style="margin-bottom:50px;">
            <team-member-detail propActiveName="0"  :propProgramTeamRole="items.programTeamRole" :propWorkflowArray="items.workflow==null?null:items.workflow.workflowArray"  :propRole="program_role"></team-member-detail>
        </div>
      </el-card>
      <el-card class="box-card" v-else>
        <div slot="header" class="clearfix">
          <span>项目组尚未配置</span>
        </div>
        <div style="margin-bottom:50px;">
          <el-button type="primary" @click="onConfigure('programTeamRole','create')">点击配置</el-button>
        </div>
      </el-card>
    </el-row>

    <el-row>
      <el-card class="box-card" v-if="items.softwareInfo!=null">
        <div slot="header" class="clearfix">
          <span>被测件信息</span>
        </div>
        <div style="margin-bottom:50px;">
          <software-info-detail :propSoftwareInfo="items.softwareInfo" :key="updatedKey.softwareInfo" v-on:dochange="onConfigure('softwareInfo','update')"></software-info-detail>

        </div>
      </el-card>
      <el-card class="box-card" v-else>
        <div slot="header" class="clearfix">
          <span>被测件信息未配置</span>
        </div>
        <div style="margin-bottom:50px;">
          <el-button type="primary" @click="onConfigure('softwareInfo','create')">点击配置</el-button>
        </div>
      </el-card>
    </el-row>

    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>项目输入信息</span>
        </div>
  

        <div style="margin-bottom:50px;">
          <file-program-detail :propProgramId="items.programBasic.id" :propFileCategory="'input'" :propActive="'任务书'"></file-program-detail>
        </div>
      </el-card>
    </el-row>

    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>项目工作产品信息</span>
        </div>
  

        <div style="margin-bottom:50px;">
          <file-program-detail :propProgramId="items.programBasic.id" :propFileCategory="'output'" :propActive="'测试计划'"></file-program-detail>
        </div>
      </el-card>
    </el-row>


    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>在线评审</span>
        </div>
        <div style="margin-bottom:50px;">
          <file-review-detail :propProgramId="items.programBasic.id" ></file-review-detail>

        </div>
      </el-card>
    </el-row>

    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>合同信息</span>
        </div>
        <div style="margin-bottom:50px;">


        </div>
      </el-card>
    </el-row>

      <!-- 各种forms -->

     <program-edit :propProperty="property" :propDialogStatus="dialogStatus" :propProgram="items" :propVisible="visible" :propSelection="selection" @close-dia="onCloseDia" @update-list="onUpdateList"></program-edit>


      <!-- 各种forms  end-->
  </div>
</template>

<script>

import { indexManagementProgram, showManagementProgram, storeManagementProgram, updateManagementProgram,
         destroyManagementProgram } from '@/api/management-program'
import { indexModel} from '@/api/model'
import { indexEmployee } from '@/api/employee'


import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/singleImage3'
import MDinput from '@/components/MDinput'
import Multiselect from 'vue-multiselect'// 使用的一个多选框组件，element-ui的select不能满足所有需求
import 'vue-multiselect/dist/vue-multiselect.min.css'// 多选框组件css
import Sticky from '@/components/Sticky' // 粘性header组件
import { validateURL } from '@/utils/validate'
import { userSearch } from '@/api/remoteSearch'
import store from '@/store'
import Warning from './Warning'
import { CommentDropdown, PlatformDropdown, SourceUrlDropdown } from './Dropdown'
import Kanban from './Kanban4Rjz'
import TeamMemberDetail from '@/components/ProgramDetailChild/TeamMemberDetail.vue'
import SoftwareInfoDetail from '@/components/ProgramDetailChild/SoftwareInfoDetail.vue'
import ProgramBasic from '@/components/ProgramDetailChild/ProgramBasic.vue'
import WorkflowEdit from '@/components/ProgramDetailChild/WorkflowEdit.vue'
import FileProgramDetail from '@/components/ProgramDetailChild/FileProgramDetail.vue'
import FileReviewDetail from '@/components/ProgramDetailChild/FileReviewDetail.vue'
import ProgramEdit from '@/components/ProgramEdit'




export default {
  name: 'ProgramDetail',
  components: { Tinymce, MDinput, Upload, Multiselect, Sticky, Warning, CommentDropdown, PlatformDropdown, SourceUrlDropdown, Kanban,TeamMemberDetail,SoftwareInfoDetail,ProgramBasic, WorkflowEdit,FileProgramDetail,FileReviewDetail,ProgramEdit },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(null)
      } else {
        callback()
      }
    }
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validateURL(value)) {
          callback()
        } else {
          this.$message({
            message: '外链url填写不正确',
            type: 'error'
          })
          callback(null)
        }
      } else {
        callback()
      }
    }
    return {
      updatedKey:{
        softwareInfo:1,
        programBasic:1,
        contact:1,
        programTeamRole:1,
        workflow:1 
      },
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
      activeName:"1",
      tableKey:0,
      loading: false,
      userListOptions: [],
      rules: {
        image_uri: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }],
        source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
      },
      program_role:false,
      active:7,
      items:null,
      softwareInfo: [{
        id:1,
        name: '1',
        producer: '2',
        contact: '3',
        domain:'4',
        size:5,
        complier:'6',
        platform:'7',
        runtime:'8',
        reducedCodeSize:'9',
        reducedReason:'10',
        type:'11',
        infoTyper:'12',
        infoSource:'13',
        infoTypeTime:'14'
      }],
      temp: {
      },
       dialogFormVisible:false,
       ruleSoftwareInfo: {
        // workers: [{ required: true, message: 'type is required', trigger: 'change' }],
        // timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        // title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },

        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        options: {
        group: 'mission'
      },
      assignForm: {
      files: []
      },
      dialogStatus: '',
      visible:false,
      property:''

    }
  },

  computed: {
    contentShortLength() {
      return this.postForm.content_short.length
    }
  },
  created() {
     store.dispatch('GetInfo').then(res => { // 拉取用户信息
    }).catch((err) => {
      store.dispatch('FedLogOut').then(() => {
        Message.error(err || 'Verification failed, please login again')
      })
    })
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.showProgram(id)
    } else {
    }
    this.getModel()
    this.getEmployeePrincal()

  },
  methods: {
    getEmployeePrincal(){
        var listQuery={
          checkPM:true
        }
        indexEmployee(listQuery).then(response => {
        var data=response.data
        this.selection.managers = data.items
      })
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
    showProgram(id) {
      const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      showManagementProgram(id).then(response => {

        var data=response.data
        this.items = data.items
        this.program_role=data.program_role
        loading.close();

      }).catch(err => {
        console.log(err)
      })
    },
    submitForm() {
      this.postForm.display_time = parseInt(this.display_time / 1000)
      console.log(this.postForm)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$notify({
            title: '成功',
            message: '发布文章成功',
            type: 'success',
            duration: 2000
          })
          this.postForm.status = 'published'
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    draftForm() {
      if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        })
        return
      }
      this.$message({
        message: '保存成功',
        type: 'success',
        showClose: true,
        duration: 1000
      })
      this.postForm.status = 'draft'
    },
    getRemoteUserList(query) {
      userSearch(query).then(response => {
        if (!response.data.items) return
        this.userListOptions = response.data.items.map(v => v.name)
      })
    },
    

    //被测件信息form内点击确认  如果是更新信息
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)   //deep copy this.temp
          for (const v of this.softwareInfo) {
              if (v.id === this.temp.id) {
                const index = this.softwareInfo.indexOf(v)
                this.softwareInfo.splice(index, 1, this.temp)   //将list中的原有的条目找到，并替换为新的条目
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
        }
      })
    },

    //点击被测件信息更新按钮
    changeit(row) {
      //this.temp = Object.assign({}, row) // copy obj
      this.temp=row
      this.dialogFormVisible = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
    },
    onChangeWorkflow(d){
      this.items.workflow.active=this.items.workflow.active+d;
      this.$refs.WorkflowEdit.$refs.NodeNote.getNodeNote(this.items.workflow.workflowArray[this.items.workflow.active].id);
      this.$refs.WorkflowEdit.$refs.NodeTask.getNodeTask(this.items.workflow.workflowArray[this.items.workflow.active].id);
    },
    doCloseVisible(){
      this.dialogFormVisible = false
    },



      //上传控件提醒函数 start
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      //上传控件提醒函数 end

      onCloseDia(){
      this.visible=false;
    },
      onUpdateList(args){
        this.items[args.type]=args.data;
        this.updatedKey[args.type]=this.updatedKey[args.type]+1;
        this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
    },
    onConfigure(property,state){
      this.visible=true;
      this.dialogStatus=state;
      this.property=property;
    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.createPost-container {
  background-color: #f0f2f5;
  padding: 30px;

  position: relative;
  .createPost-main-container {
    padding: 40px 45px 20px 50px;
    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;
      .postInfo-container-item {
        float: left;
      }
    }
    .editor-container {
      min-height: 500px;
      margin: 0 0 30px;
      .editor-upload-btn-container {
        text-align: right;
        margin-right: 10px;
        .editor-upload-btn {
          display: inline-block;
        }
      }
    }
  }
  .program-product{
    margin:50px;
  }
  .el-row{
    padding:10px;
  }
  .word-counter {
    width: 40px;
    position: absolute;
    right: -10px;
    top: 0px;
  }

  
}
.board {
  width: 1000px;
  margin-left: 20px;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: flex-start;
}
.kanban {
  &.todo {
    .board-column-header {
      background: #4A9FF9;
    }
  }
  &.working {
    .board-column-header {
      background: #f9944a;
    }
  }
  &.done {
    .board-column-header {
      background: #2ac06d;
    }
  }
}
</style>
