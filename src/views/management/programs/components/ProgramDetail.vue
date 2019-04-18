<template>
  <div class="createPost-container">
    <el-row>
      <el-card class="box-card" >
        <div slot="header" class="clearfix">
          <span>{{items.workflow.workflow_name}}</span>
        </div>
        <div style="margin-bottom:50px;">
          <workflow-edit ref="WorkflowEdit" :propWorkflow="items.workflow" :propIsLeader="is_leader" v-on:doChangeWorkflow="onChangeWorkflow($event)"></workflow-edit>
        </div>
      </el-card>
    </el-row>

    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>项目基本信息</span>
        </div>
        <div style="margin-bottom:50px;">
          <program-basic :propProgramBasic="items.programBasic"></program-basic>
        </div>
      </el-card>
    </el-row>

    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>项目组信息</span>
        </div>
        <div style="margin-bottom:50px;">
            <team-member-detail propActiveName="0"  :propProgramTeamRole="items.programTeamRole" :propWorkflowArray="items.workflow.workflowArray"  :propIsLeader="is_leader"></team-member-detail>
        </div>
      </el-card>
    </el-row>

    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>被测件信息</span>
        </div>
        <div style="margin-bottom:50px;">
          <software-info-detail :SoftwareInfo="items.softwareInfo" v-on:dochange="changeit($event)"></software-info-detail>

        </div>
      </el-card>
    </el-row>

    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>项目工作产品</span>
        </div>
        <div style="margin-bottom:50px;">
<!--           <el-col :span="4" class="program-product">
            <div>被测件&测评需求</div>
            <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-col>
          <el-col :span="4" class="program-product">
            <div>工作产品</div>
            <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-col>
          <el-col :span="4" class="program-product">
            <div>问题单</div>
            <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-col>
          <el-col :span="4" class="program-product">
            <div>评审意见</div>
            <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-col> -->
        </div>
      </el-card>
    </el-row>


    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>在线评审</span>
        </div>
        <div style="margin-bottom:50px;">
<!--           <el-col :span="12" class="program-product">
            <div class="components-container board">
            <Kanban :key="1" class="kanban todo" :list="list1" :options="options" header-text="专家评审意见"/>
            <Kanban :key="2" class="kanban working" :list="list2" :options="options" header-text="项目组长已确认"/>
            <Kanban :key="3" class="kanban done" :list="list3" :options="options" header-text="质量管理已确认"/>
          </div>
        </el-col> -->

        </div>
      </el-card>
    </el-row>

    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>合同信息</span>
        </div>
        <div style="margin-bottom:50px;">
         <!--  <el-steps :active="active" finish-status="success">
            <el-step title="S1" description="选定乙方"></el-step>
            <el-step title="S2" description="已提交BPM申请"></el-step>
            <el-step title="S3" description="已完成BPM审批"></el-step>
            <el-step title="S4" description="已完成合同评审"></el-step>
            <el-step title="S5" description="已提交合同系统"></el-step>
            <el-step title="S6" description="已完成系统审批"></el-step>
            <el-step title="S7" description="已完成乙方签署盖章"></el-step>
            <el-step title="S8" description="已完成甲方签署盖章"></el-step>
            <el-step title="S9" description="已完成验收"></el-step>
            <el-step title="S10" description="已收到发票"></el-step>
            <el-step title="S11" description="已发起付款流程"></el-step>
            <el-step title="S12" description="已完成付款流程审批"></el-step>
            <el-step title="S13" description="已付款"></el-step>
            <el-step title="S14" description="已报销"></el-step>
          </el-steps> -->

        </div>
      </el-card>
    </el-row>

      <!-- 各种forms -->

      <!-- 被测件信息form start -->
      <software-info-edit  :visible="dialogFormVisible" :temp="temp"  v-on:closeVisible="doCloseVisible"></software-info-edit>
    <!-- 被测件信息form end -->


      <!-- 各种forms  end-->
  </div>
</template>

<script>

import { indexManagementProgram, showManagementProgram, storeManagementProgram, updateManagementProgram,
         destroyManagementProgram } from '@/api/management-program'
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
import TeamMemberDetail from './ChildrenCom/TeamMemberDetail'
import SoftwareInfoDetail from './ChildrenCom/SoftwareInfoDetail'
import SoftwareInfoEdit from './ChildrenCom/SoftwareInfoEdit'
import ProgramBasic from './ChildrenCom/ProgramBasic'
import WorkflowEdit from './ChildrenCom/WorkflowEdit'




export default {
  name: 'ProgramDetail',
  components: { Tinymce, MDinput, Upload, Multiselect, Sticky, Warning, CommentDropdown, PlatformDropdown, SourceUrlDropdown, Kanban,TeamMemberDetail,SoftwareInfoDetail,SoftwareInfoEdit,ProgramBasic, WorkflowEdit },
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
      is_leader:false,
      active:7,
      crews:[
        {id:1,name:'wanghc',role:'0',part:'导航测试',progress:'50%',notes:'需要更多人手！'},
        {id:2,name:'yangjr',role:'1',part:'模型测试',progress:'30%',notes:''},
        {id:3,name:'fanzq',role:'1',part:'环境搭建',progress:'40%',notes:''}
          ],
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
      list1: [
        { content:'dfad',index: 'Mission', id: 1 },
        { content:'dfad',index: 'Mission', id: 2 },
        { content:'dfad',index: 'Mission', id: 3 },
        { content:'dfad',index: 'Mission', id: 4 }
      ]
      ,
      list2: [
        { content:'dfad',index: 'Mission', id: 5 },
        { content:'dfad',index: 'Mission', id: 6 },
        { content:'dfad',index: 'Mission', id: 7 }
      ],
      list3: [
        { content:'dfad',index: 'Mission', id: 8 },
        { content:'dfad',index: 'Mission', id: 9 },
        { content:'dfad',index: 'Mission', id: 10 }
      ]

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
  },
  methods: {
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
        this.is_leader=data.is_leader
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
    

    //被测件信息form内点击确认  如果是创建新信息
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.workers = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    //被测件信息form内点击确认  如果是更新信息
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)   //deep copy this.temp
          // updateArticle(tempData).then(() => {
          //   for (const v of this.softwareInfo) {
          //     if (v.id === this.temp.id) {
          //       const index = this.softwareInfo.indexOf(v)
          //       this.softwareInfo.splice(index, 1, this.temp)   //将list中的原有的条目找到，并替换为新的条目
          //       break
          //     }
          //   }
          //   this.dialogFormVisible = false
          //   this.$notify({
          //     title: '成功',
          //     message: '更新成功',
          //     type: 'success',
          //     duration: 2000
          //   })
          // })
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
      this.$refs.WorkflowEdit.$refs.ProgramNote.getProgramNote(this.items.workflow.workflowArray[this.items.workflow.active].id);
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
      }
      //上传控件提醒函数 end

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
