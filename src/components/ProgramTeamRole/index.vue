<template>
  <div>

      <el-button  style="margin-left: 10px;" @click="createProgramPeople" type="primary" icon="el-icon-edit">新增项目组员</el-button>
      <el-form :rules="rules" :model="model"  ref="form">
      <el-table :data="model.programTeamRole" v-loading="listLoading" border fit highlight-current-row style="width: 100%">

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
            <el-form-item :prop="'programTeamRole.' + scope.$index + '.employee_id'" :rules='rules.employee_id'>
                <el-select v-model="scope.row.employee_id" placeholder="请选择">
                  <el-option
                    v-for="item in employees"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select> 
            </el-form-item>
            
        </template>
      </el-table-column>

      <el-table-column width="100px" label="工作内容">
        <template slot-scope="scope" >
           <el-form-item :prop="'programTeamRole.' + scope.$index + '.workload_note'" :rules='rules.workload_note'>
              <el-input class="edit-input" size="small" v-model="scope.row.workload_note" ></el-input>
          </el-form-item>
        </template>
      </el-table-column>

      <el-table-column width="100px" label="计划工作时长">
        <template slot-scope="scope">
          <el-form-item :prop="'programTeamRole.' + scope.$index + '.plan_workload'" :rules='rules.plan_workload'>
              <el-input class="edit-input" size="small" v-model="scope.row.plan_workload" ></el-input>
          </el-form-item>
        </template>
      </el-table-column>



<!--       <el-table-column width="100px" label="实际工作时长" v-if="isAllEdit">
        <template slot-scope="scope">
          <el-form-item prop="actual_workload" :rules='rules.actual_workload'>
              <el-input class="edit-input" size="small" v-model="scope.row.actual_workload" ></el-input>
          </el-form-item>
        </template>
      </el-table-column> -->

      <el-table-column width="200px" label="操作" >
        <template slot-scope="scope">
          <el-button v-if="scope.row.role=='项目组员'" type="warning" @click="confirmDelete(scope.row,scope.$index)" size="small" icon="el-icon-circle-check-outline">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-form>
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
    propProgramTeamRole: Array,
    isAllEdit:Boolean
  },

  data() {
    return {
        employees:new Array(),
        listLoading:true,
        rules:{
          workload_note:[ { required: true, message: '请输入工作量', trigger: 'blur' } ],
          plan_workload:[ { required: true, message: '请输入计划工作时长', trigger: 'blur' } ],
          actual_workload:[ { required: true, message: '请输入实际工作时长', trigger: 'blur' } ],
        },
        model:{
          programTeamRole:this.propProgramTeamRole
        }
    }
  },
  watch:{
    model: {
        handler:function(newVa,oldVa){
          this.changeFatherData()
        },
        deep:true
    },
  },
  created() {
    if(this.propProgramTeamRole==null){
      this.model.programTeamRole=[
          {role:'项目组长',employee_id:null,plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false},
          {role:'项目组员',employee_id:null,plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false},
          {role:'监督人员',employee_id:null,plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false},
          {role:'配置管理员',employee_id:null,plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false},
          {role:'质量保证人员',employee_id:null,plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false}
        ]
    }else{
      this.model.programTeamRole=this.propProgramTeamRole
    }
    this.getList()
  },

   methods: {
    getList() {
      this.listLoading = true;
      var listQuery={
          checkALL:true
        }
      indexEmployee(listQuery).then(response => {
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
                  this.model.programTeamRole.splice(index,1)
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
      var index=this.model.programTeamRole.length-4;
      this.model.programTeamRole.splice(index,0,{role:'项目组员',employee_id:null,plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false});
    },
    changeFatherData(){
      let data={data:this.model.programTeamRole,type:'programTeamRole'}
      this.$emit('dataChange',data)
    }

 }
    

}
</script>

<style scoped>
</style>


