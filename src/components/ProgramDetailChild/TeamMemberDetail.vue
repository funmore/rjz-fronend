 <template>
 <div>
  <div v-if="programTeamRole!=null">
        <el-button @click="handleConfigure(true)">调整</el-button>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane
                :key="item.name"
                v-for="item in programTeamRole"
                :label="closure(item)"
                :name="item.name"
                :data="item"
              >
                <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="姓名">
                      <span>{{ item.employee_name }}</span>
                    </el-form-item>
                    <el-form-item label="项目角色">
                      <span>{{ item.role }}</span>
                    </el-form-item>
                    <el-form-item label="计划工作量">
                      <template v-if="item.isEdit">
                        <el-input class="edit-input" size="small" v-model="item.plan_workload" ></el-input>
                      </template>
                      <span v-else>{{ item.plan_workload }}天</span>
                    </el-form-item>
                    <el-form-item label="工作备注">
                      <template v-if="item.isEdit">
                        <el-input class="edit-input" size="small" v-model="item.workload_note" ></el-input>
                      </template>
                      <span v-else>{{ item.workload_note }}</span>
                    </el-form-item>
                    <el-form-item label="当前进展">
                      <el-input class="edit-input" size="small" v-model="item.actual_workload" v-if="item.isEdit"></el-input>
                      <span v-else>{{ item.actual_workload }}天</span>
                    </el-form-item>
                    <el-form-item label="操作">
                      <el-button @click='edit(item)'>编辑</el-button>
                      <el-button @click='confirm(item)'>确认</el-button>
                    </el-form-item>
                  </el-form>

                  <keep-alive>
                  <team-member-task ref="teamMemberNote" :propTeamMemberId="item.id"  :propWorkflow="workflow" :propPtrNote="ptr_note"  :propRole="propRole"></team-member-task>
                  </keep-alive>
              </el-tab-pane>
            </el-tabs>
  </div>
  <div v-else>
     <el-button @click="handleConfigure(false)">尚未配置</el-button>
   </div>
       <eee :propProgramBasicId="propProgramBasicId" :propIsExist="is_exist"                             :propVisible="generalVisible" @close="handleClose"></eee>
 </div>


</template>
<script>
  import TeamMemberTask from './TeamMemberTask'
  import eee from '@/components/PreProgramCom/ProgramTeamRole.vue'

  import { indexWorkflow, showWorkflow, storeWorkflow, updateWorkflow,
         destroyWorkflow } from '@/api/workflow'  
  import { indexProgramTeamRole, showProgramTeamRole, storeProgramTeamRole, updateProgramTeamRole,
         destroyProgramTeamRole } from '@/api/programteamrole'

  export default {
      components: {TeamMemberTask,eee },
    data() {
      return {
        generalVisible:false,
        is_exist:true,

        programTeamRole:null,
        activeName:'0',
        ptr_note:[],
        workflow:{
          active:undefined,
          workflowArray:undefined
        }
      };
    },
    props:{
        propProgramBasicId:Number,
        propRole:Array
    },
    computed:{
      //闭包实现传参数
      closure(){    
        return function(item){
          return item.role+ '-'+item.employee_name
        }
      }
    },
    created(){
      this.showWorkflow()
      this.getData()
    },
    mounted(){
    },
    methods: {
      showWorkflow(){
        showWorkflow(this.propProgramBasicId).then(response => {
          var data=response.data
          if(data.isOkay==true){
            this.workflow = data.item
          }
        })},
      handleConfigure(is_exist){
        this.is_exist=is_exist;
        this.generalVisible=true;
      },  
      handleClose(args){
        this.generalVisible=false
        this.getData()
      },
      getData(){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
          });
        showProgramTeamRole(this.propProgramBasicId).then(response => {
          var data=response.data
          if(data.isOkay==true){
            this.programTeamRole = data.item
          }
          loading.close();
        })
		  },


      edit(item){
        item.isEdit=true;
        this.$forceUpdate();  
      },
      confirm(item){
        updateProgramTeamRole(item).then(() => {
            item.isEdit=false;
            this.$forceUpdate();  
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })

      },


      handleClick(tab, event) {
        // this.$refs.teamMemberNote[parseInt(this.activeName)].getNote(this.programTeamRole.find((item,index)=>index==parseInt(this.activeName)).id);
      },
    }
  };
</script>
<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

