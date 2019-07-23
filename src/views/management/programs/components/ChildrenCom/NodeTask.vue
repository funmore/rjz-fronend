 <template>
  <div>
<!--       <div class="filter-container" v-if="isEditable">
           <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">新增待解决事项</el-button>
      </div> -->
      <el-table  :key='node_task.created_at' :data="node_task"  v-loading="listLoading" border fit highlight-current-row
        style="width: 100%;">

         <el-table-column  label="序号"
                  type="index"
                  width="50">
                </el-table-column>

          <el-table-column width="160px" align="center" label="负责人">
            <template slot-scope="scope">
              {{scope.row.employee_name}}
            </template>
          </el-table-column>

          <el-table-column width="160px" align="center" label="任务名称">
            <template slot-scope="scope">
              {{scope.row.task}}
            </template>
          </el-table-column>

            <el-table-column width="120px" align="center" label="预期完成时间">
              <template slot-scope="scope">
                {{scope.row.due_day}}
              </template>
            </el-table-column>




            <el-table-column width="180px" align="center" label="当前状态">
              <template slot-scope="scope">
                <el-progress :percentage="parseInt(scope.row.state)"></el-progress>
              </template>
            </el-table-column>

            <el-table-column width="120px" align="center" label="延期原因">
              <template slot-scope="scope">
                {{scope.row.overdue_reason}}
              </template>
            </el-table-column>

            <el-table-column width="120px" align="center" label="备注">
              <template slot-scope="scope">
                <span >{{scope.row.note}}</span>
              </template>
            </el-table-column>

            <el-table-column width="120px" align="center" label="工作系数" v-if="isEditable">
              <template slot-scope="scope">
                <span >{{scope.row.ratio}}</span>
              </template>
            </el-table-column>



      </el-table>



</div>
</template>
<script>

import { indexProgramTeamRoleTask, showProgramTeamRoleTask, storeProgramTeamRoleTask, updateProgramTeamRoleTask,
         destroyProgramTeamRoleTask } from '@/api/programteamroletask'


  export default {
    data() {
      return {

        activeName:'log',
        listLoading:true,
        workflowArray:this.propWorkflowArray,


        is_up:['是','否'],
        state:['待解决','解决中','已解决'],
        temp:{
          state:'',
          note:'',
          is_up:''
        },
        visible:false,
        rules:{},

        node_task:[],
        dialogStatus: '',
        textMap: {
          update: '更新',
          create: '创建'
        },
        isEditable:false
      };
    },
    props:{
        propNodeId:Number,
        propRole:Array
    },

    created(){

    },
    mounted(){
      this.getNodeTask(this.propNodeId);
      this.isEditable=this.checkPermission(this.propRole);
    },
    methods: {
      checkPermission(propRole){
      return propRole.includes("项目组长");
    },
    getNodeTask(id){
      this.node_task=[];
      this.listLoading = true;
      var listQuery={
        node_id:id,
        type:"NodeTask"
      }
      indexProgramTeamRoleTask(listQuery).then(response => {
        var data=response.data
        if(data.total!=0){
          this.node_task = data.items
        }
      this.listLoading=false;
      })
      },
    handleFilter(){

    },
    handleCreate(){
          this.dialogStatus='create';
          this.temp={
            state:'',
            note:'',
            is_up:''
            },
          this.visible=true;

      },
      handleEdit(row){
           this.dialogStatus='update';
          this.temp=row;
          this.visible=true;
      },
      confirmCreate(item){
        item.NodeId=this.propNodeId;

        this.$refs['NodeNote'].validate((valid) => {
          if (valid) {
            this.visible=false;
            storeProgramTeamRoleTask(item).then(response => {
              var data=response.data
              item = data.items
              this.node_task.push(item)
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
          }).catch(err => {
            console.log(err)
          })
        }
      })
      },
      confirmUpdate(item){
        this.$refs['NodeNote'].validate((valid) => {
          if (valid) {
            this.visible=false;
            updateProgramTeamRoleTask(item).then(response => {
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
          }).catch(err => {
            console.log(err)
          })
        }
      })
      },
      cancel(){
        this.visible=false;
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

