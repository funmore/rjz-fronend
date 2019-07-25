 <template>

            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane
                :key="item.name"
                v-for="(item, index) in programTeamRole"
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
                  <team-member-task ref="teamMemberNote" :propTeamMemberId="item.id" :propWorkflowArray="propWorkflowArray"  :propPtrNote="ptr_note"  :propRole="propRole"></team-member-task>
                  </keep-alive>
              </el-tab-pane>
            </el-tabs>


</template>
<script>
  import TeamMemberTask from './TeamMemberTask'

  import { indexProgramTeamRole, showProgramTeamRole, storeProgramTeamRole, updateProgramTeamRole,
         destroyProgramTeamRole } from '@/api/programteamrole'

  export default {
      components: {TeamMemberTask },
    data() {
      return {
        programTeamRole:this.propProgramTeamRole,
        activeName:this.propActiveName,
        ptr_note:[]
      };
    },
    props:{
        propActiveName:String,
        propProgramTeamRole:Array,
        propWorkflowArray:Array,
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
          this.addIsEdit();
    },
    mounted(){
      this.$refs.teamMemberNote[parseInt(this.activeName)].getNote(this.programTeamRole.find((item,index)=>index==parseInt(this.activeName)).id);
    },
    methods: {
      addIsEdit(){
        this.programTeamRole=this.programTeamRole.map(x=>{x.isEdit=false; return x});
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
      handleCreate(){

      },
      handleFilter(){

      },
      handleClick(tab, event) {
        this.$refs.teamMemberNote[parseInt(this.activeName)].getNote(this.programTeamRole.find((item,index)=>index==parseInt(this.activeName)).id);
      },
      fetchData(id){
        fetchArticle(id).then(response => {
        this.postForm = response.data
        // Just for test
        this.postForm.title += `   Article Id:${this.postForm.id}`
        this.postForm.content_short += `   Article Id:${this.postForm.id}`
      }).catch(err => {
        console.log(err)
      })
      }
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

