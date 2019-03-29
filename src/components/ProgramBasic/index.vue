<template>
       

       <el-form :rules="rules" :ref="propRef"  :model="temp" label123456781-position="left" label-width="200px" style='width: 600px; margin-left:50px;'>
          <el-form-item label="所属型号" prop="model">
          <el-select v-model="temp.model" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in model"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="项目名称" prop="name">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.name">
          </el-input>
        </el-form-item>

        <el-form-item label="项目标识" prop="program_identity">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.program_identity">
          </el-input>
        </el-form-item>

        <el-form-item label="测试类型" prop="program_type">
          <el-select v-model="temp.program_type" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in programType"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="密级">
          <el-select v-model="temp.classification" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in classification"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="研制类型">
          <el-select v-model="temp.dev_type" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in devType"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="项目阶段">
          <el-select v-model="temp.program_stage" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in programStage"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="计划开始时间" prop="actualStartTime">
          <el-date-picker v-model="temp.plan_start_time" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="Please pick a date">
          </el-date-picker>
        </el-form-item>


        <el-form-item label="计划结束时间" prop="actualEndTime">
          <el-date-picker v-model="temp.plan_end_time" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"  placeholder="Please pick a date">
          </el-date-picker>
        </el-form-item>


        <el-form-item label="型号负责人">
          <el-select v-model="temp.program_stage" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in programStage"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

       <el-form-item label="型号负责人">
        <template slot-scope="scope">
            <el-select v-model="temp.manager_id" placeholder="请选择" @keyup.enter.native="scope.row.isEdit=!scope.row.isEdit">
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
const constSoftwareType = ['A级','B级','C级','D级']
const constSoftwareUsage = ['弹上','地面']
const constCodeLangu = ['C','FPGA','PLC']
const constComplier = ['神舟IDE','IED2','IED3']
const constRuntime = ['RUNTIME A','RUNTIME B']
const constSoftwareCate = ['嵌入','非嵌','FPGA','PLC']
const constSoftwareSubCate = ['飞控','信息处理','组合导航','CPLD','PLC','伺服','综合控制']
const constCpuType = ['cpu1','cpu2','cpu3','cpu4']
const constSize = ['大','中','小']
const constClassification = ['机密','秘密','内部']


export default {
  name: 'workflow-demo',

  props:{
    propSoftwareInfo: Object,
    propRef:String
  },
  data() {
    return {
      softwareType:constSoftwareType,
      softwareUsage:constSoftwareUsage,
      codeLangu:constCodeLangu,
      complier:constComplier,
      runtime:constRuntime,
      softwareCate:constSoftwareCate,
      softwareSubCate:constSoftwareSubCate,
      cpuType:constCpuType,
      size:constSize,
      classification:constClassification,



      softwareInfo:new Object,

      rules: {}
    }
  },
  created(){
    this.softwareInfo=this.propSoftwareInfo;
  },
   methods: {
    
  }

}
</script>

<style scoped>
</style>


