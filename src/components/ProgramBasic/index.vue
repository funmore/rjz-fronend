<template>
       
          <el-form :rules="rules" ref="program-basic"  :model="programBasic" label123456781-position="left" label-width="100px" style='width: 600px; ' >
          <el-form-item label="所属型号" prop="model">
          <el-select v-model="programBasic.model_id" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in propSelection.model"
              :key="index"
              :label="item.model_name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="型号负责人">
        <template slot-scope="scope">
          {{manager_name}}
        </template>
        </el-form-item>

        <el-form-item label="项目名称" prop="name">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="programBasic.name">
          </el-input>
        </el-form-item>

        <el-form-item label="项目标识" prop="program_identity">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="programBasic.program_identity">
          </el-input>
        </el-form-item>

        <el-form-item label="类型" prop="type">
          <el-select v-model="programBasic.type" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in propSelection.type"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="参考基线" prop="ref">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="programBasic.ref">
          </el-input>
        </el-form-item>

        <el-form-item label="项目来源" prop="program_source">
          <el-select v-model="programBasic.program_source" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in propSelection.programSource"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="测试类型" prop="program_type">
          <el-select v-model="programBasic.program_type" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in propSelection.programType"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="密级">
          <el-select v-model="programBasic.classification" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in propSelection.classification"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="研制类型">
          <el-select v-model="programBasic.dev_type" allow-create filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in propSelection.devType"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="项目阶段">
          <el-select v-model="programBasic.program_stage" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in propSelection.programStage"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="计划开始时间" prop="actualStartTime">
          <el-date-picker v-model="programBasic.plan_start_time" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="Please pick a date">
          </el-date-picker>
        </el-form-item>


        <el-form-item label="计划结束时间" prop="actualEndTime">
          <el-date-picker v-model="programBasic.plan_end_time" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"  placeholder="Please pick a date">
          </el-date-picker>
        </el-form-item>





      </el-form>
</template>

<script>
import { indexEmployee } from '@/api/employee'

export default {
  name: 'program-basic',

  props:{
    propProgramBasic: Object,
    propRef:String,
    propSelection:Object
  },
  data() {
    return {


      programBasic:null,
      rules: {},
    }
  },
  computed:{
    manager_name:function(){
      if(this.propSelection.model.find(x=>x.id==this.programBasic.model_id)==null){
        return null;
      }
      this.programBasic.manager=this.propSelection.managers.find(x=>x.id==this.propSelection.model.find(x=>x.id==this.programBasic.model_id).employee_id)
      return this.programBasic.manager.name;
    }
  },
  watch:{
    programBasic: {
        handler:function(newVa,oldVa){
          this.changeFatherData()
        },
        deep:true
    },
  },
  created(){
    if(this.propProgramBasic==null){
      this.programBasic={
          id:null,
          program_source:"",
          type:"",
          ref:"",
          state:"",

          name:"",
          model_id:"",
          program_type:'',
          program_identity:'',
          classification:'',
          program_stage:'',
          dev_type:'',
          plan_start_time:new Date(),  
          plan_end_time :new Date(),
          manager:Object.assign({}, this.propSelection.managers[0])
        }
    }else{
      this.programBasic=this.propProgramBasic
    }
  },
   methods: {
    changeFatherData(){
      let data={data:this.programBasic,type:'programBasic'}
      this.$emit('dataChange',data)
    }
  }
}

</script>

<style scoped>
</style>


