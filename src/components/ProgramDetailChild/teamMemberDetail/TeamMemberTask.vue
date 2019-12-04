 <template>
      <el-card class="box-card" >
        <div class="filter-container">
          <el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.workflowArray" >
            <el-option v-for="item in propWorkflow.workflowArray" :key="item.id" :label="'截止'+item.name" :value="item.id">
            </el-option>
          </el-select>
          <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit" v-if="isEditable">新增任务</el-button>
        </div>




        <el-table :key='ptr_note.created_at' :data="ptr_note"  v-loading="listLoading" border fit highlight-current-row
        style="width: 100%;">

         <el-table-column type="expand" >
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                                    <daily-note  :propPtrNoteId="props.row.id" :propIsLeader="isEditable" ></daily-note>
                </el-form>
      


              </template>
            </el-table-column>

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

            <el-table-column width="120px" align="center" label="工作系数" v-if="isEditable">
              <template slot-scope="scope">
                <span >{{scope.row.ratio}}</span>
              </template>
            </el-table-column>

            <el-table-column width="120px" align="center" label="任务评分" v-if="isEditable">
              <template slot-scope="scope">
                <span >{{scope.row.score}}</span>
              </template>
            </el-table-column>

            <el-table-column width="120px" align="center" label="操作">
              <template slot-scope="scope">
                  <el-button type="primary" size="small" icon="el-icon-edit" @click="handleEdit(scope.row)">打开</el-button>
              </template>
            </el-table-column>


        </el-table>


       <el-dialog :title="textMap[dialogStatus]" :visible.sync="visible">
            <el-form :rules="rules" ref="TeamMemberNoteEdit" :model="temp" label123456781-position="left" label-width="200px" style='width: 600px; margin-left:50px;'>


             <el-form-item label="工作流节点">
                <el-select v-model="temp.before_node_id" filterable placeholder="请选择">
                  <el-option
                    v-for="item in propWorkflow.workflowArray"
                    :key="item.array_index"
                    :label="'截止'+item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="待办任务">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.task">
                </el-input>
              </el-form-item>

              <el-form-item label="任务进度">
                <el-slider
                  v-model="temp.state"
                  :step="10"
                  show-input>
                </el-slider>
              </el-form-item>

              <el-form-item label="截止日期">
                <el-date-picker v-model="temp.due_day" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="Please pick a date">
                </el-date-picker>
              </el-form-item>



              <el-form-item label="备注">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.note">
                </el-input>
              </el-form-item>

              <el-form-item label="工作系数" v-if="isEditable">
                <el-input-number v-model="temp.ratio" :min="1" :max="10" label="描述文字"></el-input-number>
              </el-form-item>


              <el-form-item label="任务评分" v-if="isEditable">
                <el-rate v-model="temp.score" show-score ></el-rate>
              </el-form-item>

              <el-form-item label="延期原因">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.overdue_reason">
                </el-input>
              </el-form-item>
          </el-form>



            <div slot="footer" class="dialog-footer">
              <el-button @click="cancel()">取消</el-button>
              <el-button type="primary"  @click="confirmCreate(temp)" v-if="dialogStatus=='create'">确认</el-button>
              <el-button type="primary"  @click="confirmUpdate(temp)" v-else>确认</el-button>
           </div>
          </el-dialog>
    </el-card>

   
</template>
<script>
  import DailyNote from './DailyNote'
  import { indexProgramTeamRoleTask, showProgramTeamRoleTask, storeProgramTeamRoleTask, updateProgramTeamRoleTask,
    destroyProgramTeamRoleTask } from '@/api/programteamroletask'

  export default {
    components: { DailyNote },
    data() {
      return {
        listLoading: true,
        listQuery: {
          workflowArray: ''
        },
        state: ['0', '20', '40', '60', '80', '100'],

        // ptr_note:[],
        temp: {
          task: '',
          due_day: '',
          overdue_reason: '',
          note: '',
          before_node_id: '',
          state: '',
          ratio: '',
          score: ''
        },
        visible: false,
        rules: {},

        ptr_note: [],
        is_leader: false,
        dialogStatus: '',
        textMap: {
          update: '更新',
          create: '创建'
        },
        isEditable: false

      }
  },
    props: {
      propTeamMemberId: Number,
      propWorkflow: Object,
      propRole: Array
    },

    created() {

    },
    mounted() {
      this.getNote()
      this.isEditable = this.checkPermission(this.propRole)
  },

    methods: {
      checkPermission(propRole) {
        return propRole.includes('项目组长')
    },
      getNote(id) {
        this.listLoading = true
        this.listQuery.id = this.propTeamMemberId
        this.listQuery.isOne = true
        indexProgramTeamRoleTask(this.listQuery).then(response => {
          var data = response.data
          if (data.total != 0) {
            this.ptr_note = Object.values(data.items)
          }
          this.listLoading = false
        })
      },
      handleFilter() {

      },
      handleCreate() {
        this.dialogStatus = 'create'
        this.temp = {
          task: '',
          due_day: '',
          overdue_reason: '',
          note: '',
          before_node_id: this.propWorkflow.workflowArray[this.propWorkflow.active].id,
          state: 10,
          ratio: 10,
          score: 5
        },
        this.visible = true
      },
      handleEdit(row) {
        this.dialogStatus = 'update'
        this.temp = row
        this.visible = true
      },
      edit(item) {
        item.isEdit = true
        this.$forceUpdate()
      },
      confirmCreate(item) {
        item.programteamrole_id = this.propTeamMemberId

        this.$refs['TeamMemberNoteEdit'].validate((valid) => {
          if (valid) {
            this.visible = false
            storeProgramTeamRoleTask(item).then(response => {
              var data = response.data
              item = data.items
              this.ptr_note.unshift(item)
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
      confirmUpdate(item) {
        this.$refs['TeamMemberNoteEdit'].validate((valid) => {
          if (valid) {
            this.visible = false
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
      }

    }
  }
</script>
<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 180px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

