 <template>
  <div>
               <el-table  :key='tasks.created_at' :data="tasks"  v-loading="listLoading" border fit highlight-current-row  style="width: 100%;">
                         <el-table-column  label="序号"
                            type="index"
                            width="50">
                          </el-table-column>

                        <el-table-column width="140px" align="center" label="待办任务">
                          <template slot-scope="scope">
                            <span >{{scope.row.task}}</span>
                          </template>
                        </el-table-column>

                        <el-table-column width="100px" align="center" label="创建时间">
                          <template slot-scope="scope">
                            {{scope.row.created_at}}
                          </template>
                        </el-table-column>

                        <el-table-column width="100px" align="center" label="更新时间">
                          <template slot-scope="scope">
                            {{scope.row.updated_at}}
                          </template>
                        </el-table-column>

                        <el-table-column width="120px" align="center" label="工作流节点">
                          <template slot-scope="scope">
                            <span >截止{{scope.row.before_node_name}}</span>
                          </template>
                        </el-table-column>



                        <el-table-column width="120px" align="center" label="预期完成时间">
                          <template slot-scope="scope">
                            {{scope.row.due_day}}
                          </template>
                        </el-table-column>

                        <el-table-column width="120px" align="center" label="延期原因">
                          <template slot-scope="scope">
                            {{scope.row.overdue_reason}}
                          </template>
                        </el-table-column>

                        <el-table-column width="180px" align="center" label="当前状态">
                          <template slot-scope="scope">
                            <el-progress :percentage="parseInt(scope.row.state)"></el-progress>
                          </template>
                        </el-table-column>

                        <el-table-column width="120px" align="center" label="备注">
                          <template slot-scope="scope">
                            <span >{{scope.row.note}}</span>
                          </template>
                        </el-table-column>

                        <el-table-column width="120px" align="center" label="工作系数" v-if="propIsLeader">
                          <template slot-scope="scope">
                            <span >{{scope.row.ratio}}</span>
                          </template>
                        </el-table-column>

                        <el-table-column width="120px" align="center" label="任务评分" v-if="propIsLeader">
                          <template slot-scope="scope">
                            <span >{{scope.row.score}}</span>
                          </template>
                        </el-table-column>
                </el-table>
</div>
</template>
<script>
  import { indexProgramTeamRoleTask,showProgramTeamRoleTask } from '@/api/programteamroletask'
  export default {
    data() {
      return {

        listLoading:true,
        role_id_array:[],

        tasks:[]

      };
    },
    props:{
        propRoles:Object
    },

    created(){

    },
    mounted(){
      this.role_id_array=this.propRoles.map(x=>x.id);
      this.getPeopleTask();
      
    },
    methods: {

    getPeopleTask(){
      this.listLoading = true;
      this.tasks=[];
      var count =0;
      // for(var x in this.role_id_array){
      //     showProgramTeamRoleTask(this.role_id_array[x]).then(response => {
      //       var data=response.data
      //       if(data.total!=0){
      //         this.tasks.push(data.items)
      //       }
      //       if(count==this.role_id_array.length-1){
      //         this.listLoading=false;
      //       }
      //       count++;
      //     })
      //   }
        var listQuery={id:this.role_id_array,isOne:false}
        indexProgramTeamRoleTask(listQuery).then(response => {
            var data=response.data
            if(data.total!=0){
              this.tasks=Object.values(data.items);
            }
            this.listLoading=false;
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

