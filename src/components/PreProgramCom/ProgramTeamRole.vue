<template>
      <el-dialog :title="textMap[dialogStatus]+'软件信息'" :visible.sync="propVisible" :before-close="handleClose">

      <el-button  style="margin-left: 10px;" @click="createProgramPeople" type="primary" icon="el-icon-edit">新增项目组员</el-button>
      <el-table :data="programTeamRole" v-loading="listLoading" border fit highlight-current-row style="width: 100%" v-if="propVisible">

      <el-table-column align="center" label="序号" width="80">
        <template slot-scope="scope">
          <span>{{scope.$index+1}}</span>
        </template>
      </el-table-column>


      <el-table-column width="120px" align="center" label="项目角色">
        <template slot-scope="scope">
          <span>{{scope.row.role}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" label="姓名">
        <template slot-scope="scope">
                <el-select v-model="scope.row.employee_id" placeholder="请选择">
                  <el-option
                    v-for="item in employees"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select> 
            
        </template>
      </el-table-column>

      <el-table-column width="100px" label="工作内容">
        <template slot-scope="scope" >
              <el-input class="edit-input" size="small" v-model="scope.row.workload_note" ></el-input>
        </template>
      </el-table-column>

      <el-table-column width="100px" label="计划工作时长">
        <template slot-scope="scope">
              <el-input class="edit-input" size="small" v-model="scope.row.plan_workload" ></el-input>
        </template>
      </el-table-column>


      <el-table-column width="200px" label="操作" >
        <template slot-scope="scope">
          <el-button v-if="scope.row.role=='项目组员'" type="warning" @click="confirmDelete(scope.row,scope.$index)" size="small" icon="el-icon-circle-check-outline">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
              <div slot="footer" class="dialog-footer">
              <el-button @click="cancel()">取消</el-button>
              <el-button type="primary" :loading="onConfirming" @click="confirmCreate" v-if="dialogStatus=='create'">确认</el-button>
              <el-button type="primary" :loading="onConfirming" @click="confirmUpdate" v-else>确认</el-button>
      </div>
</el-dialog>

</template>

<script>

import { indexEmployee, showEmployee, storeEmployee, updateEmployee,
  destroyEmployee } from '@/api/employee'

import { indexProgramTeamRole, showProgramTeamRole, storeProgramTeamRole, updateProgramTeamRole,
  destroyProgramTeamRole } from '@/api/programteamrole'
import mixin from './mixin'

export default {
  name: 'ProgramTeamRole',
  props: {
    propVisible: Boolean,
    propProgramBasicId: Number
  },
  mixins: [mixin],

  data() {
    return {
      employees: [],
      listLoading: true,
      programTeamRole: [
        { role: '项目组长', employee_id: new Number(), plan_workload: 0, workload_note: '工作描述', actual_workload: 0, isEdit: false },
        { role: '项目组员', employee_id: new Number(), plan_workload: 0, workload_note: '工作描述', actual_workload: 0, isEdit: false }
        // {role:'监督人员',employee_id:new Number(),plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false},
        // {role:'配置管理员',employee_id:new Number(),plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false},
        // {role:'质量保证员',employee_id:new Number(),plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false}
      ],
      dialogStatus: '',
      textMap: {
        update: '更新',
        create: '创建'
      },
      onConfirming: false
    }
  },
  watch: {
    // propVisible start
    propVisible: function(newVa, oldVa) {
      if (newVa === true) {
        this.getData()
      }
    }
    // propVisible end

  },
  created() {
    this.getList()
  },

  methods: {
    getData() {
      this.listLoading = true
      showProgramTeamRole(this.propProgramBasicId).then(response => {
        var data = response.data
        if (data.isOkay == true) {
          this.dialogStatus = 'update'
          this.programTeamRole = data.item
        } else {
          this.dialogStatus = 'create'
          for (let i = 0; i < this.programTeamRole.length; i++) {
            this.programTeamRole[i].employee_id = this.employees[i].id
          }
        }
        this.listLoading = false
      })
    },
    confirmUpdate() {
      this.onConfirming = true
      const storeData = {
        programId: this.propProgramBasicId,
        data: this.programTeamRole
      }
      updateProgramTeamRole(storeData).then(response => {
        if (response.data.isOkay == true) {
          var args = {
            type: this.$options.name,
            state: this.dialogStatus,
            programId: this.propProgramBasicId,
            value: response.data.item
          }
          this.$emit('close', args)
          this.$notify({
            title: '信息已更新',
            message: '请在项目中查看此项目',
            type: 'success',
            duration: 2000
          })
        } else {

        }
        this.onConfirming = false
      }).catch(error => {
        this.onConfirming = false
      })
    },
    confirmCreate() {
      this.onConfirming = true
      const storeData = {
        programId: this.propProgramBasicId,
        data: this.programTeamRole
      }
      storeProgramTeamRole(storeData).then(response => {
        if (response.data.isOkay == true) {
          this.dialogStatus = 'update'
          var args = {
            type: this.$options.name,
            state: this.dialogStatus,
            programId: this.propProgramBasicId,
            value: response.data.item
          }
          this.$emit('close', args)
          this.$notify({
            title: '信息已更新',
            message: '请在项目中查看此项目',
            type: 'success',
            duration: 2000
          })
        }
        this.onConfirming = false
      }).catch(error => {
        this.onConfirming = false
      })
    },
    getList() {
      this.listLoading = true
      var listQuery = {
        checkALL: true
      }
      indexEmployee(listQuery).then(response => {
        var data = response.data
        this.employees = data.items
        this.listLoading = false
      })
    },
    cancelEdit(row) {
      // row.title = row.originalTitle
      row.isEdit = false
      this.$message({
        message: 'The title has been restored to the original value',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      row.isEdit = !row.isEdit
      this.$message({
        message: 'The title has been edited',
        type: 'success'
      })
    },
    confirmDelete(row, index) {
      this.$confirm('此操作将删除该组员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.programTeamRole.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    createProgramPeople() {
      var index = this.programTeamRole.length - 4
      this.programTeamRole.splice(index, 0, { role: '项目组员', employee_id: null, plan_workload: 0, workload_note: '工作描述', actual_workload: 0, isEdit: false })
    }

  }

}
</script>

<style scoped>
</style>


