 <template>
  <div :visible.sync="propVisible">
    <div class="filter-container">
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        @click="handleCreate"
        type="primary"
        icon="el-icon-edit"
      >新增任务</el-button>
    </div>
    <el-table
      :key="node_task.created_at"
      :data="node_task"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="序号" type="index" width="50"></el-table-column>

      <el-table-column width="80px" align="center" label="任务名称">
        <template slot-scope="scope">{{scope.row.task}}</template>
      </el-table-column>

      <el-table-column width="80px" align="center" label="进入下阶段必须完成">
        <template slot-scope="scope">
          <span v-if="scope.row.is_must_complete=='是'">
            <i class="el-icon-star-on" style="color:red"></i>
          </span>
        </template>
      </el-table-column>

      <el-table-column width="80px" align="center" label="负责人">
        <template slot-scope="scope">{{scope.row.employee_name}}</template>
      </el-table-column>

      <el-table-column width="80px" align="center" label="负责人角色">
        <template slot-scope="scope">{{scope.row.role}}</template>
      </el-table-column>

      <el-table-column width="80px" align="center" label="预期完成时间">
        <template slot-scope="scope">{{scope.row.due_day}}</template>
      </el-table-column>

      <el-table-column width="80px" align="center" label="当前状态">
        <template slot-scope="scope">
          <el-progress :percentage="parseInt(scope.row.state)"></el-progress>
        </template>
      </el-table-column>

      <el-table-column width="80px" align="center" label="延期原因">
        <template slot-scope="scope">{{scope.row.overdue_reason}}</template>
      </el-table-column>

      <el-table-column width="80px" align="center" label="备注">
        <template slot-scope="scope">
          <span>{{scope.row.note}}</span>
        </template>
      </el-table-column>

      <el-table-column width="80px" align="center" label="工作系数" v-if="isEditable">
        <template slot-scope="scope">
          <span>{{scope.row.ratio}}</span>
        </template>
      </el-table-column>

      <el-table-column width="300px" align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="handleEdit(scope.row)"
          >编辑</el-button>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="visible">
      <el-form
        :rules="rules"
        ref="NodeTask"
        :model="temp"
        label123456781-position="left"
        label-width="200px"
        style="width: 600px; margin-left:50px;"
      >
        <el-form-item label="负责人">
          <el-select v-model="temp.employee" value-key="arr_index" filterable placeholder="请选择">
            <el-option
              v-for="(item) in this.$store.state.program.w_team"
              :key="item.arr_index"
              :label="item.employee_name+'角色:'+item.role"
              :value="item"
            >
              <span style="float: left">{{ item.employee_name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.role }}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="待办任务">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="Please input"
            v-model="temp.task"
          ></el-input>
        </el-form-item>

        <el-form-item label="进入下阶段必须完成">
          <el-select v-model="temp.is_must_complete" filterable placeholder="请选择">
            <el-option v-for="(item,index) in ['是','否']" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="任务进度">
          <el-slider v-model="temp.state" :step="10" show-input></el-slider>
        </el-form-item>

        <el-form-item label="截止日期">
          <el-date-picker
            v-model="temp.due_day"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="Please pick a date"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="备注">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="Please input"
            v-model="temp.note"
          ></el-input>
        </el-form-item>

        <!-- <el-form-item label="工作系数" v-if="isEditable">
                <el-input-number v-model="temp.ratio" :min="1" :max="10" label="描述文字"></el-input-number>
              </el-form-item>


              <el-form-item label="任务评分" v-if="isEditable">
                <el-rate v-model="temp.score" show-score ></el-rate>
        </el-form-item>-->

        <el-form-item label="延期原因">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="Please input"
            v-model="temp.overdue_reason"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取消</el-button>
        <el-button type="primary" @click="confirmCreate(temp)" v-if="dialogStatus=='create'">确认</el-button>
        <el-button type="primary" @click="confirmUpdate(temp)" v-else>确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  indexProgramTeamRoleTask,
  showProgramTeamRoleTask,
  storeProgramTeamRoleTask,
  updateProgramTeamRoleTask,
  destroyProgramTeamRoleTask
} from '@/api/programteamroletask';

