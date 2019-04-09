<template>
       
          <el-form :rules="rules" ref="program-basic"  :model="program" label123456781-position="left" label-width="100px" style='width: 600px; ' >
          <el-form-item label="所属型号" prop="model">
          <el-select v-model="program.model" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in propSelection.model"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="项目名称" prop="name">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="program.name">
          </el-input>
        </el-form-item>

        <el-form-item label="项目标识" prop="program_identity">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="program.program_identity">
          </el-input>
        </el-form-item>

        <el-form-item label="测试类型" prop="program_type">
          <el-select v-model="program.program_type" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in propSelection.ProgramType"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="密级">
          <el-select v-model="program.classification" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in propSelection.Classification"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="研制类型">
          <el-select v-model="program.dev_type" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in propSelection.DevType"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="项目阶段">
          <el-select v-model="program.program_stage" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in propSelection.ProgramStage"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="计划开始时间" prop="actualStartTime">
          <el-date-picker v-model="program.plan_start_time" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="Please pick a date">
          </el-date-picker>
        </el-form-item>


        <el-form-item label="计划结束时间" prop="actualEndTime">
          <el-date-picker v-model="program.plan_end_time" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"  placeholder="Please pick a date">
          </el-date-picker>
        </el-form-item>


        <el-form-item label="型号负责人">
          <el-select v-model="program.program_stage" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in propSelection.ProgramStage"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

       <el-form-item label="型号负责人">
        <template slot-scope="scope">
            <el-select v-model="program.manager_id" placeholder="请选择" @keyup.enter.native="scope.row.isEdit=!scope.row.isEdit">
            <el-option
              v-for="(item,index) in managers"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select> 
        </template>
        </el-form-item>


      </el-form>
</template>

<script>
import { indexEmployee } from '@/api/employee'

export default {
  name: 'program-basic',

  props:{
    propProgram: Object,
    propRef:String,
    propSelection:Object
  },
  data() {
    return {


      program:this.propProgram,
      managers:[],
      rules: {}
    }
  },
  watch:{
    propProgram : function (value) {
      this.program=value
    }
  },
  created(){
    this.getEmployeePrincal()

  },
   methods: {
        getEmployeePrincal(){
        var listQuery={
          checkPM:true
        }
        indexEmployee(listQuery).then(response => {
        var data=response.data
        this.managers = data.items
      })
    },
  }

}
</script>

<style scoped>
</style>


