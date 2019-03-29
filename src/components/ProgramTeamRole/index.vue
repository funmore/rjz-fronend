<template>
  <div>


      <el-table :data="programTeamRole" v-loading="listLoading" border fit highlight-current-row style="width: 100%">

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
            <el-select v-model="scope.row.employee_id" placeholder="请选择" @keyup.enter.native="scope.row.isEdit=!scope.row.isEdit">
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
          <template v-if="scope.row.isEdit">
            <el-input class="edit-input" size="small" v-model="scope.row.workload_note"  @keyup.enter.native="scope.row.isEdit=!scope.row.isEdit"></el-input>
          </template>
          <span v-else>{{ scope.row.workload_note }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" label="计划工作时长">
        <template slot-scope="scope">
          <template v-if="scope.row.isEdit">
            <el-input class="edit-input" size="small" v-model="scope.row.plan_workload"  @keyup.enter.native="scope.row.isEdit=!scope.row.isEdit"></el-input>
          </template>
          <span v-else>{{ scope.row.plan_workload }}</span>
        </template>
      </el-table-column>



      <el-table-column width="100px" label="实际工作时长" v-if="isAllEdit">
        <template slot-scope="scope">
          <template v-if="scope.row.isEdit">
            <el-input class="edit-input" size="small" v-model="scope.row.actual_workload"  @keyup.enter.native="scope.row.isEdit=!scope.row.isEdit"></el-input>
          </template>
          <span v-else>{{ scope.row.actual_workload }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px" label="操作" >
        <template slot-scope="scope">
          <el-button v-if="scope.row.isEdit" type="success" @click="confirmEdit(scope.row)" size="small" icon="el-icon-circle-check-outline">确认</el-button>
          <el-button v-else type="primary" @click='scope.row.isEdit=!scope.row.isEdit' size="small" icon="el-icon-edit">编辑</el-button>
          <el-button v-if="scope.row.role=='项目组员'" type="warning" @click="confirmDelete(scope.row,scope.$index)" size="small" icon="el-icon-circle-check-outline">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>


</template>

<script>

import { indexEmployee, showEmployee, storeEmployee, updateEmployee,
         destroyEmployee } from '@/api/employee'



export default {
  name: 'workload-demo',
  //components: { 'tinymce':Tinymce },
  //components: { 'workflow':workflow},
  props:{
    programTeamRole: Array,
    isAllEdit:Boolean
  },
  created() {
    this.listLoading=false;
  },
  data() {
    return {
        employees:new Array(),
        listLoading:true,
    }
  },
  created() {
    this.getList()
  },
   methods: {
    getList() {
      this.listLoading = true;
      indexEmployee(this.listQuery).then(response => {
        var data=response.data
        this.employees = data.items
        this.listLoading = false

      })
    },
    cancelEdit(row) {
      //row.title = row.originalTitle
      row.isEdit = false
      this.$message({
        message: 'The title has been restored to the original value',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      row.isEdit=!row.isEdit;
      this.$message({
        message: 'The title has been edited',
        type: 'success'
      })
    },
    confirmDelete(row,index) {
      this.$confirm('此操作将删除该组员, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.programTeamRole.splice(index,1)
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消删除'
                  });          
                });
    },
    createProgramPeople(){
      var index=this.programTeamRole.length-4;
      this.programTeamRole.splice(index,0,{role:'项目组员',employee_id:null,plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false});
    }


 }
    

}
</script>

<style scoped>
</style>