export default {
  data() {
    return {
      listLoading: true,

      temp: {
        id: null,
        employee: {
          arr_index: 0,
          employee_id: null,
          employee_name: null,
          role: null
        },
        employee_id: null,
        employee_name: null,
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

      node_task: [],
      dialogStatus: '',
      textMap: {
        update: '更新',
        create: '创建'
      },
      isEditable: false
    }
  },
  props: {
    propVisible: Boolean,
    propNodeId: Number,
    propRole: Array
  },
  watch: {
    // propVisible start
    propVisible: function(newVa, oldVa) {
      if (newVa == true) {
        this.getNodeTask(this.propNodeId)
        this.isEditable = this.checkPermission(this.propRole)
      }
    }
    // propVisible end
  },
  created() {},

  mounted() {
    this.getNodeTask(this.propNodeId)
    this.isEditable = this.checkPermission(this.propRole)
  },
  methods: {
    checkPermission(propRole) {
      return propRole.includes('项目组长')
    },
    getNodeTask(id) {
      this.node_task = []
      this.listLoading = true
      var listQuery = {
        node_id: id,
        type: 'NodeTask'
      }
      indexProgramTeamRoleTask(listQuery).then(response => {
        var data = response.data
        // eslint-disable-next-line eqeqeq
        if (data.total != 0) {
          this.node_task = Object.values(data.items)
        }
        this.listLoading = false
      })
    },
    handleEdit(row) {
      this.dialogStatus = 'update';
      for (var k in row) {
        this.temp[k] = row[k]
      }
      this.visible = true
      // this.temp.employee=this.$store.state.program.w_team.find(x=>{
      //   return x.employee_id==this.temp.employee_id&&x.role==this.temp.role;
      // } )
      this.temp.employee.arr_index = this.$store.state.program.w_team.find(
        x => {
          return (
            x.employee_id == this.temp.employee_id && x.role == this.temp.role
          )
        }
      ).arr_index
    },
    handleDelete(row) {
      if (row.is_must_choose == '是') {
        this.$confirm('该任务是必选项，不可删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            return
          })
          .catch(() => {})
        return;
      }
      this.$confirm('此操作将永久删除此任务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          destroyProgramTeamRoleTask(row.id).then(response => {
            var data = response.data
            if (data.is_okay == true) {
              for (const v of this.node_task) {
                if (v.id === row.id) {
                  const index = this.node_task.indexOf(v)
                  this.node_task.splice(index, 1)
                  break;
                }
              }
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$notify({
                title: '删除失败',
                message: data.note,
                type: 'success',
                duration: 2000
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    confirmCreate(item) {
      item.programBasicId = this.$store.getters.programBasicId
      item.employee_id = item.employee.employee_id
      item.employee_name = item.employee.employee_name
      item.role = item.employee.role
      this.$refs['NodeTask'].validate(valid => {
        if (valid) {
          this.visible = false
          storeProgramTeamRoleTask(item)
            .then(response => {
              var data = response.data
              if (data.is_okay) {
                item = data.items
                this.node_task.push(item)
                this.$notify({
                  title: '成功',
                  message: '更新成功',
                  type: 'success',
                  duration: 2000
                })
              } else {
                this.$notify({
                  title: '失败',
                  message: data.note,
                  type: 'success',
                  duration: 2000
                })
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    confirmUpdate(item) {
      item.programBasicId = this.$store.getters.programBasicId
      item.employee_id = item.employee.employee_id
      item.employee_name = item.employee.employee_name
      item.role = item.employee.role
      this.$refs['NodeTask'].validate(valid => {
        if (valid) {
          this.visible = false
          updateProgramTeamRoleTask(item)
            .then(response => {
              for (const v of this.node_task) {
                if (v.id === item.id) {
                  const index = this.node_task.indexOf(v)
                  this.node_task.splice(index, 1, item)
                  break;
                }
              }
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    cancel() {
      this.visible = false
    },
    handleCreate() {
      this.dialogStatus = 'create';
      (this.temp = {
        task: '',
        due_day: '',
        overdue_reason: '',
        note: '',
        before_node_id: this.propNodeId,
        state: 10,
        ratio: 10,
        score: 5
      }),
      (this.visible = true)
    }
  }
}
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

