<template>
  <div class="createPost-container">
    <el-tabs type="border-card">

      <el-tab-pane label="流程信息">
          <workflow-edit ref="WorkflowEdit" :propProgramBasicId="programBasicId"  :propRole="program_role" ></workflow-edit>
      </el-tab-pane>
      <el-tab-pane label="项目基本信息">
          <program-basic :propProgramBasicId="programBasicId" :key="updatedKey.programBasic" ></program-basic>
      </el-tab-pane>
      <el-tab-pane label="项目组信息">
        <team-member-detail :propProgramBasicId="programBasicId"      :propRole="program_role"></team-member-detail>
      </el-tab-pane>
      <el-tab-pane label="被测件信息">
        <software-info-detail :propProgramBasicId="programBasicId"   :key="updatedKey.softwareInfo" ></software-info-detail>
      </el-tab-pane>
      <el-tab-pane label="项目输入信息">
        <file-program-detail :propProgramId="programBasicId" :propFileCategory="'input'" :propActive="'任务书'"></file-program-detail>
      </el-tab-pane>
      <el-tab-pane label="项目工作产品">
        <file-program-detail :propProgramId="programBasicId" :propFileCategory="'output'" :propActive="'测试计划'"></file-program-detail>
      </el-tab-pane>
      <el-tab-pane label="在线评审">
        <file-review-detail :propProgramId="programBasicId" ></file-review-detail>
      </el-tab-pane>
      <el-tab-pane label="合同信息">合同信息</el-tab-pane>
    </el-tabs>
    <el-button @click="drawerVisible = true" type="primary" style="margin-left: 16px;">
  点我打开
</el-button>

<el-drawer
  title="项目日志"
  :visible.sync="drawerVisible"
  :direction="'rtl'">
</el-drawer>
  </div>
</template>

<script>


import { indexProgram, showProgram,roleProgram, storeProgram, updateProgram,
         destroyProgram } from '@/api/program'




import store from '@/store'

import TeamMemberDetail from '@/components/ProgramDetailChild/TeamMemberDetail.vue'
import SoftwareInfoDetail from '@/components/ProgramDetailChild/SoftwareInfoDetail.vue'
import ProgramBasic from '@/components/ProgramDetailChild/ProgramBasic.vue'
import WorkflowEdit from '@/components/ProgramDetailChild/WorkflowEdit.vue'
import FileProgramDetail from '@/components/ProgramDetailChild/FileProgramDetail.vue'
import FileReviewDetail from '@/components/ProgramDetailChild/FileReviewDetail.vue'




export default {
  name: 'ProgramDetail',
  components: { TeamMemberDetail,SoftwareInfoDetail,ProgramBasic, WorkflowEdit,FileProgramDetail,FileReviewDetail },
  data() {
    return {
      drawerVisible:false,
      activeIndex:"workflow",
      updatedKey:{
        softwareInfo:1,
        programBasic:1,
        contact:1,
        programTeamRole:1,
        workflow:1 
      },
      program_role:[],
      programBasicId:Number(this.$route.params && this.$route.params.id)

    }
  },

  created() {
     store.dispatch('GetInfo').then(res => { // 拉取用户信息
    }).catch((err) => {
      store.dispatch('FedLogOut').then(() => {
        Message.error(err || 'Verification failed, please login again')
      })
    })


    this.roleProgram()

  },
  methods: {


    roleProgram() {
      const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        roleProgram(this.programBasicId).then(response => {

        var data=response.data
        if(data.isOkay==true){
          this.program_role=data.program_role
          }
        loading.close();

      }).catch(err => {
        console.log(err)
      })
    },
    
    


  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.createPost-container {
  background-color: #f0f2f5;
  padding: 30px;

  position: relative;
  .el-row{
    padding:10px;
  }

}

</style>
